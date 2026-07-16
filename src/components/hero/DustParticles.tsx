import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function DustParticles() {
  const mesh = useRef<THREE.Points>(null!)
  const count = 300
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i*3] = (Math.random() - 0.5) * 25
      arr[i*3+1] = Math.random() * 6
      arr[i*3+2] = (Math.random() - 0.5) * 12
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    mesh.current.rotation.y += 0.03 * delta
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.02} transparent opacity={0.25} depthWrite={false} />
    </points>
  )
}
