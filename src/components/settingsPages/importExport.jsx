import { useRef } from 'react'
import { FiFileText, FiDownload, FiUpload } from 'react-icons/fi'
import { exportJson } from '../../utils/export/exportJson'
import { exportExcel } from '../../utils/export/exportExcel'
import { importJson } from '../../utils/import/importJson'
import { importExcel } from '../../utils/import/importExcel'

const ImportExport = ({ user }) => {
  const jsonInputRef = useRef(null)
  const excelInputRef = useRef(null)

  const confirmImport = () => {
    return window.confirm(
      'The inventory data will be imported.\n\n' +
        'Images are NOT included in backups and will not be restored.\n\n' +
        'You will need to add the photos again after the import.\n\n' +
        'Do you want to continue?'
    )
  }

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

  const handleJsonImport = async (event) => {
    try {
      const file = event.target.files[0]

      if (!file) return

      await importJson(file, user.uid)
    } catch (error) {
      console.error('JSON import failed:', error)
    }

    event.target.value = ''
  }

  const handleExcelImport = async (event) => {
    try {
      const file = event.target.files[0]

      if (!file) return

      await importExcel(file, user.uid)
    } catch (error) {
      console.error('Excel import failed:', error)
    }

    event.target.value = ''
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

      <input ref={jsonInputRef} type="file" accept=".json" onChange={handleJsonImport} className="hidden" />

      <button
        onClick={() => {
          if (!confirmImport()) return
          jsonInputRef.current.click()
        }}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-sky-800 transition hover:bg-white/90 active:scale-95">
        <FiUpload size={20} />
        Import JSON Backup
      </button>

      <input ref={excelInputRef} type="file" accept=".xlsx" onChange={handleExcelImport} className="hidden" />

      <button
        onClick={() => {
          if (!confirmImport()) return
          excelInputRef.current.click()
        }}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-3 font-semibold text-sky-800 transition hover:bg-white/90 active:scale-95">
        <FiUpload size={20} />
        Import Excel
      </button>
    </div>
  )
}

export default ImportExport
