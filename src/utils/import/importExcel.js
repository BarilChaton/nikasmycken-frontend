import * as XLSX from "xlsx"
import { importInventory } from "./importInventory"
import { validateExcel } from "./validators/validateExcel"


export const importExcel = async (file, userId) => {

  try {
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: "array" })

    validateExcel(workbook)

    const inventorySheet = workbook.Sheets["Inventory"]
    const excelItems = XLSX.utils.sheet_to_json(inventorySheet)

    const items =
      excelItems.map(item => ({
        inventoryId: item.InventoryID,
        title: item.Title,
        category: item.Category,
        subcategory: item.Subcategory || null,
        purchasePrice: Number(item.PurchasePrice) || 0,
        listingPrice: Number(item.ListingPrice) || 0,
        amount: Number(item.Amount) || 0,
        amountSold: Number(item.AmountSold) || 0,
        status: item.Status || "Unlisted"
      }))

    const categorySheet = workbook.Sheets["Categories"]
    const categoryRows = XLSX.utils.sheet_to_json(categorySheet)
    const categories = []

    categoryRows.forEach(row => {
      if (!row.Category) return

      let category = categories.find(c => c.name === row.Category)

      if (!category) {
        category = {
          name: row.Category,
          subcategories: []
        }

        categories.push(category)
      }

      if (row.Subcategory && !category.subcategories.some(s => s.name === row.Subcategory)) {
        category.subcategories.push({ name: row.Subcategory })
      }
    })

    await importInventory({ version: 1, categories, items }, userId)
  } catch (error) {
    console.error("Excel import failed:", error)
    throw error
  }
}