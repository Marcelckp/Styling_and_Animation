import { p5 } from "p5js-wrapper";

let gameOfLifeShader;

let prevFrame; // This is used to store the previous frame of the game of life simulation

let sketch44 = new p5((p) => {
  // load in the shader files
  p.preload = function () {
    gameOfLifeShader = p.loadShader(
      "../../shaders/gol.vert",
      "../../shaders/gol.frag"
    );
  };

  p.setup = function () {
    const container = document.querySelector("#gol");
    p.pixelDensity(1)
    p.noSmooth();
    const canvas = p.createCanvas(500, 500, p.WEBGL)
    container.appendChild(canvas.elt);

    prevFrame = p.createGraphics(500, 500);
    prevFrame.pixelDensity(1);
    prevFrame.noSmooth();

    p.background(0);
    p.stroke(255);
    p.shader(gameOfLifeShader);
    gameOfLifeShader.setUniform("resolution", [1.0 / 500, 1.0 / 500]);
  };

  p.draw = function () {
    if (p.mouseIsPressed) {
      p.line(
        p.pmouseX - p.width / 2,
        p.pmouseY - p.height / 2,
        p.mouseX - p.width / 2,
        p.mouseY - p.height / 2
      );
    }
    prevFrame.image(p.get(), 0, 0);  

    gameOfLifeShader.setUniform("tex", prevFrame); // We pass in the previous frame as a texture to the shader so it can sample it to calculate the next frame of the simulation
    p.rect(p.width/2, p.height/2, p.width, p.height);
  };
}, "four four");
