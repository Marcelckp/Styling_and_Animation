precision mediump float;

varying vec2 pos;

uniform vec2 resolution;
uniform float time;
uniform vec3 mouse;

/**

void main() {
    vec3 circle = vec3(.5, .5, .3);

    // SDF - We remove the Z value since we need to find the current position from the center of the circle. This is an example of swizzling to reduce the circle to a vec2.
    float d = length(pos - circle.xy) - circle.z; // Subtracting z will ensure that anything within the radius gives a negative number and anything outside the radius returns a positive.

    // This will return 0 if d is greater then 0. and 1 if not
    // The Step function is an example of a if else control flow function. Since it's best practice to avoid branching code scopes and blocks within your shaders.
    d = step(0., d);

    gl_FragColor = vec4(d, d, d, 1.);
}
*/

/* 
float sdCutDisk( in vec2 p, in float r, in float h )
{
    float w = sqrt(r*r-h*h); // constant for a given shape
    
    p.x = abs(p.x);
    
    // select circle or segment
    float s = max( (h-r)*p.x*p.x+w*w*(h+r-2.0*p.y), h*p.x-w*p.y );

    return (s<0.0) ? length(p)-r :        // circle
           (p.x<w) ? h - p.y     :        // segment line
                     length(p-vec2(w,h)); // segment corner
}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // normalized pixel coordinates
    vec2 p = (2.0*fragCoord-resolution.xy)/resolution.y;
    vec2 m = (2.0*mouse.xy-resolution.xy)/resolution.y;
   
    // animation
    float ra = 0.75;
    float he = ra*clamp(cos(time*0.8),-0.999999,0.999999);
   
    // distance
    float d = sdCutDisk(p,ra,he);
   
    // coloring
    vec3 col = (d>0.0) ? vec3(0.9,0.6,0.3) : vec3(0.5,0.85,1.0);
    col *= 1.0 - exp(-7.0*abs(d));
    col *= 0.8 + 0.2*cos(128.0*abs(d));
    col = mix( col, vec3(1.0), 1.0-smoothstep(0.0,0.015,abs(d)) );

    // interactivity
    if( mouse.z>0.001 )
    {
    d = sdCutDisk(m,ra,he);
    col = mix(col, vec3(1.0,1.0,0.0), 1.0-smoothstep(0.0, 0.005, abs(length(p-m)-abs(d))-0.0025));
    col = mix(col, vec3(1.0,1.0,0.0), 1.0-smoothstep(0.0, 0.005, length(p-m)-0.015));
    }

	fragColor = vec4(col, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}

*/

// Function to calculate the SDF of a circle
float circleSDF(vec2 point, vec2 center, float radius) {
    return length(point - center) - radius;
}

// Function to calculate the SDF of a line segment
float lineSDF(vec2 point, vec2 start, vec2 end) {
    vec2 pa = point - start;
    vec2 ba = end - start;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / resolution;

    // Center of the circle
    vec2 center = vec2(0.5, 0.5);

    // Radius of the circle
    float radius = 0.25;

    // Calculate the distance from the point to the edge of the circle
    float dist = circleSDF(uv, center, radius);

    // Determine the color based on the distance
    vec3 color = vec3(0.5); // Background color (black)
    float edgeWidth = 0.01; // Width of the smooth edge
    float alpha = smoothstep(-edgeWidth, edgeWidth, -dist);

    // Start and end points of the line
    vec2 end = center;
    vec2 start = mouse.xy / resolution;

    // Calculate the distance from the point to the line
    float dist2 = lineSDF(uv, start, end);

    // Determine the color based on the distance
    vec3 color2 = vec3(0.91, 0.05, 0.05); // Background color (black)
    float edgeWidth2 = 0.01; // Width of the line
    float alpha2 = smoothstep(edgeWidth2, -edgeWidth2, dist2);

    // Draw a circle for the SDF that will have its center at the mouse position and have a radius of the distance from the mouse to the edge of the circle
    float dist3 = circleSDF(uv, mouse.xy / resolution, dist);
    vec3 color3 = vec3(0.05, 0.58, 0.91); // Background color (black)
    float edgeWidth3 = 0.01; // Width of the line
    float alpha3 = smoothstep(edgeWidth3, -edgeWidth3, dist3);
    
    // Mix the colors based on the distance
    color = mix(color, color2, alpha2);
    color = mix(color, color3, alpha3);

    // Add a pulsating effect
    float pulsate = 0.5 + 0.5 * sin(time);
    color = mix(color, vec3(pulsate), alpha);

    // Set the output color
    fragColor = vec4(color + alpha2 + alpha3, 1.);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
