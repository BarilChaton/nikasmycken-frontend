import { useState } from 'react'
import Welcome from '../components/welcome'
import StatsDashboard from '../components/statsDashboard/statsDashboard'
import Feed from '../components/feed'
import NavBar from '../components/navBar/navBar'
import AddItem from '../components/addItem'

const Home = () => {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className={`h-dvh flex flex-col overflow-hidden lightModePrimaryBg`}>
      <Welcome />
      {currentPage === 'home' && <StatsDashboard />}
      <main className="flex-1 min-h-0 overflow-hidden">
        {currentPage === 'home' && <Feed />}
        {currentPage === 'add' && (<AddItem setCurrentPage={setCurrentPage}/>)}
      </main>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}

export default Home