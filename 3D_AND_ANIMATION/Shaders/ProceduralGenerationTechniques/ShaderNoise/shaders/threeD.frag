precision highp float;

uniform sampler2D flowerTexture;

varying vec2 vTexCoord;
varying float z;

uniform float time;

void main(){
  
  vec2 uv = vTexCoord;
  
  
  vec4 flowerColor = texture2D(flowerTexture, fract(uv + time * 0.005));
  // vec4 camColor = texture2D(camTexture, uv);
  
  // gl_FragColor =  mix(flowerColor, camColor, z * 0.005);
  
  gl_FragColor = flowerColor;
  // gl_FragColor = vec4(vec3(z * 0.005), 1.0);
}