import type { ProjectProps } from '@/types/project.type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // ~-- STATES ---
  const isAuthModalOpen = ref(false)
  const isFilterDropdownOpen = ref(false)
  const isProjectDetailModalOpen = ref(false)
  const selectedProject = ref<ProjectProps | null>(null)

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

  const setOpenFilterDropdown = () => {
    isFilterDropdownOpen.value = !isFilterDropdownOpen.value
  }

  const setCloseFilterDropdown = () => {
    isFilterDropdownOpen.value = false
  }

  return {
    // STATES
    isAuthModalOpen,
    isFilterDropdownOpen,
    isProjectDetailModalOpen,
    selectedProject,
    // SETTERS
    setOpenAuthModal,
    setCloseAuthModal,
    setOpenProjectDetailModal,
    setCloseProjectDetailModal,
    setOpenFilterDropdown,
    setCloseFilterDropdown,
  }
})
