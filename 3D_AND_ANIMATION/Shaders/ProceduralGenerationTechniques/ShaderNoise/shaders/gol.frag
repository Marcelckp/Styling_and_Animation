precision highp float;

varying vec2 pos;
uniform sampler2D tex;
uniform vec2 resolution;

void main() {

    vec2 uv = pos;

    uv.y = 1.0 - uv.y;

    vec4 color = texture2D(tex, uv); // The Tex is the texture that is being passed in from the main program that is being rendered to the screen. This texture is storing the previous frame of the game of life simulation. This is so that we can use the previous frame to calculate the next frame.

    float a = color.r;

    float num = 0.0;
    for(float i = -1.0; i < 2.0; i++) {
        for(float j = -1.0; j < 2.0; j++) {
            float x = uv.x + i * resolution.x;
            float y = uv.y + j * resolution.y;

            num += texture2D(tex, vec2(x, y)).r;
        }
    }

    num -= a;

    if(a > .5) {
        if(num < 1.5) {
            a = 0.0;
        }
        if(num > 3.5) a = 0.0;
    }
    else {
        if(num > 2.5 && num < 3.5) {
            a = 1.0;
        }
    }

    gl_FragColor = vec4(vec3(a), 1.0);
}