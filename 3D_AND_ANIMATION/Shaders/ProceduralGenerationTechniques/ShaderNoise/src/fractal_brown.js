import mysound from "./sounds/strong-hit.mp3";
import { p5 } from "p5js-wrapper";
import "p5js-wrapper/sound";
import "../css/style.css";

let soundEffect;
let exampleShader;

let sketch = new p5((p) => {
  // load in the shader files
  p.preload = function () {
    exampleShader = p.loadShader(
      "../../shaders/noise.vert",
      "../../shaders/noise.frag"
    );
  };

  p.setup = function () {
    const container = document.querySelector("#fractal_brown");
    const canvas = p.createCanvas(500, 500, p.WEBGL);
    container.appendChild(canvas.elt);
    // soundEffect = loadSound(mysound);
  };

  p.draw = function () {
    p.noStroke();
    p.background(255);
    p.shader(exampleShader);

    const mouse = [p.mouseX, p.height - p.mouseY, p.mouseIsPressed ? 1 : 0];
    exampleShader.setUniform("u_resolution", [500, 500]);
    exampleShader.setUniform("u_time", p.millis() / 1000.0);
    exampleShader.setUniform("u_mouse", p.mouse);
    p.rect(500, 500, 500);
  };

  p.mousePressed = function () {
    console.log("here");
    // soundEffect.play();
  };
}, "one");
