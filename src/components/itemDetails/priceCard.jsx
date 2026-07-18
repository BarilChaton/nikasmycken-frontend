import { FaCoins, FaChartLine, FaShoppingCart, FaHistory, FaBoxOpen } from "react-icons/fa"

const PriceCard = ({ item }) => {

  const purchasePrice = item.purchasePrice || 0
  const listingPrice = item.listingPrice || 0
  const amount = item.amount || 0
  const amountSold = item.amountSold || 0

  const profitPerItem = listingPrice - purchasePrice
  const totalValue = listingPrice * amount
  const totalValueSold = listingPrice * amountSold
  const totalInvestment = purchasePrice * (amount + amountSold)
  const realizedProfit = profitPerItem * amountSold
  const potentialProfit = profitPerItem * amount

  const formatCurrency = (value) => {
    return `${value.toLocaleString('sv-SE')} kr`
  }

  return (
    <div className="rounded-2xl bg-white/10 p-5 text-white shadow-lg">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <FaCoins className="text-xl" />
        <h2 className="text-xl font-bold">Pricing</h2>
      </div>

      <div className="space-y-4">
        {/* Purchase Price */}
        <div className="flex justify-between">
          <span className="text-white/70">Purchase price</span>
          <span className="font-bold">{formatCurrency(purchasePrice)}</span>
        </div>

        {/* Listing Price */}
        <div className="flex justify-between">
          <span className="text-white/70">Listing price</span>
          <span className="font-bold">{formatCurrency(listingPrice)}</span>
        </div>

        {/* Profit per item */}
        <div className="flex justify-between border-t border-white/20 pt-4">
          <div className="flex items-center gap-2">
            <FaChartLine />
            <span>Profit / item</span>
          </div>
          <span className="font-bold">{formatCurrency(profitPerItem)}</span>
        </div>

        {/* Current stock */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <FaBoxOpen />
            <span>Stock value</span>
          </div>
          <span className="font-bold">{formatCurrency(totalValue)}</span>
        </div>

        {/* Sold value */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <FaShoppingCart />
            <span>Sold value</span>
          </div>
          <span className="font-bold">{formatCurrency(totalValueSold)}</span>
        </div>

        {/* Investment */}
        <div className="flex justify-between">
          <span className="text-white/70">Total investment</span>
          <span className="font-bold">{formatCurrency(totalInvestment)}</span>
        </div>

        {/* Realized profit */}
        <div className="flex justify-between border-t border-white/20 pt-4">
          <div className="flex items-center gap-2">
            <FaHistory />
            <span>Realized profit</span>
          </div>
          <span className="font-bold">{formatCurrency(realizedProfit)}</span>
        </div>

        {/* Potential profit */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <FaChartLine />
            <span>Potential profit</span>
          </div>
          <span className="font-bold">{formatCurrency(potentialProfit)}</span>
        </div>
      </div>
    </div>
  )
}

export default PriceCard