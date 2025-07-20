export interface AuthService {
  checkAuthStatus: () => Promise<boolean>
  getAuthToken: () => Promise<string | null>
  isAuthenticated: () => boolean
}
