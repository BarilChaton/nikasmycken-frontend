/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { client } from '../../client'
import { categoriesQuery } from '../../utils/queries'
import { v4 as uuidv4 } from 'uuid'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

const CategoryManager = ({ user }) => {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState('')
  const [newSubcategory, setNewSubcategory] = useState('')

  const [selectedCategory, setSelectedCategory] = useState(null)

  const loadCategories = async () => {
    try {
      const data = await client.fetch(categoriesQuery, { userId: user.uid })
      setCategories(data)
    } catch (error) {
      console.error('Failed loading categories: ', error)
    }
  }

  const createCategory = async () => {
    if (!newCategory.trim()) return

    try {
      await client.create({
        _type: 'category',
        name: newCategory,
        subcategories: [],
        ownerId: user.uid
      })

      setNewCategory('')
      loadCategories()
    } catch (error) {
      console.error('Failed creating category:', error)
    }
  }

  const createSubcategory = async () => {
    if (!selectedCategory || !newSubcategory.trim()) return

    try {
      await client
        .patch(selectedCategory._id)
        .append('subcategories', [
          {
            _key: uuidv4(),
            name: newSubcategory
          }
        ])
        .commit()

      setNewSubcategory('')
      setSelectedCategory(null)
      loadCategories()
    } catch (error) {
      console.error('Failed creating subcategory:', error)
    }
  }

  const deleteCategory = async (category) => {
    try {
      const itemsUsingCategory = await client.fetch(
        `count(*[
          _type == "inventoryItem" &&
          ownerId == $userId &&
          category._ref == $categoryId
        ])`,
        {
          userId: user.uid,
          categoryId: category._id
        }
      )

      if (itemsUsingCategory > 0) {
        alert(`This category is used by ${itemsUsingCategory} item(s).`)
        return
      }

      await client.delete(category._id)

      if (selectedCategory?._id === category._id) {
        setSelectedCategory(null)
      }

      loadCategories()
    } catch (error) {
      console.error('Failed deleting category:', error)
    }
  }

  const deleteSubcategory = async (categoryId, key) => {
    try {
      await client
        .patch(categoryId)
        .unset([`subcategories[_key=="${key}"]`])
        .commit()

      loadCategories()
    } catch (error) {
      console.error('Failed deleting subcategory:', error)
    }
  }

  useEffect(() => {
    if (user) {
      loadCategories()
    }
  }, [user])

  return (
    <div className="space-y-4">
      {/* Create category */}
      <div className="rounded-xl bg-white/10 p-4">
        <p className="mb-2 font-semibold text-white">Add category</p>

        <div className="flex gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className="input-style flex-1"
          />
          <button onClick={createCategory} className="rounded-xl bg-white px-4 text-sky-800">
            <FiPlus />
          </button>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category._id} className="rounded-xl bg-white/10 p-4 text-white">
          <div className="flex items-center justify-between">
            <button onClick={() => setSelectedCategory(category)} className="font-bold">
              {category.name}
            </button>
            <button
              onClick={() => deleteCategory(category)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600 active:scale-95">
              <FiTrash2 />
            </button>
          </div>
          {category.subcategories?.map((sub) => (
            <div key={sub._key} className="mt-2 flex justify-between text-sm text-white/70">
              <span>└ {sub.name}</span>
              <button
                onClick={() => deleteSubcategory(category._id, sub._key)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600 active:scale-95">
                <FiTrash2 className="text-white" />
              </button>
            </div>
          ))}
        </div>
      ))}

      {/* Add subcategory */}
      {selectedCategory && (
        <div className="rounded-xl bg-white/10 p-4">
          <p className="mb-2 text-white">
            {' '}
            Add subcategory to: <b> {selectedCategory.name}</b>
          </p>
          <div className="flex gap-2">
            <input
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              placeholder="Subcategory name"
              className="input-style flex-1"
            />

            <button onClick={createSubcategory} className="rounded-xl bg-white px-4 text-sky-800">
              <FiPlus />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryManager
