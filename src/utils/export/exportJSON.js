import { exportInventory } from "./exportInventory"

export const exportJson = async (userId) => {
  const data = await exportInventory(userId)

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  )

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `inventory-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}