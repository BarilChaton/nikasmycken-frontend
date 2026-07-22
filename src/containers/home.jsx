import { useState, useEffect } from 'react'
import { initializeSortOrder } from '../utils/initializeSortOrder'

import Welcome from '../components/welcome'
import Feed from '../components/feed'
import NavBar from '../components/navBar/navBar'
import AddItem from '../components/addItem'
import Search from '../components/search'
import Statistics from '../components/statistics/statistics'
import Settings from '../components/settingsPages/settings'
import EditItem from '../components/editItem'
import ItemDetails from '../components/itemDetails/itemDetails'
import SelectionBar from '../components/selectionBar'

const Home = ({ user }) => {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedItem, setSelectedItem] = useState(null)

  const [selectedItems, setSelectedItems] = useState([])
  const [selectionMode, setSelectionMode] = useState(false)
  const [copying, setCopying] = useState(false)

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (user.uid) {
      initializeSortOrder(user.uid)
    }
  }, [user.uid])

  return (
    <div className={`h-dvh flex flex-col overflow-hidden lightModePrimaryBg`}>
      <Welcome user={user} />
      <main className="flex-1 min-h-0 overflow-hidden">
        {currentPage === 'home' && (
          <Feed
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
            selectionMode={selectionMode}
            setSelectionMode={setSelectionMode}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            user={user}
            refresh={refresh}
          />
        )}
        {currentPage === 'search' && (
          <Search
            setCurrentPage={setCurrentPage}
            setSelectedItem={setSelectedItem}
            selectionMode={selectionMode}
            setSelectionMode={setSelectionMode}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            user={user}
          />
        )}
        {currentPage === 'add' && <AddItem setCurrentPage={setCurrentPage} user={user} />}
        {currentPage === 'statistics' && <Statistics setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} user={user} />}
        {currentPage === 'settings' && <Settings setCurrentPage={setCurrentPage} user={user} />}
        {currentPage === 'details' && (
          <ItemDetails item={selectedItem} setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} user={user} />
        )}
        {currentPage === 'edit' && <EditItem item={selectedItem} setCurrentPage={setCurrentPage} user={user} />}
      </main>
      {selectionMode && (
        <SelectionBar
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          setSelectionMode={setSelectionMode}
          user={user}
          setRefresh={setRefresh}
          copying={copying}
          setCopying={setCopying}
        />
      )}
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default Home
