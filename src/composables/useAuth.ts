import supabase from '../lib/supabase'
import { useAuthStore } from '../stores/auth'

export default function useAuth() {
  const authStore = useAuthStore()

  const logIn = async (email: string, password: string) => {
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
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }

    authStore.user = null
    console.warn('[useAuth] User successfully logged out')
  }

  // const signUp = async (email: string, password: string) => {
  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //   })

  //   if (error) {
  //     throw error
  //   }
  // }

  const listenForAuthState = () => {
    supabase.auth.onAuthStateChange((_event, session) => {
      authStore.user = session?.user ?? null
    })
  }

  return { logIn, logOut, listenForAuthState }
}
