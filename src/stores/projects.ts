import type { ProjectProps } from '@/types/project.type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectsStore = defineStore('projects', () => {
  // ~-- STATES ---
  const projects = ref<ProjectProps[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

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

  return {
    // * STATES
    projects,
    isLoading,
    error,
    // * SETTERS
    setProjects,
    setLoading,
    setError,
  }
})
