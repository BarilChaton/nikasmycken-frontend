import { client } from "../../client"
import { v4 as uuidv4 } from "uuid"


export const importInventory = async (data, userId) => {
  try {

    /*
    ==============================
    Import categories
    ==============================
    */

    const categoryMap = {}
    for (const category of data.categories || []) {
      const createdCategory = await client.create({
        _type: "category",
        name: category.name,
        ownerId: userId,
        subcategories: category.subcategories?.map(sub => ({
          _key: uuidv4(),
          name: sub.name
        })) || []
      })


      categoryMap[category.name] = createdCategory._id
    }

    /*
    ==============================
    Import items
    ==============================
    */

    for (const item of data.items || []) {
      await client.create({
        _type: "inventoryItem",

        inventoryId:
          item.inventoryId || uuidv4(),

        title: item.title,

        category:
          item.category,

        subcategory:
          item.subcategory,

        purchasePrice:
          item.purchasePrice || 0,

        listingPrice:
          item.listingPrice || 0,

        amount:
          item.amount || 1,

        status:
          item.status || "Available",

        description:
          item.description || "",

        ownerId: userId
      })
    }

    return true

  } catch (error) {
    console.error("Inventory import failed:", error)
    throw error
  }
}