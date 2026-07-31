import { useState, useEffect, useRef, useCallback } from 'react'
import { client } from '../client'
import { feedQuery, inventoryCountQuery } from '../utils/queries'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { reorderItems } from '../utils/reorderItems'

import Spinner from './spinner'
import FeedItem from './feedItem'

const ITEMS_PER_PAGE = 10
const Feed = (props) => {
  const { setCurrentPage, setSelectedItem, selectionMode, setSelectionMode, selectedItems, setSelectedItems, user, refresh } = props

  const [items, setItems] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreRef = useRef()

  const loadItems = useCallback(
    async (reset = false) => {
      if ((!hasMore && !reset) || loadingMore) return

      try {
        setLoadingMore(true)

        const currentPage = reset ? 0 : page

        const start = currentPage * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE

        const data = await client.fetch(feedQuery, {
          userId: user.uid,
          start,
          end
        })

        if (reset) {
          const count = await client.fetch(inventoryCountQuery, {
            userId: user.uid
          })

          setTotalItems(count)
        }

        console.log(data.length)

        if (reset) {
          setItems(data)
          setPage(1)
        } else {
          setItems((prev) => [...prev, ...data])
          setPage((prev) => prev + 1)
        }

        if (data.length < ITEMS_PER_PAGE) {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Failed loading items:', error)
      } finally {
        setLoadingMore(false)
        setLoading(false)
      }
    },
    [hasMore, loadingMore, page, user.uid]
  )

  useEffect(() => {
    if (!user.uid) return

    const fetchInitialItems = async () => {
      await loadItems(true)
    }

    fetchInitialItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid, refresh])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadItems()
        }
      },
      {
        threshold: 1
      }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [loadItems])

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

  if (totalItems === 0) {
    return <div className="h-full flex items-center justify-center text-white/70">No items found</div>
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      <h2 className="mb-4 text-lg font-semibold text-white">
        {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
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

        {hasMore && (
          <div ref={loadMoreRef} className="flex h-10 justify-center">
            {loadingMore && <Spinner />}
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed
