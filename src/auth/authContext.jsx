/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { client } from '../client'
import { getOrCreateUser } from '../utils/getOrCreateUser'
import { needsLegalUpdate } from '../utils/checkLegalAcceptance'
import { acceptLegalDocuments } from '../utils/acceptLegalDocuments'

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [sanityUser, setSanityUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const [requiresLegalUpdate, setRequiresLegalUpdate] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const sanityUser = await getOrCreateUser(currentUser)
          setRequiresLegalUpdate(needsLegalUpdate(sanityUser))

          setUser(currentUser)
          setSanityUser(sanityUser)
        } else {
          setUser(null)
          setSanityUser(null)
          setRequiresLegalUpdate(false)
        }
      } catch (error) {
        console.error('Failed loading user:', error)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const completeOnboarding = async () => {
    if (!sanityUser) return

    const updatedUser = await client
      .patch(sanityUser._id)
      .set({
        onboardingCompleted: true
      })
      .commit()

    setSanityUser(updatedUser)
  }

  const acceptLegalUpdate = async () => {
    if (!sanityUser) return

    const updatedUser = await acceptLegalDocuments(sanityUser._id)

    setSanityUser(updatedUser)
    setRequiresLegalUpdate(false)
  }

  return (
    <AuthContext.Provider
      value={{ user, sanityUser, loading, completeOnboarding, requiresLegalUpdate, acceptLegalUpdate }}
      className="lightModePrimaryBg">
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
