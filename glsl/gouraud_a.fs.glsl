varying vec4 V_Color;
varying vec3 V_norm;

void main() {
	gl_FragColor = V_Color * vec4(normalize(V_norm),1.0);
}