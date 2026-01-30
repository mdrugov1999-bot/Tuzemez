
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const HeartHalf: React.FC<{ side: 'left' | 'right'; scrollProgress: number }> = ({ side, scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Simple "half heart" using a sphere distorted
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 32, 32);
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      // Flatten one side and pull top/bottom for heart shape
      if (side === 'left' && x > 0) positions.setX(i, x * 0.1);
      if (side === 'right' && x < 0) positions.setX(i, x * 0.1);
      
      const newY = y + Math.abs(x) * 0.5;
      positions.setY(i, newY);
    }
    geo.computeVertexNormals();
    return geo;
  }, [side]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const targetX = side === 'left' ? -0.8 + scrollProgress * 0.8 : 0.8 - scrollProgress * 0.8;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    meshRef.current.rotation.z = side === 'left' ? 0.2 : -0.2;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="#E9DCC9" roughness={0.1} metalness={0.2} />
    </mesh>
  );
};

export const Scene3D: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <HeartHalf side="left" scrollProgress={scrollProgress} />
          <HeartHalf side="right" scrollProgress={scrollProgress} />
        </Float>
        {/* Changed preset 'soft' to 'studio' to fix runtime error */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};
