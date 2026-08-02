import { TERMS_VERSION, PRIVACY_VERSION } from '../data/legal/legalVersions'

export const needsLegalUpdate = (user) => {
  if (!user) return false
  const termsOutdated = user.termsVersion !== TERMS_VERSION
  const privacyOutdated = user.privacyVersion !== PRIVACY_VERSION
  return termsOutdated || privacyOutdated
}