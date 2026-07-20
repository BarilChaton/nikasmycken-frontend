import { exportInventory } from "./exportInventory"
import { saveFile } from "./saveFile"

export const exportJson = async (userId) => {
  const data = await exportInventory(userId)

  const json = JSON.stringify(data, null, 2)

  const encoder = new TextEncoder()

  await saveFile(
    `inventory-${new Date().toISOString().slice(0, 10)}.json`,
    "application/json",
    encoder.encode(json)
  )
}