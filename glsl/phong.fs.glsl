uniform vec3 lightColor;
uniform vec3 ambientColor;
uniform vec3 lightPosition;
uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;

varying vec3 V_ViewPosition;
varying vec3 V_Normal_VCS;


void main() {

    vec3 nom = V_Normal_VCS;
    vec3 viewVector  = V_ViewPosition;
    vec3 viewDir = normalize(-viewVector);
    vec3 lightDir = (vec3(viewMatrix * normalize(vec4(lightPosition, 0.0))));
    
    vec3 reflectDir = reflect(-lightDir, nom);

    float angle = max(dot(lightDir,nom), 0.0);

    float specular = 0.0;
    if(angle != 0.0){
      specular = pow(max(dot(reflectDir,viewDir),0.0),shininess);
    }

    gl_FragColor = vec4(kSpecular * specular * lightColor + kDiffuse * angle * lightColor + kAmbient * ambientColor, 1.0);
}

