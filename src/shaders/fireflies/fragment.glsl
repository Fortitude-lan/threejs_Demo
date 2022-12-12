void main() {
    float distenceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.1 / distenceToCenter - 0.1 * 2.0;
    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);

}