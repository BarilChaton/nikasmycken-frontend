import { useState } from 'react'
import Welcome from '../components/welcome'
import StatsDashboard from '../components/statsDashboard/statsDashboard'
import Feed from '../components/feed'
import NavBar from '../components/navBar/navBar'
import AddItem from '../components/addItem'
import Statistics from '../components/statistics/statistics'
import EditItem from '../components/editItem'
import ItemDetails from '../components/itemDetails/itemDetails'

const Home = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className={`h-dvh flex flex-col overflow-hidden lightModePrimaryBg`}>
      <Welcome />
      {currentPage === 'home' && <StatsDashboard />}
      <main className="flex-1 min-h-0 overflow-hidden">
        {currentPage === 'home' && <Feed setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem}/>}
        {currentPage === 'add' && (<AddItem setCurrentPage={setCurrentPage}/>)}
        {currentPage === 'statistics' && <Statistics setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />}
        {currentPage === 'details' && (<ItemDetails item={selectedItem} setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem}/>)}
        {currentPage === 'edit' && <EditItem item={selectedItem} setCurrentPage={setCurrentPage}/>}
      </main>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}

export default Home