uniform vec3 ctw_c;
uniform vec3 ctw_w;
uniform vec3 lightPosition;

varying vec3 norm;

void main() {
  vec3 light = vec3(normalize(viewMatrix * vec4(lightPosition,0.0)));
  float kw = (1.0+dot(light,norm))/2.0;

  gl_FragColor = vec4( kw*ctw_w + (1.0-kw)*ctw_c,1.0);
}
