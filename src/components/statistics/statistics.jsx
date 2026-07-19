import { useEffect, useState } from 'react'
import { client } from '../../client'
import { feedQuery } from '../../utils/queries'
import Spinner from '../spinner'

import FinanceCard from './financeCard'
import CategoryBreakdown from './categoryBreakdown'
import StatusBreakdown from './statusBreakdown'
import TopItems from './topItems'

const Statistics = ({setCurrentPage, setSelectedItem, user}) => {  
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await client.fetch(feedQuery, {userId: user.uid})
        setItems(data)
      } catch (error) {
        console.error('Failed loading statistics:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user.uid) {
      fetchItems()
    }
  }, [user.uid])

  if (loading) {
    return <Spinner message="Loading statistics..." />
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      <h1 className="mb-6 text-3xl font-bold text-white">Statistics</h1>

      {/* Financial */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-white">Financial</h2>
        <div className="rounded-2xl bg-white/10 p-5 text-white">
          <FinanceCard items={items}/>
        </div>
      </section>

      {/* Categories  */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-white">Categories</h2>
        <div className="rounded-2xl bg-white/10 p-5 text-white">
          <CategoryBreakdown items={items}/>
        </div>
      </section>

      {/* Status */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-white">Status Breakdown</h2>
        <div className="rounded-2xl bg-white/10 p-5 text-white">
          <StatusBreakdown items={items}/>
        </div>
      </section>

      {/* Most Valuable */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-white">Most Valuable Items</h2>
        <div className="rounded-2xl bg-white/10 p-5 text-white">
          <TopItems 
            items={items}
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </section>
    </div>
  )
}

export default Statistics