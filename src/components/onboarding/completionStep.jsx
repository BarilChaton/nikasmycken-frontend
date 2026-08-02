import { motion } from 'framer-motion'
import { FiCheckCircle, FiBox } from 'react-icons/fi'

const CompletionStep = ({ completeOnboarding, categories }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm rounded-3xl bg-white/10 p-8 text-center backdrop-blur">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="mb-6 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-white">
          <FiCheckCircle size={55} />
        </div>
      </motion.div>

      <h1 className="mb-3 text-2xl font-bold text-white">You are ready!</h1>

      <p className="mb-6 text-white/70">
        Your Inventorify workspace has been created. You can now start adding and managing your inventory.
      </p>

      {categories?.length > 0 && (
        <div className="mb-6 rounded-xl bg-black/20 p-4 text-left text-sm text-white/80">
          <div className="mb-2 flex items-center gap-2 font-semibold text-white">
            <FiBox />
            Your categories
          </div>

          <ul className="space-y-1">
            {categories.map((category, index) => (
              <li key={index}>• {category}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={completeOnboarding} className="w-full rounded-xl bg-white py-3 font-bold text-sky-800 transition active:scale-95">
        Start using Inventorify
      </button>
    </motion.div>
  )
}

export default CompletionStep
