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

var defaultMaterial = new THREE.MeshLambertMaterial();
// FLOOR WITH CHECKERBOARD 
//var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
//floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
//floorTexture.repeat.set(4, 4);

//var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });

var floorGeometry = new THREE.PlaneBufferGeometry(30, 30);
var floorMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, color: 'red'} );
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// LIGHTING UNIFORMS
var lightColor = new THREE.Color(1,1,1);
var ambientColor = new THREE.Color(0.4,0.4,0.4);
var lightPosition = new THREE.Vector3(70,100,70);

// MATERIALS
var armadilloMaterial = new THREE.ShaderMaterial({
   uniforms: {
     lightColor : {type : 'c', value: lightColor},
     ambientColor : {type : 'c', value: ambientColor},
     lightPosition : {type: 'v3', value: lightPosition},
   },
});

// LOAD SHADERS
var shaderFiles = [
  'glsl/example.vs.glsl',
  'glsl/example.fs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/example.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/example.fs.glsl'];
  armadilloMaterial.needsUpdate = true;
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

// loadOBJ('obj/armadillo.obj', armadilloMaterial, 3, 0,3,-2, 0,Math.PI,0);

// CREATE SPHERES

function makeCube() {
  var unitCube = new THREE.BoxGeometry(1,1,1);
  return unitCube;
}

THREE.Object3D.prototype.setMatrix = function(a) {
  this.matrix=a;
  this.matrix.decompose(this.position,this.quaternion,this.scale);
}

// Alan
function addRob1(){
  // set the general material
  var normalMaterial = new THREE.MeshNormalMaterial();
  
  // set the torso of the character
  var torsoGeometry = makeCube();
  var torso_scale = new THREE.Matrix4().set(3,0,0,0, 0,7,0,0, 0,0,3,0, 0,0,0,1);
  torsoGeometry.applyMatrix(torso_scale);
  var torso = new THREE.Mesh(torsoGeometry,normalMaterial);
  var torsoMatrix = new THREE.Matrix4().set(1,0,0,-10, 0,1,0,7, 0,0,1,0, 0,0,0,1);
  torso.setMatrix(torsoMatrix);
  scene.add(torso);

  // set arms and leg for the character
  var arm_left_scale = new THREE.Matrix4().set(5,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var arm_leftGeometry = makeCube();
  arm_leftGeometry.applyMatrix(arm_left_scale);
  var arm_left = new THREE.Mesh(arm_leftGeometry,normalMaterial);
  var arm_left_pos = new THREE.Matrix4().set(1,0,0,3, 0,1,0,2, 0,0,1,0, 0,0,0,1);
  var arm_left_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,arm_left_pos);
  arm_left.setMatrix(arm_left_pos_abs);
  scene.add(arm_left);

  var arm_right_scale = new THREE.Matrix4().set(5,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var arm_rightGeometry = makeCube();
  arm_rightGeometry.applyMatrix(arm_right_scale);
  var arm_right = new THREE.Mesh(arm_rightGeometry,normalMaterial);
  var arm_right_pos = new THREE.Matrix4().set(1,0,0,-3, 0,1,0,2, 0,0,1,0, 0,0,0,1);
  var arm_right_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,arm_right_pos);
  arm_right.setMatrix(arm_right_pos_abs);
  scene.add(arm_right);

  var leg_left_scale = new THREE.Matrix4().set(1,0,0,0, 0,4,0,0, 0,0,1,0, 0,0,0,1);
  var leg_left_Geometry = makeCube();
  leg_left_Geometry.applyMatrix(leg_left_scale);
  var leg_left = new THREE.Mesh(leg_left_Geometry,normalMaterial);
  var leg_left_pos = new THREE.Matrix4().set(1,0,0,1, 0,1,0,-5, 0,0,1,0, 0,0,0,1);
  var leg_left_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,leg_left_pos);
  leg_left.setMatrix(leg_left_pos_abs);
  scene.add(leg_left);

  var leg_left_scale = new THREE.Matrix4().set(1,0,0,0, 0,4,0,0, 0,0,1,0, 0,0,0,1);
  var leg_left_Geometry = makeCube();
  leg_left_Geometry.applyMatrix(leg_left_scale);
  var leg_left = new THREE.Mesh(leg_left_Geometry,normalMaterial);
  var leg_left_pos = new THREE.Matrix4().set(1,0,0,-1, 0,1,0,-5, 0,0,1,0, 0,0,0,1);
  var leg_left_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,leg_left_pos);
  leg_left.setMatrix(leg_left_pos_abs);
  scene.add(leg_left);

  var leg_right_scale = new THREE.Matrix4().set(1,0,0,0, 0,4,0,0, 0,0,1,0, 0,0,0,1);
  var leg_right_Geometry = makeCube();
  leg_right_Geometry.applyMatrix(leg_right_scale);
  var leg_right = new THREE.Mesh(leg_right_Geometry,normalMaterial);
  var leg_right_pos = new THREE.Matrix4().set(1,0,0,1, 0,1,0,-5, 0,0,1,0, 0,0,0,1);
  var leg_right_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,leg_right_pos);
  leg_right.setMatrix(leg_right_pos_abs);
  scene.add(leg_right);

  // set neck and head for the character
  var neck_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var neck_Geometry = new THREE.CylinderGeometry(0.6,0.6,0.6,50);
  neck_Geometry.applyMatrix(neck_scale);
  var neck = new THREE.Mesh(neck_Geometry,normalMaterial);
  var neck_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,3.8, 0,0,1,0, 0,0,0,1);
  var neck_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,neck_pos);
  neck.setMatrix(neck_pos_abs);
  scene.add(neck);

  var head_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var head_Geometry = new THREE.SphereGeometry(1.5, 35, 35);
  head_Geometry.applyMatrix(head_scale);
  var head = new THREE.Mesh(head_Geometry,normalMaterial);
  var head_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,1.6, 0,0,1,0, 0,0,0,1);
  var head_pos_abs = new THREE.Matrix4().multiplyMatrices(neck_pos_abs,head_pos);
  head.setMatrix(head_pos_abs);
  scene.add(head);

  // draw the sword and sheild
  var hilt_scale = new THREE.Matrix4().set(0.7,0,0,0, 0,1.3,0,0, 0,0,0.5,0, 0,0,0,1);
  var hilt_Geometry = new makeCube();
  hilt_Geometry.applyMatrix(hilt_scale);
  var hilt = new THREE.Mesh(hilt_Geometry,normalMaterial);
  var hilt_pos = new THREE.Matrix4().set(1,0,0,8, 0,1,0,1, 0,0,1,0, 0,0,0,1);
  var hilt_pos_abs = new THREE.Matrix4().multiplyMatrices(arm_right_pos_abs,hilt_pos);
  hilt.setMatrix(hilt_pos_abs);
  scene.add(hilt);

  var hilt1_scale = new THREE.Matrix4().set(1.5,0,0,0, 0,0.7,0,0, 0,0,0.6,0, 0,0,0,1);
  var hilt1_Geometry = new THREE.CylinderGeometry(1,1,0.2,50);
  hilt1_Geometry.applyMatrix(hilt1_scale);
  var hilt1 = new THREE.Mesh(hilt1_Geometry,normalMaterial);
  var hilt1_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0.6, 0,0,1,0, 0,0,0,1);
  var hilt1_pos_abs = new THREE.Matrix4().multiplyMatrices(hilt_pos_abs,hilt1_pos);
  hilt1.setMatrix(hilt1_pos_abs);
  scene.add(hilt1);

  var blade_scale = new THREE.Matrix4().set(0.8,0,0,0, 0,1.5,0,0, 0,0,0.2,0, 0,0,0,1);
  var blade_Geometry = new THREE.CylinderGeometry(1,1,5,50);
  blade_Geometry.applyMatrix(blade_scale);
  var blade = new THREE.Mesh(blade_Geometry,normalMaterial);
  var blade_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,4, 0,0,1,0, 0,0,0,1);
  var blade_pos_abs = new THREE.Matrix4().multiplyMatrices(hilt1_pos_abs,blade_pos);
  blade.setMatrix(blade_pos_abs);
  scene.add(blade);

  var sheild_scale = new THREE.Matrix4().set(0.3,0,0,0, 0,6,0,0, 0,0,5,0, 0,0,0,1);
  var sheild_Geometry = makeCube();
  sheild_Geometry.applyMatrix(sheild_scale);
  var sheild = new THREE.Mesh(sheild_Geometry,normalMaterial);
  var sheild_pos = new THREE.Matrix4().set(1,0,0,-8.5, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var sheild_pos_abs = new THREE.Matrix4().multiplyMatrices(arm_left_pos_abs,sheild_pos);
  sheild.setMatrix(sheild_pos_abs);
  scene.add(sheild);
}

// Jack
function addRob2(){
  var basePos = new THREE.Vector3(100,10,10); 
  var geometry = new THREE.CylinderGeometry( 3, 3, 3, 32 );
  var material = new THREE.MeshBasicMaterial( {color: 'green'} );
  var cylinder = new THREE.Mesh( geometry, material );
  scene.add( cylinder );
  cylinder.position = basePos;

}

addRob1();
//addRob2();
// SETUP UPDATE CALL-BACK
var keyboard = new THREEx.KeyboardState();
var render = function() {
 // tip: change armadillo shading here according to keyboard

 requestAnimationFrame(render);
 renderer.render(scene, camera);
}

render();