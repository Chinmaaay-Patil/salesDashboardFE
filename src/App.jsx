import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DownloadDocWithName from './csvGenerator/DownloadDocWithName'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <DownloadDocWithName/>
    </>
  )
}

export default App
