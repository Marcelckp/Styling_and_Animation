import mysound from "./sounds/strong-hit.mp3";
import { sketch } from "p5js-wrapper";
import "p5js-wrapper/sound";
import "../css/style.css";

let soundEffect;
let exampleShader;

// load in the shader files
sketch.preload = function () {
  exampleShader = loadShader(
    "../../shaders/shader.vert",
    // "../../shaders/shader.frag",
    // "../../shaders/sdf.frag",
    "../../shaders/shaderArt.frag"
  );
};

sketch.setup = function () {
  createCanvas(500, 500, WEBGL);
  // soundEffect = loadSound(mysound);
};

// This function is run for every frame of the animation being drawn
sketch.draw = function () {
  // ellipse(-width / 2, -height / 2, width, height, 150); // If we use this as the drawn element we can see that the fragment shader will act for all the pixels within the object and not the background.
  noStroke();
  background(255);
  shader(exampleShader);

  const mouse = [mouseX, height - mouseY, mouseIsPressed ? 1 : 0];
  exampleShader.setUniform("resolution", [500, 500]); // The Z value is not used in the shader as its 2D and not 3D were the Z value would be used for depth.
  exampleShader.setUniform("time", millis() / 1000.0);
  exampleShader.setUniform("mouse", mouse);

  // console.log(mouse);

  // Draw a shape using the shader
  // ellipse(0, 0, 100, 200);

  rect(500, 500, 500);
};

sketch.mousePressed = function () {
  console.log("here");
  // soundEffect.play();
};
