import type { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isUserLoading = ref(true)
  const isUserLoggedIn = computed(() => user.value !== null)

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  const clearUser = () => {
    user.value = null
  }

  return { user, isUserLoading, isUserLoggedIn, setUser, clearUser }
})
