import type { ProjectProps, ProjectStaticData } from '@/types/project.type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useContentStore } from '@/stores/content'

export const useProjectsStore = defineStore('projects', () => {
  // ~-- STATES ---
  const projectsDynamicData = ref<ProjectProps[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const selectedTechnologies = ref<string[]>([])
  const sortDirection = ref<'asc' | 'desc'>('asc')

  // ~-- DEPENDENCIES ---
  const contentStore = useContentStore()

  // ~-- GETTERS ---
  const projectStaticData = computed((): ProjectStaticData => {
    return contentStore.getContent?.projects.data || {}
  })

  const getProjectAppStaticUrl = (projectId: string): string | null => {
    return projectStaticData.value[projectId]?.url || null
  }

  const getProjectHasAppUrl = (projectId: string): boolean => {
    return projectStaticData.value[projectId]?.url !== null
  }

  const getProjectDescription = (projectId: string): string => {
    return projectStaticData.value[projectId]?.description || ''
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
    isLoading,
    error,
    selectedTechnologies,
    sortDirection,
    // GETTERS
    projectStaticData,
    getFilteredProjects,
    getProjectsTechnologies,
    getProjectAppStaticUrl,
    getProjectHasAppUrl,
    getProjectDescription,
    // SETTERS
    setProjects,
    setLoading,
    setError,
    setSortDirection,
    setClearFilters,
  }
})
