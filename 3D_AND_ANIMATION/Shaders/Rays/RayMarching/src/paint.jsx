import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import vertexShader from "./glsl/vertex.glsl";
import fragmentShader from "./glsl/fragment.glsl";

const DPR = 1;

const Raymarching = () => {
  const mesh = useRef();
  const { viewport } = useThree();

  const uniforms = {
    uTime: new THREE.Uniform(0.0),
    uResolution: new THREE.Uniform(new THREE.Vector2()),
  };

  // This will run in the request animation frame
  // Notice that with Ray marching we do not use geometry. We use math to calculate the position of the pixels. In the fragment shader we use ray marching to draw and adjust the pixels over time. with the uTime uniform.
  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
    mesh.current.material.uniforms.uResolution.value = new THREE.Vector2(
      window.innerWidth * DPR,
      window.innerHeight * DPR
    );
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        // wireframe={true} // Uncomment to see the wireframe and notice that it will just contain 2 triangles that will cover the whole screen since our plane geometry is just 1x1 and we scale it to the size of the screen.
        // Notice the [1, 1] argument above
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
      camera={{ position: [0, 0, 60] }}
      dpr={DPR}
    >
      <Suspense fallback={null}>
        <Raymarching />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
