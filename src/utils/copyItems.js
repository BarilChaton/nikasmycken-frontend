import { client } from '../client'
import { v4 as uuidv4 } from 'uuid'

export const copyItems = async (items, userId) => {
  try {
    const copiedItems = items.map((item) => ({
      _type: 'inventoryItem',
      inventoryId: uuidv4(),
      title: `${item.title} Copy`,
      category: {
        _type: 'reference',
        _ref: item.category._id
      },
      subcategoryKey: item.subcategoryKey,
      purchasePrice: item.purchasePrice || 0,
      listingPrice: item.listingPrice || 0,
      status: item.status,
      amount: item.amount || 1,
      amountSold: 0,
      ownerId: userId,
      photos: item.photos?.map((photo) => ({
        _key: uuidv4(),
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: photo.asset._id
        }
      })) || []
    }))

    const transaction = client.transaction()

    copiedItems.forEach((item) => {
      transaction.create(item)
    })

    await transaction.commit()

    return true
  } catch (error) {
    console.error('Copy items failed:', error)
    throw error
  }
}