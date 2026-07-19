import { FaGem } from "react-icons/fa"

const CategoryBreakdown = ({ items }) => {
  const categories = items.reduce((acc, item) => {
    const category = item.category?.name || "Other"

    if (!acc[category]) {
      acc[category] = {
        items: 0,
        amount: 0,
        listed: 0
      }
    }

    acc[category].items += 1
    acc[category].amount += Number(item.amount || 0)

    if (item.status === "Listed") {
      acc[category].listed += Number(item.amount || 0)
    }

    return acc
  }, {})

  const sortedCategories = Object.entries(categories).sort(
    (a, b) => b[1].amount - a[1].amount
  )

  const totalAmount = sortedCategories.reduce(
    (sum, [, data]) => sum + data.amount, 0
  )

  const maxAmount = Math.max(
    ...sortedCategories.map(([, value]) => value.amount),
    1
  )

  return (
    <div className="rounded-2xl bg-white/10 p-5">
      <div className="space-y-5">
        {sortedCategories.map(([category, data]) => {
          return <div key={category}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaGem className="text-sky-300" />
                <div>
                  <p className="font-semibold text-white">{category}</p>
                  <p className="text-xs text-sky-100">{data.items} {data.items === 1 ? "entry" : "entries"}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-white">{data.amount}</p>
                <p className="text-xs text-sky-100">Listed: {data.listed}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-2">
              <div className="relative h-5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="relative flex h-full items-center justify-center rounded-full bg-sky-400 transition-all duration-500"
                  style={{width: `${(data.amount / maxAmount) * 100}%`}}
                >
                  <span className={`text-xs font-semibold whitespace-nowrap ${data.amount / maxAmount < 0.2 ? "absolute left-full ml-2 text-white" : "text-white"}`}>
                    {Math.round((data.amount / totalAmount) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>;
        })}
      </div>
    </div>
  )
}

export default CategoryBreakdown