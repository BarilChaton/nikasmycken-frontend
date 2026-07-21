import { client } from '../client'

export const deleteItems = async (items) => {
  try {
    const transaction = client.transaction()

    items.forEach((item) => {
      transaction.delete(item._id)
    })

    await transaction.commit()

    return true
  } catch (error) {
    console.error('Delete items failed:', error)
    throw error
  }
}