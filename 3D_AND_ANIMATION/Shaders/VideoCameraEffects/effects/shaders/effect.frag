precision mediump float;

// grab texcoords from the vertex shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D iChannel0;
uniform int iEffectNum;
uniform float iMouse;
uniform vec2 iResolution;

// this is a common glsl function of unknown origin to convert rgb colors to luminance
// it performs a dot product of the input color against some known values that account for our eyes perception of brighness
// i pulled this one from here https://github.com/hughsk/glsl-luma/blob/master/index.glsl
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}


vec4 WebCamPixelAt(vec2 pos) {
  return texture2D(iChannel0, pos);
}

void main() {
  if (iEffectNum == 1) {
    vec2 uv = vTexCoord;

    // the texture is loaded upside down and backwards by default so lets flip it
    uv = 1.0 - uv;

    // get the webcam as a vec4 using texture2D
    vec4 tex = texture2D(iChannel0, uv);

    // convert the texture to grayscale by using the luma function  
    float gray = luma(tex.rgb);

    // here we will use the step function to convert the image into black or white
    // any color less than iMouse will become black, any color greater than mouseX will become white
    float thresh = gray;

    // output the threshold value in all three rgb color channels
    gl_FragColor = vec4(thresh, thresh, thresh, 1.0);
  } else if (iEffectNum == 2) {
    gl_FragColor = vec4(WebCamPixelAt(vec2(gl_FragCoord.xy / iResolution.xy)));
    if (int(mod(gl_FragCoord.x, 2.0)) == 0) {
        gl_FragColor = WebCamPixelAt(1.0 - gl_FragCoord.xy / iResolution.xy);
    }
  }
  else if (iEffectNum == 3) {
    gl_FragColor =  vec4(WebCamPixelAt(vec2(gl_FragCoord.xy / iResolution.xy)));
    gl_FragColor = gl_FragColor - vec4(WebCamPixelAt((gl_FragCoord.xy+vec2(1., 1.))/iResolution.xy));
  } 
  else if (iEffectNum == 4) {
    gl_FragColor =  WebCamPixelAt( vec2(gl_FragCoord.x / iResolution.x, 1.0 - gl_FragCoord.y / iResolution.y));
    gl_FragColor =  WebCamPixelAt( vec2(gl_FragColor.x, gl_FragColor.y));
  } else if (iEffectNum == 5) {
    gl_FragColor =  WebCamPixelAt( vec2(gl_FragCoord.x / iResolution.x, 1.0 - gl_FragCoord.y / iResolution.y));
    gl_FragColor =  WebCamPixelAt( vec2(gl_FragColor.y, gl_FragColor.x));   
  } else if (iEffectNum == 6) {
    gl_FragColor =  WebCamPixelAt(1.0 - (gl_FragCoord.xy+sin(gl_FragCoord.xy.x*25.)*4.)/iResolution.xy);
  }
}