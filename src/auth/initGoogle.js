import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in'

export const initGoogle = async () => {
  try {
    await GoogleSignIn.initialize({
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
    })
  } catch (error) {
    console.error(
      "Google Sign-In initialization failed:",
      error
    )
  }
}