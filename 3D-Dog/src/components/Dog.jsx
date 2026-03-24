import React from 'react'
import {useThree} from '@react-three/fiber'
import * as Three from 'three'
import {useGLTF} from '@react-three/drei'
import {OrbitControls,useTexture} from '@react-three/drei'

const Dog = () => {
     useThree(({camera,scene,gl})=>{
        camera.position.z = 0.55;
        gl.toneMapping = Three.ReinhardToneMapping
        gl.outputColorSpace = Three.SRGBColorSpace

             })
     const model = useGLTF('/models/dog.drc.glb')


         /*const texture = useTexture({ 
            normalMap:'models/dog_normals.jpg',
            sampleMatCap:'models/matcap/mat-1.png'
            

        }()=>{
            texture.normalMap.flipY = false;
        texture .sampleMatCap.colorSpace = Three.SRGBColorSpace
        })*/
       const [normalMap,sampleMatCap] = useTexture(["models/dog_normals.jpg","models/matcap/mat-1.png"]).map(texture =>{
            texture.flipY = false;
            texture.colorSpace = Three.SRGBColorSpace
            return texture;
       })

        

        model.scene.traverse((child)=>{
            if(child.name.includes('DOG')){
                child.material = new Three.MeshMatcapMaterial({
                    normalMap:normalMap,
                    matcap:sampleMatCap

                })
            }
        })

  return (
    <>
        <primitive object = {model.scene} position ={[0.25, -0.55, 0]} rotation = {[0,Math.PI/3.9,0]}/>
        <directionalLight position={[0, 5, 5]} color={0xFFFFFF} intensity ={10}/>
        <OrbitControls />
        </>
        
  )
}

export default Dog