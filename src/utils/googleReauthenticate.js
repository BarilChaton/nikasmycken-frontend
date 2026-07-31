import {
  GoogleAuthProvider,
  reauthenticateWithCredential,
  signInWithPopup
} from 'firebase/auth'

import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in'
import { auth } from '../firebase'


export const googleReauthenticate = async (user) => {
  let credential

  const platform = window.Capacitor?.getPlatform()

  console.log('Platform:', platform)

  if (platform === 'android' || platform === 'ios') {

    const result = await GoogleSignIn.signIn()

    credential = GoogleAuthProvider.credential(
      result.idToken
    )

  } else {

    const provider = new GoogleAuthProvider()

    const result = await signInWithPopup(
      auth,
      provider
    )

    credential = GoogleAuthProvider.credentialFromResult(result)
  }

  await reauthenticateWithCredential(
    user,
    credential
  )
}