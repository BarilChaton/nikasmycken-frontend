import { useState } from 'react'
import { FiCopy, FiTrash2, FiX } from 'react-icons/fi'
import { copyItems } from '../utils/copyItems'
import { deleteItems } from '../utils/deleteItems'

const SelectionBar = (props) => {
  const { selectedItems, setSelectedItems, setSelectionMode, user, setRefresh, copying, setCopying } = props

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const cancelSelection = () => {
    setSelectedItems([])
    setSelectionMode(false)
  }

  const handleCopy = async () => {
    if (copying) return
    try {
      setCopying(true)
      await copyItems(selectedItems, user.uid)

      setRefresh((prev) => !prev)
      setSelectedItems([])
      setSelectionMode(false)
    } catch (error) {
      console.error(error)
    } finally {
      setCopying(false)
    }
  }

  const handleDelete = async () => {
    if (copying) return

    try {
      setCopying(true)

      await deleteItems(selectedItems)

      setRefresh((prev) => !prev)
      setSelectedItems([])
      setSelectionMode(false)
    } catch (error) {
      console.error(error)
    } finally {
      setCopying(false)
      setShowDeleteConfirm(false)
    }
  }

  if (copying) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="rounded-2xl bg-white p-6 text-center text-sky-800 shadow-xl">
          <p className="text-lg font-bold">Copying {selectedItems.length} items...</p>
          <p className="mt-2 text-sm">Please wait</p>
        </div>
      </div>
    )
  }

  if (showDeleteConfirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="rounded-2xl bg-white p-6 text-center text-sky-800 shadow-xl">
          <h2 className="text-lg font-bold">Delete {selectedItems.length} items?</h2>

          <p className="mt-2 text-sm">This action cannot be undone.</p>

          <div className="mt-5 flex gap-3">
            <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 rounded-xl bg-gray-200 py-2 font-semibold">
              Cancel
            </button>

            <button onClick={handleDelete} className="flex-1 rounded-xl bg-red-500 py-2 font-semibold text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-20 left-5 right-5 z-50 flex flex-col gap-3 rounded-2xl bg-white p-4 text-sky-800 shadow-xl">
      <p className="font-bold">{selectedItems.length} selected</p>

      <div className="flex flex-wrap justify-end gap-2">
        <button
          onClick={handleCopy}
          disabled={copying}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold ${
            copying ? 'cursor-not-allowed bg-sky-100/50' : 'bg-sky-100'
          }`}>
          <FiCopy />
          {copying ? 'Copying...' : 'Copy'}
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          disabled={copying}
          className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 font-semibold text-white">
          <FiTrash2 />
          Delete
        </button>
        <button onClick={cancelSelection} className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 font-semibold text-red-600">
          <FiX />
          Cancel
        </button>
      </div>
    </div>
  )
}

export default SelectionBar
