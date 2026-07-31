export const resizeImage = (file, maxSize = 1280, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        let { width, height } = img

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
          }
        }

        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Image compression failed!"))
            return
          }

          const compressedFile = new File(
            [blob],
            file.name,
            {
              type: "image/jpeg",
              lastModified: Date.now()
            }
          )

          resolve(compressedFile)
        }, "image/jpeg", quality)
      }

      img.onerror = reject
      img.src = event.target.result
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}