import { useRef, useEffect, } from 'react'
import {useThree} from '@react-three/fiber'
import * as Three from 'three'
import {useGLTF} from '@react-three/drei'
import {OrbitControls,useTexture,useAnimations} from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';



const Dog = () => {

gsap.registerPlugin(useGSAP, ScrollTrigger)

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
         const [
        mat1,
        mat2,
        mat3,
        mat4,
        mat5,
        mat6,
        mat7,
        mat8,
        mat9,
        mat10,
        mat11,
        mat12,
        mat13,
        mat14,
        mat15,
        mat16,
        mat17,
        mat18,
        mat19,
        mat20
    ] = (useTexture([
        "/models/matcap/mat-1.png",
        "/models/matcap/mat-2.png",
        "/models/matcap/mat-3.png",
        "/models/matcap/mat-4.png",
        "/models/matcap/mat-5.png",
        "/models/matcap/mat-6.png",
        "/models/matcap/mat-7.png",
        "/models/matcap/mat-8.png",
        "/models/matcap/mat-9.png",
        "/models/matcap/mat-10.png",
        "/models/matcap/mat-11.png",
        "/models/matcap/mat-12.png",
        "/models/matcap/mat-13.png",
        "/models/matcap/mat-14.png",
        "/models/matcap/mat-15.png",
        "/models/matcap/mat-16.png",
        "/models/matcap/mat-17.png",
        "/models/matcap/mat-18.png",
        "/models/matcap/mat-19.png",
        "/models/matcap/mat-20.png",
    ])).map(texture => {
        texture.colorSpace = Three.SRGBColorSpace
        return texture
    })

         const material = useRef({
        uMatcap1: { value: mat19 },
        uMatcap2: { value: mat2 },
        uProgress: { value: 1.0 }
    })


        
       const dogMaterial = new Three.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: mat2
    })
    const branchMaterial = new Three.MeshMatcapMaterial({
        normalMap: branchMap,
        matcap: branchNormalMap
    })

     function onBeforeCompile(shader) {
        shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
        shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
        shader.uniforms.uProgress = material.current.uProgress

        // Store reference to shader uniforms for GSAP animation

        shader.fragmentShader = shader.fragmentShader.replace(
            "void main() {",
            `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `
        )

        shader.fragmentShader = shader.fragmentShader.replace(
            "vec4 matcapColor = texture2D( matcap, uv );",
            `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.2;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `
        )
    }

    dogMaterial.onBeforeCompile = onBeforeCompile
        model.scene.traverse((child)=>{
            if(child.name.includes('DOG')){
                child.material = dogMaterial
            }else{
                child.material = branchMaterial
            }
        })


        const dogModel = useRef(model)

useEffect(() => {
  if (!dogModel.current) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#section1",
      endTrigger: "#section3",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  })
  tl
  .to (dogModel.current.scene.position,{
    z:"-=0.75",
    y: "+=0.1",
    
  })
  .to(dogModel.current.scene.rotation,{
    x: `+=${Math.PI / 15}`,
  })
  .to(dogModel.current.scene.rotation,{
    y: `+=${Math.PI}`,
  },"third")
  .to(dogModel.current.scene.position,{
    x:"-=0.4",
    z:"+=0.6",
    y
    :"-=0.0"

  },"third")
},[])
useEffect(() => {

        document.querySelector(`.title[img-title="tomorrowland"]`).addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat19
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="navy-pier"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat8
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="msi-chicago"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat9
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="phone"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat12
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="kikk"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat10
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="kennedy"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat8
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.title[img-title="opera"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat13
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
        document.querySelector(`.titles`).addEventListener("mouseleave", () => {

            material.current.uMatcap1.value = mat2
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })

    }, [])


  return (
    <>
        <primitive object = {model.scene} position ={[0.25, -0.55, 0]} rotation = {[0,Math.PI/3.9,0]}/>
        <directionalLight position={[0, 5, 5]} color={0xFFFFFF} intensity ={10}/>
        
        </>
        
  )
}

export default Dog