import { useState } from 'react'

import './App.css'
import Dog from './components/Dog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Dog/>
      
    </>
  )
}

export default App
