import { FiArrowLeft, FiTag, FiLogOut } from 'react-icons/fi'
import { logout } from "../../auth/logout"
import CategoryManager from './CategoryManager'

const Settings = ({ setCurrentPage, user }) => {
  
  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    )

    if (!confirmed) return

    try {
      await logout()
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      {/* Header */}
      <div className="mb-5 flex items-center gap-4">
        <button
          onClick={() => setCurrentPage('home')}
          className="rounded-full bg-white/10 p-3 text-white"
        >
          <FiArrowLeft size={22}/>
        </button>

        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      {/* Category settings */}
      <div className="rounded-2xl bg-white/10 p-5 text-white">
        <div className="mb-4 flex items-center gap-3">
          <FiTag size={24}/>
          <h2 className="text-xl font-bold">Categories</h2>
        </div>
        
        <CategoryManager user={user}/>
      </div>

      {/* Log out */}
      <button
        onClick={handleLogout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-bold text-white"
      >
        <FiLogOut size={20}/>
        Logout
      </button>
    </div>
  )
}

export default Settings