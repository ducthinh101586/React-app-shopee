import React from 'react'
import 'normalize.css'
import '../src/assets/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'
import Routes from './Routes'
import { ToastContainer } from 'react-toastify'
import Authoziration from './components/Authorization/Authoziration'

function App() {
  return (
    <div className="App">
      <Routes />
      <ToastContainer />
      <Authoziration />
    </div>
  )
}

export default App
