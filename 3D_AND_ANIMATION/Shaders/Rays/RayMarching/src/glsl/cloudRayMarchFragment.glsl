uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uBlueNoise;
uniform sampler2D uNoise;
uniform int uFrame;

#define MAX_STEPS 60
#define MAX_STEPS_LIGHTS 6
#define ABSORPTION_COEFFICIENT 0.9
#define SCATTERING_ANISO 0.3
#define PI 3.14159265359

float sdSphere(vec3 p, float radius) {
  return length(p) - radius;
}

float BeersLaw (float dist, float absorption) {
  return exp(-dist * absorption);
}

float HenyeyGreenstein(float g, float mu) {
  float gg = g * g;
	return (1.0 / (4.0 * PI))  * ((1.0 - gg) / pow(1.0 + gg - 2.0 * g * mu, 1.5));
}

float noise( in vec3 x ) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f*f*(3.0-2.0*f);

  vec2 uv = (p.xy+vec2(37.0,239.0)*p.z) + f.xy;
  vec2 tex = textureLod(uNoise,(uv+0.5)/256.0,0.0).yx;

  return mix(tex.x, tex.y, f.z) * 2.0 - 1.0;
}

float fbm(vec3 p, bool lowRes) {
  vec3 q = p + uTime * 0.5 * vec3(1.0, -0.2, -1.0);
  float g = noise(q);

  float f = 0.0;
  float scale = 0.45;
  float factor = 2.02;
 
  int maxOctave = 6;

  if(lowRes) {
    maxOctave = 3;
  }

  for (int i = 0; i < maxOctave; i++) {
      f += scale * noise(q);
      q *= factor;
      factor += 0.21;
      scale *= 0.5;
  }

  return f;
}

float scene(vec3 p, bool lowRes) {
  float distance = sdSphere(p, 1.2);

  float f = fbm(p, lowRes);

  return -distance + f;
}

const vec3 SUN_POSITION = vec3(2.0, 1.0, 2.0);
const float MARCH_SIZE = 0.16;

float lightmarch(vec3 position, vec3 rayDirection) {
  vec3 sunDirection = normalize(SUN_POSITION);
  float totalDensity = 0.0;
  float marchSize = 0.03;   
 
  for (int step = 0; step < MAX_STEPS_LIGHTS; step++) {
      position += sunDirection * marchSize * float(step);
            
      float lightSample = scene(position, true);
      totalDensity += lightSample;
  }

  float transmittance = BeersLaw(totalDensity, ABSORPTION_COEFFICIENT);
  return transmittance;
}

float raymarch(vec3 rayOrigin, vec3 rayDirection, float offset) {
  float depth = 0.0;
  depth += MARCH_SIZE * offset;
  vec3 p = rayOrigin + depth * rayDirection;
  vec3 sunDirection = normalize(SUN_POSITION);

  float totalTransmittance = 1.0;
  float lightEnergy = 0.0;

  float phase = HenyeyGreenstein(SCATTERING_ANISO, dot(rayDirection, sunDirection));

  for (int i = 0; i < MAX_STEPS; i++) {
    float density = scene(p, false);

    // We only draw the density if it's greater than 0
    if (density > 0.0) {
      float lightTransmittance = lightmarch(p, rayDirection);
      float luminance = 0.025 + density * phase;

      totalTransmittance *= lightTransmittance;
      lightEnergy += totalTransmittance * luminance;
    }

    depth += MARCH_SIZE;
    p = rayOrigin + depth * rayDirection;
  }

  return clamp(lightEnergy, 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  uv -= 0.5;
  uv.x *= uResolution.x / uResolution.y;

  // Ray Origin - camera
  vec3 ro = vec3(0.0, 0.0, 5.0);
  // Ray Direction
  vec3 rd = normalize(vec3(uv, -1.0));
  
  vec3 color = vec3(0.0);

  // Sun and Sky
  vec3 sunColor = vec3(1.0,0.5,0.3);
  vec3 sunDirection = normalize(SUN_POSITION);
  float sun = clamp(dot(sunDirection, rd), 0.0, 1.0);
  // Base sky color
  color = vec3(0.7,0.7,0.90);
  // Add vertical gradient
  color -= 0.8 * vec3(0.90,0.75,0.90) * rd.y;

  float blueNoise = texture2D(uBlueNoise, gl_FragCoord.xy / 1024.0).r;
  float offset = fract(blueNoise + float(uFrame%32) / sqrt(0.5));

  // Cloud
  float res = raymarch(ro, rd, offset);
  color = color + sunColor * res;

  gl_FragColor = vec4(color, 1.0);
}
