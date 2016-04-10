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

// LIGHTING UNIFORMS
var lightColor = new THREE.Color(1,1,1);
var ambientColor = new THREE.Color(0.4,0.4,0.4);
var lightPosition = new THREE.Vector3(70,100,70);

var kAmbient = 0.4;
var kDiffuse = 0.8;
var kSpecular = 0.8;
var shininess = 10.0;
var ctw_c = new THREE.Color(0.0,0.1,0.7);
var ctw_w = new THREE.Color(0.6,0.1,0.0); 


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

/*
var floorGeometry = new THREE.PlaneBufferGeometry(30, 30);
var floortexture = THREE.ImageUtils.loadTexture( 'texture/iron.jpg' );
var floorMaterial = new THREE.MeshBasicMaterial( { map: floortexture } );
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);
*/

var floorTexture = new THREE.ImageUtils.loadTexture('texture/ground.jpg');
//floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
//floorTexture.repeat.set(4, 4);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(100, 100);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

var floor_array = [floor,floor];

var imagePrefix = "texture/universe";
var directions  = ["1", "2", "3", "4", "5", "6"];
var imageSuffix = ".jpg";
var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 ); 
var materialArray = [];
for (var i = 0; i < 6; i++)
  materialArray.push( new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
    side: THREE.BackSide
  }));
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
scene.add( skyBox );

// set barrel
var cone_geo = new THREE.CylinderGeometry(0, 5, 15, 4, 1, true);
var cone1 = new THREE.Mesh(cone_geo,defaultMaterial);
cone1.position.set(45,7.5,-45);
scene.add(cone1);
var cone2 = new THREE.Mesh(cone_geo,defaultMaterial);
cone2.position.set(-45,7.5,-45);
scene.add(cone2);
var cone3 = new THREE.Mesh(cone_geo,defaultMaterial);
cone3.position.set(-45,7.5,45);
scene.add(cone3);
var cone4 = new THREE.Mesh(cone_geo,defaultMaterial);
cone4.position.set(45,7.5,45);
scene.add(cone4);



// CREATE SPHERES

function makeCube() {
  var unitCube = new THREE.BoxGeometry(1,1,1,1,1,1);
  return unitCube;
}



var components_a = [];
var material_a = new THREE.MeshBasicMaterial( {color: 'black'});
var bottexture = THREE.ImageUtils.loadTexture( 'texture/iron.jpg' );
var botMaterial = new THREE.MeshBasicMaterial( 
{
  map: bottexture
} );

var swordMaterial = new THREE.MeshBasicMaterial();
var shieldMaterial = new THREE.MeshBasicMaterial();

// Alan
function addRob1(){
  // set the general material
  //var normalMaterial = new THREE.MeshNormalMaterial( {color: 'red'});
  
  // set the torso of the character 0
  var torsoGeometry = makeCube();
  var torso_scale = new THREE.Matrix4().set(3,0,0,0, 0,7,0,0, 0,0,3,0, 0,0,0,1);
  torsoGeometry.applyMatrix(torso_scale);
  var torso = new THREE.Mesh(torsoGeometry,botMaterial);
  torso.position.set(-10,7.5,0);
  //scene.add(torso);
  components_a.push(torso);
 
  //1
  var ball1_Geometry = new THREE.SphereGeometry(0.5,35,35);
  var ball1 = new THREE.Mesh(ball1_Geometry,botMaterial);
  ball1.position.set(0,1,-1.2);
  //torso.add(ball1);
  components_a.push(ball1);
  
  // set arms and leg for the character 2
  var arm_left_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1);
  var arm_leftGeometry = makeCube();
  arm_leftGeometry.applyMatrix(arm_left_scale);
  var arm_left = new THREE.Mesh(arm_leftGeometry,botMaterial);
  arm_left.position.set(0,0,-2.5);
  //ball1.add(arm_left);
  components_a.push(arm_left);

  //3
  var ball2_Geometry = new THREE.SphereGeometry(0.5,35,35);
  var ball2 = new THREE.Mesh(ball2_Geometry,botMaterial);
  ball2.position.set(0,1,1.2);
  //torso.add(ball2);
  components_a.push(ball2);
  
  //4
  var arm_right_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,5,0, 0,0,0,1);
  var arm_rightGeometry = makeCube();
  arm_rightGeometry.applyMatrix(arm_right_scale);
  var arm_right = new THREE.Mesh(arm_rightGeometry,botMaterial);
  arm_right.position.set(0,0,2.5);
  //ball2.add(arm_right);
  components_a.push(arm_right);
  
  //5
  var leg_left_scale = new THREE.Matrix4().set(1,0,0,0, 0,4,0,0, 0,0,1,0, 0,0,0,1);
  var leg_left_Geometry = makeCube();
  leg_left_Geometry.applyMatrix(leg_left_scale);
  var leg_left = new THREE.Mesh(leg_left_Geometry,botMaterial);
  leg_left.position.set(0,-5,1);
  //torso.add(leg_left);
  components_a.push(leg_left);
  
  //6
  var leg_right_scale = new THREE.Matrix4().set(1,0,0,0, 0,4,0,0, 0,0,1,0, 0,0,0,1);
  var leg_right_Geometry = makeCube();
  leg_right_Geometry.applyMatrix(leg_right_scale);
  var leg_right = new THREE.Mesh(leg_right_Geometry,botMaterial);
  leg_right.position.set(0,-5,-1);
  //torso.add(leg_right);
  components_a.push(leg_right);

  
  
  // set neck and head for the character 7
  var neck_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var neck_Geometry = new THREE.CylinderGeometry(0.6,0.6,0.6,50);
  neck_Geometry.applyMatrix(neck_scale);
  var neck = new THREE.Mesh(neck_Geometry,botMaterial);
  neck.position.set(0,3.8,0);
  //torso.add(neck);
  components_a.push(neck);
  
  //8
  var head_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
  var head_Geometry = new THREE.SphereGeometry(1.5, 35, 35);
  head_Geometry.applyMatrix(head_scale);
  var head = new THREE.Mesh(head_Geometry,botMaterial);
  head.position.set(0,1.6,0);
  //neck.add(head);
  components_a.push(head);
  
  // draw the sword and sheild 9
  var hilt_scale = new THREE.Matrix4().set(0.7,0,0,0, 0,1.3,0,0, 0,0,0.5,0, 0,0,0,1);
  var hilt_Geometry = new makeCube();
  hilt_Geometry.applyMatrix(hilt_scale);
  var hilt = new THREE.Mesh(hilt_Geometry,botMaterial);
  hilt.position.set(0,1,2);
  //arm_right.add(hilt);
  components_a.push(hilt);
  
  //10
  var hilt1_scale = new THREE.Matrix4().set(1.5,0,0,0, 0,0.7,0,0, 0,0,0.6,0, 0,0,0,1);
  var hilt1_Geometry = new THREE.CylinderGeometry(1,1,0.2,50);
  hilt1_Geometry.applyMatrix(hilt1_scale);
  var hilt1 = new THREE.Mesh(hilt1_Geometry,botMaterial);
  hilt1.position.set(0,0.6,0);
  //hilt.add(hilt1);
  components_a.push(hilt1);
  
  //11
  var blade_scale = new THREE.Matrix4().set(0.8,0,0,0, 0,1.5,0,0, 0,0,0.2,0, 0,0,0,1);
  var blade_Geometry = new THREE.CylinderGeometry(1,1,5,50);
  blade_Geometry.applyMatrix(blade_scale);
  var blade = new THREE.Mesh(blade_Geometry,swordMaterial);
  blade.position.set(0,4,0);
  //hilt1.add(blade);
  components_a.push(blade);

  //12
  var sheild_scale = new THREE.Matrix4().set(5,0,0,0, 0,10,0,0, 0,0,0.3,0, 0,0,0,1);
  //var sheild_scale = new THREE.Matrix4().set(5,0,0,0, 0,6,0,0, 0,0,0.3,0, 0,0,0,1);
  var sheild_Geometry = makeCube();
  sheild_Geometry.applyMatrix(sheild_scale);
  var sheild = new THREE.Mesh(sheild_Geometry,shieldMaterial);
  sheild.position.set(0,0,-2.5);
  //arm_left.add(sheild);
  components_a.push(sheild)


  //window.addEventListener( 'mousemove', onDocumentMouseDown, false );

}


// Jack

var components = [];  // body, head, lhand, rhand, lleg, rleg
var bot2texture = THREE.ImageUtils.loadTexture( 'texture/green.jpg' );
var bot2Material = new THREE.MeshBasicMaterial( { map: bot2texture } );
var firetexture = THREE.ImageUtils.loadTexture( 'texture/fire.jpg' );
var fireMaterial = new THREE.MeshBasicMaterial( { map: firetexture } );
//var material = new THREE.MeshBasicMaterial( {color: 'green'} );
var rob2_init;
function addRob2(){
   
  var body_geo = new THREE.CylinderGeometry( 2, 2, 4, 32 );
  var body = new THREE.Mesh(body_geo,bot2Material);
  rob2_init = new THREE.Mesh(body_geo,bot2Material);
  //scene.add(body);

  body.position.set(10,4,0);
  components.push(body);


  var head_geo = new THREE.DodecahedronGeometry(1, 0);
  var head = new THREE.Mesh(head_geo,bot2Material);
  //body.add(head);
  components.push(head);
  head.position.set(0,3.5,0);



  var l_hand_geo = new THREE.BoxGeometry(1, 3, 1);
  var l_hand = new THREE.Mesh(l_hand_geo,bot2Material);
  //body.add(l_hand);
  components.push(l_hand);
  l_hand.position.set(0,0,-3);


  var r_hand_geo = new THREE.BoxGeometry(1, 3, 1);
  var r_hand = new THREE.Mesh(r_hand_geo,bot2Material);
  //body.add(r_hand);
  components.push(r_hand);
  r_hand.position.set(0,0,3);

 
  var l_leg_geo = new THREE.BoxGeometry(1, 3, 1);
  var l_leg = new THREE.Mesh(l_leg_geo,bot2Material);
  //body.add(l_leg);
  components.push(l_leg);
  l_leg.position.set(0,-3,-0.8);


  var r_leg_geo = new THREE.BoxGeometry(1, 3, 1);
  var r_leg = new THREE.Mesh(r_leg_geo,bot2Material);
  //body.add(r_leg);
  components.push(r_leg);
  //r_leg.position.set(10,1,0.8);
  r_leg.position.set(0,-3,0.8);
}




var texts = [];
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
var textmaterial = new THREE.ShaderMaterial({
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
  textmaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
  textmaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];
  textmaterial.needsUpdate = true;

  gouraudMaterial.vertexShader = shaders['glsl/gouraud.vs.glsl'];
  gouraudMaterial.fragmentShader = shaders['glsl/gouraud.fs.glsl'];
  gouraudMaterial.needsUpdate = true;
  })
var keyboardtext = new THREEx.KeyboardState();
function onKeyDown(event)
{
 if(keyboardtext.eventMatches(event,"m"))
  {
    alert("Gouraud Shading");
    textmaterial.vertexShader = gouraudMaterial.vertexShader;
    textmaterial.fragmentShader = gouraudMaterial.fragmentShader;
    textmaterial.needsUpdate = true;
  }
  else if(keyboardtext.eventMatches(event,"i"))
  {
    alert("Phong Shading");
    textmaterial.vertexShader = phong_a_Material.vertexShader;
    textmaterial.fragmentShader = phong_a_Material.fragmentShader;
    textmaterial.needsUpdate = true;
  }
  else if(keyboardtext.eventMatches(event,"o"))
  {
    alert("Blinn Shading");
    textmaterial.vertexShader = blinn_a_Material.vertexShader;
    textmaterial.fragmentShader = blinn_a_Material.fragmentShader;
    textmaterial.needsUpdate = true;
  }
  else{
  }  
};
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

var text5_geo = new THREE. TextGeometry("ATTACK - CHARGE",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text5 = new THREE.Mesh(text5_geo,textmaterial);
texts.push(text5);
text5.position.set(0,22,-5);
var text6_geo = new THREE. TextGeometry("DEFEND - CHARGE",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text6 = new THREE.Mesh(text6_geo,textmaterial);
texts.push(text6);
text6.position.set(0,22,-5);
var text7_geo = new THREE. TextGeometry("CHARGE - ATTACK",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text7 = new THREE.Mesh(text7_geo,textmaterial);
texts.push(text7);
text7.position.set(0,22,-5);
var text8_geo = new THREE. TextGeometry("CHARGE - DEFEND",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text8 = new THREE.Mesh(text8_geo,textmaterial);
texts.push(text8);
text8.position.set(0,22,-5);
var text9_geo = new THREE. TextGeometry("CHARGE - CHARGE",{size: 2, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
var text9 = new THREE.Mesh(text9_geo,textmaterial);
texts.push(text9);
text9.position.set(0,22,-5);

scene.add(texts[0]);
keyboardtext.domElement.addEventListener('keydown', onKeyDown );



addRob1();
addRob2();
scene.add(components_a[0]);
components_a[0].add(components_a[1]);
components_a[1].add(components_a[2]);
components_a[0].add(components_a[3]);
components_a[3].add(components_a[4]);
components_a[0].add(components_a[5]);
components_a[0].add(components_a[6]);
components_a[0].add(components_a[7]);
components_a[7].add(components_a[8]);
components_a[4].add(components_a[9]);
components_a[9].add(components_a[10]);
components_a[10].add(components_a[11]);
components_a[2].add(components_a[12]);

scene.add(components[0]);
for(i=1;i<6;i++){
  components[0].add(components[i]);
}

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


function rob1_defend() {
  //var axis = new THREE.Vector3(0,1,0);
  //components_a[1].rotateOnAxis(axis,-Math.PI/120);
  components_a[1].rotateY(-Math.PI/120);
}

function rob1_charge(){
  components_a[1].rotateY(-Math.PI/120);
  components_a[12].material.color.setRGB(Math.random(),Math.random(),Math.random());  

}


var rob2_wall_geo = new THREE.BoxGeometry(1, 3, 5);
var rob2_wall = new THREE.Mesh(rob2_wall_geo,fireMaterial);
rob2_wall.position.set(3,5,0);
var is_wall = 0;

function rob2_defend(){
  if(is_wall == 0){scene.add(rob2_wall);is_wall=1;}
  components[2].rotateZ(-Math.PI/120);
  components[3].rotateZ(-Math.PI/120);
  rob2_wall.scale.y+=0.02;
}

function rob2_charge(){
  if(is_wall == 0){scene.add(rob2_wall);is_wall=1;}
  rob2_wall.material.color.setRGB(Math.random(),Math.random(),Math.random());  
  components[2].rotateZ(-Math.PI/120);
  components[3].rotateZ(-Math.PI/120);
  rob2_wall.scale.y+=0.02;
}
  var counter = 0;
function rob1_attack_charge(p) {
  components_a[11].material.color.setRGB(Math.random(),Math.random(),Math.random());  
  if(counter<30){
    var axis = new THREE.Vector3(0,1,0);
    components_a[3].rotateOnAxis(axis,Math.PI/60);
    components_a[0].translateX(0.09);
    counter++;
  }
  else if(30<=counter && counter<45){

    components_a[10].rotateY(Math.PI/30);
    counter++;
  }
  else if(45<=counter && counter<60){
    components_a[3].rotateX(Math.PI/20);
  } 
}

function rob1_attack() {
  if(counter<30){
    var axis = new THREE.Vector3(0,1,0);
    components_a[3].rotateOnAxis(axis,Math.PI/60);
    components_a[0].translateX(0.09);
    counter++;
  }
  else if(30<=counter && counter<45){

    components_a[10].rotateY(Math.PI/30);
    counter++;
  }
  else if(45<=counter && counter<60){
    components_a[3].rotateX(Math.PI/20);
  } 
}


var rob2_frame = 0;
function rob2_attack(){
  if(rob2_frame<=30){components[0].rotateZ(Math.PI/60); rob2_frame++;}
  else{
    components[0].translateY(0.6);
  }

}
function rob2_attack_charge(){
  components[0].material.color.setRGB(Math.random(),Math.random(),Math.random()); 
  if(rob2_frame<=30){components[0].rotateZ(Math.PI/60); rob2_frame++;}
  else{
    components[0].translateY(0.6);
  }
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
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
      if(p1_charge>0){rob1_attack_charge();}
      else{rob1_attack();}
      if(p2_charge>0){rob2_attack_charge();}
      else{
      rob2_attack();}

      //*********************************************************************************
      // collision part, need to change
      var head = components[0];
      var originPoint = head.position.clone();
      for (var vertexIndex = 0; vertexIndex < head.geometry.vertices.length; vertexIndex++)
      {   
        var localVertex = head.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( head.matrix);    
        var directionVector = globalVertex.sub( head.position );
    
        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( components_a );
          if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
              animate = false;  console.log("!!");        
            }
      } 
      //*******************************************************************************************

      
      break

      case(key == 2 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var head = rob2_wall;
      var originPoint = head.position.clone();
      for (var vertexIndex = 0; vertexIndex < head.geometry.vertices.length; vertexIndex++)
      {   
        var localVertex = head.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( head.matrix);    
        var directionVector = globalVertex.sub( head.position );
    
        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( components_a );
          if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
              animate = false;  console.log("!!");        
            }
      } 
      if(p1_charge>0){rob1_attack_charge();}
      else{rob1_attack();}
      rob2_defend();

      
      break

      case(key == 3 && animate):

      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      
      if(p<0.1){}
      else{
      var head = components_a[12];
      var originPoint = head.position.clone();
      for (var vertexIndex = 0; vertexIndex < head.geometry.vertices.length; vertexIndex++)
      {   
        var localVertex = head.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( head.matrixWorld);    
        var directionVector = globalVertex.sub( head.position );
    
        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( components );
          if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
              animate = false;  console.log("!!");        
            }
      } 
     }
      
      rob1_defend();
      if(p2_charge==0){
      rob2_attack();}
      else{rob2_attack_charge;}

      
      break

      case(key == 4 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      rob1_defend();
      rob2_defend();
      
      break

      case(key == 5 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      if(p1_charge>0){rob1_attack_charge();}
      else{rob1_attack();}
      rob2_charge();

      var head = rob2_wall;
      var originPoint = head.position.clone();
      for (var vertexIndex = 0; vertexIndex < head.geometry.vertices.length; vertexIndex++)
      {   
        var localVertex = head.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( head.matrix);    
        var directionVector = globalVertex.sub( head.position );
    
        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( components_a );
          if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
              animate = false;  console.log("!!");        
            }
      } 
      
      break

      case(key == 6 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      rob1_defend();
      rob2_charge();
      
      break

            case(key == 7 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      rob1_charge();
      if(p2_charge==0){
      rob2_attack();}
      else{rob2_attack_charge();}
      
      break

      case(key == 8 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      rob1_charge();
      rob2_defend();
      
      break

      case(key == 9 && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      rob1_charge();
      rob2_charge();
      
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

var hp1 = 10;
var hp2 = 10;
var mp1 = 0;
var mp2 = 0;
var act1 = 0;
var act2 = 0;
var turn = 0;
var key = 0; // 1:11,2:12,3:21,4:22
var p1_charge = 0;
var p2_charge = 0;


function removeText(){
  scene.remove(texts[key]);
}
function addText(){
  scene.add(texts[key]);
  console.log("!!! "+ key);
}

function resetBody(){

  counter = 0;
  components_a[1].rotation.y=0;
  components_a[1].rotation.x=0;
  components_a[1].rotation.z=0;
  components_a[0].position.set(-10,7,0);
  components_a[3].rotation.x=0;
  components_a[3].rotation.y=0;
  components_a[3].rotation.z=0;
  components_a[10].rotation.x=0;
  components_a[10].rotation.y=0;
  components_a[10].rotation.z=0;

  for(var i=0;i<=12;i++){
    components_a[i].updateMatrix();
  }
  


  is_wall = 0;
  scene.remove(rob2_wall);
  rob2_wall.scale.y = 0;
  rob2_frame = 0;
  components[0].rotation.z=0;components[2].rotation.z=0;components[3].rotation.z=0;
  components[0].position.set(10,4,0);

  components[0].updateMatrix(); 
  components[1].updateMatrix(); 
  rob2_wall.updateMatrix();


}

var text_hp1,text_hp2;
var hp1_ori= new THREE. TextGeometry("HP/MP: 10/0",{size: 1.5, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
text_hp1 = new THREE.Mesh(hp1_ori,textmaterial);
text_hp1.position.set(10,18,-5);
scene.add(text_hp1);
text_hp2 = new THREE.Mesh(hp1_ori,textmaterial);
text_hp2.position.set(-10,18,-5);
scene.add(text_hp2);
function updateHP(){
  var string1 = "HP1/MP1: "+ hp1+"/"+mp1;
  var string2 = "HP2/MP2: "+ hp2+"/"+mp2;
  var new_hp1 = new THREE. TextGeometry(string1,{size: 1.5, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
  var new_hp2 = new THREE. TextGeometry(string2,{size: 1.5, height: 1, curveSegments: 2, font: "helvetiker", weight: "normal", style: "normal" });
  text_hp1.geometry = new_hp2;
  text_hp2.geometry = new_hp1;

  if(hp1<=0 && hp2<=0){alert("DRAW");location.reload();}
  else if(hp1<=0){alert("P2 Wins");location.reload();}
  else if(hp2<=0){alert("p1 Wins");location.reload();}
  else{}


}

function takeAction(){
  switch (true){
     case(act1==1 && act2==1):
       p1_charge = mp1;
       p2_charge = mp2;
       hp1 = hp1-(1+mp2);
       hp2 = hp2-(1+mp1);
       mp2=0;
       mp1=0;
       updateHP();
       resetBody();
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=1;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
     case(act1==1 && act2==2):
       p1_charge = mp1;
       p2_charge = mp2;
       if(mp1>0){hp2--;mp1=0;}
       updateHP();
       resetBody();
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=2;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
     case(act1==2 && act2==1):
       p1_charge = mp1;
       p2_charge = mp2;
       if(mp2>0){hp1--;mp2=0;}
       updateHP();
       resetBody();
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=3;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
     case(act1==2 && act2==2):
       p1_charge = mp1;
       p2_charge = mp2;
       resetBody();
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=4;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
     
     case(act1==1 && act2==3):       
       p1_charge = mp1;
       p2_charge = mp2;
       hp2 = hp2-(1+mp1);
       mp1=0;
       updateHP();
       resetBody();
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=5;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
    case(act1==2 && act2==3):
       p1_charge = mp1;
       p2_charge = mp2;
       mp2++;
       updateHP();
       resetBody();
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=6;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
    case(act1==3 && act2==1):
       p1_charge = mp1;
       p2_charge = mp2;
       hp1 = hp1-(1+mp2);
       mp2 = 0;
       updateHP();
       resetBody();
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=7;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
    case(act1==3 && act2==2):
       p1_charge = mp1;
       p2_charge = mp2;
       mp1++;
       updateHP();
       resetBody();
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=8;
       addText();
       init_animation(0,Math.PI/4,1);
     break;
    case(act1==3 && act2==3):
       p1_charge = mp1;
       p2_charge = mp2;
       mp1++;
       mp2++;
       updateHP();
       resetBody();
       removeText();
       console.log("1: "+act1+" 2: "+act2);
       key=9;
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
  else if(keyboard.eventMatches(event,"1")){   
    if (turn == 0){act1=1;turn++;}
    else{act2 = 1; turn = 0; takeAction();}
  }
  else if(keyboard.eventMatches(event,"U")){ 
    console.log("11");key = 99; init_animation(0,Math.PI/4,1);
  }  
  else if(keyboard.eventMatches(event,"2")){    
    if (turn == 0){act1=2;turn++;}
    else{act2 = 2; turn = 0; takeAction();}
  }
  else if(keyboard.eventMatches(event,"3")){    
    if (turn == 0){act1=3;turn++;}
    else{act2 = 3; turn = 0; takeAction();}
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

var rayDirections = [];
rayDirections.push(new THREE.Vector3(1, 1, 1));
rayDirections.push(new THREE.Vector3(-1, 1, 1));
rayDirections.push(new THREE.Vector3(1, 1, -1));
rayDirections.push(new THREE.Vector3(-1, 1, -1));            
rayDirections.push(new THREE.Vector3(1, -1, 1));
rayDirections.push(new THREE.Vector3(-1, -1, 1));
rayDirections.push(new THREE.Vector3(1, -1, -1));
rayDirections.push(new THREE.Vector3(-1, -1, -1));  



var render = function() {
 updateBody();
 requestAnimationFrame(render);
 renderer.render(scene, camera);
 texts[key].lookAt(camera.position);
 text_hp1.lookAt(camera.position);
 text_hp2.lookAt(camera.position);

}

render();

});
