import { client } from '../client'
import { TERMS_VERSION } from '../data/legal/legalVersions'

export const acceptTerms = async (userId) => {
  return await client
    .patch(userId)
    .set({
      termsVersion: TERMS_VERSION,
      termsAcceptedAt: new Date().toISOString()
    })
    .commit()
}