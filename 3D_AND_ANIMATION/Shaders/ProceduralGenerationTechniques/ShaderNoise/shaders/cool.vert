#define PI radians(180.)

precision mediump float;

uniform float vertexId;
uniform float vertexCount;
uniform float time;
uniform vec2 resolution;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;
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

// void main() {
//   vec3 samplePos = mix(SampleCubePos(vertexId, vertexCount), SampleSpherePos(vertexId, vertexCount), anim(time));
  
//   vec4 vertPos = rotY(time*0.1) * vec4(samplePos, 1.0) + vec4(0,0,-3.0,0);
  
//   gl_Position = persp(PI*0.25, resolution.x/resolution.y, 0.1, 100.0) * vertPos;
//   gl_PointSize = 3.0; 

//   v_color = vec4(1, 0, 0, 1);

//     pos = aTexCoord;

//     vec4 position = vec4(aPosition + 2., 1.0);
//     position.xy = position.xy * 2. - 1.;

//     gl_Position = position;
// }

// Get the vertex normal attribute from the geometry
attribute vec3 aNormal;

// When we use 3d geometry, we need to also use some builtin variables that p5 provides
// Most 3d engines will provide these variables for you. They are 4x4 matrices that define
// the camera position / rotation, and the geometry position / rotation / scale
// There are actually 3 matrices, but two of them have already been combined into a single one
// This pre combination is an optimization trick so that the vertex shader doesn't have to do as much work

// Get the framecount uniform
uniform float uFrameCount;

varying vec2 vTexCoord;
varying vec3 vNormal;

void main() {

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Frequency and Amplitude will determine the look of the displacement
  float frequency = 20.0;
  float amplitude = 0.1;

  // Displace the x position withe the sine of the x + time. Multiply by the normal to move it in the correct direction
  // You could add more distortions to the other axes too. 
  float distortion = sin(positionVec4.x * frequency + uFrameCount * 0.1);
  positionVec4.x += distortion * aNormal.x * amplitude;

  // Send the normal to the fragment shader
  vNormal = aNormal;


  // Move our vertex positions into screen space
  // The order of multiplication is always projection * view * model * position
  // In this case model and view have been combined so we just do projection * modelView * position
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;

  // Send the texture coordinates to the fragment shader
  vTexCoord = aTexCoord;
}