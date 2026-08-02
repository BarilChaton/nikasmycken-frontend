import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiShield } from 'react-icons/fi'
import { client } from '../../client'
import { privacyPolicy } from '../../data/legal/privacyPolicy.js'
import { PRIVACY_VERSION } from '../../data/legal/legalVersions'

const PrivacyStep = ({ user, onNext, disabled }) => {
  const [accepted, setAccepted] = useState(false)
  const [saving, setSaving] = useState(false)

  const acceptPrivacy = async () => {
    try {
      setSaving(true)

      await client
        .patch(user._id)
        .set({
          privacyAccepted: true,
          privacyAcceptedAt: new Date().toISOString(),
          privacyVersion: PRIVACY_VERSION
        })
        .commit()

      onNext()
    } catch (error) {
      console.error('Failed saving privacy acceptance:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm rounded-3xl bg-white/10 p-8 text-center backdrop-blur">
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white">
          <FiShield size={40} />
        </div>
      </div>

      <h1 className="mb-3 text-2xl font-bold text-white">{privacyPolicy.title}</h1>

      <p className="mb-5 text-sm text-white/70">Please review how Inventlify handles your information.</p>

      <div className="mb-5 max-h-48 overflow-y-auto rounded-xl bg-black/20 p-4 text-left text-sm text-white/70">
        {privacyPolicy.sections.map((section, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <h2 className="mb-1 font-semibold text-white">{section.title}</h2>

            <p>{section.text}</p>
          </div>
        ))}
      </div>

      <label className="mb-6 flex cursor-pointer items-start gap-3 text-left text-sm text-white/80">
        <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 h-4 w-4" />

        <span>I have read and agree to the Inventlify Privacy Policy.</span>
      </label>

      <button
        disabled={!accepted || saving || disabled}
        onClick={acceptPrivacy}
        className={`w-full rounded-xl py-3 font-bold transition ${
          accepted && !saving ? 'bg-white text-sky-800 active:scale-95' : 'cursor-not-allowed bg-white/30 text-white/50'
        }`}>
        {saving ? 'Saving...' : 'Continue'}
      </button>
    </motion.div>
  )
}

export default PrivacyStep
