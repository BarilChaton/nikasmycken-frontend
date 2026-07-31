import { motion } from 'framer-motion'
import { FaBoxOpen } from 'react-icons/fa'

const WelcomeStep = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full max-w-sm flex-col items-center rounded-3xl bg-white/10 p-8 text-center backdrop-blur">
      <motion.div
        animate={{
          y: [0, -8, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
        className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 shadow-lg backdrop-blur-sm text-white">
        <FaBoxOpen size={60} />
      </motion.div>

      <h1 className="mb-3 text-3xl font-bold text-white">Welcome to Inventlify</h1>

      <p className="mb-8 text-white/70">Let's set up your inventory and personalize your experience.</p>

      <button onClick={onNext} className="rounded-xl bg-white px-8 py-3 font-bold text-sky-800">
        Let's get started
      </button>
    </motion.div>
  )
}

export default WelcomeStep
