import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, BufferAttribute } from 'three'
import type { Points } from 'three'

interface ParticleFieldProps {
  count?: number
}

export function ParticleField({ count = 500 }: ParticleFieldProps) {
  const points = useRef<Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (!points.current) return
    points.current.rotation.y += delta * 0.02
    points.current.rotation.x += delta * 0.005
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <primitive
          attach="attributes-position"
          object={new BufferAttribute(positions, 3)}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8fb4ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
