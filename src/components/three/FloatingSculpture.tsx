import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'

interface FloatingSculptureProps {
  mouse: { current: { x: number; y: number } }
  simplified?: boolean
}

export function FloatingSculpture({ mouse, simplified = false }: FloatingSculptureProps) {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)
  const shell = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!group.current) return

    const targetX = mouse.current.y * 0.25
    const targetY = mouse.current.x * 0.35
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04
    group.current.rotation.y += (targetY - group.current.rotation.y + delta * 0.15) * 0.06

    if (core.current) {
      core.current.rotation.x += delta * 0.2
      core.current.rotation.y += delta * 0.15
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.1
      shell.current.rotation.z += delta * 0.06
    }

    const t = state.clock.getElapsedTime()
    group.current.position.y = Math.sin(t * 0.6) * 0.15
  })

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group}>
        <mesh ref={core} castShadow>
          <icosahedronGeometry args={[1.05, simplified ? 2 : 6]} />
          <MeshDistortMaterial
            color="#3d7bff"
            emissive="#1a2f8f"
            emissiveIntensity={0.4}
            distort={0.32}
            speed={1.6}
            roughness={0.15}
            metalness={0.4}
          />
        </mesh>

        <mesh ref={shell} scale={1.55}>
          <icosahedronGeometry args={[1, 0]} />
          {simplified ? (
            <meshStandardMaterial
              color="#8b5cf6"
              wireframe
              transparent
              opacity={0.35}
            />
          ) : (
            <MeshTransmissionMaterial
              color="#8b5cf6"
              thickness={0.5}
              roughness={0.08}
              transmission={1}
              ior={1.3}
              chromaticAberration={0.04}
              anisotropy={0.3}
              distortion={0.15}
              distortionScale={0.3}
              temporalDistortion={0.1}
              backside
            />
          )}
        </mesh>
      </group>
    </Float>
  )
}
