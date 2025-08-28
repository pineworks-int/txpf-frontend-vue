import { computed } from 'vue'
import supabase from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

export default function useAuth() {
  const authStore = useAuthStore()

  const logIn = async (email: string, password: string) => {
    authStore.isUserLoading = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    authStore.user = data.user
    console.warn('[useAuth] User successfully logged in')
  }

  const logOut = async () => {
    authStore.isUserLoading = true
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }

    authStore.user = null
    console.warn('[useAuth] User successfully logged out')
  }

  const listenForAuthState = () => {
    supabase.auth.onAuthStateChange((_event, session) => {
      authStore.user = session?.user ?? null
      authStore.isUserLoading = false
    })
  }

  const userType = computed(() => {
    if (!authStore.user) {
      return 'unknownUser'
    }
    else if (authStore.user.id === import.meta.env.VITE_SUPABASE_MAINUSER_ID) {
      return 'mainUser'
    }
    else {
      return 'guestUser'
    }
  })

  const userDisplayName = computed(() => {
    switch (userType.value) {
      case 'mainUser': return 'admin'
      case 'guestUser': return 'guest'
      case 'unknownUser': return 'unknown'
      default: return 'unknown'
    }
  })

  const avatarRole = computed(() => {
    switch (userType.value) {
      case 'mainUser': return 'admin'
      case 'guestUser': return 'guest'
      default: return null
    }
  })

  return {
    logIn,
    logOut,
    listenForAuthState,
    userType,
    userDisplayName,
    avatarRole,
  }
}
