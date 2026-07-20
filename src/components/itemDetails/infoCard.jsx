import { FaGem, FaBoxes, FaCheckCircle, FaBarcode, FaLayerGroup } from 'react-icons/fa'

const STATUS_COLORS = {
  Listed: 'bg-emerald-500',
  Unlisted: 'bg-amber-500',
  Sold: 'bg-gray-500'
}

const InfoCard = ({ item }) => {
  const status = item.status === 'Sold out' ? 'Sold' : item.status

  const categoryName = item.category?.name || 'No category'
  const subcategory = item.category?.subcategories?.find((sub) => sub._key === item.subcategoryKey)

  return (
    <div className="rounded-2xl bg-white/10 p-5 shadow-lg text-white">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold">{item.title}</h1>
        <div className="mt-2 flex items-center gap-2 text-sky-100">
          <FaGem />
          <span>{categoryName}</span>
        </div>
        {subcategory && (
          <div className="mt-2 flex items-center gap-2 text-sky-100">
            <FaLayerGroup />
            <span>{subcategory.name}</span>
          </div>
        )}
      </div>

      {/* Information rows */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaCheckCircle />
            <span>Status</span>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm ${STATUS_COLORS[status] || 'bg-gray-500'}`}>
            {item.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBoxes />
            <span>In storage</span>
          </div>
          <span className="font-bold">{item.amount}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBoxes />
            <span>Sold</span>
          </div>
          <span className="font-bold">{item.amountSold || 0}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-white/60">
          <div className="flex items-center gap-3">
            <FaBarcode />
            <span>ID</span>
          </div>
          <span className="truncate max-w-40">{item.inventoryId}</span>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
