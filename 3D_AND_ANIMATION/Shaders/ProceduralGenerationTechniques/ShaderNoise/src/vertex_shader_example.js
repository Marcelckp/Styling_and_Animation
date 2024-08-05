import { p5 } from "p5js-wrapper";

let coolVertExample;
const vertexCount = 500;
let vertices = new Array(vertexCount).fill("1");
let vertexIds = [];

// let sketch6 = new p5((p) => {
//   // load in the shader files
//   // p.preload = function () {
//   //   coolVertExample = p.loadShader(
//   //     "../../shaders/cool.vert",
//   //     "../../shaders/cool.frag"
//   //   );
//   // };

//   let vertices = [];

//   p.setup = () => {
//     p.createCanvas(500, 500, p.WEBGL);

//     let vert = `
//     precision mediump float;
//     attribute vec3 aPosition;
//     uniform float time;
//     uniform mat4 uModelViewMatrix;
//     uniform mat4 uProjectionMatrix;
//     void main() {
//       vec3 pos = aPosition;
//       pos.x += sin(pos.y * 10.0 + time) * 0.1; // Example manipulation
//       pos.y += cos(pos.x * 10.0 + time) * 0.1; // Additional manipulation
//       pos.z += sin(pos.x * 10.0 + time) * 0.1; // Manipulate the z-axis
//       gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
//     }
//     `;
//     let frag = `
//     precision mediump float;
//     void main() {
//       gl_FragColor = vec4(0.1, 0., 0., 1.0); // Simple gray color
//     }
//     `;

//     coolVertExample = p.createShader(vert, frag);
//     p.shader(coolVertExample);

//     for (let i = 0; i < vertexCount; i++) {
//       vertices.push(
//         p.createVector(p.random(-1, 1), p.random(-1, 1), p.random(-1, 1))
//       );
//     }

//     // console.log(vertices);
//     p.background(255);
//     p.beginShape(p.POINTS);
//     for (let v of vertices) {
//       // Mutate the vertices based on time
//       // v.x += p.sin(v.y * 10.0 + p.millis() / 200000.0) * 0.1;
//       // v.y += p.cos(v.x * 10.0 + p.millis() / 200000.0) * 0.1;
//       // v.z += p.sin(v.x * 10.0 + p.millis() / 200000.0) * 0.1;

//       p.vertex(v.x * 100, v.y * 100, v.z * 100);
//       coolVertExample.setUniform("vertexId", vertices.indexOf(v));
//     }
//     p.endShape();
//   };

//   /**
//    * Rapid drawing of plotted vertex points
//   p.beginShape(p.POINTS);
//   for (let i = 0; i < vertexCount; i++) {
//     p.vertex(p.random(500, -500), p.random(500, -500), p.random(500, -500));
//     coolVertExample.setUniform("vertexId", i);
//     }
//     p.endShape();
//     */

//    p.draw = () => {
//     const mouse = [p.mouseX, p.height - p.mouseY, p.mouseIsPressed ? 1 : 0];

//     coolVertExample.setUniform("vertexCount", vertexCount);
//     coolVertExample.setUniform("time", p.millis() / 1000.0);
//     coolVertExample.setUniform("resolution", [500, 500]);
//     coolVertExample.setUniform("mouse", mouse);

//   };
// }, "six");

// let sketch6 = new p5((p) => {
//   // load in the shader files
//   p.preload = function () {
//     coolVertExample = p.loadShader(
//       "../../shaders/cool.vert",
//       "../../shaders/cool.frag"
//     );
//   };

//   p.setup = () => {
//     p.createCanvas(500, 500, p.WEBGL);

//     // coolVertExample = p.createShader(vert, frag);
//     p.shader(coolVertExample);

//     // p.background(255);
//     console.log(vertices);
//   };

//   p.draw = () => {
//     p.background(255);
//     // shader() sets the active shader with our shader
//     p.shader(coolVertExample);

//     // Send the frameCount to the shader
//     coolVertExample.setUniform("uFrameCount", p.frameCount);

//     // Rotate our geometry on the X and Y axes
//     p.rotateX(p.frameCount * 0.01);
//     p.rotateY(p.frameCount * 0.005);

//     // Draw some geometry to the screen
//     // We're going to tessellate the sphere a bit so we have some more geometry to work with
//     p.sphere(p.width / 5, 200, 20);
//   };
//   function drawSphere(x, y, z, radius) {
//     p.push(); // enter local coordinate system
//     p.translate(x, y, z);
//     p.sphere(50, 6);
//     p.pop(); // exit local coordinate system (back to global coordinates)
//   }
// }, "six");

let vertexIdBuffer;

// WIP: We still need to figure out how to set a attribute of vertexId to pass into the vertex Shader

let sketch6 = new p5((p) => {
  // load in the shader files
  // p.preload = function () {
  //   coolVertExample = p.loadShader(
  //     "../../shaders/cool.vert",
  //     "../../shaders/cool.frag"
  //   );
  // };

  p.setup = () => {
    p.createCanvas(500, 500, p.WEBGL);

    vertexIds = new Float32Array(vertexCount);
    // Generate vertex IDs
    for (let i = 0; i < vertexCount; i++) {
      vertexIds[i] = i;
    }

    // Define the vertex shader
    let vert = `
      #define PI radians(180.)
  
      attribute float vertexId;
      attribute vec3 aPosition;
attribute vec2 aTexCoord;
      uniform float vertexCount;
      uniform float time;
      uniform vec2 resolution;
      varying vec4 v_color;
  
      mat4 persp(float fov, float aspect, float zNear, float zFar) {
        float f = tan(PI * 0.5 - 0.5 * fov);
        float rangeInv = 1.0 / (zNear - zFar);
  
        return mat4(
          f / aspect, 0, 0, 0,
          0, f, 0, 0,
          0, 0, (zNear + zFar) * rangeInv, -1,
          0, 0, zNear * zFar * rangeInv * 2., 0);
      }
  
      mat4 rotY(float angleInRadians) {
          float s = sin(angleInRadians);
          float c = cos(angleInRadians);
  
          return mat4( 
            c, 0,-s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1);  
      }
  
      float anim(float t) {
        float st = sin(t);
        return (sign(st)*( 1.0-pow(1.0-abs(st), 5.0) ))*0.5+0.5;
      }
  
      vec3 SampleSpherePos(float idx, float num) {
        idx += 0.5;
        float phi = 10.166407384630519631619018026484 * idx;
        float th_cs = 1.0 - 2.0*idx/num;
        float th_sn = sqrt(clamp(1.0 - th_cs*th_cs, 0.0, 1.0));
        return vec3( cos(phi)*th_sn, sin(phi)*th_sn, th_cs );
      }
  
      vec3 SampleCubePos(float idx, float num) {
        float side = floor(pow(num, 1.0/3.0)+0.5);
        vec3 res;
        res.x = mod(idx, side);
        res.y = floor( mod(idx, side*side)/side );
        res.z = floor( mod(idx, side*side*side)/side/side );
        res -= vec3(side * 0.5);
        res *= 1.5/side;
        return res;
      }
  
      void main() {
        vec3 samplePos = mix(SampleCubePos(aTexCoord.x, vertexCount), SampleSpherePos(aTexCoord.x, vertexCount), anim(time));
        
        vec4 vertPos = rotY(time*0.1) * vec4(samplePos, 1.0) + vec4(0,0,-3.0,0);
        
        gl_Position = persp(PI*0.25, resolution.x/resolution.y, 0.1, 100.0) * vertPos;
        gl_PointSize = 3.0; 
  
        v_color = vec4(1,1,1,1);
      }
    `;

    // Define the fragment shader
    let frag = `
      precision mediump float;
      varying vec4 v_color;
      void main() {
        gl_FragColor = v_color;
      }
    `;

    // Create the shader program
    coolVertExample = p.createShader(vert, frag);

    // Setup the attribute buffer for vertex IDs
    // P5 does not seem to have a built in vertexId attribute or a way to add this as an attribute to our shader.
    // We will need to try this example in Three JS or PIXI js [Example](https://www.vertexshaderart.com/src/#s=XQAAAQCcBgAAAAAAAAA9iIpmlGmcB7Xtn81bJpWuqJzDtzPfSjJc7FidBv%2BCHABnvD3Im1gXM5LfckauXAcOGGmva0hEFjyItc9FSmeyHXyXkKrNUX2j3MlYuJghdJrIT6w9Ms0nlLKgSTsECBVcV4xjtnm4ykOEMsHXwBgd9gOISbrEUkcHS9iNgF%2BbtLE4lw4lZKakTvv1Hq9MrIhfX%2BxciDFRQPWo%2Fm1Mer%2BXL8Rj5X9LxHrxuSttpIg%2FsKNa6oOPFZS9TJtKjxB0HAmBOefpqLXDq32NGvcbHI%2BWATaYJ6JPNIpQi5WwdmCgc4SFbBYxp40kZ9dlQiNK%2BA84qzcQA2mPTB3Kj2eU9FSIpqX4TIjrh9FtKsSIA7GUSlZ4UBQ5%2FjYrerP%2BgFezzYeLyJS1HmzAE8BEmJvH%2BWJOP7pIxUt2HcxkIFSBpy6V712nMqSDSogbmyGQL6hhAiYJ4IIqXEcwpDYHW1m6h8zehEAp0o6%2B7ifP6fywXjYX%2BMAfT9Pfb4ShK05tEC1Lch7KzJz%2B515REvR30GGo8XRu%2FLhkyJ9fttyO37veOzVj03ZEjX8olv46lDWv2udLrILbglrPhzdufBIVASN4EhKNLuzfxuC7%2BR2JVjlU0S7TNtKZ1Zq7sr2qyZ4s7QymKJP7NYTllxpDe1YHTYa1UO0qhpjqvA6dDxSIDd7Me7pV7dVFRGg2WIRHlnvTeEVoQg20tOUY1LLV2U70DU6XRtk8ldUN5OVQ8pGsrYwynS2048JGhUNSE4vL4biN5iYa06RGcgmOScAGfjgLawvVI8wsrXkBW3QGdEyUTpYDRUfIet0Gryz5kXecPNPE4oPauWJC5pVAZCJ7L3qRsAGBUT0AfA0qqT2h%2F950FhCmRma5qZYIHGIQ%2BQ23vSD6n4RQGikExsWYTjEW63FIivaBVTKXSBvh9%2BDcNBFJTo8cIV0GXBbo5E8Y84rilCfwA3BrtGkgOkGe6jimBKpohwW0OW%2BBNQ3YVe6I18%2Ff1bC07sXtaJKBdgasv9SD5k4gVhxrYwF0xb2OQCj%2B9lP2UA%3D%3D)
    // p5.setAttribute('vertexId', vertexIds)
  };

  p.draw = () => {
    p.background(255);

    // Use the shader
    p.shader(coolVertExample);

    // Pass the time uniform to the shader
    coolVertExample.setUniform("time", p.millis() / 1000.0);
    coolVertExample.setUniform("vertexCount", vertexCount);
    coolVertExample.setUniform("resolution", [p.width, p.height]);

    // Draw the points
    p.beginShape(p.POINTS);
    for (let i = 0; i < vertexCount; i++) {
      p.vertex(1, 0);
    }
    p.endShape();
  };
}, "six");
