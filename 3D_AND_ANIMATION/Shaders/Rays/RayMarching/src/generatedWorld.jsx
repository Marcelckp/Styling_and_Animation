import { useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import noise from "./assets/noiseMap.png";

import vertexShader from "./glsl/vertex.glsl";
import fragmentShader from "./glsl/generatedWorldFragment.glsl";

const DPR = 1;

// Noise Texture
const TEXTURE_URL = noise;

const Raymarching = () => {
  const mesh = useRef();
  const { viewport } = useThree();

  const texture = useTexture(TEXTURE_URL);

  // This ensures that the texture repeats when the UVs are greater than 1
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // This ensures that the texture is pixelated so that we can see the individual pixels in the texture because we want to show the noise texture as it is
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const uniforms = {
    uTime: new THREE.Uniform(0.0),
    uResolution: new THREE.Uniform(new THREE.Vector2()),
    uTexture: new THREE.Uniform(null),
  };

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
    mesh.current.material.uniforms.uResolution.value = new THREE.Vector2(
      window.innerWidth * DPR,
      window.innerHeight * DPR
    );
    // Set the texture to the shader material
    mesh.current.material.uniforms.uTexture.value = texture;
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        key={uuidv4()}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 0, 6] }}
      dpr={DPR}
    >
      <Suspense fallback={null}>
        <Raymarching />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
