import { FiArrowLeft, FiTag, FiUser, FiDownload } from 'react-icons/fi'
import CategoryManager from './CategoryManager'
import AccountSettings from './accountSettings'
import ImportExport from './importExport'

const Settings = ({ setCurrentPage, user }) => {
  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      {/* Header */}
      <div className="mb-5 flex items-center gap-4">
        <button onClick={() => setCurrentPage('home')} className="rounded-full bg-white/10 p-3 text-white">
          <FiArrowLeft size={22} />
        </button>

        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      {/* Account settings */}
      <div className="rounded-2xl bg-white/10 p-5 text-white mb-5">
        <div className="mb-4 flex items-center gap-3">
          <FiUser size={24} />
          <h2 className="text-xl font-bold">Account</h2>
        </div>

        <AccountSettings user={user} />
      </div>

      {/* Category settings */}
      <div className="rounded-2xl bg-white/10 p-5 text-white mb-5">
        <div className="mb-4 flex items-center gap-3">
          <FiTag size={24} />
          <h2 className="text-xl font-bold">Categories</h2>
        </div>

        <CategoryManager user={user} />
      </div>

      {/* Import & Export settings */}
      <div className="rounded-2xl bg-white/10 p-5 text-white mb-5">
        <div className="mb-4 flex items-center gap-3">
          <FiDownload size={24} />
          <h2 className="text-xl font-bold">Import & Export</h2>
        </div>

        <ImportExport user={user} />
      </div>
    </div>
  )
}

export default Settings
