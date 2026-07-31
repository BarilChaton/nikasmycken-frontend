import { client } from '../client'

export const getOrCreateUser = async (firebaseUser) => {
  if (!firebaseUser) return

  const existingUser = await client.fetch(
    `*[_type == "user" && uid == $uid][0]`,
    {
      uid: firebaseUser.uid
    }
  )

  if (existingUser) {
    return existingUser
  }


  const itemCount = await client.fetch(
    `count(*[_type == "inventoryItem" && ownerId == $uid])`,
    {
      uid: firebaseUser.uid
    }
  )

  const categoryCount = await client.fetch(
    `count(*[_type == "category" && ownerId == $uid])`,
    {
      uid: firebaseUser.uid
    }
  )


  const onboardingCompleted = itemCount > 0 || categoryCount > 0


  const newUser = await client.create({
    _type: 'user',
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    photoURL: firebaseUser.photoURL || '',
    onboardingCompleted,
    createdAt: new Date().toISOString()
  })

  return newUser
}