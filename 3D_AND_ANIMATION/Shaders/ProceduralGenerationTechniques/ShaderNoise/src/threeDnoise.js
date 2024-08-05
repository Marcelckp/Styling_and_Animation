import { p5 } from "p5js-wrapper";

let egs, img, cam;

let sketchers = new p5((p) => {
  p.setup = function () {
    const container = document.querySelector("#d3-noise");
    const canvas = p.createCanvas(500, 500, p.WEBGL);
    egs = p.loadShader(
      "../../shaders/threeD.vert",
      "../../shaders/threeD.frag"
    );
    img = p.loadImage("../../8k_earth_daymap.jpg");
    container.appendChild(canvas.elt);
    p.noStroke();

    // Create and set up the camera
    cam = p.createCamera();
    cam.setPosition(0, 0, 500); // Set initial camera position
    cam.lookAt(0, 0, 0); // Look at the center of the canvas
  };

  p.draw = function () {
    p.background(0);

    img.resize(500, 500);
    p.shader(egs);

    egs.setUniform("flowerTexture", img);
    egs.setUniform("noiseScale", 0.5);
    egs.setUniform("noiseStrength", 0.2);
    egs.setUniform("time", p.millis() / 1000.0);

    p.orbitControl(); // Allows the camera to be controlled with the mouse

    // Draw the sphere
    p.push();
    p.translate(0, 0, 0); // Center the sphere
    p.sphere(200, 300); // Draw a sphere with radius 200
    p.pop();
  };
}, "perly two");
