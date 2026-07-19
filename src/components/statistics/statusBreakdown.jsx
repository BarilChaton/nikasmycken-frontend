const COLORS = {
  Unlisted: "bg-gray-400",
  Listed: "bg-emerald-500",
  Sold: "bg-sky-500"
}

const StatusBreakdown = ({ items }) => {
  let newStatus
  const statuses = {
    Unlisted: 0,
    Listed: 0,
    Sold: 0
  }

  items.forEach((item) => {
    newStatus = item.status === 'Sold out' ? 'Sold' : item.status
    const amount = Number(item.amount || 0)

    if (statuses[newStatus] !== undefined) {
      statuses[newStatus] += amount
    }
  })

  const total = Object.values(statuses).reduce((sum, value) => sum + value, 0)

  return (
    <div className="rounded-2xl bg-white/10 p-5">
      <div className="space-y-5">
        {Object.entries(statuses).map(([status, amount]) => {
          const modifiedStatus = status === 'Sold' ? 'Sold out' : status
          const percentage = total > 0 ? Math.round((amount / total) * 100) : 0

          return (
            <div key={status}>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold text-white">{modifiedStatus}</p>
                <p className="text-sm text-sky-100">{amount} pcs</p>
              </div>

              <div className="relative h-5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`flex h-full items-center justify-center rounded-full ${COLORS[newStatus]} transition-all duration-500`}
                  style={{width: `${percentage}%`}}>
                  {percentage >= 10 && (<span className="text-xs font-semibold text-white">{percentage}%</span>)}
                </div>
                {percentage < 10 && percentage > 0 && (
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-white">{percentage}%</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatusBreakdown