varying vec3 vColor;

void main() {
    //Disc
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = 1.0 - step(0.5,strength);

    //Diffuse point
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength *= 2.0;
    // strength = pow(1.0 - strength, 10.0);

    //Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = pow(1.0 - strength, 10.0);

    //Final color
    vec3 color = mix(vec3(0.0), vColor, strength);

    gl_FragColor = vec4(color, strength);
}