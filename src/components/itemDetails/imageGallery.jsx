/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'

const ImageGallery = ({ item }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)

  useEffect(() => {
    setSelectedImage(0)
  }, [item])

  const handleTouchStart = (e) => {
    setTouchEndX(null)
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return

    const distance = touchStartX - touchEndX

    // Swipe left
    if (distance > 60) {
      setSelectedImage((prev) => (prev < item.photos.length - 1 ? prev + 1 : prev))
    }

    // Swipe right
    if (distance < -60) {
      setSelectedImage((prev) => (prev > 0 ? prev - 1 : prev))
    }

    setTouchStartX(null)
    setTouchEndX(null)
  }

  if (!item?.photos?.length) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl bg-white/10 text-white">
        No images available
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Swipe Gallery */}
      <div
        className="overflow-hidden rounded-2xl bg-white/10 shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${selectedImage * 100}%)`
          }}>
          {item.photos.map((photo) => (
            <img
              key={photo._key}
              src={photo.asset.url}
              alt={item.title}
              className="h-80 w-full shrink-0 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2">
        {item.photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`
              h-2 rounded-full transition-all
              ${selectedImage === index ? 'w-8 bg-white' : 'w-2 bg-white/40'}
            `}
          />
        ))}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-3 overflow-x-auto pb-2">
        {item.photos.map((photo, index) => (
          <button
            key={photo._key}
            onClick={() => setSelectedImage(index)}
            className={`
              overflow-hidden rounded-xl border-2 transition
              ${selectedImage === index ? 'border-white' : 'border-transparent'}
            `}>
            <img src={photo.asset.url} alt="" className="h-20 w-20 object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
