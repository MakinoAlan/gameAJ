uniform vec3 uMaterialColor;
uniform vec3 uDirLightPos;
uniform vec3 uDirLightColor;
uniform float uKd;
uniform float uBorder;

varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {

	vec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );
	vec3 lVector = normalize( lDirection.xyz );
	vec3 normal = normalize( vNormal );
	float diffuse = dot( normal, lVector );
	if ( diffuse > 0.6 ) 
		{ diffuse = 1.0; }
	else if ( diffuse > -0.2 ) 
		{ diffuse = 0.7; }
	else 
		{ diffuse = 0.3; }
    gl_FragColor = vec4( uKd * uMaterialColor * uDirLightColor * diffuse, 1.0 );

	}