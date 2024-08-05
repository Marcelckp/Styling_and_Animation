import React from "react";
import ReactDOM from "react-dom/client";
import Scene from "./paint.jsx";
import SceneTwo from "./sphere.jsx";
import SceneThree from "./cameraMovement.jsx";
import SceneFour from "./cube.jsx";
import SceneFive from "./generatedWorld.jsx";
import SceneSix from "./cloudsRayMarch.jsx";
import SceneSeven from "./cloudRayMarchingJourney.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      {/* 
      <Scene />
      <br />
      <SceneTwo />
      <br />
      <SceneThree />
      <br />
      <SceneFour />
      <br />
      <SceneFive />
      <br />
      <SceneSix />
      <br />
      */}
      <SceneSeven />
      <br />
      {/* <SceneEight /> */}
    </>
  </React.StrictMode>
);
