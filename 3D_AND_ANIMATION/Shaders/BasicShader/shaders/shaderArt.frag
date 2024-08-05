precision highp float;

varying vec2 pos;

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

// 2D Noise based on Morgan McGuire @morgan3d that can be used to create infinitiely spaning colour gradients
vec3 palette( in float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.0, 0.33, 0.66);

    return a + b*cos( 6.28318*(c*t+d) );
}

// Un Fracted
// void mainImage(out vec4 fragColor, in vec2 fragCoord) {
//     // Normalized pixel coordinates (from 0 to 1)
//     vec2 uv = fragCoord / resolution *2.0 - 1.0; // This is the same as -> vec2 uv = (2.0 * fragCoord - resolution) / resolution; Which ensures that the coordinates are in the range of -1 to 1. This is useful for the SDF calculations. The origin point will now also be in the center of the screen

//     uv.x *= resolution.x / resolution.y; // This is to correct the aspect ratio of the screen. This is because the screen is not a square and the SDF calculations are based on a square screen. So if the screen is resized the aspect ratio will be corrected.

//     float d = length(uv) - 0.5; // This is the SDF of a circle with a radius of 0.5

//     vec3 col = palette(d + time); // This is the color of the circle based on the distance from the center of the circle. The time is added to create an animation effect that will change the color of the circle over time as the gradient colour is assigned to it.

//     // By utilizing sin and time we can create an animation effect on the circle by changing the radius of the circle over time.
//     d = sin(d*8. + time)/8.; // This is to add some variation to the circle
//     d = abs(d); // This is to ensure that the distance is positive

//     // d = smoothstep(0.0, .1, d);

//     d = 0.02 / d; // This is to create a gradient effect

//     col *= d;

//     // fragColor = vec4(uv.x, uv.y, 0.0, 1.0); // Here is a short hand -> vec4(uv, 0.0, 1.0);
//     // fragColor = vec4(d, d, d, 1.0); This is to visualize the SDF
//     // fragColor = vec4(col, 1.0); // This is to color the circle
//     fragColor = vec4(col, 1.0); // This is to color the circle

// }

// Fracted 
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - resolution) / resolution.y; 

    vec2 uv0 = uv; // This is to store the original uv value before spacial manipulation for later use

    vec3 finalColor = vec3(0.0); // This is to store the final color value

    for (float i = 0.; i < 3.; i++) {
        uv = fract(uv * 1.5);
        uv -= 0.5; // This will center the circle in the middle of each of there respective squares/fracts

        // uv.x *= resolution.x / resolution.y; 

        float d = length(uv) * exp(-length(uv0)); // This is the SDF of a circle with a radius of 0.5

        vec3 col = palette(length(uv0) + i*.4 + time*.5); // By using the original uv value we can create a gradient effect that spans the entire screen and not just the spacial quadrants

        d = sin(d*8. + time)/8.; 
        d = abs(d); 

        d = pow(0.005 / d, 1.2); 

        finalColor += col * d; // This is to add the color to the final color value
    }

    fragColor = vec4(finalColor, 1.0); 
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
