import type { Toast, ToastType } from '@/types/toast.type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  const setRemovedToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const setAddedToast = (type: ToastType, message: string, duration: number = 3000) => {
    const toast: Toast = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      message,
      type,
      duration,
      createdAt: Date.now(),
    }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        setRemovedToast(toast.id)
      }, duration)
    }
  }

  const setClearAllToasts = () => {
    toasts.value = []
  }

  const showInfo = (message: string, duration: number = 3000) => setAddedToast('info', message, duration)
  const showWarning = (message: string, duration: number = 3000) => setAddedToast('warning', message, duration)
  const showError = (message: string, duration: number = 3000) => setAddedToast('error', message, duration)
  const showSuccess = (message: string, duration: number = 3000) => setAddedToast('success', message, duration)

  return {
    // STATE
    toasts,
    // SETTERS
    setAddedToast,
    setRemovedToast,
    setClearAllToasts,
    // ACTIONS
    showInfo,
    showWarning,
    showError,
    showSuccess,
  }
})
