import { useState, useEffect } from 'react'
import { client } from '../client'
import { feedQuery } from '../utils/queries'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { reorderItems } from '../utils/reorderItems'

import Spinner from './spinner'
import FeedItem from './feedItem'

const Feed = (props) => {
  const { setCurrentPage, setSelectedItem, selectionMode, setSelectionMode, selectedItems, setSelectedItems, user, refresh } = props

  const [items, setItems] = useState([])
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
  }, [user.uid, refresh])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8
      }
    })
  )

  const handleDragEnd = async ({ active, over }) => {
    if (selectionMode) return
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((item) => item._id === active.id)
    const newIndex = items.findIndex((item) => item._id === over.id)
    const reorderedItems = arrayMove(items, oldIndex, newIndex)
    setItems(reorderedItems)
    try {
      await reorderItems(reorderedItems)
    } catch (error) {
      console.error('Failed saving order:', error)
    }
  }

  if (loading) {
    return <Spinner message={`Loading your inventory`} />
  }

  if (!items.length) {
    return <div className="h-full flex items-center justify-center text-white/70">No items found</div>
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      <h2 className="mb-4 text-lg font-semibold text-white">
        {items.length} {items.length === 1 ? 'Item' : 'Items'}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((item) => item._id)} strategy={verticalListSortingStrategy}>
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
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}

export default Feed
