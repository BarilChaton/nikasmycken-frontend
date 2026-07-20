import { useState, useEffect } from 'react'
import { client } from '../client'
import { categoriesQuery } from '../utils/queries'
import { FiArrowLeft } from 'react-icons/fi'
import { RiImageAddLine, RiDeleteBin2Fill } from 'react-icons/ri'

const EditItem = ({ item, setCurrentPage, user }) => {
  const [title, setTitle] = useState(item.title)
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState(item.category?._id || '')
  const [subcategoryKey, setSubcategoryKey] = useState(item.subcategoryKey || '')
  const [purchasePrice, setPurchasePrice] = useState(item.purchasePrice)
  const [listingPrice, setListingPrice] = useState(item.listingPrice)
  const [amount, setAmount] = useState(item.amount)
  const [amountSold, setAmountSold] = useState(item.amountSold || 0)
  const [status, setStatus] = useState(item.status)

  const [photos, setPhotos] = useState(item.photos || [])

  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    client
      .fetch(categoriesQuery, { userId: user.uid })
      .then(setCategories)
      .catch((error) => console.error('Failed loading categories:', error))
  }, [user.uid])

  const selectedCategory = categories.find((category) => category._id === categoryId)

  const uploadImage = async (e) => {
    const files = Array.from(e.target.files)

    if (!files.length) return

    try {
      setUploading(true)

      const uploads = await Promise.all(
        files.map((file) =>
          client.assets.upload('image', file, {
            contentType: file.type,
            filename: file.name
          })
        )
      )

      const newPhotos = uploads.map((image) => ({
        _key: crypto.randomUUID(),
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: image._id
        },

        previewUrl: image.url
      }))

      setPhotos((prev) => [...prev, ...newPhotos])
    } catch (error) {
      console.error('Image upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (key) => {
    setPhotos(photos.filter((photo) => photo._key !== key))
  }

  const updateItem = async () => {
    try {
      setSaving(true)

      const formattedPhotos = photos.map((photo) => {
        if (photo.asset._ref) {
          return {
            _key: photo._key,
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: photo.asset._ref
            }
          }
        }

        return {
          _key: photo._key,
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: photo.asset._id
          }
        }
      })

      await client
        .patch(item._id)
        .set({
          title,
          category: {
            _type: 'reference',
            _ref: categoryId
          },
          subcategoryKey,
          ownerId: user.uid,
          purchasePrice: Number(purchasePrice),
          listingPrice: Number(listingPrice),
          amount: Number(amount),
          amountSold: Number(amountSold),
          status,

          photos: formattedPhotos
        })
        .commit()

      setCurrentPage('home')
    } catch (error) {
      console.error('Failed updating item:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      <div className="mb-5 flex items-center gap-4">
        <button onClick={() => setCurrentPage('details')} className="rounded-full bg-white/10 p-3 text-white">
          <FiArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold text-white">Edit Item</h1>
      </div>

      {/* Images */}
      <div className="rounded-2xl bg-white/10 p-4 mb-5">
        <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/30 text-white">
          <RiImageAddLine size={40} />
          <span>{uploading ? 'Uploading...' : 'Add Photos'}</span>

          <input type="file" multiple accept="image/*" onChange={uploadImage} className="hidden" />
        </label>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {photos.map((photo) => (
            <div key={photo._key} className="relative">
              <img src={photo.previewUrl || photo.asset.url} alt="" className="h-24 w-full rounded-xl object-cover" />
              <button
                onClick={() => removeImage(photo._key)}
                className="absolute right-1 top-1 rounded-full bg-white p-1 text-red-500">
                <RiDeleteBin2Fill />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="pl-1 text-sm font-medium text-white/80">Item title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-style" placeholder="Title" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="pl-1 text-sm font-medium text-white/80">Category</label>

          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value)
              setSubcategoryKey('')
            }}
            className="input-style">
            <option value="">Select category</option>

            {categories.map((category) => (
              <option className="text-sky-700" key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory?.subcategories?.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="pl-1 text-sm font-medium text-white/80">Subcategory</label>

            <select value={subcategoryKey} onChange={(e) => setSubcategoryKey(e.target.value)} className="input-style">
              <option value="">Select subcategory</option>

              {selectedCategory.subcategories.map((sub) => (
                <option className="text-sky-700" key={sub._key} value={sub._key}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="pl-1 text-sm font-medium text-white/80">Purchase price</label>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="input-style"
              placeholder="Purchase price"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="pl-1 text-sm font-medium text-white/80">Listing price</label>
            <input
              type="number"
              value={listingPrice}
              onChange={(e) => setListingPrice(e.target.value)}
              className="input-style"
              placeholder="Listing price"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="pl-1 text-sm font-medium text-white/80">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-style"
              placeholder="Amount"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="pl-1 text-sm font-medium text-white/80">Amount sold</label>
            <input
              type="number"
              value={amountSold}
              onChange={(e) => setAmountSold(e.target.value)}
              className="input-style"
              placeholder="Sold"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="pl-1 text-sm font-medium text-white/80">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-style">
            <option>Unlisted</option>
            <option>Listed</option>
            <option>Sold out</option>
          </select>
        </div>

        <button
          onClick={updateItem}
          disabled={saving}
          className="rounded-xl bg-white py-3 font-bold text-sky-800 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default EditItem
