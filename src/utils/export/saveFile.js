import { Capacitor } from '@capacitor/core'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'

export const saveFile = async (filename, mimeType, data) => {

  /*
  ==============================
  Browser
  ==============================
  */

  if (!Capacitor.isNativePlatform()) {
    const blob = new Blob([data], {
      type: mimeType
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()

    URL.revokeObjectURL(url)

    return
  }

  /*
  ==============================
  Android / iOS
  ==============================
  */

  const base64 = btoa(
    String.fromCharCode(...new Uint8Array(data))
  )

  const result = await Filesystem.writeFile({
    path: filename,
    data: base64,
    directory: Directory.Cache
  })

  await Share.share({
    title: filename,
    text: 'Inventory backup',
    url: result.uri
  })
}