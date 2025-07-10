import type { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isUserLoggedIn = computed(() => user.value !== null)

  return { user, isUserLoggedIn }
})

export default useAuthStore
