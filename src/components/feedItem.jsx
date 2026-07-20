import { FaBoxes, FaCoins } from 'react-icons/fa'

const STATUS_COLORS = {
  Listed: 'bg-emerald-500',
  Unlisted: 'bg-amber-500',
  Sold: 'bg-red-500'
}

const FeedItem = ({ item, setCurrentPage, setSelectedItem }) => {
  const status = item.status === 'Sold out' ? 'Sold' : item.status
  const categoryName = item.category?.name || 'No category'
  const subcategoryName = item.category?.subcategories?.find((sub) => sub._key === item.subcategoryKey)?.name

  return (
    <div
      onClick={() => {
        setSelectedItem(item)
        setCurrentPage('details')
      }}
      className="cursor-pointer flex gap-2 rounded-2xl bg-white/10 p-2 shadow-md text-white">
      <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover" />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{item.title}</h2>

          <div className="flex flex-row justify-between">
            <div className="text-sm">
              <p>
                Category: <span className="font-bold">{categoryName}</span>
              </p>

              {subcategoryName && <p className="text-xs text-white/60">{subcategoryName}</p>}
            </div>

            <div className="flex flex-row gap-1">
              <p>Status:</p>
              <span className={`rounded-full px-2 py-1 text-xs ${STATUS_COLORS[status]}`}>{item.status}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-1 justify-between text-sm">
            <FaCoins />
            <p>Price: </p>
            <span className="font-semibold">{item.listingPrice} kr</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <FaBoxes />
            <span>Qty: {item.amount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedItem
