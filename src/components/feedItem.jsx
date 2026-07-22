import { useRef } from 'react'
import { FaBoxes, FaCoins } from 'react-icons/fa'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FiCheckSquare, FiSquare, FiMenu } from 'react-icons/fi'

const STATUS_COLORS = {
  Listed: 'bg-emerald-500',
  Unlisted: 'bg-amber-500',
  Sold: 'bg-red-500'
}

const PRESS_TIMER_DURATION = 500

const FeedItem = (props) => {
  const { item, setCurrentPage, setSelectedItem, selectionMode, setSelectionMode, selectedItems, setSelectedItems } = props

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item._id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1
  }

  const pressTimer = useRef(null)
  const isSelected = selectedItems.some((selected) => selected._id === item._id)
  const toggleSelection = () => {
    if (isSelected) {
      const updated = selectedItems.filter((selected) => selected._id !== item._id)
      setSelectedItems(updated)

      if (updated.length === 0) {
        setSelectionMode(false)
      }
    } else {
      setSelectionMode(true)
      setSelectedItems([...selectedItems, item])
    }
  }

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setSelectionMode(true)
      setSelectedItems([item])
    }, PRESS_TIMER_DURATION)
  }

  const handlePressEnd = () => {
    clearTimeout(pressTimer.current)
  }

  const status = item.status === 'Sold out' ? 'Sold' : item.status
  const categoryName = item.category?.name || 'No category'
  const subcategoryName = item.category?.subcategories?.find((sub) => sub._key === item.subcategoryKey)?.name

  return (
    <div
      ref={setNodeRef}
      style={style}
      onPointerDown={(e) => {
        if (e.target.closest('.drag-handle')) return
        handlePressStart()
      }}
      onPointerUp={handlePressEnd}
      onPointerLeave={handlePressEnd}
      onPointerCancel={handlePressEnd}
      onClick={(e) => {
        if (e.defaultPrevented) return

        if (selectionMode) {
          toggleSelection()
          return
        }

        setSelectedItem(item)
        setCurrentPage('details')
      }}
      className={`cursor-pointer select-none flex gap-2 rounded-2xl p-2 shadow-md text-white transition-transform duration-200 ${
        isSelected ? 'bg-white/30' : 'bg-white/10'
      }`}>
      {selectionMode && (
        <div className="flex items-center px-2 text-white">{isSelected ? <FiCheckSquare size={24} /> : <FiSquare size={24} />}</div>
      )}
      <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover" />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{item.title}</h2>

          <div className="flex items-start justify-between">
            <div className="text-sm">
              <p>
                Category: <span className="font-bold">{categoryName}</span>
              </p>

              {subcategoryName && <p className="text-xs text-white/60">{subcategoryName}</p>}
            </div>

            <div className="flex flex-row gap-1">
              <p>Status:</p>
              <span className={`rounded-full px-2 py-1 text-xs ${STATUS_COLORS[status]}`}>{item.status}</span>
            </div>
            {!selectionMode && (
              <button
                {...attributes}
                {...(selectionMode ? {} : listeners)}
                onClick={(e) => e.stopPropagation()}
                className="drag-handle touch-none cursor-grab rounded-lg p-2 text-white/70 active:cursor-grabbing">
                <FiMenu size={22} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-1 justify-between text-sm">
            <FaCoins />
            <p>Price: </p>
            <span className="font-semibold">{item.listingPrice} kr</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <FaBoxes />
            <span>Qty: {item.amount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedItem
