import { importInventory } from "./importInventory"
import { validateBackup } from "./validators/validateBackup"

export const importJson = async (file, userId) => {
  const text = await file.text()
  const data = JSON.parse(text)
  validateBackup(data)
  await importInventory(data, userId)
}