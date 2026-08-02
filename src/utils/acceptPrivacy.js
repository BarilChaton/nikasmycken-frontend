import { client } from '../client'
import { PRIVACY_VERSION } from '../data/legal/legalVersions'

export const acceptPrivacy = async (userId) => {
  return await client
    .patch(userId)
    .set({
      privacyVersion: PRIVACY_VERSION,
      privacyAcceptedAt: new Date().toISOString()
    })
    .commit()
}