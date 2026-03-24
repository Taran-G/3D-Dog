import React from 'react'
import {useThree} from '@react-three/fiber'

const Dog = () => {
     useThree(({Camera,Scene,GL})=>{

     })
  return (
        <mesh>
            <meshBasicMaterial color = "green"/>
            <boxGeometry args ={[1,1,1]}/>
        </mesh>
    
  )
}

export default Dog