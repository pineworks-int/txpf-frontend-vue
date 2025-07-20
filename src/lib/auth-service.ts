import type { AuthService } from '@/types/auth.type'
import { useAuthStore } from '@/stores/auth'
import supabase from './supabase'

export class SupabaseAuthService implements AuthService {
  private authStore = useAuthStore()

  async checkAuthStatus(): Promise<boolean> {
    // Now => just return the current state
    // Later => make an API call to centralized service
    return this.authStore.isUserLoggedIn
  }

  async getAuthToken(): Promise<string | null> {
    // Now => get supabase token
    // Later => get token from centralized service
    // Get token from Supabase session
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token || null
  }

  isAuthenticated(): boolean {
    return this.authStore.isUserLoggedIn
  }
}
