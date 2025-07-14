import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isAuthModalOpen = ref(false)
  const isFilterDropdownOpen = ref(false)

  const openAuthModal = () => {
    isAuthModalOpen.value = true
  }

  const closeAuthModal = () => {
    isAuthModalOpen.value = false
  }

  const openFilterDropdown = () => {
    isFilterDropdownOpen.value = !isFilterDropdownOpen.value
  }

  const closeFilterDropdown = () => {
    isFilterDropdownOpen.value = false
  }

  return {
    isAuthModalOpen,
    isFilterDropdownOpen,
    openAuthModal,
    closeAuthModal,
    openFilterDropdown,
    closeFilterDropdown,
  }
})
