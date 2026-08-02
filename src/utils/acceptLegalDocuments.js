import { client } from '../client'
import { TERMS_VERSION, PRIVACY_VERSION } from '../data/legal/legalVersions'

export const acceptLegalDocuments = async (userId) => {
  const updatedUser = await client
    .patch(userId)
    .set({
      termsVersion: TERMS_VERSION,
      termsAcceptedAt: new Date().toISOString(),

      privacyVersion: PRIVACY_VERSION,
      privacyAcceptedAt: new Date().toISOString()
    })
    .commit()

  return updatedUser
}