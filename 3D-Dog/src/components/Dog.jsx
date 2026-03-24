import React from 'react'
import {Canvas,useThree} from '@react-three/fiber'

const Dog = () => {
     useThree(({Camera,Scene,GL})=>{
        
     })
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