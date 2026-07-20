import { FiFileText, FiDownload } from 'react-icons/fi'
import { exportJson } from '../../utils/export/exportJson'
import { exportExcel } from '../../utils/export/exportExcel'

const ImportExport = ({ user }) => {
  const handleJsonExport = async () => {
    try {
      await exportJson(user.uid)
    } catch (error) {
      console.error('JSON export failed:', error)
    }
  }

  const handleExcelExport = async () => {
    try {
      await exportExcel(user.uid)
    } catch (error) {
      console.error('Excel export failed:', error)
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleJsonExport}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-sky-800 transition hover:bg-white/90 active:scale-95">
        <FiFileText size={20} />
        Export JSON Backup
      </button>

      <button
        onClick={handleExcelExport}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-sky-800 transition hover:bg-white/90 active:scale-95">
        <FiDownload size={20} />
        Export Excel
      </button>
    </div>
  )
}

export default ImportExport
