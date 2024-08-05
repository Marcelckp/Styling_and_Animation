import { p5 } from "p5js-wrapper";
import { sketch } from "p5js-wrapper";

let vCamEffectsShader,
  vCam,
  effectNum = 1;

sketch.preload = () => {
  vCamEffectsShader = loadShader(
    "../../shaders/effect.vert",
    "../../shaders/effect.frag"
  );
};

sketch.setup = () => {
  createCanvas(1000, 1000, WEBGL);
  noStroke();

  // initialize the webcam at the window size
  vCam = createCapture(VIDEO);
  vCam.size(1000, 1000);

  // hide the html element that createCapture adds to the screen
  vCam.hide();
};

sketch.draw = () => {
  shader(vCamEffectsShader);

  vCamEffectsShader.setUniform("iResolution", [1000, 1000, 0]);
  // vCamEffectsShader.setUniform("iTime", millis() / 1000.0);
  // vCamEffectsShader.setUniform("iMouse", mouseX / 1000);
  vCamEffectsShader.setUniform("iEffectNum", effectNum);
  vCamEffectsShader.setUniform("iChannel0", vCam);

  // console.log(vCam)

  rect(0, 0, width, height);
  // background(220);
};

sketch.mousePressed = () => {
  effectNum++;
  if (effectNum > 6) {
    effectNum = 1;
  }
  console.log("Changing your effect to effect number -> ", effectNum);
};

sketch.windowResized = () => {
  resizeCanvas(1000, 1000);
};
