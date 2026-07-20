import { client } from "../../client"

export const exportInventory = async (userId) => {
  try {
    const data = await client.fetch(
      `
      {
        "categories": *[
          _type == "category" &&
          ownerId == $userId
        ] | order(name asc),

        "items": *[
          _type == "inventoryItem" &&
          ownerId == $userId
        ] | order(_createdAt desc){
          _id,
          inventoryId,
          title,

          "category": category->name,

          "subcategory":
            category->subcategories[
              _key == ^.subcategoryKey
            ][0].name,

          subcategoryKey,

          purchasePrice,
          listingPrice,
          amount,
          amountSold,
          status,
          description,
          _createdAt
        }
      }
      `, { userId }
    )

    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      ...data
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}