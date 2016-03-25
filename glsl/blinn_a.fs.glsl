varying vec3 V_ViewPosition;
varying vec3 V_Normal_VCS;
varying vec3 V_norm;

uniform vec3 lightColor;
uniform vec3 ambientColor;
uniform vec3 lightPosition;
uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;


void main() {
	
	vec3 viewVector  = normalize(-V_ViewPosition);
	vec3 light = normalize(vec3(viewMatrix * vec4(lightPosition,1.0)));
	vec3 norm = V_Normal_VCS;
	vec3 halfVector = normalize((light + viewVector)/2.0);
	
    float lam = max(dot(light,norm), 0.0);
    float specular = 0.0;
    if(lam > 0.0) {
       float specAngle = max(dot(halfVector, norm), 0.0);
       specular = pow(specAngle, shininess);
    }

	gl_FragColor = vec4(kSpecular * specular * lightColor + kDiffuse*lam * lightColor + kAmbient * ambientColor, 1.0) * vec4(normalize(V_norm),1.0);
	
	
}
