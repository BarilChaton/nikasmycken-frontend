import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { RiImageAddLine, RiDeleteBin2Fill } from 'react-icons/ri'
import { client } from '../client'
import Spinner from './Spinner'

const CATEGORIES = [
    'Ring',
    'Necklace',
    'Bracelet',
    'Earrings',
    'Pendant',
    'Parts',
    'Chain',
    'Hook',
    'Jumpring',
    'Beads 4mm',
    'Beads 6mm',
    'Beads 8mm',
    'Beads 10mm',
    'Cardboard Package',
    'Plastic Package'
  ]

const AddItem = ({ setCurrentPage }) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [listingPrice, setListingPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [sold, setSold] = useState('')
  const [status, setStatus] = useState('')

  const [imageAssets, setImageAssets] = useState([])

  const [loading, setLoading] = useState(false)
  const [wrongImageType, setWrongImageType] = useState(false)
  const [fields, setFields] = useState(false)

  const uploadImage = (e) => {
    const files = Array.from(e.target.files)

    if (!files.length) return
    const acceptedTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/svg+xml'
    ]

    const invalid = files.some(file => !acceptedTypes.includes(file.type))
    if (invalid) {
      setWrongImageType(true)
      return
    }

    setWrongImageType(false)
    setLoading(true)

    Promise.all(
      files.map(file => client.assets.upload('image', file, {contentType: file.type, filename: file.name}))
    ).then((documents) => {
      setImageAssets(prev => [...prev, ...documents])
    }).catch(error => {
      console.error('Image upload error: ', error)
    }).finally(() => {
      setLoading(false)
    })
  }

  const removeImage = (id) => {
    setImageAssets(imageAssets.filter(image => image._id !== id))
  }

  const saveItem = async () => {
    if (!title || !category || imageAssets.length === 0) {
      setFields(true)

      setTimeout(() => {
        setFields(false)
      }, 4000)

      return
    }

    const item = {
      _type: 'inventoryItem',
      inventoryId: uuidv4(),
      title,
      category,
      purchasePrice: Number(purchasePrice),
      listingPrice: Number(listingPrice),
      status,
      amount: Number(amount),
      amountSold: Number(sold),
      photos: imageAssets.map(image => ({
        _key: uuidv4(),
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: image._id
        }
      }))
    }

    try {
      await client.create(item)
      setCurrentPage('home')
    } catch(error) {
      console.error('Failed to create inventory item: ', error)
    }
  }

  return (
    <div className="h-full overflow-y-auto px-5 py-4 pb-24">
      {fields && (
        <p className="mb-4 text-center text-red-400">Please fill in all required fields</p>
      )}

      <h1 className='mb-5 text-2xl font-bold text-white'>Add Item</h1>

      {/* Images */}
      <div className='relative rounded-2xl bg-white/10 p-4'>
        {loading && (
          <div className='absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-sm'>
            <Spinner message="Uploading images..." />
          </div>
        )}

        {wrongImageType && (
          <p className='text-red-400'>Unsupported image type</p>
        )}

        <label className={`flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/30 text-white 
          ${loading ? 'pointer-events-none opacity-50}' : 'cursor-pointer'}`
        }>
          <RiImageAddLine size={40}/>
          <span>Add Photos</span>
          <input type="file" multiple accept='image/*' onChange={uploadImage} className='hidden' />
        </label>

        <div className='mt-4 grid grid-cols-3 gap-3'>
          {imageAssets.map(image => (
            <div key={image._id} className='relative'>
              <img src={image.url} alt="upload" className='h-24 w-full rounded-xl object-cover' />
              <button onClick={() => removeImage(image._id)} className='absolute right-1 top-1 rounded-full bg-white p-1 text-red-500'>
                <RiDeleteBin2Fill/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className='mt-5 flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label className="pl-1 text-sm font-medium text-white/80">Item title</label>
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Item title'
            className='input-style'
          />
        </div>

        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='input-style'
        >
          <option value="">Select category</option>
          {CATEGORIES.map(category => (
            <option className='text-sky-700' key={category} value={category}>{category}</option>
          ))}
        </select>

        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
            <label className="pl-1 text-sm font-medium text-white/80">Purchase price</label>
            <input 
              type="number" 
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder='Purchase price'
              className='input-style'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className="pl-1 text-sm font-medium text-white/80">Listing price</label>
            <input 
              type="number" 
              value={listingPrice}
              onChange={(e) => setListingPrice(e.target.value)}
              placeholder='Listing price'
              className='input-style'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className="pl-1 text-sm font-medium text-white/80">Amount</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Amount'
              className='input-style'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className="pl-1 text-sm font-medium text-white/80">Amount sold</label>
            <input 
              type="number" 
              value={sold}
              onChange={(e) => setSold(e.target.value)}
              placeholder='Amount sold'
              className='input-style'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className="pl-1 text-sm font-medium text-white/80">Status</label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='input-style'
              placeholder='Status'
            >
              <option>Unlisted</option>
              <option>Listed</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <button
            onClick={saveItem}
            className='col-span-2 mt-4 rounded-xl bg-white py-3 font-bold text-sky-800'
          >
            Save Item
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddItem