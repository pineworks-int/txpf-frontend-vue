<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
const { selectedProject, isProjectDetailModalOpen } = storeToRefs(uiStore)

const { setCloseProjectDetailModal } = uiStore
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

      <!-- modal content -->
      <div
        v-if="selectedProject"
        class="relative bg-white rounded-lg shadow-xl w-7/8 h-7/8 p-8 overflow-y-auto"
      >
        <!-- close button -->
        <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-800" @click="setCloseProjectDetailModal">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <!-- project details -->
        <h1 class="text-3xl font-bold mb-4">
          {{ selectedProject.title }}
        </h1>
        <p class="text-gray-700">
          {{ selectedProject.description }}
        </p>
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
