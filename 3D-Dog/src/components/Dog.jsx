import React from 'react'
import {Canvas} from '@react-three/fiber'

const Dog = () => {
  return (
    <Canvas>
        <mesh>
            <meshBasicMaterial color = "green"/>
            <boxGeometry args ={[1,1,1]}/>
        </mesh>
    </Canvas>
  )
}

export default Dog