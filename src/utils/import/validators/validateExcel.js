import * as XLSX from "xlsx"

export const validateExcel = (workbook) => {
  const requiredSheets = ["Inventory", "Categories"]


  for (const sheet of requiredSheets) {
    if (!workbook.Sheets[sheet]) {
      throw new Error(`Missing sheet: ${sheet}`)
    }
  }

  const inventory = XLSX.utils.sheet_to_json(workbook.Sheets.Inventory, { header: 1 })
  const headers = inventory[0]
  const requiredColumns = ["InventoryID", "Title", "Category", "Amount", "Status"]

  for (const column of requiredColumns) {
    if (!headers.includes(column)) {
      throw new Error(`Missing column: ${column}`)
    }
  }

  return true
}