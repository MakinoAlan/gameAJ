uniform vec3 lightColor;
uniform vec3 ambientColor;
uniform vec3 lightPosition;
uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;

varying vec3 V_Normal_VCS;
varying vec3 V_ViewPosition;
varying vec3 V_norm;

void main() {
	V_Normal_VCS = normalize(normalMatrix * normal);
	V_ViewPosition = vec3(modelViewMatrix * vec4(position, 1.0));
	V_norm = normal;

	gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);
}