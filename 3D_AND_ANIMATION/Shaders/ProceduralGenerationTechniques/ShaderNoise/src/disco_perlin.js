import { p5 } from "p5js-wrapper";

let sketch2 = new p5((p) => {
  let sizes = [];
  let cols;
  let rows;
  let size = 10;
  let xoff = 0;
  let yoff = 0;
  let inc = 0.1;
  let zoff = 0;

  p.setup = () => {
    const container = document.querySelector("#perlin");
    const canvas = p.createCanvas(500, 500);
    p.rectMode(p.CENTER);
    cols = p.width/size;
    rows = p.height/size;

    container.appendChild(canvas.elt);
  }

  // Note this is the draw function that is called every frame of the animation which is about 60 frames per second. This will generate a new noise value for each pixel on the screen every frame iteration which will give the appearance of movement. 
  // In this example we are adjusting the size of the polygons on the screen based on the noise value generated for each pixel.
  p.draw = () => {
    // console.log(zoff)
    // console.log('sizes -> ', sizes)
    p.background(220);
    xoff = 0;
    for (let i = 0; i < cols; i++) {
      sizes[i] = [];
      yoff = 0;
      for (let j = 0; j < rows; j++) {
        sizes[i][j] = p.map(p.noise(xoff, yoff, zoff), 0, 1, 0, size * 1.5);
        yoff += inc;

        let r = p.noise(zoff) * 255;
        let g = p.noise(zoff + 15) * 255;
        let b = p.noise(zoff + 30) * 255;

        p.fill(r, g, b);
        p.noStroke();
        p.rect(
          size / 2 + i * size,
          size / 2 + j * size,
          sizes[i][j],
          sizes[i][j]
        );
      }
      xoff += inc;
      zoff += 0.00010;
    }
  }
}, "two");
