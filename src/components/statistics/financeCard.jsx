
const FinanceCard = ({ items }) => {
  const stats = items.reduce((totals, item) => {
    const purchasePrice = item.purchasePrice || 0
    const listingPrice = item.listingPrice || 0
    const amount = item.amount || 0
    const amountSold = item.amountSold || 0

    totals.investment += purchasePrice * (amount + amountSold)
    totals.inventoryValue += listingPrice * amount
    totals.revenue += listingPrice * amountSold
    totals.profit += (listingPrice - purchasePrice) * amountSold
    return totals
  },
  {
    investment: 0,
    inventoryValue: 0,
    revenue: 0,
    profit: 0
  })

  const format = (value) => `${Math.round(value).toLocaleString('sv-SE')} kr`

  const cards = [
    {
      title: 'Investment',
      value: format(stats.investment),
      color: 'text-red-300'
    },
    {
      title: 'Inventory Value',
      value: format(stats.inventoryValue),
      color: 'text-sky-300'
    },
    {
      title: 'Revenue',
      value: format(stats.revenue),
      color: 'text-emerald-300'
    },
    {
      title: 'Profit',
      value: format(stats.profit),
      color: 'text-yellow-300'
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <div key={card.title} className="rounded-2xl bg-white/10 p-4 shadow-md">
          <p className="text-sm text-sky-100">{card.title}</p>
          <p className={`mt-2 wrap-break-words text-2xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  )
}

export default FinanceCard