/**
 * UBC CPSC 314, January 2016
 * Project 3 Template
 */

var scene = new THREE.Scene();

// SETUP RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var aspect = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 10000);
camera.position.set(10,15,40);
camera.lookAt(scene.position); 
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

// FLOOR WITH CHECKERBOARD 
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(30, 30);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// LIGHTING UNIFORMS
var lightColor = new THREE.Color(1,1,1);
var ambientColor = new THREE.Color(0.4,0.4,0.4);
var lightPosition = new THREE.Vector3(70,100,70);

var kAmbient = 0.4;
var kDiffuse = 0.8;
var kSpecular = 0.8;
var shininess = 10.0;

// ctw color setting
var ctw_c = new THREE.Color(0.0,0.1,0.7);
var ctw_w = new THREE.Color(0.6,0.1,0.0); 

// MATERIALS
var defaultMaterial = new THREE.MeshLambertMaterial();

var armadilloMaterial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type:'f', value: kAmbient},
     kDiffuse: {type:'f', value: kDiffuse},
     kSpecular: {type:'f', value: kSpecular},
     shininess: {type:'f', value: shininess}
   },
});

var gouraudMaterial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type:'f', value: kAmbient},
     kDiffuse: {type:'f', value: kDiffuse},
     kSpecular: {type:'f', value: kSpecular},
     shininess: {type:'f', value: shininess}
   },
});
var gouraud_a_Material = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type:'f', value: kAmbient},
     kDiffuse: {type:'f', value: kDiffuse},
     kSpecular: {type:'f', value: kSpecular},
     shininess: {type:'f', value: shininess}
   },
});


var phongMaterial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type:'f', value: kAmbient},
     kDiffuse: {type:'f', value: kDiffuse},
     kSpecular: {type:'f', value: kSpecular},
     shininess: {type:'f', value: shininess}
   },
});
var phong_a_Material = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type:'f', value: kAmbient},
     kDiffuse: {type:'f', value: kDiffuse},
     kSpecular: {type:'f', value: kSpecular},
     shininess: {type:'f', value: shininess}
   },
});
var blinnMaterial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type:'f', value: kAmbient},
     kDiffuse: {type:'f', value: kDiffuse},
     kSpecular: {type:'f', value: kSpecular},
     shininess: {type:'f', value: shininess}
   },
});

var blinn_a_Material = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type:'f', value: kAmbient},
     kDiffuse: {type:'f', value: kDiffuse},
     kSpecular: {type:'f', value: kSpecular},
     shininess: {type:'f', value: shininess}
   },
});

var ctwMaterial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type:'f', value: kAmbient},
     kDiffuse: {type:'f', value: kDiffuse},
     kSpecular: {type:'f', value: kSpecular},
     shininess: {type:'f', value: shininess},
     ctw_c: {type : 'c', value: ctw_c},
     ctw_w: {type : 'c', value: ctw_w}
   },
});

var ctw_a_Material = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
     kAmbient : {type:'f', value: kAmbient},
     kDiffuse: {type:'f', value: kDiffuse},
     kSpecular: {type:'f', value: kSpecular},
     shininess: {type:'f', value: shininess},
     ctw_c: {type : 'c', value: ctw_c},
     ctw_w: {type : 'c', value: ctw_w}
   },
});
// LOAD SHADERS
var shaderFiles = [
  'glsl/example.vs.glsl',
  'glsl/example.fs.glsl',
  'glsl/gouraud.vs.glsl',
  'glsl/gouraud.fs.glsl', 
  'glsl/phong.vs.glsl',
  'glsl/phong.fs.glsl',
  'glsl/blinn.vs.glsl',
  'glsl/blinn.fs.glsl',
  'glsl/ctw.vs.glsl',
  'glsl/ctw.fs.glsl',
  'glsl/gouraud_a.vs.glsl',
  'glsl/gouraud_a.fs.glsl',
  'glsl/phong_a.vs.glsl',
  'glsl/phong_a.fs.glsl',
  'glsl/blinn_a.vs.glsl',
  'glsl/blinn_a.fs.glsl',
  'glsl/ctw_a.vs.glsl',
  'glsl/ctw_a.fs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/example.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/example.fs.glsl'];
  armadilloMaterial.needsUpdate = true;
  
  gouraudMaterial.vertexShader = shaders['glsl/gouraud.vs.glsl'];
  gouraudMaterial.fragmentShader = shaders['glsl/gouraud.fs.glsl'];
  gouraudMaterial.needsUpdate = true;

  gouraud_a_Material.vertexShader = shaders['glsl/gouraud_a.vs.glsl'];
  gouraud_a_Material.fragmentShader = shaders['glsl/gouraud_a.fs.glsl'];
  gouraud_a_Material.needsUpdate = true;

  phongMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
  phongMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];
  phongMaterial.needsUpdate = true;

  phong_a_Material.vertexShader = shaders['glsl/phong_a.vs.glsl'];
  phong_a_Material.fragmentShader = shaders['glsl/phong_a.fs.glsl'];
  phong_a_Material.needsUpdate = true;

  blinnMaterial.vertexShader = shaders['glsl/blinn.vs.glsl'];
  blinnMaterial.fragmentShader = shaders['glsl/blinn.fs.glsl'];
  blinnMaterial.needsUpdate = true;
  
  blinn_a_Material.vertexShader = shaders['glsl/blinn_a.vs.glsl'];
  blinn_a_Material.fragmentShader = shaders['glsl/blinn_a.fs.glsl'];
  blinn_a_Material.needsUpdate = true;

  ctwMaterial.vertexShader = shaders['glsl/ctw.vs.glsl'];
  ctwMaterial.fragmentShader = shaders['glsl/ctw.fs.glsl'];
  ctwMaterial.needsUpdate = true;

  ctw_a_Material.vertexShader = shaders['glsl/ctw_a.vs.glsl'];
  ctw_a_Material.fragmentShader = shaders['glsl/ctw_a.fs.glsl'];
  ctw_a_Material.needsUpdate = true;
})



// LOAD ARMADILLO
function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader()
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = floor;
    scene.add(object);

  }, onProgress, onError);
}

loadOBJ('obj/armadillo.obj', armadilloMaterial, 3, 0,3,-2, 0,Math.PI,0);

// CREATE SPHERES
var sphere = new THREE.SphereGeometry(1, 32, 32);
var gem_gouraud = new THREE.Mesh(sphere, gouraudMaterial); // tip: make different materials for each sphere
gem_gouraud.position.set(-3, 1, -1);
scene.add(gem_gouraud);
gem_gouraud.parent = floor;

var gem_phong = new THREE.Mesh(sphere, phongMaterial);
gem_phong.position.set(-1, 1, -1);
scene.add(gem_phong);
gem_phong.parent = floor;

var gem_phong_blinn = new THREE.Mesh(sphere, blinnMaterial);
gem_phong_blinn.position.set(1, 1, -1);
scene.add(gem_phong_blinn);
gem_phong_blinn.parent = floor;

var gem_toon = new THREE.Mesh(sphere, ctwMaterial);
gem_toon.position.set(3, 1, -1);
scene.add(gem_toon);
gem_toon.parent = floor;

// SETUP UPDATE CALL-BACK
var keyboard = new THREEx.KeyboardState();
function onKeyDown(event)
{
 if(keyboard.eventMatches(event,"1"))
  {
    alert("Gouraud Shading");
    armadilloMaterial.vertexShader = gouraud_a_Material.vertexShader;
    armadilloMaterial.fragmentShader = gouraud_a_Material.fragmentShader;
    armadilloMaterial.needsUpdate = true;
  }
  else if(keyboard.eventMatches(event,"2"))
  {
    alert("Phong Shading");
    armadilloMaterial.vertexShader = phong_a_Material.vertexShader;
    armadilloMaterial.fragmentShader = phong_a_Material.fragmentShader;
    armadilloMaterial.needsUpdate = true;
  }
  else if(keyboard.eventMatches(event,"3"))
  {
    alert("Blinn Shading");
    armadilloMaterial.vertexShader = blinn_a_Material.vertexShader;
    armadilloMaterial.fragmentShader = blinn_a_Material.fragmentShader;
    armadilloMaterial.needsUpdate = true;
  }
  else if(keyboard.eventMatches(event,"4"))
  {
    alert("Cool-to-warm Shading");
    armadilloMaterial.vertexShader = ctw_a_Material.vertexShader;
    armadilloMaterial.fragmentShader = ctw_a_Material.fragmentShader;
    armadilloMaterial.needsUpdate = true;
  }
  else{
  }  
};
keyboard.domElement.addEventListener('keydown', onKeyDown );

var render = function() {
   

 requestAnimationFrame(render);
 renderer.render(scene, camera);
}

render();