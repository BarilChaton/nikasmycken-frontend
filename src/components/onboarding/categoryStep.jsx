import { useState } from 'react'
import { motion } from 'framer-motion'
import { client } from '../../client'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

const CategoryStep = ({ user, onNext }) => {
  const [categories, setCategories] = useState([''])
  const [saving, setSaving] = useState(false)

  const addCategory = () => {
    setCategories((prev) => [...prev, ''])
  }

  const updateCategory = (index, value) => {
    setCategories((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const removeCategory = (index) => {
    setCategories((prev) => prev.filter((_, i) => i !== index))
  }

  const createCategories = async () => {
    const validCategories = categories.filter((category) => category.trim())

    try {
      setSaving(true)

      await Promise.all(
        validCategories.map((category) =>
          client.create({
            _type: 'category',
            name: category.trim(),
            ownerId: user.uid,
            subcategories: []
          })
        )
      )

      onNext()
    } catch (error) {
      console.error('Failed creating categories:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full max-w-sm flex-col rounded-3xl bg-white/10 p-6 backdrop-blur">
      <h1 className="mb-2 text-2xl font-bold text-white">Create categories</h1>

      <p className="mb-6 text-sm text-white/70">Categories help you organize your inventory. You can always add more later.</p>

      <div className="flex max-h-64 flex-col gap-3 overflow-y-auto">
        {categories.map((category, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={category}
              onChange={(e) => updateCategory(index, e.target.value)}
              placeholder="Example: Jewelry"
              className="flex-1 rounded-xl bg-white/20 px-4 py-3 text-white placeholder:text-white/50 outline-none"
            />

            {categories.length > 1 && (
              <button onClick={() => removeCategory(index)} className="rounded-xl bg-red-500/80 px-3 text-white">
                <FiTrash2 />
              </button>
            )}
          </div>
        ))}
      </div>

      <button onClick={addCategory} className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white/20 py-3 text-white">
        <FiPlus />
        Add category
      </button>

      <button
        onClick={createCategories}
        disabled={saving}
        className="mt-4 rounded-xl bg-white py-3 font-bold text-sky-800 disabled:opacity-50">
        {saving ? 'Creating...' : 'Continue'}
      </button>
    </motion.div>
  )
}

export default CategoryStep
