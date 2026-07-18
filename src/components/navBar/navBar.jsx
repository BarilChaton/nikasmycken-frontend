import {FiHome, FiPlusCircle, FiSearch, FiSettings, FiBarChart2} from "react-icons/fi";
const NavBar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    {id: 'home', label: 'Home', icon: FiHome},
    {id: 'search', label: 'Search', icon: FiSearch},
    {id: 'add', label: 'Add', icon: FiPlusCircle},
    {id: 'statistics', label: 'Stats', icon: FiBarChart2},
    {id: 'settings', label: 'Settings', icon: FiSettings},
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 z-50 bg-white/10 backdrop-blur-lg border-t border-white/20">
      <div className="flex h-full justify-around items-center">
        {navItems.map(({id, label, icon: Icon}) => {
          const active = currentPage === id

          return (
            <button key={id} onClick={() => setCurrentPage(id)} className="flex flex-col items-center justify-center gap-1 transition-all duration-200">
              <div className={`p-3 rounded-full transition-all duration-200 ${active ? 'bg-white text-sky-700' : 'text-white/70'}`}>
                <Icon size={22} />
              </div>
              <span className={`text-xs ${active ? 'text-white' : 'text-white/70'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default NavBar