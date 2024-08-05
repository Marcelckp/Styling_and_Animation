import { p5 } from "p5js-wrapper";

let exampleShader;
const num = 1000;
let particles = [];
const noiseScale = 0.01;

let sketch = new p5((p) => {
  p.setup = function () {
    const container = document.querySelector("#flow_field");
    const canvas = p.createCanvas(500, 500);
    container.appendChild(canvas.elt);

    for (let i = 0; i < num; i++) {
      particles.push(p.createVector(p.random(p.width), p.random(p.height)));
    }
    p.stroke(255);
    p.strokeWeight(1.2);
  };

  p.draw = function () {
    // p.noStroke();
    p.background(0, 10); // 10% opacity

    // For each particle, calculate the noise value at their vector location and move them in that direction
    particles.forEach((particle) => {
      p.point(particle.x, particle.y);
      // Noise function returns a value between 0 and 1 AND it's deterministic/pure (same input always returns the same output). The noise function is based on Perlin noise.
      let n = p.noise(particle.x * noiseScale, particle.y * noiseScale);
      
      // Map the noise value to an angle using TAU (2 * PI)
      // Converting an angle into X and Y components of a vector -> Trigonometry
      let angle = p.TAU * n;

      // We move the particles by the cosine and sine of the angle to get the X and Y components of the vector 
      // These values are between -1 and 1, so we multiply them by a small number to make the movement more subtle
      // The variable for the particles is global and not defined in the draw function which is run 60 times a second
      // As such it means that the particles position is persisted, updated and used in the next frame of the animation to move the particle from its new current position
      particle.x += p.cos(angle);
      particle.y += p.sin(angle);

      // If they go off screen, reset them to a random location
      if (!isParticleOnScreen(particle)) {
        particle.x = p.random(p.width);
        particle.y = p.random(p.height);
      }
    });
  };

  p.mouseReleased = () => {
    p.stroke(p.random(255), p.random(255), p.random(255));
    p.noiseSeed(p.millis());
  };

  function isParticleOnScreen(particle) {
    return (
      particle.x >= 0 &&
      particle.x <= p.width &&
      particle.y >= 0 &&
      particle.y <= p.height
    );
  }
}, "perl one");


// TODO: Create a flow field example where the flow field particle vectors are drawn to the position of the mouse.