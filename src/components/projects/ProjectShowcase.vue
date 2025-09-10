<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted } from 'vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { useProjects } from '@/composables/useProjects'
import { useContentStore } from '@/stores/content'
import { useProjectsStore } from '@/stores/projects'
import { useUiStore } from '@/stores/ui'

// ~ stores
const projectsStore = useProjectsStore()
const uiStore = useUiStore()
const contentStore = useContentStore()

const {
  isLoading,
  error,
  getProjectsTechnologies,
  getFilteredProjects,
  selectedTechnologies,
  sortDirection,
} = storeToRefs(projectsStore)

const { getContent } = storeToRefs(contentStore)
const { isFilterDropdownOpen } = storeToRefs(uiStore)

const { setClearFilters, setSortDirection } = projectsStore
const { setOpenFilterDropdown, setCloseFilterDropdown } = uiStore

const { fetchProjects } = useProjects()

function handleClickOutside(event: MouseEvent) {
  if (event.target instanceof HTMLElement && !event.target.closest('.filter-container')) {
    setCloseFilterDropdown()
  }
}

onMounted(() => {
  fetchProjects()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <section id="personal-projects" class="py-12 bg-surface-1 text-content max-w-4xl mx-auto">
    <div class="text-center">
      <h2 class="text-3xl font-bold font-oxanium text-primary-medium">
        {{ getContent.projects.title }}
      </h2>
    </div>

    <div class="my-8 filter-container flex justify-center md:justify-start">
      <div class="relative inline-block">
        <button
          class="btn btn-primary ml-2 focus-ring font-oxanium"
          aria-haspopup="listbox"
          :aria-expanded="isFilterDropdownOpen"
          aria-controls="project-filter-dropdown"
          @click="setOpenFilterDropdown"
        >
          {{ getContent.projects.buttons.filters }}
        </button>
        <button
          v-if="selectedTechnologies.length > 0"
          class="btn btn-danger ml-2 focus-ring font-oxanium"
          @click="setClearFilters"
        >
          {{ getContent.projects.buttons.clear }}
        </button>
        <button
          class="btn btn-primary ml-2 focus-ring font-oxanium"
          @click="setSortDirection"
        >
          {{ getContent.projects.buttons.sort }} {{ sortDirection === 'asc' ? 'A-Z' : 'Z-A' }}
        </button>

        <div
          v-if="isFilterDropdownOpen"
          id="project-filter-dropdown"
          class="dropdown-panel"
          role="listbox"
        >
          <div
            v-for="tech in getProjectsTechnologies"
            :key="tech"
            class="dropdown-row"
            role="option"
            :aria-selected="selectedTechnologies.includes(tech)"
          >
            <input
              :id="`tech-${tech}`"
              v-model="selectedTechnologies"
              type="checkbox"
              :value="tech"
              class="checkbox"
            >
            <label
              :for="`tech-${tech}`"
              class="block text-sm"
            >
              {{ tech }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div>
      <!-- if loading -->
      <div v-if="isLoading" class="text-center">
        <p class="text-info">
          Loading projects...
        </p>
      </div>

      <!-- if error -->
      <div v-else-if="error" class="text-center text-error">
        <p>Oops! Something went wrong: {{ error.message }}</p>
      </div>

      <!-- if success -->
      <div
        v-else-if="getFilteredProjects.length > 0"
        class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <ProjectCard
          v-for="project in getFilteredProjects"
          :key="project.title"
          v-bind="project"
        />
      </div>

      <!-- if empty -->
      <div v-else class="text-center mb-8">
        <p class="text-content/70">
          No projects found that match your filter.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
