import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import { PlaneGeometry } from "three";
import { v4 as uuidv4 } from "uuid";

import vertexShader from "./glsl/main.vert";
import fragmentShader from "./glsl/main.frag";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// ASSETS
import cloud from "./textures/grayNoise.png";
import noise from "./textures/noise.png";
import mediumNoise from "./textures/mediumNoise.png";

// import { CameraControls } from "@react-three/drei";
// import { button, buttonGroup, folder, useControls } from "leva";
// import { DEG2RAD } from "three/src/math/MathUtils.js";

extend({ PlaneGeometry });

// This need elaboration since we cannot be in the 3D scene this potentially block our ability to view the clouds being created in the scene. The scene can be seen here -> https://www.shadertoy.com/view/XslGRr

// Notice that when the camera is turned to the side we can kind of see multiple cloud noise images being moved closer and closer to the screen with time. We are generating multiple of these cloud texture and moving them to the camera to create the illusion of moving through clouds.

// Find a way to V Flip the image to make it look like the clouds are moving upwards. This can be done by flipping the image in the fragment shader.

// If you toggle V flip off on shader toy you will see that you can see the image is flipped and you will see the circle origin point that will be the center of the image. This is the point where the image is being moved to the camera. If we VFlip with point will not be seen.

const Raymarching = () => {
  const mesh = useRef();
  const { viewport } = useThree();

  const noiseTexture = useLoader(TextureLoader, cloud);

  noiseTexture.wrapS = THREE.RepeatWrapping;
  noiseTexture.wrapT = THREE.RepeatWrapping;
  noiseTexture.minFilter = THREE.LinearMipmapLinearFilter;
  noiseTexture.magFilter = THREE.LinearMipmapLinearFilter;
  // noiseTexture.flipY = true;

  const ditherTexture = useLoader(TextureLoader, noise);

  ditherTexture.wrapS = THREE.RepeatWrapping;
  ditherTexture.wrapT = THREE.RepeatWrapping;
  ditherTexture.minFilter = THREE.LinearMipmapLinearFilter;
  ditherTexture.magFilter = THREE.LinearMipmapLinearFilter;
  ditherTexture.flipY = true;

  const volumeTexture = useLoader(TextureLoader, mediumNoise);

  volumeTexture.wrapS = THREE.RepeatWrapping;
  volumeTexture.wrapT = THREE.RepeatWrapping;
  volumeTexture.minFilter = THREE.LinearMipmapLinearFilter;
  volumeTexture.magFilter = THREE.LinearMipmapLinearFilter;
  volumeTexture.flipY = true;

  const [mouse, setMouse] = useState([0, 0, 0, 0]);

  // Handle mouse movement and clicks
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse((prev) => [event.clientX, event.clientY, prev[2], prev[3]]);
    };

    const handleMouseDown = (event) => {
      setMouse([event.clientX, event.clientY, event.clientX, event.clientY]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3(10, 10, 1) },
    iMouse: { value: new THREE.Vector4(...mouse) },
    iChannel0: { value: noiseTexture },
    iChannel1: { value: ditherTexture },
    iChannel2: { value: volumeTexture },
  };

  // This will run in the request animation frame
  // Notice that with Ray marching we do not use geometry. We use math to calculate the position of the pixels. In the fragment shader we use ray marching to draw and adjust the pixels over time. with the uTime uniform.
  useFrame((state) => {
    const { clock, size } = state;

    mesh.current.material.uniforms.iChannel0.value = noiseTexture;
    mesh.current.material.uniforms.iChannel1.value = ditherTexture;
    mesh.current.material.uniforms.iChannel2.value = volumeTexture;
    mesh.current.material.uniforms.iMouse.value = new THREE.Vector4(...mouse);

    mesh.current.material.uniforms.iTime.value = clock.getElapsedTime();
    mesh.current.material.uniforms.iResolution.value = new THREE.Vector3(
      size.width,
      size.height,
      1
    );
  });

  // const cameraControlsRef = useRef();
  // const { camera } = useThree();

  // const {
  //   minDistance,
  //   enabled,
  //   verticalDragToForward,
  //   dollyToCursor,
  //   infinityDolly,
  // } = useControls({
  //   thetaGrp: buttonGroup({
  //     label: "rotate theta",
  //     opts: {
  //       "+45º": () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
  //       "-90º": () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
  //       "+360º": () =>
  //         cameraControlsRef.current?.rotate(360 * DEG2RAD, 0, true),
  //     },
  //   }),
  //   phiGrp: buttonGroup({
  //     label: "rotate phi",
  //     opts: {
  //       "+20º": () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
  //       "-40º": () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true),
  //     },
  //   }),
  //   truckGrp: buttonGroup({
  //     label: "truck",
  //     opts: {
  //       "(1,0)": () => cameraControlsRef.current?.truck(1, 0, true),
  //       "(0,1)": () => cameraControlsRef.current?.truck(0, 1, true),
  //       "(-1,-1)": () => cameraControlsRef.current?.truck(-1, -1, true),
  //     },
  //   }),
  //   dollyGrp: buttonGroup({
  //     label: "dolly",
  //     opts: {
  //       1: () => cameraControlsRef.current?.dolly(1, true),
  //       "-1": () => cameraControlsRef.current?.dolly(-1, true),
  //     },
  //   }),
  //   zoomGrp: buttonGroup({
  //     label: "zoom",
  //     opts: {
  //       "/2": () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
  //       "/-2": () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true),
  //     },
  //   }),
  //   minDistance: { value: 0 },
  //   moveTo: folder(
  //     {
  //       vec1: { value: [3, 5, 2], label: "vec" },
  //       "moveTo(…vec)": button((get) =>
  //         cameraControlsRef.current?.moveTo(...get("moveTo.vec1"), true)
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   "fitToBox(mesh)": button(() =>
  //     cameraControlsRef.current?.fitToBox(mesh.current, true)
  //   ),
  //   setPosition: folder(
  //     {
  //       vec2: { value: [-5, 2, 1], label: "vec" },
  //       "setPosition(…vec)": button((get) =>
  //         cameraControlsRef.current?.setPosition(
  //           ...get("setPosition.vec2"),
  //           true
  //         )
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   setTarget: folder(
  //     {
  //       vec3: { value: [3, 0, -3], label: "vec" },
  //       "setTarget(…vec)": button((get) =>
  //         cameraControlsRef.current?.setTarget(...get("setTarget.vec3"), true)
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   setLookAt: folder(
  //     {
  //       vec4: { value: [1, 2, 3], label: "position" },
  //       vec5: { value: [1, 1, 0], label: "target" },
  //       "setLookAt(…position, …target)": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           ...get("setLookAt.vec4"),
  //           ...get("setLookAt.vec5"),
  //           true
  //         )
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   lerpLookAt: folder(
  //     {
  //       vec6: { value: [-2, 0, 0], label: "posA" },
  //       vec7: { value: [1, 1, 0], label: "tgtA" },
  //       vec8: { value: [0, 2, 5], label: "posB" },
  //       vec9: { value: [-1, 0, 0], label: "tgtB" },
  //       t: { value: Math.random(), label: "t", min: 0, max: 1 },
  //       "f(…posA,…tgtA,…posB,…tgtB,t)": button((get) => {
  //         return cameraControlsRef.current?.lerpLookAt(
  //           ...get("lerpLookAt.vec6"),
  //           ...get("lerpLookAt.vec7"),
  //           ...get("lerpLookAt.vec8"),
  //           ...get("lerpLookAt.vec9"),
  //           get("lerpLookAt.t"),
  //           true
  //         );
  //       }),
  //     },
  //     { collapsed: true }
  //   ),
  //   saveState: button(() => cameraControlsRef.current?.saveState()),
  //   reset: button(() => cameraControlsRef.current?.reset(true)),
  //   enabled: { value: true, label: "controls on" },
  //   verticalDragToForward: {
  //     value: false,
  //     label: "vert. drag to move forward",
  //   },
  //   dollyToCursor: { value: false, label: "dolly to cursor" },
  //   infinityDolly: { value: false, label: "infinity dolly" },
  // });

  return (
    <>
      <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry args={[3, 3]} />
        <shaderMaterial
          key={uuidv4()}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </mesh>
      {/* <CameraControls
        ref={cameraControlsRef}
        minDistance={minDistance}
        enabled={enabled}
        verticalDragToForward={verticalDragToForward}
        dollyToCursor={dollyToCursor}
        infinityDolly={infinityDolly}
      /> */}
    </>
  );
};

const Scene = () => {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 0, 1] }}
    >
      <Suspense fallback={null}>
        <Raymarching />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
