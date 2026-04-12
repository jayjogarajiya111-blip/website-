"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, PerspectiveCamera, Float, Ring } from "@react-three/drei";
import * as THREE from "three";

function GalacticRings() {
    const ring1 = useRef<THREE.Mesh>(null);
    const ring2 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ring1.current) {
            ring1.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
            ring1.current.rotation.y = t * 0.1;
        }
        if (ring2.current) {
            ring2.current.rotation.x = Math.PI / 2.2 + Math.cos(t * 0.1) * 0.05;
            ring2.current.rotation.y = -t * 0.15;
        }
    });

    return (
        <group>
            {/* Outer Inner Ring */}
            <Ring ref={ring1} args={[4, 4.2, 64]}>
                <meshStandardMaterial
                    color="#00FFFF"
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                    emissive="#00FFFF"
                    emissiveIntensity={0.5}
                />
            </Ring>

            {/* Inner Inner Ring */}
            <Ring ref={ring2} args={[3.2, 3.4, 64]}>
                <meshStandardMaterial
                    color="#FACC15"
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                    emissive="#FACC15"
                    emissiveIntensity={0.4}
                />
            </Ring>

            {/* Subtle Dust/Particle Ring Effect */}
            <group rotation={[Math.PI / 2, 0, 0]}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <mesh key={i} rotation={[0, 0, (i * Math.PI) / 6]}>
                        <boxGeometry args={[0.05, 0.05, 0.05]} />
                        <meshStandardMaterial color="#00FFFF" transparent opacity={0.5} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

export default function Background() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#020617] overflow-hidden">
            {/* Nebula Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.05),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.05),transparent_50%)]" />

            <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00FFFF" />

                <Stars radius={100} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />

                <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                    <GalacticRings />
                </Float>

                <fog attach="fog" args={["#020617", 5, 20]} />
            </Canvas>
        </div>
    );
}
