/**
 * UBC CPSC 314, January 2016
 * Project 3 Template
 */
$(document).ready(function(){


var scene = new THREE.Scene();


// SETUP RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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



var components_a = [];
var material_a = new THREE.MeshBasicMaterial( {color: 'black'});

// Alan
function addRob1(){
  // set the general material
  //var normalMaterial = new THREE.MeshNormalMaterial( {color: 'red'});
  
  // set the torso of the character
  var torsoGeometry = makeCube();
  var torso_scale = new THREE.Matrix4().set(3,0,0,0, 0,7,0,0, 0,0,3,0, 0,0,0,1);
  torsoGeometry.applyMatrix(torso_scale);
  var torso = new THREE.Mesh(torsoGeometry,material_a);
  torso.position.set(-10,7,0);
  scene.add(torso);
  components_a.push(torso);
  
  // set arms and leg for the character
  var arm_left_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1);
  var arm_leftGeometry = makeCube();
  arm_leftGeometry.applyMatrix(arm_left_scale);
  var arm_left = new THREE.Mesh(arm_leftGeometry,material_a);
  arm_left.position.set(0,1,-3);
  torso.add(arm_left);
  components_a.push(arm_left);
  
  var arm_right_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1);
  var arm_rightGeometry = makeCube();
  arm_rightGeometry.applyMatrix(arm_right_scale);
  var arm_right = new THREE.Mesh(arm_rightGeometry,material_a);
  arm_right.position.set(0,1,3);
  torso.add(arm_right);
  components_a.push(arm_right);
  
  var leg_left_scale = new THREE.Matrix4().set(1,0,0,0, 0,4,0,0, 0,0,1,0, 0,0,0,1);
  var leg_left_Geometry = makeCube();
  leg_left_Geometry.applyMatrix(leg_left_scale);
  var leg_left = new THREE.Mesh(leg_left_Geometry,material_a);
  leg_left.position.set(0,-5,1);
  torso.add(leg_left);
  components_a.push(leg_left);
  
  var leg_right_scale = new THREE.Matrix4().set(1,0,0,0, 0,4,0,0, 0,0,1,0, 0,0,0,1);
  var leg_right_Geometry = makeCube();
  leg_right_Geometry.applyMatrix(leg_right_scale);
  var leg_right = new THREE.Mesh(leg_right_Geometry,material_a);
  leg_right.position.set(0,-5,-1);
  torso.add(leg_right);
  components_a.push(leg_right);

  
  
  // set neck and head for the character
  var neck_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var neck_Geometry = new THREE.CylinderGeometry(0.6,0.6,0.6,50);
  neck_Geometry.applyMatrix(neck_scale);
  var neck = new THREE.Mesh(neck_Geometry,material_a);
  neck.position.set(0,3.8,0);
  torso.add(neck);
  components_a.push(neck);
  
  var head_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var head_Geometry = new THREE.SphereGeometry(1.5, 35, 35);
  head_Geometry.applyMatrix(head_scale);
  var head = new THREE.Mesh(head_Geometry,material_a);
  head.position.set(0,1.6,0);
  neck.add(head);
  components_a.push(head);
  
  // draw the sword and sheild
  var hilt_scale = new THREE.Matrix4().set(0.7,0,0,0, 0,1.3,0,0, 0,0,0.5,0, 0,0,0,1);
  var hilt_Geometry = new makeCube();
  hilt_Geometry.applyMatrix(hilt_scale);
  var hilt = new THREE.Mesh(hilt_Geometry,material_a);
  hilt.position.set(0,1,2);
  arm_right.add(hilt);
  components_a.push(hilt);

  var hilt1_scale = new THREE.Matrix4().set(1.5,0,0,0, 0,0.7,0,0, 0,0,0.6,0, 0,0,0,1);
  var hilt1_Geometry = new THREE.CylinderGeometry(1,1,0.2,50);
  hilt1_Geometry.applyMatrix(hilt1_scale);
  var hilt1 = new THREE.Mesh(hilt1_Geometry,material_a);
  hilt1.position.set(0,0.6,0);
  hilt.add(hilt1);
  components_a.push(hilt1);

  var blade_scale = new THREE.Matrix4().set(0.8,0,0,0, 0,1.5,0,0, 0,0,0.2,0, 0,0,0,1);
  var blade_Geometry = new THREE.CylinderGeometry(1,1,5,50);
  blade_Geometry.applyMatrix(blade_scale);
  var blade = new THREE.Mesh(blade_Geometry,material_a);
  blade.position.set(0,4,0);
  hilt1.add(blade);
  components_a.push(blade);

  var sheild_scale = new THREE.Matrix4().set(5,0,0,0, 0,6,0,0, 0,0,0.3,0, 0,0,0,1);
  var sheild_Geometry = makeCube();
  sheild_Geometry.applyMatrix(sheild_scale);
  var sheild = new THREE.Mesh(sheild_Geometry,material_a);
  sheild.position.set(0,0,-2.5);
  arm_left.add(sheild);
  components_a.push(sheild)

  //window.addEventListener( 'mousemove', onDocumentMouseDown, false );

}


// Jack

var components = [];  // body, head, lhand, rhand, lleg, rleg
var material = new THREE.MeshBasicMaterial( {color: 'green'} );

function addRob2(){
   
  var body_geo = new THREE.CylinderGeometry( 2, 2, 4, 32 );
  var body = new THREE.Mesh(body_geo,material);
  scene.add(body);
  body.position.set(10,4,0);
  components.push(body);


  var head_geo = new THREE.DodecahedronGeometry(1, 0);
  var head = new THREE.Mesh(head_geo,material);
  body.add(head);
  components.push(head);
  head.position.set(0,3.5,0);



  var l_hand_geo = new THREE.BoxGeometry(1, 3, 1);
  var l_hand = new THREE.Mesh(l_hand_geo,material);
  body.add(l_hand);
  components.push(l_hand);
  l_hand.position.set(0,0,-3);


  var r_hand_geo = new THREE.BoxGeometry(1, 3, 1);
  var r_hand = new THREE.Mesh(r_hand_geo,material);
  body.add(r_hand);
  components.push(r_hand);
  r_hand.position.set(0,0,3);

 
  var l_leg_geo = new THREE.BoxGeometry(1, 3, 1);
  var l_leg = new THREE.Mesh(l_leg_geo,material);
  body.add(l_leg);
  components.push(l_leg);
  l_leg.position.set(0,-3,-0.8);


  var r_leg_geo = new THREE.BoxGeometry(1, 3, 1);
  var r_leg = new THREE.Mesh(r_leg_geo,material);
  body.add(r_leg);
  components.push(r_leg);
  //r_leg.position.set(10,1,0.8);
  r_leg.position.set(0,-3,0.8);
}



var texts = [];

var textmaterial = new THREE.MeshNormalMaterial();
var text_pos = new THREE.Matrix4().set(1,0,0,0, 0,1,0,22, 0,0,1,-5, 0,0,0,1);
var text0_geo = new THREE. TextGeometry("START",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text0 = new THREE.Mesh(text0_geo,textmaterial);
text0.position.set(0,22,-5);
texts.push(text0);
var text1_geo = new THREE. TextGeometry("ATTACK - ATTACK",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text1 = new THREE.Mesh(text1_geo,textmaterial);
texts.push(text1);
text1.position.set(0,22,-5);
var text2_geo = new THREE. TextGeometry("ATTACK - DEFEND",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text2 = new THREE.Mesh(text2_geo,textmaterial);
texts.push(text2);
text2.position.set(0,22,-5);
var text3_geo = new THREE. TextGeometry("DEFEND - ATTACK",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text3 = new THREE.Mesh(text3_geo,textmaterial);
texts.push(text3);
text3.position.set(0,22,-5);
var text4_geo = new THREE. TextGeometry("DEFEND - DEFEND",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text4 = new THREE.Mesh(text4_geo,textmaterial);
texts.push(text4);
text4.position.set(0,22,-5);
scene.add(texts[0]);


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
// function init_animati
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

var rob2_wall_geo = new THREE.BoxGeometry(1, 3, 5);
var rob2_wall = new THREE.Mesh(rob2_wall_geo,material);
rob2_wall.position.set(3,5,0);
var is_wall = 0;

function rob2_defend(){
  if(is_wall == 0){scene.add(rob2_wall);is_wall=1;}
  components[2].rotateZ(-Math.PI/120);
  components[3].rotateZ(-Math.PI/120);
  rob2_wall.scale.y+=0.02;
}
function updateBody() {
  switch(true)
  {

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


 
      break

      case(key == 1 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        resetBody();
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 



      for(var i=0;i<6;i++){
              components[i].translateX(0.1);
      }

      
      break

      case(key == 3 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        resetBody();
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 


      
      break

      case(key == 4 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
      if (time > time_end){
        p = p1;
        animate = false;

        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      rob2_defend();

      
      break

      case(key == 99 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        resetBody();
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p),-Math.sin(-p), 0, 
                                            0, Math.sin(-p), Math.cos(-p), 0,
                                            0,        0,         0,        1);

     components[0].rotateZ(Math.PI/30);


      
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

function resetBody(){
  for(var i=0;i<6;i++){
    components[i].rotation.z=0;}
  scene.remove(rob2_wall);
  rob2_wall.scale.y = 1;
  is_wall = 0;
}

function takeAction(){
  switch (true){
     case(act1==1 && act2==1):
       resetBody();
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
       resetBody();
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
    console.log("11");key = 99; init_animation(0,Math.PI/4,1);
  }  
  else if(keyboard.eventMatches(event,"2")){    // 0: Set camera to neutral position, view reset
    if (turn == 0){act1=2;turn++;}
    else{act2 = 2; turn = 0; takeAction();}
  }
 


  // TO-DO: BIND KEYS TO YOUR JUMP CUTS AND ANIMATIONS
  // Note: Remember spacebar sets jumpcut/animate! 
  // Hint: Look up "threex.keyboardstate by Jerome Tienne" for more info.



    });



window.addEventListener( 'mousedown', onMouseDown, false);

var raycaster = new THREE.Raycaster();

function onMouseDown(event){
        event.preventDefault();
        var dir = new THREE.Vector3();
        var vector = new THREE.Vector3();
        vector.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5); 

        vector.unproject(camera);

        raycaster.set(camera.position, vector.sub(camera.position).normalize());

        var intersects1 = raycaster.intersectObjects(components, false);
        var intersects2 = raycaster.intersectObjects(components_a, false);

        if (intersects1.length > 0) {

            intersects1[0].object.material.color.setRGB(Math.random(),Math.random(),Math.random());

      }
        if (intersects2.length > 0) {

            intersects2[0].object.material.color.setRGB(Math.random(),Math.random(),Math.random());

      }
}

var render = function() {
 updateBody();
 requestAnimationFrame(render);
 renderer.render(scene, camera);

}

render();

});
