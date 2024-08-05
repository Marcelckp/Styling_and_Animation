attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uModelMatrix;

varying vec2 vTexCoord;
varying float z;

uniform float time;
uniform float noiseScale; // Adjust the scale of the noise
uniform float noiseStrength; // Adjust the strength of the noise

float random (in vec3 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec3 st) {
    vec3 i = floor(st);
    vec3 fraction = fract(st);

    // Eight corners in 3D of a tile
    float a = random(i);
    float b = random(i + vec3(1.0, 0.0, 0.0));
    float c = random(i + vec3(0.0, 1.0, 0.0));
    float d = random(i + vec3(1.0, 1.0, 0.0));
    float e = random(i + vec3(0.0, 0.0, 1.0));
    float fValue = random(i + vec3(1.0, 0.0, 1.0));
    float g = random(i + vec3(0.0, 1.0, 1.0));
    float h = random(i + vec3(1.0, 1.0, 1.0));

    vec3 u = fraction * fraction * (3.0 - 2.0 * fraction);

    return mix(mix(mix(a, b, u.x), mix(c, d, u.x), u.y),
               mix(mix(e, fValue, u.x), mix(g, h, u.x), u.y),
               u.z);
}

float luma(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

void main(){
    vTexCoord = aTexCoord;
    
    vec4 position = vec4(aPosition, 1.0);
    
    // Apply noise to the position
    float noiseValue = noiseStrength * noiseScale * noise(position.xyz + time);
    position.xy += noiseValue;
    
    gl_Position = uProjectionMatrix * uModelViewMatrix * position;
}
