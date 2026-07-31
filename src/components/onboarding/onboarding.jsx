import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WelcomeStep from './WelcomeStep'
import CategoryStep from './CategoryStep'
import LicenseStep from './LicenseStep'
import PrivacyStep from './PrivacyStep'
import CompletionStep from './CompletionStep'

const Onboarding = ({ user, completeOnboarding }) => {
  const [step, setStep] = useState(0)
  const [categories, setCategories] = useState([])

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const steps = [
    () => <WelcomeStep onNext={nextStep} />,
    () => <LicenseStep user={user} onNext={nextStep} />,
    () => <PrivacyStep user={user} onNext={nextStep} />,
    () => <CategoryStep user={user} categories={categories} setCategories={setCategories} onNext={nextStep} />,
    () => <CompletionStep completeOnboarding={completeOnboarding} categories={categories} />
  ]

  const CurrentStep = steps[step]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="flex h-dvh w-full items-center justify-center px-5 py-6">
        <CurrentStep />
      </motion.div>
    </AnimatePresence>
  )
}

export default Onboarding
