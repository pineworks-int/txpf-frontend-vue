<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { useProjectsStore } from '@/stores/projects'
import { useUiStore } from '@/stores/ui'
import { useProjects } from '@/composables/useProjects'

// ~ stores
const projectsStore = useProjectsStore()
const uiStore = useUiStore()

const {
  isLoading,
  error,
  uniqueTechnologies,
  filteredProjects,
  selectedTechnologies,
  sortDirection,
} = storeToRefs(projectsStore)

const { isFilterDropdownOpen } = storeToRefs(uiStore)

const { clearFilters, toggleSortDirection } = projectsStore
const { openFilterDropdown, closeFilterDropdown } = uiStore

const { fetchProjects } = useProjects()


function handleClickOutside(event: MouseEvent) {
  if (event.target instanceof HTMLElement && !event.target.closest('.filter-container')) {
    closeFilterDropdown()
  }
}

onMounted(() => {
  fetchProjects()
  document.addEventListener('click', handleClickOutside)
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <section id="personal-projects" class="py-12">

    <div class="text-center">
      <h2 class="text-3xl font-bold">
        My Personal Projects
      </h2>
    </div>
    
    <div class="my-8 filter-container">
      <div class="relative inline-block">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded ml-2"
          @click="openFilterDropdown"
        >
          Filters
        </button>
        <button
          v-if="selectedTechnologies.length > 0"
          class="px-4 py-2 bg-red-600 text-white rounded ml-2"
          @click="clearFilters"
        >
          Clear
        </button>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded ml-2"
          @click="toggleSortDirection"
        >
          Sort {{ sortDirection === 'asc' ? 'A-Z' : 'Z-A' }}
        </button>
        <div
          v-if="isFilterDropdownOpen"
          class="absolute z-10 bg-white shadow-lg rounded-md mt-2"
        >
        <div
          v-for="tech in uniqueTechnologies"
          :key="tech"
          class="flex items-center ml-2"
        >
          <input
            type="checkbox"
            :id="`tech-${tech}`"
            :value="tech"
            v-model="selectedTechnologies"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            :for="`tech-${tech}`"
            class="ml-2 block text-sm text-gray-900"
          >
            {{ tech }}
          </label>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <!-- * if loading -->
      <div
        v-if="isLoading"
        class="text-center"
      >
        <p>Loading projects...</p>
      </div>
      <!-- * if error -->
      <div
        v-else-if="error"
        class="text-center text-red-500"
      >
        <p>Oops! Something went wrong: {{ error.message }}</p>
      </div>
      <!-- * if success -->
      <div
        v-else-if="filteredProjects.length > 0"
        class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <ProjectCard v-for="project in filteredProjects"
          :key="project.title"
          v-bind="project"
        />
      </div>
      <!-- * if empty -->
      <div
        v-else
        class="text-center mb-8"
      >
        <p>No projects found that match your filter.</p>
      </div>
    </div>

  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
