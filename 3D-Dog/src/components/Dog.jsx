import React from 'react'
import {useThree} from '@react-three/fiber'
import {useGLTF} from '@react-three/drei'
import {OrbitControls} from '@react-three/drei'

const Dog = () => {
     useThree(({camera,scene,GL})=>{
        camera.position.z = 0.55;

             })
     const model = useGLTF('/models/dog.drc.glb')
  return (
    <>
        <primitive object = {model.scene} position ={[0.26, -0.5, 0]} rotation = {[0,Math.PI/3.9,0]}/>
        <directionalLight position={[0, 0, 2]} color={0xFFFFFF} intensity ={10}/>
        <OrbitControls />
        </>
        
  )
}

export default Dog