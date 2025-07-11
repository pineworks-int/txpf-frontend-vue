import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isAuthModalOpen = ref(false)

  const openAuthModal = () => {
    isAuthModalOpen.value = true
  }

  const closeAuthModal = () => {
    isAuthModalOpen.value = false
  }

  return {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  }
})
