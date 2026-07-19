import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaBoxOpen } from "react-icons/fa"
import { Capacitor } from "@capacitor/core"
import { googleLogin } from "../auth/googleLogin"
import { googleWebLogin } from "../auth/googleWebLogin"

const Login = () => {
  const [loading, setLoading] = useState(false)

  const login = async () => {
    try {
      setLoading(true)

      if (Capacitor.isNativePlatform()) {
        await googleLogin()
      } else {
        await googleWebLogin()
      }

    } catch (error) {
      console.error("Login failed:", error)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-dvh flex-col items-center justify-center px-6 lightModePrimaryBg text-white">

      {/* Logo */}
      <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 shadow-lg backdrop-blur-sm">
        <FaBoxOpen className="text-white" size={60}/>
      </div>

      {/* App title */}
      <h1 className="text-4xl font-bold tracking-tight">Orvara</h1>

      {/* Description */}
      <p className="mt-3 max-w-xs text-center text-white/70">
        Organize. Track. Sell.
      </p>

      {/* Login button */}
      <button
        onClick={login}
        disabled={loading}
        className="mt-10 flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-white py-4 font-semibold text-gray-700 shadow-lg transition active:scale-95 disabled:opacity-50"
      >
        <FcGoogle size={24} />
        {loading ? "Signing in..." : "Continue with Google"}
      </button>

      {/* Footer text */}
      <p className="mt-8 max-w-xs text-center text-xs text-white/40">
        Your inventory is securely stored
        and synced with your account.
      </p>
    </div>
  )
}

export default Login