import { useState } from 'react'
import{ Canvas } from '@react-three/fiber'
import './App.css'
import Dog from './components/Dog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Canvas>
    <Dog/>
      
    </Canvas>
  )
}

export default App
