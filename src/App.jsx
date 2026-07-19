import { useEffect } from 'react'
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { useAuth } from "./auth/AuthContext"
import Login from "./components/Login"
import Home from './containers/home'
import Spinner from './components/spinner'

const App = () => {

  const { user, loading } = useAuth()

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lock({
        orientation: 'portrait'
      })
    }

    lockOrientation()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (!user) {
    return <Login />
  } else {
    return <Home user={user}/>
  }
}

export default App
