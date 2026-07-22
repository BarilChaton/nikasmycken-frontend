import { client } from '../client'

export const reorderItems = async (items) => {
  const transaction = client.transaction()

  items.forEach((item, index) => {
    transaction.patch(item._id, {
      set: {
        sortOrder: index
      }
    })
  })

  await transaction.commit()
}