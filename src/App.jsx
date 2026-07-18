import { useEffect } from 'react'
import { ScreenOrientation } from '@capacitor/screen-orientation'
import Home from './containers/home'


const App = () => {
  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lock({
        orientation: 'portrait'
      })
    }

    lockOrientation()
  }, [])

  return (<Home />)
}

export default App
