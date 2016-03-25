uniform vec3 ctw_c;
uniform vec3 ctw_w;
uniform vec3 lightPosition;

varying vec3 norm;

void main() {
    norm = vec3(normalize(normalMatrix * normal));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
