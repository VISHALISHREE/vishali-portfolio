import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { FloatingSculpture } from './FloatingSculpture'
import { ParticleField } from './ParticleField'

export function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 })
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window
    mouse.current.x = (e.clientX / innerWidth) * 2 - 1
    mouse.current.y = (e.clientY / innerHeight) * 2 - 1
  }

  return (
    <div
      className="absolute inset-0"
      onPointerMove={handlePointerMove}
      aria-hidden
    >
      <Canvas
        dpr={isMobile ? 1 : [1, 1.75]}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#05050c']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 3, 5]} intensity={2} color="#6fa0ff" />
        <pointLight position={[-4, -2, -3]} intensity={1.4} color="#d946a8" />

        <Suspense fallback={null}>
          <FloatingSculpture mouse={mouse} simplified={isMobile} />
          {!isMobile && <ParticleField count={450} />}
          <Environment preset="city" environmentIntensity={0.4} />
        </Suspense>
      </Canvas>
    </div>
  )
}
