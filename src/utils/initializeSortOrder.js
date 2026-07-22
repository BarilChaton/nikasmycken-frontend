import { client } from '../client'

export const initializeSortOrder = async (userId) => {
  const items = await client.fetch(
    `*[_type == "inventoryItem" && ownerId == $userId] | order(_createdAt asc) {
      _id
    }`,
    {
      userId
    }
  )

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