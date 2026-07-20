import { useEffect, useState } from 'react'
import { FaGem, FaTags, FaCoins, FaCheckCircle } from 'react-icons/fa'
import { client } from '../../client'
import { dashboardQuery } from '../../utils/queries'
import StatsCard from './statsCard'

const StatsDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalItems: 0,
    listedItems: 0,
    totalValue: 0,
    itemsSold: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await client.fetch(dashboardQuery, { userId: user.uid })
        const totalItems = data.length
        const listedItems = data.filter((item) => item.status === 'listed').legnth || 0
        const totalValue = data.reduce((sum, item) => sum + (item.listingPrice || 0) * (item.amount || 0), 0)
        const itemsSold = 0

        setStats({
          totalItems,
          listedItems,
          totalValue,
          itemsSold
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (user.uid) {
      fetchStats()
    }
  }, [user.uid])

  return (
    <div className="w-full px-5 grid grid-cols-2 gap-4">
      <StatsCard title="Total Items" value={stats.totalItems} icon={FaGem} />

      <StatsCard title="Listed" value={stats.listedItems} icon={FaTags} />

      <StatsCard
        title="Total Value"
        value={`${stats.totalValue.toLocaleString('sv-SE')} kr`}
        valueClassName="text-[clamp(0.9rem,4vw,1.5rem)]]"
        icon={FaCoins}
      />

      <StatsCard title="Sold" value={stats.itemsSold} icon={FaCheckCircle} />
    </div>
  )
}

export default StatsDashboard
