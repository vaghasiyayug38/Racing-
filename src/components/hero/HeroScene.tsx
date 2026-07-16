import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import SmokeSystem from './SmokeSystem'
import SparkSystem from './SparkSystem'
import DustParticles from './DustParticles'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type DriveState = 'WAITING' | 'ENTERING' | 'DRIFTING' | 'EXITING'

const CAR_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/SportsCar/glTF/SportsCar.gltf'

export default function HeroScene() {
  const group = useRef<THREE.Group>(null!)
  const { scene } = useGLTF(CAR_URL)
  const { camera } = useThree()
  const prefersReduced = useReducedMotion()

  const carX = useRef(-12)
  const targetX = useRef(-12)
  const speed = useRef(0)
  const [driveState, setDriveState] = useState<DriveState>('WAITING')
  const wheelRefs = useRef<THREE.Object3D[]>([])

  // Collect wheel meshes
  useEffect(() => {
    if (!scene) return
    const wheels: THREE.Object3D[] = []
    scene.traverse((child) => {
      if (child.name.toLowerCase().includes('wheel')) wheels.push(child)
    })
    wheelRefs.current = wheels
  }, [scene])

  // GSAP sequence for cinematic drift loop
  useEffect(() => {
    if (prefersReduced) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 })

    // Wait off-screen
    tl.call(() => { setDriveState('WAITING'); targetX.current = -12; speed.current = 0 })
      .to(targetX, { current: -4, duration: 2, ease: 'power2.out',
        onUpdate: () => {
          if (targetX.current > -7) setDriveState('ENTERING')
        }
      })
      .call(() => setDriveState('DRIFTING'))
      .to(targetX, { current: 4, duration: 3, ease: 'none',
        onUpdate: () => { speed.current = 14 }
      })
      .call(() => setDriveState('EXITING'))
      .to(targetX, { current: 14, duration: 2, ease: 'power2.in',
        onUpdate: () => { speed.current = 4 }
      })
      .call(() => setDriveState('WAITING'))

    return () => { tl.kill() }
  }, [prefersReduced])

  // Smooth movement and effects per frame
  useFrame((state, delta) => {
    if (!group.current) return

    // Smooth car X position
    carX.current += (targetX.current - carX.current) * Math.min(delta * 4, 1)

    // Compute dynamic speed for wheels / smoke
    const derivedSpeed = Math.abs(targetX.current - carX.current) * 10 + 2
    speed.current = derivedSpeed

    group.current.position.x = carX.current
    // subtle up/down bounce
    group.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.04
    // drift tilt based on direction and speed
    const tilt = driveState === 'DRIFTING' ? 0.25 : 0
    group.current.rotation.z += (tilt - group.current.rotation.z) * 0.1
    group.current.rotation.y = -0.3 + tilt * 0.5

    // Wheel rotation
    wheelRefs.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += derivedSpeed * delta * 2.5
    })

    // Camera follow with slight lag and shake
    const targetCamX = carX.current * 0.7
    const shake = driveState === 'DRIFTING' ? (Math.random() - 0.5) * 0.04 : 0
    camera.position.x += (targetCamX - camera.position.x) * 0.04
    camera.position.y = 2 + shake
    camera.lookAt(carX.current * 0.6, 0.4, 0)
  })

  return (
    <group ref={group} dispose={null} position={[carX.current, 0, 0]}>
      <primitive object={scene.clone()} scale={0.8} rotation={[0, Math.PI / 2, 0]} />
      <SmokeSystem carState={driveState} speed={speed} />
      <SparkSystem carState={driveState} speed={speed} />
      <DustParticles />
    </group>
  )
    }
