const TopItems = ({ items, setCurrentPage, setSelectedItem }) => {
  const topItems = [...items]
    .map((item) => ({
      ...item,
      totalValue: (item.listingPrice || 0) * (item.amount || 0)
    }))
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 5)

  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <div className="space-y-4">
        {topItems.map((item, index) => (
          <button
            key={item._id}
            onClick={() => {
              setSelectedItem(item)
              setCurrentPage('details')
            }}
            className="flex w-full select-none items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500 font-bold text-white">
              {index + 1}
            </div>
            <img src={item.image} alt={item.title} className="h-14 w-14 rounded-lg object-cover" />

            <div className="min-w-0 flex-1 overflow-hidden">
              <h3 className="truncate font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-sky-100">{item.category.name}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-white">{item.totalValue.toLocaleString()} kr</p>
              <p className="text-xs text-sky-100">{item.amount} pcs</p>
            </div>
          </button>
        ))}

        {topItems.length === 0 && <p className="text-center text-white/70">No items available.</p>}
      </div>
    </div>
  )
}

export default TopItems
