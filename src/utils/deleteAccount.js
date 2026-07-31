import { client } from '../client'
import { deleteUser } from 'firebase/auth'
import { googleReauthenticate } from '../utils/googleReauthenticate'
import { auth } from '../firebase'

export const deleteAccount = async (user) => {
  try {
    await googleReauthenticate(user)
    const userId = user.uid
    /*
    ==============================
    Get user's data
    ==============================
    */

    const items = await client.fetch(
      `*[_type == "inventoryItem" && ownerId == $userId]{
          _id,
          photos[]{
            "assetId": asset->_id
          }
        }`,
      {
        userId
      }
    )

    const assets = items.flatMap((item) =>
      item.photos?.map((photo) => photo.assetId) || []
    )

    const categories = await client.fetch(
      `*[_type == "category" && ownerId == $userId]._id`,
      {
        userId
      }
    )

    const sanityUser = await client.fetch(
      `*[_type == "user" && uid == $userId][0]._id`,
      {
        userId
      }
    )

    const transaction = client.transaction()

    items.forEach((item) => {
      transaction.delete(item._id)
    })

    categories.forEach((categoryId) => {
      transaction.delete(categoryId)
    })

    if (sanityUser) {
      transaction.delete(sanityUser)
    }

    await transaction.commit()

    await Promise.all(
      assets.map((assetId) => client.delete(assetId))
    )

    /*
    ==============================
    Delete Firebase account
    ==============================
    */

    try {
      await deleteUser(user)
      await auth.signOut()
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        throw new Error('RECENT_LOGIN_REQUIRED', error)
      }

      throw error
    }

    return true

  } catch (error) {
    console.error('Account deletion failed:', error)
    throw error
  }
}