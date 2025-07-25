<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { SupabaseAuthService } from '@/lib/auth-service'
import { getIcon as getIconFromLib } from '@/lib/icons'
import { useProjectsStore } from '@/stores/projects'
import { useToastStore } from '@/stores/toast'
import { useUiStore } from '@/stores/ui'

const authService = new SupabaseAuthService()
const uiStore = useUiStore()
const projectsStore = useProjectsStore()
const toastStore = useToastStore()
const { setCloseProjectDetailModal } = uiStore
const { selectedProject, isProjectDetailModalOpen } = storeToRefs(uiStore)
const isAuthenticating = ref(false)
const authError = ref<string | null>(null)

const hasProjectAppUrl = computed(() => {
  if (!selectedProject.value)
    return false
  return projectsStore.getProjectHasAppUrl(selectedProject.value.id)
})

function getIcon(name: string) {
  return getIconFromLib(name)
}

async function handleProjectAppAccess() {
  isAuthenticating.value = true

  try {
    const isAuthenticated = await authService.checkAuthStatus()

    if (!isAuthenticated) {
      toastStore.showWarning('Please log in to access project\'s app', 5000)
      if (selectedProject.value?.id) {
        uiStore.setPendingProjectAppAccess(selectedProject.value.id)
      }
      uiStore.setCloseProjectDetailModal()
      setTimeout(() => {
        uiStore.setOpenAuthModal()
      }, 200)
      return
    }

    if (!selectedProject.value?.id) {
      toastStore.showError('Project not found')
      return
    }

    const projectAppUrl = projectsStore.getProjectAppStaticUrl(selectedProject.value.id)
    if (!projectAppUrl) {
      toastStore.showError('App URL not available for this project')
      return
    }
    toastStore.showSuccess('Access to project granted !')
    setTimeout(() => {
      window.open(projectAppUrl, '_blank')
    }, 1000)
  }
  catch (error) {
    console.error('Authentication failed:', error)
    toastStore.showError('Authentication failed. Please try again.')
  }
  finally {
    isAuthenticating.value = false
  }
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="isProjectDetailModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/90"
        @click="setCloseProjectDetailModal"
      />

      <!-- # modal content -->
      <div
        v-if="selectedProject"
        class="relative bg-white rounded-lg shadow-xl w-7/8 h-7/8 p-8 overflow-y-auto"
      >
        <!-- ~ close button -->
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          @click="setCloseProjectDetailModal"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- ~ project title and description -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-4">
            {{ selectedProject.title }}
          </h1>
          <p class="text-gray-700">
            {{ selectedProject.description }}
          </p>
        </div>

        <!-- ~ media section -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">
            Screenshots & Videos
          </h2>
          <div class="flex gap-4">
            <!-- * thumbnail column -->
            <div class="w-24 flex-shrink-0">
              <div class="space-y-2 max-h-64 overflow-y-auto">
                <!-- videos first -->
                <div
                  v-for="video in selectedProject.videos"
                  :key="video.id"
                  class="w-full h-16 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  <img
                    :src="video.thumbnail" :alt="video.title"
                    class="w-full h-full object-cover rounded"
                  >
                </div>
                <!-- screenshots after -->
                <div
                  v-for="screenshot in selectedProject.screenshots"
                  :key="screenshot.id"
                  class="w-full h-16 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  <img
                    :src="screenshot.url" :alt="screenshot.title"
                    class="w-full h-full object-cover rounded"
                  >
                </div>
              </div>
            </div>

            <!-- * main media display -->
            <div class="flex-1 bg-gray-100 rounded-lg min-h-64 flex items-center justify-center">
              <p class="text-gray-500">
                Media content will be displayed here
              </p>
            </div>
          </div>
        </div>

        <!-- ~ technologies section -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">
            Technologies
          </h2>
          <div class="flex flex-wrap gap-4">
            <div
              v-for="tech in selectedProject.technologies"
              :key="tech"
              class="flex flex-col items-center gap-2"
            >
              <!-- Logo area - 48px container -->
              <div class="w-12 h-12 flex items-center justify-center">
                <div v-if="getIcon(tech)" class="w-12 h-12 flex items-center justify-center">
                  <!-- SVG logo - 48px with colors -->
                  <div class="w-12 h-12" v-html="getIcon(tech)" />
                </div>
                <div v-else class="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                  <!-- Fallback: first letter -->
                  <span class="text-lg font-semibold text-gray-600">
                    {{ tech.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </div>

              <!-- Always show the name -->
              <span class="text-xs text-gray-600 text-center max-w-16">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- ~ github links section -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">
            GitHub Links
          </h2>
          <div class="space-y-3">
            <a
              v-if="selectedProject.githubRepoUrl"
              :href="selectedProject.githubRepoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Repository
            </a>
            <a
              v-if="selectedProject.githubProjectUrl"
              :href="selectedProject.githubProjectUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Project Page
            </a>
          </div>
        </div>

        <!-- ~ demo access button -->
        <div v-if="hasProjectAppUrl">
          <div class="flex justify-center">
            <button
              class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              @click="handleProjectAppAccess"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Access to Demo
            </button>
          </div>
        </div>

        <!-- ~ auth error message -->
        <div
          v-if="authError"
          class="text-red-600 text-sm"
        >
          {{ authError }}
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* simple fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
