import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import HeroUI from './hero/HeroUI'
import HeroScene from './hero/HeroScene'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Environment } from '@react-three/drei'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2, 8], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="absolute inset-0"
      >
        <fogExp2 attach="fog" color="#0a0a1a" density={0.025} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight
            castShadow
            position={[5, 10, 5]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <HeroScene />
          <Environment preset="night" />
          <EffectComposer>
            <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={1.2} />
            <Vignette darkness={0.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <HeroUI />
    </section>
  )
}
