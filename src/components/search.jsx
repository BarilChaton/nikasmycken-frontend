import {useEffect, useMemo, useState} from 'react'
import { FiArrowLeft, FiSearch } from 'react-icons/fi'
import { client } from '../client'
import { feedQuery } from '../utils/queries'

import Spinner from './spinner'
import FeedItem from './feedItem'

const Search = ({ setCurrentPage, setSelectedItem, user }) => {  
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await client.fetch(feedQuery, {userId: user.uid})
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

  const categories = useMemo(() => {
    return ['All', ...new Set(items.map(item => item.category?.name).filter(Boolean))]
  }, [items])

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const search = searchText.toLowerCase()
      const categoryName = item.category?.name || ""
      const subcategoryName = item.category?.subcategories?.find(sub => sub._key === item.subcategoryKey)?.name || ""

      const matchesSearch = item.title.toLowerCase().includes(search) ||
       categoryName.toLowerCase().includes(search) ||
       subcategoryName.toLowerCase().includes(search)

      const matchesCategory = selectedCategory === 'All' || categoryName === selectedCategory
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus

      return (
        matchesSearch && matchesCategory && matchesStatus
      )
    })
  }, [ items, searchText, selectedCategory, selectedStatus ])

  if (loading) {
    return <Spinner message="Loading inventory..." />
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      {/* Header */}
      <div className="mb-5 flex items-center gap-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        >
          <FiArrowLeft size={22} />
        </button>

        <h1 className="text-2xl font-bold text-white">Search</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"/>
        <input 
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)}
          placeholder='Search title, category or subcategory...'
          className="w-full rounded-xl bg-white/10 py-3 pl-12 pr-4 text-white placeholder:text-white/50 outline-none"
        />
      </div>

      {/* Categories */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-white">Categories</p>

        <div className="flex flex-wrap gap-2 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 py-2 transition ${selectedCategory === category ? 'bg-white text-sky-700' : 'bg-white/10 text-white'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-white">Status</p>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Listed', 'Unlisted', 'Sold out'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`whitespace-nowrap rounded-full px-4 py-2 transition ${selectedStatus === status ? 'bg-sky-500 text-white' : 'bg-white/10 text-white'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Results</h2>
        <span className="text-sm text-white/70">
          {filteredItems.length}{' '}
          {filteredItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="grid gap-4">
        {filteredItems.length ? (
          filteredItems.map(item => (
            <FeedItem 
              key={item._id}
              item={item}
              setCurrentPage={setCurrentPage}
              setSelectedItem={setSelectedItem}
            />
          ))
        ) : (
          <div className="rounded-2xl bg-white/10 p-8 text-center text-white/70">No items found.</div>
        )}
      </div>
    </div>
  )
}

export default Search