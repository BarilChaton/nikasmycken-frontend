import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../auth/AuthContext'
import { acceptTerms } from '../utils/acceptTerms'
import { acceptPrivacy } from '../utils/acceptPrivacy'
import { TERMS_VERSION, PRIVACY_VERSION } from '../data/legal/legalVersions'
import LicenseStep from './onboarding/licenseStep'
import PrivacyStep from './onboarding/privacyStep'
import Spinner from './spinner'

const LegalUpdate = () => {
  const { sanityUser, acceptLegalUpdate } = useAuth()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)

  const steps = []

  if (sanityUser.termsVersion !== TERMS_VERSION) {
    steps.push({
      type: 'terms',
      component: <LicenseStep user={sanityUser} onNext={handleNext} disabled={saving} />
    })
  }

  if (sanityUser.privacyVersion !== PRIVACY_VERSION) {
    steps.push({
      type: 'privacy',
      component: <PrivacyStep user={sanityUser} onNext={handleNext} disabled={saving} />
    })
  }

  async function handleNext() {
    if (saving) return

    const currentStep = steps[step]

    if (step === steps.length - 1) {
      try {
        setSaving(true)

        if (currentStep.type === 'terms') {
          await acceptTerms(sanityUser._id)
        }

        if (currentStep.type === 'privacy') {
          await acceptPrivacy(sanityUser._id)
        }

        await acceptLegalUpdate()
      } catch (error) {
        console.error('Failed saving legal acceptance:', error)
      } finally {
        setSaving(false)
      }

      return
    }

    if (currentStep.type === 'terms') {
      await acceptTerms(sanityUser._id)
    }

    if (currentStep.type === 'privacy') {
      await acceptPrivacy(sanityUser._id)
    }

    setStep((prev) => prev + 1)
  }

  if (steps.length === 0) {
    return null
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex h-dvh w-full items-center justify-center px-5 py-6">
          {steps[step].component}
        </motion.div>
      </AnimatePresence>

      {saving && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Spinner message="Saving legal agreements..." />
        </div>
      )}
    </>
  )
}

export default LegalUpdate
