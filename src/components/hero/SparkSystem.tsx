import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SparkProps {
  carState: string
  speed: React.MutableRefObject<number>
}

export default function SparkSystem({ carState, speed }: SparkProps) {
  const count = 80
  const mesh = useRef<THREE.Points>(null!)
  const positions = useMemo(() => new Float32Array(count * 3), [])
  const velocities = useMemo(() => new Float32Array(count * 3), [])
  const lifetimes = useMemo(() => new Float32Array(count), [])

  useMemo(() => {
    for (let i = 0; i < count; i++) {
      positions[i*3] = -100; positions[i*3+1] = -100; positions[i*3+2] = -100
      lifetimes[i] = 0
    }
  }, [])

  useFrame((_, delta) => {
    const pos = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      if (lifetimes[i] > 0) {
        velocities[i*3] += (Math.random() - 0.5) * 0.6
        velocities[i*3+1] += 0.4
        velocities[i*3+2] += (Math.random() - 0.5) * 0.6
        pos[i*3] += velocities[i*3] * delta
        pos[i*3+1] += velocities[i*3+1] * delta
        pos[i*3+2] += velocities[i*3+2] * delta
        lifetimes[i] -= delta * 3
        if (lifetimes[i] <= 0) {
          pos[i*3] = -100; pos[i*3+1] = -100; pos[i*3+2] = -100
        }
      }
    }

    if ((carState === 'DRIFTING' || carState === 'ENTERING') && speed.current > 8) {
      for (let i = 0; i < 2; i++) {
        const idx = findDead(lifetimes)
        if (idx === -1) break
        positions[idx*3] = -1.2 + Math.random()*0.2
        positions[idx*3+1] = 0.15
        positions[idx*3+2] = (Math.random() - 0.5) * 0.5
        velocities[idx*3] = (Math.random() - 0.5) * 5
        velocities[idx*3+1] = 1.5 + Math.random()*3
        velocities[idx*3+2] = (Math.random() - 0.5) * 5
        lifetimes[idx] = 0.5 + Math.random()*0.4
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  function findDead(lifetimes: Float32Array) {
    for (let i = 0; i < count; i++) if (lifetimes[i] <= 0) return i
    return -1
  }

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffaa00" size={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}
