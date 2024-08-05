uniform float uTime;
uniform vec2 uResolution;

#define MAX_STEPS 120
#define MAX_DIST 100.0
#define SURFACE_DIST 0.001

mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0
  );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotation3d(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

// Tweaked Cosine color palette function from Inigo Quilez
vec3 getColor(float amount) {
  vec3 color = vec3(0.3, 0.5, 0.9) +vec3(0.9, 0.4, 0.2) * cos(6.2831 * (vec3(0.30, 0.20, 0.20) + amount * vec3(1.0)));
  return color * amount;
}

// Sphere distance function from Inigo Quilez to create a sphere
float sdSphere(vec3 p, float radius) {
    return length(p) - radius;
}

// Sine distance function to create a sine wave that will be used to create the surface of the sphere and the background plane. 
float sdSine(vec3 p) {
  return 1.0 - (sin(p.x) + sin(p.y) + sin(p.z))/3.0;
}


// Smooth minimum function that will be used to combine the sphere and the sine wave to create the wrinkled surface of the sphere.
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// Scene function that will be used to create the sphere and the wrinkled surface of the sphere.
float scene(vec3 p) {
  vec3 p1 = rotate(p, vec3(1.0), uTime * 0.4);
  float sphere = sdSphere(p1, 1.5);

  float scale = 8.0 + 6.0 * sin(uTime * 0.5);
  float sine = (0.8 - sdSine(p1 * scale))/(scale * 2.0);

  float distance = max(sphere, sine);

  return distance;
}

// Raymarching function that will be used to render the scene.
float raymarch(vec3 ro, vec3 rd) {
  float dO = 0.0;
  vec3 color = vec3(0.0);

  for(int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * dO;
    float dS = scene(p);

    dO += dS;

    if(dO > MAX_DIST || dS < SURFACE_DIST) {
        break;
    }
  }
  return dO;
}

// Function to calculate the normal of the surface at a given point. The normal is a vector that is perpendicular to the surface at that point. Which means that the normal is pointing outwards/away from the surface.
vec3 getNormal(vec3 p) {
  vec2 e = vec2(.01, 0);

  vec3 n = scene(p) - vec3(
    scene(p-e.xyy),
    scene(p-e.yxy),
    scene(p-e.yyx));

  return normalize(n);
}

// Function to calculate soft shadows. Soft shadows are created by casting multiple rays from the point on the surface towards the light source. The intensity of the shadow is calculated based on the distance of the point from the light source and the distance of the point from the surface.
float softShadows(vec3 ro, vec3 rd, float mint, float maxt, float k ) {
  float resultingShadowColor = 1.0;
  float t = mint;
  for(int i = 0; i < 50 && t < maxt; i++) {
      float h = scene(ro + rd*t);
      if( h < 0.001 )
          return 0.0;
      resultingShadowColor = min(resultingShadowColor, k*h/t );
      t += h;
  }
  return resultingShadowColor ;
}

void main() {
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  uv -= 0.5;
  uv.x *= uResolution.x / uResolution.y;

  // Light Position
  vec3 lightPosition = vec3(-10.0 * cos(uTime), 10.0 * sin(uTime), 10.0 * abs(sin(-uTime * 0.5)));

  vec3 ro = vec3(0.0, 0.0, 5.0);
  vec3 rd = normalize(vec3(uv, -1.0));

  float d = raymarch(ro, rd);
  vec3 p = ro + rd * d;

  vec3 color = vec3(0.0);

  if(d<MAX_DIST) {
    vec3 normal = getNormal(p);
    vec3 lightDirection = normalize(lightPosition - p);
    
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float shadows = softShadows(p, lightDirection, 0.1, 5.0, 64.0);
    color = vec3(1.0, 1.0, 1.0) * getColor(diffuse * shadows);
  }

  gl_FragColor = vec4(color, 1.0);
}
