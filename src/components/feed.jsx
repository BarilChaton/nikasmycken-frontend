import { useState, useEffect } from 'react'
import { client } from '../client'
import { feedQuery } from '../utils/queries'
import Spinner from './spinner'
import FeedItem from './feedItem'

const Feed = (props) => {
  const { setCurrentPage, setSelectedItem, selectionMode, setSelectionMode, selectedItems, setSelectedItems, user } = props

  const [items, setItems] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await client.fetch(feedQuery, { userId: user.uid })
        setItems(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (user.uid) {
      fetchItems()
    }
  }, [user.uid])

  if (loading) {
    return <Spinner message={`Loading your inventory`} />
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
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
            selectionMode={selectionMode}
            setSelectionMode={setSelectionMode}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
