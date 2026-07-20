export const validateBackup = (data) => {
  if (!data) {
    throw new Error("Backup file is empty")
  }

  if (data.version !== 1) {
    throw new Error("Unsupported backup version")
  }

  if (!Array.isArray(data.categories)) {
    throw new Error("Invalid categories structure")
  }

  if (!Array.isArray(data.items)) {
    throw new Error("Invalid inventory structure")
  }

  // Validate categories
  for (const category of data.categories) {
    if (!category.name) {
      throw new Error("Category is missing name")
    }

    if (category.subcategories && !Array.isArray(category.subcategories)) {
      throw new Error("Invalid subcategories")
    }
  }

  // Validate items
  for (const item of data.items) {
    const required = ["title", "category"]
    for (const field of required) {
      if (!item[field]) {
        throw new Error(`Inventory item missing ${field}`)
      }
    }
  }

  return true
}