varying vec2 vUv;

void main() {
  vUv = uv;

  // This is a basic vertex shader that maps the view matrix to the model matrix and then to the projection matrix to increase the performance of the raymarching algorithm. 
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
