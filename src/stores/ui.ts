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
  const openAuthModal = () => {
    isAuthModalOpen.value = true
  }

  const closeAuthModal = () => {
    isAuthModalOpen.value = false
  }

  const openProjectDetailModal = (project: ProjectProps) => {
    selectedProject.value = project
    isProjectDetailModalOpen.value = true
  }

  const closeProjectDetailModal = () => {
    isProjectDetailModalOpen.value = false
    selectedProject.value = null
  }

  const openFilterDropdown = () => {
    isFilterDropdownOpen.value = !isFilterDropdownOpen.value
  }

  const closeFilterDropdown = () => {
    isFilterDropdownOpen.value = false
  }

  return {
    // * STATES
    isAuthModalOpen,
    isFilterDropdownOpen,
    isProjectDetailModalOpen,
    selectedProject,
    // * SETTERS
    openAuthModal,
    closeAuthModal,
    openProjectDetailModal,
    closeProjectDetailModal,
    openFilterDropdown,
    closeFilterDropdown,
  }
})
