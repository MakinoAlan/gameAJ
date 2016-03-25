varying vec4 V_Color;
varying vec3 V_norm;

uniform vec3 lightColor;
uniform vec3 ambientColor;
uniform vec3 lightPosition;
uniform float kAmbient;
uniform float kDiffuse;
uniform float kSpecular;
uniform float shininess;

void main() {
   
  V_norm = normal;
  vec3 norm = normalize(normalMatrix * normal);
  float angle = dot(norm, normalize(lightPosition));
  
  if (angle<0.0){angle = 0.0;}

  float specular = 0.0;

  vec3 light = vec3(viewMatrix * vec4(normalize(lightPosition),0.0));
  vec3 view = normalize(vec3(modelViewMatrix * vec4(position, 1.0)));
  vec3 reflect = normalize(reflect(light,norm));
  
  if(angle != 0.0){
    float s = dot(reflect,view);
    if(s<0.0){s = 0.0;}
    specular = pow(s,shininess);
  }
 
  V_Color = vec4(angle * kDiffuse * lightColor + kAmbient * ambientColor + kSpecular * specular * lightColor,1.0);
  gl_Position = projectionMatrix *  modelViewMatrix * vec4(position, 1.0);

}