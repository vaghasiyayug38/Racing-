import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SmokeProps {
  carState: string
  speed: React.MutableRefObject<number>
}

export default function SmokeSystem({ carState, speed }: SmokeProps) {
  const count = 100
  const mesh = useRef<THREE.Points>(null!)
  const positions = useMemo(() => new Float32Array(count * 3), [])
  const velocities = useMemo(() => new Float32Array(count * 3), [])
  const lifetimes = useMemo(() => new Float32Array(count), [])
  const sizes = useMemo(() => new Float32Array(count), [])

  useMemo(() => {
    for (let i = 0; i < count; i++) {
      positions[i*3] = -100; positions[i*3+1] = -100; positions[i*3+2] = -100
      lifetimes[i] = 0; sizes[i] = 0
    }
  }, [])

  useFrame((_, delta) => {
    const pos = mesh.current.geometry.attributes.position.array as Float32Array
    const siz = mesh.current.geometry.attributes.size?.array as Float32Array

    for (let i = 0; i < count; i++) {
      if (lifetimes[i] > 0) {
        velocities[i*3] += (Math.random() - 0.5) * 0.02
        velocities[i*3+1] += 0.03
        velocities[i*3+2] += (Math.random() - 0.5) * 0.02
        pos[i*3] += velocities[i*3] * delta
        pos[i*3+1] += velocities[i*3+1] * delta
        pos[i*3+2] += velocities[i*3+2] * delta
        lifetimes[i] -= delta
        sizes[i] += delta * 2.5
        if (lifetimes[i] <= 0) {
          pos[i*3] = -100; pos[i*3+1] = -100; pos[i*3+2] = -100
          sizes[i] = 0
        }
      }
    }

    if ((carState === 'DRIFTING' || carState === 'ENTERING') && speed.current > 5) {
      for (let i = 0; i < 3; i++) {
        const idx = findDead(lifetimes)
        if (idx === -1) break
        positions[idx*3] = -1.2
        positions[idx*3+1] = 0.2
        positions[idx*3+2] = (Math.random() - 0.5) * 0.8
        velocities[idx*3] = (Math.random() - 0.5) * 2
        velocities[idx*3+1] = 0.5 + Math.random()
        velocities[idx*3+2] = (Math.random() - 0.5) * 2
        lifetimes[idx] = 1.5 + Math.random()
        sizes[idx] = 0.5
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.geometry.attributes.size.needsUpdate = true
  })

  function findDead(lifetimes: Float32Array) {
    for (let i = 0; i < count; i++) if (lifetimes[i] <= 0) return i
    return -1
  }

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        color="#aaaaaa" size={0.5} transparent depthWrite={false}
        blending={THREE.NormalBlending} opacity={0.4} sizeAttenuation
      />
    </points>
  )
}
