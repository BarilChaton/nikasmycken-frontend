import { FiArrowLeft } from 'react-icons/fi'
import ImageGallery from './imageGallery'
import InfoCard from './infoCard'
import PriceCard from './priceCard'

const ItemDetails = ({ item, setCurrentPage }) => {
  if (!item) {
    return (
      <div className='flex h-full items-center justify-center text-white'>
        No item selected
      </div>
    )
  }

  return (
    <div className='h-full overflow-y-auto px-5 py-4 pb-24'>
      {/* Header */}
      <div className='mb-5 flex items-center gap-4'>
        <button
          onClick={() => setCurrentPage('home')}
          className='rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20'
        >
          <FiArrowLeft size={22}/>
        </button>

        <h1 className='text-2xl font-bold text-white'>{item.title}</h1>
      </div>

      {/* Image Gallery */}
      <ImageGallery item={item}/>

      {/* Information */}
      <div className="mt-5">
        <InfoCard item={item} />
      </div>

      {/* Prices */}
      <div className="mt-5">
        <PriceCard item={item} />
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3">
        <button className="rounded-xl bg-white py-3 font-bold text-sky-800">Edit Item</button>
        <button className="rounded-xl bg-red-500 py-3 font-bold text-white">Delete Item</button>
      </div>
    </div>
  )
}

export default ItemDetails