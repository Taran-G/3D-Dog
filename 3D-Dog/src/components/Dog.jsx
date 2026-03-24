import React from 'react'
import {useThree} from '@react-three/fiber'
import {OrbitControls, orbitCOntrols,useGLTF} from '@react-three/drei'

const Dog = () => {
     useThree(({Camera,Scene,GL})=>{

     })
     const model = useGLTF('/models/dog.drc.glb')
  return (
        <primitive object = {model.scene} />
        
  )
}

export default Dog