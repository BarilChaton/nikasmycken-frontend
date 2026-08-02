import { motion } from 'framer-motion'
import { FiArrowLeft, FiShield, FiFileText } from 'react-icons/fi'
import { TERMS_VERSION, PRIVACY_VERSION } from '../../../data/legal/legalVersions'
import { APP_VERSION } from '../../../config/app'

const AboutApp = ({ setCurrentPage }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full overflow-y-auto flex-col px-5 py-6 pb-24 text-white">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => setCurrentPage('settings')} className="rounded-full bg-white/10 p-3">
          <FiArrowLeft size={22} />
        </button>

        <h1 className="text-2xl font-bold">About Catalogify</h1>
      </div>

      {/* About text */}
      <div className="rounded-3xl bg-white/10 p-5 backdrop-blur">
        <h2 className="mb-3 text-xl font-bold">Catalogify</h2>

        <p className="text-sm leading-relaxed text-white/70">
          Catalogify was created to make inventory management simple, accessible, and organized.
          <br />
          <br />
          From personal collections to small businesses, Catalogify helps you create structured catalogs of your items, track important
          details, and always know what you have available.
          <br />
          <br />
          With an intuitive design and powerful organization tools, Catalogify gives you a clearer view of your inventory so you can spend
          less time searching and more time managing what matters.
        </p>
      </div>

      {/* Legal Buttons */}
      <div className="mt-5 space-y-3">
        <button onClick={() => setCurrentPage('terms')} className="flex w-full items-center gap-4 rounded-2xl bg-white/10 p-4">
          <FiFileText size={22} />
          <div className="text-left">
            <p className="font-semibold">Terms of Service</p>
            <p className="text-sm text-white/60">Version {TERMS_VERSION}</p>
          </div>
        </button>

        <button onClick={() => setCurrentPage('privacy')} className="flex w-full items-center gap-4 rounded-2xl bg-white/10 p-4">
          <FiShield size={22} />
          <div className="text-left">
            <p className="font-semibold">Privacy Policy</p>
            <p className="text-sm text-white/60">Version {PRIVACY_VERSION}</p>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10 text-center text-sm text-white/50">
        <p className="font-semibold text-white/70">Catalogify</p>

        <p>Version {APP_VERSION}</p>

        <p className="mt-2">Made with ❤️ in Sweden</p>

        <p className="mt-2">© {new Date().getFullYear()} Catalogify</p>
      </div>
    </motion.div>
  )
}

export default AboutApp
