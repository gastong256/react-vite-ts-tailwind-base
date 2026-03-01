import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/features/auth/store/auth.store'

export function LoginPage() {
  const { accessToken } = useAuthStore()
  const navigate = useNavigate()

  // Redirect already-authenticated users away from the login page
  useEffect(() => {
    if (accessToken) {
      void navigate('/', { replace: true })
    }
  }, [accessToken, navigate])

  if (accessToken) return null

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
          </div>

          <LoginForm />

          {/* Mock hint */}
          {import.meta.env.VITE_USE_MOCK_API === 'true' && (
            <p className="mt-6 rounded-md bg-blue-50 px-3 py-2 text-center text-xs text-blue-600">
              Mock mode — use{' '}
              <strong className="font-medium">user@example.com</strong> /{' '}
              <strong className="font-medium">password</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
