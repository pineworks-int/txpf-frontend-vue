import type { ProjectProps } from '@/types/project.type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // ~-- STATES ---
  const isAuthModalOpen = ref(false)
  const isFilterDropdownOpen = ref(false)
  const isProjectDetailModalOpen = ref(false)
  const selectedProject = ref<ProjectProps | null>(null)
  const pendingProjectAppAccess = ref<string | null>(null)
  const isAuthVerificationLoading = ref(false)

  // ~-- SETTERS ---
  const setOpenAuthModal = () => {
    isAuthModalOpen.value = true
  }

  const setCloseAuthModal = () => {
    isAuthModalOpen.value = false
  }

  const setOpenProjectDetailModal = (project: ProjectProps) => {
    selectedProject.value = project
    isProjectDetailModalOpen.value = true
  }

  const setCloseProjectDetailModal = () => {
    isProjectDetailModalOpen.value = false
    selectedProject.value = null
  }

  const setPendingProjectAppAccess = (projectId: string | null) => {
    pendingProjectAppAccess.value = projectId
  }

  const setOpenFilterDropdown = () => {
    isFilterDropdownOpen.value = !isFilterDropdownOpen.value
  }

  const setCloseFilterDropdown = () => {
    isFilterDropdownOpen.value = false
  }

  const setAuthVerificationLoading = (loading: boolean) => {
    isAuthVerificationLoading.value = loading
  }

  return {
    // STATES
    isAuthModalOpen,
    isFilterDropdownOpen,
    isProjectDetailModalOpen,
    selectedProject,
    pendingProjectAppAccess,
    isAuthVerificationLoading,
    // SETTERS
    setOpenAuthModal,
    setCloseAuthModal,
    setOpenProjectDetailModal,
    setCloseProjectDetailModal,
    setPendingProjectAppAccess,
    setOpenFilterDropdown,
    setCloseFilterDropdown,
    setAuthVerificationLoading,
  }
})
