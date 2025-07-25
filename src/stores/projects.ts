import type { ProjectProps, ProjectStaticData } from '@/types/project.type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import staticData from '@/data/static.json'

const projectsStatic = staticData.content.home['projects-showcase'] as ProjectStaticData

export const useProjectsStore = defineStore('projects', () => {
  // ~-- STATES ---
  const projectsDynamicData = ref<ProjectProps[]>([])
  const projectStaticData = ref<ProjectStaticData>(projectsStatic)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const selectedTechnologies = ref<string[]>([])
  const sortDirection = ref<'asc' | 'desc'>('asc')

  // ~-- GETTERS ---
  const getProjectAppStaticUrl = (projectId: string): string | null => {
    return projectsStatic[projectId]?.url || null
  }

  const getProjectHasAppUrl = (projectId: string): boolean => {
    return projectsStatic[projectId]?.url !== null
  }

  const getProjectsTechnologies = computed(() => {
    const allTechs = projectsDynamicData.value.flatMap(project => project.technologies)

    return [...new Set(allTechs)].sort()
  })

  const getFilteredProjects = computed(() => {
    const filtered = projectsDynamicData.value.filter((p) => {
      if (selectedTechnologies.value.length === 0)
        return true
      return selectedTechnologies.value.every(tech => p.technologies.includes(tech))
    })

    return filtered.sort((a, b) => {
      const titleA = a.title.toLowerCase()
      const titleB = b.title.toLowerCase()

      if (sortDirection.value === 'asc') {
        return titleA.localeCompare(titleB) // ? A-Z
      }
      else {
        return titleB.localeCompare(titleA) // ? Z-A
      }
    })
  })

  // ~-- SETTERS ---
  const setProjects = (newProjects: ProjectProps[]) => {
    projectsDynamicData.value = newProjects
  }

  const setLoading = (loadingState: boolean) => {
    isLoading.value = loadingState
  }

  const setError = (newError: Error | null) => {
    error.value = newError
  }

  const setSortDirection = () => {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  }

  const setClearFilters = () => {
    selectedTechnologies.value = []
  }

  return {
    // STATES
    projectsDynamicData,
    projectStaticData,
    isLoading,
    error,
    selectedTechnologies,
    sortDirection,
    // GETTERS
    getFilteredProjects,
    getProjectsTechnologies,
    getProjectAppStaticUrl,
    getProjectHasAppUrl,
    // SETTERS
    setProjects,
    setLoading,
    setError,
    setSortDirection,
    setClearFilters,
  }
})
