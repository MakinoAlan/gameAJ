/**
 * UBC CPSC 314, January 2016
 * Project 3 Template
 */
$(document).ready(function(){

var scene = new THREE.Scene();
THREE.Object3D.prototype.setMatrix = function(a) {
  this.matrix=a;
  this.matrix.decompose(this.position,this.quaternion,this.scale);
}
// SETUP RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var aspect = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 10000);
camera.position.set(20,35,100);
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


var components_a = [];
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
  components_a.push(torso);

  // set arms and leg for the character
  var arm_left_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1);
  var arm_leftGeometry = makeCube();
  arm_leftGeometry.applyMatrix(arm_left_scale);
  var arm_left = new THREE.Mesh(arm_leftGeometry,normalMaterial);
  var arm_left_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2, 0,0,1,3, 0,0,0,1);
  var arm_left_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,arm_left_pos);
  arm_left.setMatrix(arm_left_pos_abs);
  scene.add(arm_left);
  components_a.push(arm_left);

  var arm_right_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1);
  var arm_rightGeometry = makeCube();
  arm_rightGeometry.applyMatrix(arm_right_scale);
  var arm_right = new THREE.Mesh(arm_rightGeometry,normalMaterial);
  var arm_right_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2, 0,0,1,-3, 0,0,0,1);
  var arm_right_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,arm_right_pos);
  arm_right.setMatrix(arm_right_pos_abs);
  scene.add(arm_right);
  components_a.push(arm_right);

  var leg_left_scale = new THREE.Matrix4().set(1,0,0,0, 0,4,0,0, 0,0,1,0, 0,0,0,1);
  var leg_left_Geometry = makeCube();
  leg_left_Geometry.applyMatrix(leg_left_scale);
  var leg_left = new THREE.Mesh(leg_left_Geometry,normalMaterial);
  var leg_left_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-5, 0,0,1,1, 0,0,0,1);
  var leg_left_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,leg_left_pos);
  leg_left.setMatrix(leg_left_pos_abs);
  scene.add(leg_left);
  components_a.push(leg_left);

  var leg_right_scale = new THREE.Matrix4().set(1,0,0,0, 0,4,0,0, 0,0,1,0, 0,0,0,1);
  var leg_right_Geometry = makeCube();
  leg_right_Geometry.applyMatrix(leg_right_scale);
  var leg_right = new THREE.Mesh(leg_right_Geometry,normalMaterial);
  var leg_right_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-5, 0,0,1,-1, 0,0,0,1);
  var leg_right_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,leg_right_pos);
  leg_right.setMatrix(leg_right_pos_abs);
  scene.add(leg_right);
  components_a.push(leg_right);

  

  // set neck and head for the character
  var neck_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var neck_Geometry = new THREE.CylinderGeometry(0.6,0.6,0.6,50);
  neck_Geometry.applyMatrix(neck_scale);
  var neck = new THREE.Mesh(neck_Geometry,normalMaterial);
  var neck_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,3.8, 0,0,1,0, 0,0,0,1);
  var neck_pos_abs = new THREE.Matrix4().multiplyMatrices(torsoMatrix,neck_pos);
  neck.setMatrix(neck_pos_abs);
  scene.add(neck);
  components_a.push(neck);

  var head_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var head_Geometry = new THREE.SphereGeometry(1.5, 35, 35);
  head_Geometry.applyMatrix(head_scale);
  var head = new THREE.Mesh(head_Geometry,normalMaterial);
  var head_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,1.6, 0,0,1,0, 0,0,0,1);
  var head_pos_abs = new THREE.Matrix4().multiplyMatrices(neck_pos_abs,head_pos);
  head.setMatrix(head_pos_abs);
  scene.add(head);
  components_a.push(head);

  // draw the sword and sheild
  var hilt_scale = new THREE.Matrix4().set(0.7,0,0,0, 0,1.3,0,0, 0,0,0.5,0, 0,0,0,1);
  var hilt_Geometry = new makeCube();
  hilt_Geometry.applyMatrix(hilt_scale);
  var hilt = new THREE.Mesh(hilt_Geometry,normalMaterial);
  var hilt_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,1, 0,0,1,8, 0,0,0,1);
  var hilt_pos_abs = new THREE.Matrix4().multiplyMatrices(arm_right_pos_abs,hilt_pos);
  hilt.setMatrix(hilt_pos_abs);
  scene.add(hilt);
  components_a.push(hilt);

  var hilt1_scale = new THREE.Matrix4().set(1.5,0,0,0, 0,0.7,0,0, 0,0,0.6,0, 0,0,0,1);
  var hilt1_Geometry = new THREE.CylinderGeometry(1,1,0.2,50);
  hilt1_Geometry.applyMatrix(hilt1_scale);
  var hilt1 = new THREE.Mesh(hilt1_Geometry,normalMaterial);
  var hilt1_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0.6, 0,0,1,0, 0,0,0,1);
  var hilt1_pos_abs = new THREE.Matrix4().multiplyMatrices(hilt_pos_abs,hilt1_pos);
  hilt1.setMatrix(hilt1_pos_abs);
  scene.add(hilt1);
  components_a.push(hilt1);

  var blade_scale = new THREE.Matrix4().set(0.8,0,0,0, 0,1.5,0,0, 0,0,0.2,0, 0,0,0,1);
  var blade_Geometry = new THREE.CylinderGeometry(1,1,5,50);
  blade_Geometry.applyMatrix(blade_scale);
  var blade = new THREE.Mesh(blade_Geometry,normalMaterial);
  var blade_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,4, 0,0,1,0, 0,0,0,1);
  var blade_pos_abs = new THREE.Matrix4().multiplyMatrices(hilt1_pos_abs,blade_pos);
  blade.setMatrix(blade_pos_abs);
  scene.add(blade);
  components_a.push(blade);

  var sheild_scale = new THREE.Matrix4().set(5,0,0,0, 0,6,0,0, 0,0,0.3,0, 0,0,0,1);
  var sheild_Geometry = makeCube();
  sheild_Geometry.applyMatrix(sheild_scale);
  var sheild = new THREE.Mesh(sheild_Geometry,normalMaterial);
  var sheild_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-8.5, 0,0,0,1);
  var sheild_pos_abs = new THREE.Matrix4().multiplyMatrices(arm_left_pos_abs,sheild_pos);
  sheild.setMatrix(sheild_pos_abs);
  scene.add(sheild);
  components_a.push(sheild)

  //window.addEventListener( 'mousemove', onDocumentMouseDown, false );
}

//var mouseVector = new THREE.Vector3(2 * (event.ClientX/window.innerWidth ) - 1, 1 - 2 * (event.ClientY / window.innerHeight));
/*
var mouse = new THREE.Vector2(), INTERSECTED;
function onDocumentMouseDown( event ) {
        var torso = components[0];
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        var projector = new THREE.Projector();
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouse, camera );
        //var raycaster = projector.pickingRay( mouse.clone(), camera);
        var intersects = raycaster.intersectObjects( torso );
        if( intersects.length > 0) {
          intersects[0].object.material.color.setRGB(Math.random(),Math.random(),Math.random());
        }
      }
      */

// Jack

var components = [];  // body, head, lhand, rhand, lleg, rleg
var material = new THREE.MeshBasicMaterial( {color: 'green'} );

function addRob2(){
  
  var basePos= new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  
  var body_pos = new THREE.Matrix4().set(1,0,0,10, 0,1,0,4.5, 0,0,1,0, 0,0,0,1);
  var body_pos_abs = new THREE.Matrix4().multiplyMatrices(basePos,body_pos); 
  var body_geo = new THREE.CylinderGeometry( 2, 2, 4, 32 );
  var body = new THREE.Mesh(body_geo,material);
  body.setMatrix(body_pos_abs);
  scene.add(body);
  components.push(body);

  var head_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,3.5, 0,0,1,0, 0,0,0,1);
  var head_pos_abs = new THREE.Matrix4().multiplyMatrices(body_pos_abs,head_pos); 
  var head_geo = new THREE.DodecahedronGeometry(1, 0);
  var head = new THREE.Mesh(head_geo,material);
  head.setMatrix(head_pos_abs);
  scene.add(head);
  components.push(head);


  var l_hand_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-3, 0,0,0,1);
  var l_hand_pos_abs = new THREE.Matrix4().multiplyMatrices(body_pos_abs,l_hand_pos); 
  var l_hand_geo = new THREE.BoxGeometry(1, 3, 1);
  var l_hand = new THREE.Mesh(l_hand_geo,material);
  l_hand.setMatrix(l_hand_pos_abs);
  scene.add(l_hand);
  components.push(l_hand);

  var r_hand_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,3, 0,0,0,1);
  var r_hand_pos_abs = new THREE.Matrix4().multiplyMatrices(body_pos_abs,r_hand_pos); 
  var r_hand_geo = new THREE.BoxGeometry(1, 3, 1);
  var r_hand = new THREE.Mesh(r_hand_geo,material);
  r_hand.setMatrix(r_hand_pos_abs);
  scene.add(r_hand);
  components.push(r_hand);

  var l_leg_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-3, 0,0,1,-1, 0,0,0,1);
  var l_leg_pos_abs = new THREE.Matrix4().multiplyMatrices(body_pos_abs,l_leg_pos); 
  var l_leg_geo = new THREE.BoxGeometry(1, 3, 1);
  var l_leg = new THREE.Mesh(l_leg_geo,material);
  l_leg.setMatrix(l_leg_pos_abs);
  scene.add(l_leg);
  components.push(l_leg);

  var r_leg_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-3, 0,0,1,1, 0,0,0,1);
  var r_leg_pos_abs = new THREE.Matrix4().multiplyMatrices(body_pos_abs,r_leg_pos); 
  var r_leg_geo = new THREE.BoxGeometry(1, 3, 1);
  var r_leg = new THREE.Mesh(r_leg_geo,material);
  r_leg.setMatrix(r_leg_pos_abs);
  scene.add(r_leg);
  components.push(r_leg);

  window.addEventListener( 'mousedown', onDocumentMouseDown, false );

}

var mouse = new THREE.Vector2(), INTERSECTED;
function onDocumentMouseDown( event ) {
        var torso = components[0];
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        var projector = new THREE.Projector();
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouse, camera );
        //var raycaster = projector.pickingRay( mouse.clone(), camera);
        var intersects = raycaster.intersectObjects( scene.children );
        if( intersects.length > 0) {
          intersects[0].object.material.color.setRGB(Math.random(),Math.random(),Math.random());
        }
      }

/*
var texts = [];
var text_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,22, 0,0,1,-5, 0,0,0,1);

var text0_geo = new THREE. TextGeometry("START",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text0 = new THREE.Mesh(text0_geo,material);
text0.setMatrix(text_pos);
texts.push(text0);

var text1_geo = new THREE. TextGeometry("ATTACK - ATTACK",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text1 = new THREE.Mesh(text1_geo,material);
text1.setMatrix(text_pos);
texts.push(text1);

var text2_geo = new THREE. TextGeometry("ATTACK - DEFEND",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text2 = new THREE.Mesh(text2_geo,material);
text2.setMatrix(text_pos);
texts.push(text2);

var text3_geo = new THREE. TextGeometry("DEFEND - ATTACK",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text3 = new THREE.Mesh(text3_geo,material);
text3.setMatrix(text_pos);
texts.push(text3);

var text4_geo = new THREE. TextGeometry("DEFEND - DEFEND",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text4 = new THREE.Mesh(text4_geo,material);
text4.setMatrix(text_pos);
texts.push(text4);

scene.add(texts[0]);
*/

addRob1();
addRob2();
// SETUP UPDATE CALL-BACK

var clock = new THREE.Clock(true);
var p0; // start position or angle
var p1; // end position or angle
var time_length; // total time of animation
var time_start; // start time of animation
var time_end; // end time of animation
var p; // current frame
var animate = false; // animate?
// function init_animation()
// Initializes parameters and sets animate flag to true.
// Input: start position or angle, end position or angle, and total time of animation.
function init_animation(p_start,p_end,t_length){
  p0 = p_start;
  p1 = p_end;
  time_length = t_length;
  time_start = clock.getElapsedTime();
  time_end = time_start + time_length;
  animate = true; // flag for animation
  return;
}

function updateBody() {
  switch(true)
  {
      case(key == "U" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p),-Math.sin(-p), 0, 
                                            0, Math.sin(-p), Math.cos(-p), 0,
                                            0,        0,         0,        1);

      var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(components[0].matrix,rotateZ);
      components [0].setMatrix(torsoRotMatrix); 
      break

      // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
      // Note: Remember spacebar sets jumpcut/animate!
      

      case(key == 0 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        -p/10 , 
                                            0, 1,0, 0, 
                                            0, 0, 1, 0,
                                            0,        0,         0,        1);

      components [0].setMatrix(new THREE.Matrix4().multiplyMatrices(components[0].matrix,rotateZ)); 
        components [1].setMatrix(new THREE.Matrix4().multiplyMatrices(components[1].matrix,rotateZ)); 
          components [2].setMatrix(new THREE.Matrix4().multiplyMatrices(components[2].matrix,rotateZ)); 
            components [3].setMatrix(new THREE.Matrix4().multiplyMatrices(components[3].matrix,rotateZ)); 
              components [4].setMatrix(new THREE.Matrix4().multiplyMatrices(components[4].matrix,rotateZ)); 
              components [5].setMatrix(new THREE.Matrix4().multiplyMatrices(components[5].matrix,rotateZ)); 
 
      break

      case(key == 1 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p),-Math.sin(-p), 0, 
                                            0, Math.sin(-p), Math.cos(-p), 0,
                                            0,        0,         0,        1);

      var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(components[0].matrix,rotateZ);
      components [0].setMatrix(torsoRotMatrix); 
      var torsoRotMatrix1 = new THREE.Matrix4().multiplyMatrices(components[1].matrix,rotateZ);
      components [1].setMatrix(torsoRotMatrix1); 
      break

    default:
      break;
  }
}
//testMove();

var hp1 = 100;
var hp2 = 100;
var mp1 = 0;
var mp2 = 0;
var act1 = 0;
var act2 = 0;
var turn = 0;
var key = 0; // 1:11,2:12,3:21,4:22

function removeText(){scene.remove(texts[key]);}
function addText(){scene.add(texts[key]);}

function takeAction(){
  switch (true){
     case(act1==1 && act2==1):
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=1;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
     case(act1==1 && act2==2):
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=2;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
     case(act1==2 && act2==1):
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=3;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
     case(act1==2 && act2==2):
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=4;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
  }
  act1 = 0;
  act2 = 0;
  turn = 0;
}

var keyboard = new THREEx.KeyboardState();

keyboard.domElement.addEventListener('keydown',function(event){
  if (event.repeat)
    return;  
  else if(keyboard.eventMatches(event,"1")){    // 0: Set camera to neutral position, view reset
    if (turn == 0){act1=1;turn++;}
    else{act2 = 1; turn = 0; takeAction();}
  }
  else if(keyboard.eventMatches(event,"U")){ 
    (key == "U")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,10), key = "U")}  
  else if(keyboard.eventMatches(event,"2")){    // 0: Set camera to neutral position, view reset
    if (turn == 0){act1=2;turn++;}
    else{act2 = 2; turn = 0; takeAction();}
  }
 


  // TO-DO: BIND KEYS TO YOUR JUMP CUTS AND ANIMATIONS
  // Note: Remember spacebar sets jumpcut/animate! 
  // Hint: Look up "threex.keyboardstate by Jerome Tienne" for more info.



    });


var render = function() {
 updateBody();
 requestAnimationFrame(render);
 renderer.render(scene, camera);
}

render();

});
