import { useEffect, useState } from 'react'
import { client } from '../../client'
import { categoriesQuery } from '../../utils/queries'

const CategoryManager = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await client.fetch(categoriesQuery)
        setCategories(data)
      } catch(error) {
        console.error('Failed loading categories: ', error)
      }
    }

    loadCategories()
  }, [])

  return (
    <div className="space-y-3">
      {categories.map(category => (
        <div
          key={category._id}
          className="rounded-xl bg-white/10 p-4"
        >
          <h3 className="font-bold">{category.name}</h3>

          {category.subcategories?.length > 0 && (
            <div className="mt-2 space-y-1">
              {category.subcategories.map(sub => (
                <p
                  key={sub._key}
                  className="text-sm text-white/60"
                >└ {sub.name}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CategoryManager