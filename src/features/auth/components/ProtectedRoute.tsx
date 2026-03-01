import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '@/features/auth/store/auth.store'

/**
 * Wraps protected routes.
 * Redirects unauthenticated users to /login?returnTo=<current path>.
 * After login the user is redirected back (handled by useLogin hook).
 *
 * Usage in router.tsx:
 *   { element: <ProtectedRoute />, children: [...] }
 */
export function ProtectedRoute() {
  const { accessToken } = useAuthStore()
  const location = useLocation()

  if (!accessToken) {
    const returnTo = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?returnTo=${returnTo}`} replace />
  }

  return <Outlet />
}
