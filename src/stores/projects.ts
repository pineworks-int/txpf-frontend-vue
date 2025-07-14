import type { ProjectProps } from '@/types/project.type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProjectsStore = defineStore('projects', () => {
  // ~-- STATES ---
  const projects = ref<ProjectProps[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const selectedTechnologies = ref<string[]>([])
  const sortDirection = ref<'asc' | 'desc'>('asc')

  // ~-- GETTERS ---
  const uniqueTechnologies = computed(() => {
    const allTechs = projects.value.flatMap(project => project.technologies)

    return [...new Set(allTechs)].sort()
  })
  
  const filteredProjects = computed(() => {
    const filtered = projects.value.filter(project => {
      if (selectedTechnologies.value.length === 0) return true
      return selectedTechnologies.value.every(tech => project.technologies.includes(tech))
    })

    return filtered.sort((a, b) => {
      const titleA = a.title.toLowerCase()
      const titleB = b.title.toLowerCase()

      if (sortDirection.value === 'asc') {
        return titleA.localeCompare(titleB) // ? A-Z
      } else {
        return titleB.localeCompare(titleA) // ? Z-A
      }
    })
  })

  // ~-- SETTERS ---
  function setProjects(newProjects: ProjectProps[]) {
    projects.value = newProjects
  }

  function setLoading(loadingState: boolean) {
    isLoading.value = loadingState
  }

  function setError(newError: Error | null) {
    error.value = newError
  }

  function toggleSortDirection() {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  }

  function clearFilters() {
    selectedTechnologies.value = []
  }


  return {
    // * STATES
    projects,
    isLoading,
    error,
    selectedTechnologies,
    sortDirection,
    // * GETTERS
    filteredProjects,
    uniqueTechnologies,
    // * SETTERS
    setProjects,
    setLoading,
    setError,
    toggleSortDirection,
    clearFilters,
  }
})
