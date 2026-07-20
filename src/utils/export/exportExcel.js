import * as XLSX from "xlsx"
import { exportInventory } from "./exportInventory"
import { saveFile } from "./saveFile"

export const exportExcel = async (userId) => {
  try {
    const data = await exportInventory(userId)
    const workbook = XLSX.utils.book_new()

    /*
    ======================================
    Inventory Sheet
    ======================================
    */

    const inventoryRows = data.items.map(item => ({
      InventoryID: item.inventoryId,
      Title: item.title,
      Category: item.category,
      Subcategory: item.subcategory,
      PurchasePrice: item.purchasePrice,
      ListingPrice: item.listingPrice,
      Amount: item.amount,
      Status: item.status,
      Description: item.description,
      Created: item._createdAt
    }))

    const inventorySheet =
      XLSX.utils.json_to_sheet(inventoryRows)

    XLSX.utils.book_append_sheet(
      workbook,
      inventorySheet,
      "Inventory"
    )

    /*
    ======================================
    Categories Sheet
    ======================================
    */

    const categoryRows = []

    data.categories.forEach(category => {

      if (
        category.subcategories &&
        category.subcategories.length
      ) {

        category.subcategories.forEach(sub => {

          categoryRows.push({
            Category: category.name,
            Subcategory: sub.name
          })

        })

      } else {

        categoryRows.push({
          Category: category.name,
          Subcategory: ""
        })

      }

    })

    const categorySheet =
      XLSX.utils.json_to_sheet(categoryRows)

    XLSX.utils.book_append_sheet(
      workbook,
      categorySheet,
      "Categories"
    )

    /*
    ======================================
    Statistics Sheet
    ======================================
    */

    const listedItems =
      data.items.filter(i => i.status === "Listed")

    const soldItems =
      data.items.filter(i => i.status === "Sold")

    const totalInventoryValue =
      data.items.reduce(
        (sum, item) =>
          sum + ((item.purchasePrice || 0) * (item.amount || 1)),
        0
      )

    const totalListingValue =
      data.items.reduce(
        (sum, item) =>
          sum + ((item.listingPrice || 0) * (item.amount || 1)),
        0
      )

    const statisticsRows = [
      {
        Metric: "Total Items",
        Value: data.items.length
      },
      {
        Metric: "Listed Items",
        Value: listedItems.length
      },
      {
        Metric: "Sold Items",
        Value: soldItems.length
      },
      {
        Metric: "Categories",
        Value: data.categories.length
      },
      {
        Metric: "Inventory Value",
        Value: totalInventoryValue
      },
      {
        Metric: "Listing Value",
        Value: totalListingValue
      },
      {
        Metric: "Export Date",
        Value: new Date().toLocaleString()
      }
    ]

    const statisticsSheet =
      XLSX.utils.json_to_sheet(statisticsRows)

    XLSX.utils.book_append_sheet(
      workbook,
      statisticsSheet,
      "Statistics"
    )

    /*
    ======================================
    Save workbook
    ======================================
    */

    const buffer =
      XLSX.write(
        workbook,
        {
          type: "array",
          bookType: "xlsx"
        }
      )

    await saveFile(
      `inventory-${new Date().toISOString().slice(0, 10)}.xlsx`,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      buffer
    )

  } catch (error) {
    console.error("Excel export failed:", error)
  }
}