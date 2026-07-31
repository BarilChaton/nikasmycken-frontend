import { useEffect, useState } from 'react'
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { useAuth } from './auth/AuthContext'
import Login from './components/Login'
import Home from './containers/home'
import Spinner from './components/spinner'
import Onboarding from './components/onboarding/onboarding'
import AppShell from './containers/appShell'

const App = () => {
  const [deletingAccount, setDeletingAccount] = useState(false)
  const { user, sanityUser, loading, completeOnboarding } = useAuth()

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lock({
        orientation: 'portrait'
      })
    }

    lockOrientation()
  }, [])

  if (loading) {
    return (
      <AppShell>
        <Spinner />
      </AppShell>
    )
  }

  if (!user) {
    return (
      <AppShell>
        <Login />
      </AppShell>
    )
  }

  if (!sanityUser.onboardingCompleted) {
    return (
      <AppShell>
        <Onboarding user={sanityUser} completeOnboarding={completeOnboarding} />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <Home user={user} deletingAccount={deletingAccount} setDeletingAccount={setDeletingAccount} />

      {deletingAccount && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Spinner message="Deleting account..." />
        </div>
      )}
    </AppShell>
  )
}

export default App
