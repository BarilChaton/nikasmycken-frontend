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

      const existingCategory = await client.fetch(
        `*[_type == "category" && name == $name && ownerId == $userId][0]`,
        {
          name: category.name,
          userId
        }
      )

      let categoryId

      if (existingCategory) {
        categoryId = existingCategory._id

        const existingSubcategories = existingCategory.subcategories || []

        const newSubcategories = (category.subcategories || [])
          .filter(sub => !existingSubcategories.some(existing => existing.name === sub.name))
          .map(sub => ({
            _key: uuidv4(),
            name: sub.name
          }))

        if (newSubcategories.length > 0) {
          await client
            .patch(categoryId)
            .append('subcategories', newSubcategories)
            .commit()
        }

      } else {
        const createdCategory = await client.create({
          _type: "category",
          name: category.name,
          ownerId: userId,
          subcategories: category.subcategories?.map(sub => ({
            _key: uuidv4(),
            name: sub.name
          })) || []
        })

        categoryId = createdCategory._id
      }

      categoryMap[category.name] = categoryId
    }


    /*
    ==============================
    Import items
    ==============================
    */

    for (const item of data.items || []) {
      const existingItem = await client.fetch(
        `*[_type == "inventoryItem" && inventoryId == $inventoryId && ownerId == $userId][0]`,
        {
          inventoryId: item.inventoryId,
          userId
        }
      )

      if (existingItem) {
        continue
      }

      await client.create({
        _type: "inventoryItem",

        inventoryId:
          item.inventoryId || uuidv4(),

        title:
          item.title,

        category: item.category
          ? {
            _type: "reference",
            _ref: categoryMap[item.category]
          }
          : undefined,

        subcategoryKey:
          item.subcategoryKey || "",

        purchasePrice:
          item.purchasePrice || 0,

        listingPrice:
          item.listingPrice || 0,

        amount:
          item.amount || 1,

        amountSold:
          item.amountSold || 0,

        status:
          item.status || "Unlisted",

        ownerId:
          userId
      })
    }

    return true

  } catch (error) {
    console.error("Inventory import failed:", error)
    throw error
  }
}