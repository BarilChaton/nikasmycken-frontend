import { useState, useEffect } from 'react'
import { client } from '../client'
import { feedQuery } from '../utils/queries'
import Spinner from './spinner'
import FeedItem from './feedItem'

const Feed = () => {
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await client.fetch(feedQuery)
        setItems(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  if (loading) {
    return ( <Spinner message={`Loading your inventory`} /> )
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      <h2 className="mb-4 text-lg font-semibold text-white">
        {items.length} {items.length === 1 ? 'Item' : 'Items'}
      </h2>

      <div className="grid grid-col gap-4">
        {items.map((item) => (
          <FeedItem
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed