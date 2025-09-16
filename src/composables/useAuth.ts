import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { validateToken } from '@/lib/auth-backend'
import supabase from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

export default function useAuth() {
  const authStore = useAuthStore()
  const ui = useUiStore()
  const router = useRouter()

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

  // Roles: admin if email is "admin@nspace.link", otherwise guest
  const userType = computed(() => {
    if (!authStore.user) {
      return 'unknownUser'
    }
    return authStore.user.email === 'admin@nspace.link' ? 'mainUser' : 'guestUser'
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

  const getAccessToken = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) {
      return null
    }
    return session.access_token
  }

  // Pre-validate via backend; open blank tab first to avoid popup blockers
  const openDemo = async (demoUrl: string) => {
    // If not authenticated, redirect to login and show toast there
    if (!authStore.isUserLoggedIn) {
      await router.push({ name: 'login', query: { reason: 'auth-required' } })
      return
    }

    // Open a blank tab immediately (same tick as click) to avoid popup blockers
    const newTab = window.open('', '_blank')

    // Show the auth verification spinner
    ui.setAuthVerificationLoading(true)

    try {
      const token = await getAccessToken()
      if (!token) {
        throw new Error('No access token')
      }

      // Validate with backend
      const result = await validateToken(token)
      if (!result.valid) {
        throw new Error('Invalid token')
      }

      // Success → navigate the new tab to the demo with token
      if (newTab) {
        newTab.location.href = `${demoUrl}?token=${encodeURIComponent(token)}`
      }
    }
    catch (e) {
      console.error('[useAuth] Error opening demo:', e)
      // On failure → close the new tab (if it exists) and redirect to login with reason
      if (newTab) {
        try {
          newTab.close()
        }
        catch {}
      }
      await router.push({ name: 'login', query: { reason: 'auth-required' } })
    }
    finally {
      ui.setAuthVerificationLoading(false)
    }
  }

  return {
    logIn,
    logOut,
    listenForAuthState,
    userType,
    userDisplayName,
    avatarRole,
    openDemo,
    getAccessToken,
  }
}
