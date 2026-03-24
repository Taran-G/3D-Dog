import React, { use, useEffect } from 'react'
import {useThree} from '@react-three/fiber'
import * as Three from 'three'
import {useGLTF} from '@react-three/drei'
import {OrbitControls,useTexture,useAnimations} from '@react-three/drei'

const Dog = () => {
     useThree(({camera,scene,gl})=>{
        camera.position.z = 0.55;
        gl.toneMapping = Three.ReinhardToneMapping
        gl.outputColorSpace = Three.SRGBColorSpace

             })
               

     const model = useGLTF('/models/dog.drc.glb')

     const {actions} = useAnimations(model.animations,model.scene)
     useEffect(()=>{
        actions["Take 001"].play()
     },[actions])

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
       const [ branchMap, branchNormalMap ] = (useTexture([ "models/branches_diffuse.jpeg", "models/branches_normals.jpeg" ]))
        .map(texture => {
            texture.colorSpace = Three.SRGBColorSpace
            return texture
        })


        
       const dogMaterial = new Three.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMatCap
    })
    const branchMaterial = new Three.MeshMatcapMaterial({
        normalMap: branchMap,
        matcap: branchNormalMap
    })

        model.scene.traverse((child)=>{
            if(child.name.includes('DOG')){
                child.material = dogMaterial
            }else{
                child.material = branchMaterial
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