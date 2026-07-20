import { useEffect, useState } from 'react'
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi'
import { client } from '../../client'
import { itemDetailsQuery } from '../../utils/queries'
import ImageGallery from './imageGallery'
import InfoCard from './infoCard'
import PriceCard from './priceCard'

const ItemDetails = ({ item, setCurrentPage, setSelectedItem, user }) => {
  const [details, setDetails] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await client.fetch(itemDetailsQuery(item._id))

        setDetails(data)
      } catch (error) {
        console.error('Failed fetching item details:', error)
      }
    }

    if (item) {
      fetchItem()
    }
  }, [item])

  if (!item) {
    return <div className="flex h-full items-center justify-center text-white">No item selected</div>
  }

  const deleteItem = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${item.title}"?`)
    if (!confirmed) return

    try {
      setDeleting(true)
      await client.delete(item._id)
      setCurrentPage('home')
    } catch (error) {
      console.error('Failed to delete item: ', error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      {/* Header */}
      <div className="mb-5 flex items-center gap-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20">
          <FiArrowLeft size={22} />
        </button>

        <h1 className="text-2xl font-bold text-white">{details?.title || item.title}</h1>
      </div>

      {/* Image Gallery */}
      {details && <ImageGallery item={details} />}

      {/* Information */}
      <div className="mt-5">{details && <InfoCard item={details} />}</div>

      {/* Prices */}
      <div className="mt-5">{details && <PriceCard item={details} />}</div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => {
            setSelectedItem(details)
            setCurrentPage('edit')
          }}
          className="rounded-xl bg-white py-3 font-bold text-sky-800">
          Edit Item
        </button>
        <button
          onClick={deleteItem}
          disabled={deleting}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-bold text-white disabled:opacity-50">
          <FiTrash2 />
          {deleting ? 'Deleting...' : 'Delete Item'}
        </button>
      </div>
    </div>
  )
}

export default ItemDetails
