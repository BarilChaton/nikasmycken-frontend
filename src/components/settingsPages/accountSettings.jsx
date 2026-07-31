import { useState } from 'react'
import { FiLogOut, FiMail, FiUser } from 'react-icons/fi'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { deleteAccount } from '../../utils/deleteAccount'

const AccountSettings = ({ user }) => {
  const [deleting, setDeleting] = useState(false)

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?')
    if (!confirmed) return

    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Your account, inventory, categories and images will be permanently deleted.\n\nGoogle verification is required to continue.'
    )

    if (!confirmed) return

    try {
      setDeleting(true)
      await deleteAccount(user)
      alert('Your account has been deleted.')
    } catch (error) {
      if (error.message === 'RECENT_LOGIN_REQUIRED') {
        alert('Please log out and log back in before deleting your account.')
        return
      }

      console.error(error)
      alert('Unable to delete account. Please log in again and try.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="rounded-2xl bg-white/10 p-5">
      <div className="flex items-center gap-4">
        {user?.photoURL ? (
          <img src={user.photoURL} alt={user.displayName} className="h-16 w-16 rounded-full border-2 border-white object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <FiUser size={28} className="text-white" />
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">{user?.displayName || 'Unknown user'}</h2>

          <div className="mt-1 flex items-center gap-2 text-sm text-white/70">
            <FiMail />
            <span>{user?.email}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600 active:scale-95">
        <FiLogOut />
        Sign out
      </button>
      <button
        disabled={deleting}
        onClick={handleDeleteAccount}
        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition ${
          deleting ? 'cursor-not-allowed bg-red-300' : 'bg-red-500 hover:bg-red-600 active:scale-95'
        }`}>
        Delete Account
      </button>
    </div>
  )
}

export default AccountSettings
