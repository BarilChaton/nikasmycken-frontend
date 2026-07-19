import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOAWMWT2pDlF1wGRugUxpTC29ZLym77qU",
  authDomain: "nikasmycken-dashboard.firebaseapp.com",
  projectId: "nikasmycken-dashboard",
  storageBucket: "nikasmycken-dashboard.firebasestorage.app",
  messagingSenderId: "644958193282",
  appId: "1:644958193282:web:df7e849e56685785b5d69b"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)