import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {ParticleSystem} from "@babylonjs/core/Particles";
import {Sound} from "@babylonjs/core/Audio";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {returnMetalTexture, returnCrystalTexture, returnFloorTexture,
  returnWoodTexture, returnStoneTexture, returnLiquidTexture, returnTreeTexture} from "../textures.js";

function tightRope(x, z, scene, global_objects, item_id, camera) {
  let acidColors = [
    { acid_color: "acid_orange", bubble_color: new Color3(0.94, 0.32, 0.13) },
    { acid_color: "acid_green", bubble_color: new Color3(0.27, 0.97, 0.1) },
    { acid_color: "acid_pink", bubble_color: new Color3(0.84, 0.1, 0.97) }
  ];
  acidColors = arrayShuffler(acidColors);

  let buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
  buttonHolder1.position.y = 7.5;
  buttonHolder1.position.x = x + 20;
  buttonHolder1.position.z = z + 20;
  buttonHolder1.material = new StandardMaterial('texture1', scene);
  buttonHolder1.material.diffuseTexture = returnMetalTexture("iron", scene);
  buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder1.checkCollisions = true;

  let buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier1.position.y = 11;
  buttonBarrier1.position.x = x + 20;
  buttonBarrier1.position.z = z + 20;
  buttonBarrier1.material = new StandardMaterial('texture1', scene);
  buttonBarrier1.material.alpha = 0;
  buttonBarrier1.name = "button1p10";

  let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
  pushButton1.position.y = 9.25;
  pushButton1.position.x = x + 20;
  pushButton1.position.z = z + 20;
  pushButton1.material = new StandardMaterial('texture1', scene);
  pushButton1.material.diffuseTexture = returnCrystalTexture("gem_darkred", scene);
  pushButton1.name = "pushButton1p10";

  let theExitBase1 = MeshBuilder.CreateBox("box", {width: 10, height: 6.5, depth: 10}, scene);
  theExitBase1.position.y = 3.25;
  theExitBase1.position.x = x + 20;
  theExitBase1.position.z = z + 20;
  theExitBase1.material = new StandardMaterial('texture1', scene);
  theExitBase1.material.diffuseTexture = returnWoodTexture("wood_lightbrown", scene);
  theExitBase1.material.diffuseTexture.uScale = 5;
  theExitBase1.material.diffuseTexture.vScale = 5;
  theExitBase1.physicsImpostor = new PhysicsImpostor(theExitBase1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theExitBase1.checkCollisions = true;
  global_objects.push({id: theExitBase1.uniqueId, obstacle10_id: item_id, type: "structure", name: ""});

  let theStartBase1 = MeshBuilder.CreateBox("box", {width: 10, height: 6.5, depth: 10}, scene);
  theStartBase1.position.y = 3.25;
  theStartBase1.position.x = x - 20;
  theStartBase1.position.z = z - 20;
  theStartBase1.material = new StandardMaterial('texture1', scene);
  theStartBase1.material.diffuseTexture = returnWoodTexture("wood_lightbrown", scene);
  theStartBase1.material.diffuseTexture.uScale = 5;
  theStartBase1.material.diffuseTexture.vScale = 5;
  theStartBase1.physicsImpostor = new PhysicsImpostor(theStartBase1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theStartBase1.checkCollisions = true;

  let rail1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 6.5, tessellation: 12}, scene);
  rail1.position.y = 3.25;
  rail1.material = new StandardMaterial('texture1', scene);
  rail1.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

  let rail2 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 6.5, tessellation: 12}, scene);
  rail2.position.y = 3.25;
  rail2.position.x = -2;
  rail2.material = new StandardMaterial('texture1', scene);
  rail2.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

  let rung1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12}, scene);
  rung1.position.y = 0.25;
  rung1.position.x = -1;
  rung1.rotation.z = Math.PI / 2;
  rung1.material = new StandardMaterial('texture1', scene);
  rung1.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

  let rung2 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12}, scene);
  rung2.position.y = 1.75;
  rung2.position.x = -1;
  rung2.rotation.z = Math.PI / 2;
  rung2.material = new StandardMaterial('texture1', scene);
  rung2.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

  let rung3 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12}, scene);
  rung3.position.y = 3.25;
  rung3.position.x = -1;
  rung3.rotation.z = Math.PI / 2;
  rung3.material = new StandardMaterial('texture1', scene);
  rung3.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

  let rung4 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12}, scene);
  rung4.position.y = 4.75;
  rung4.position.x = -1;
  rung4.rotation.z = Math.PI / 2;
  rung4.material = new StandardMaterial('texture1', scene);
  rung4.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

  let rung5 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12}, scene);
  rung5.position.y = 6.25;
  rung5.position.x = -1;
  rung5.rotation.z = Math.PI / 2;
  rung5.material = new StandardMaterial('texture1', scene);
  rung5.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

  let ladderBarrier = MeshBuilder.CreateBox("box", {width: 3, height: 6.5, depth: 1}, scene);
  ladderBarrier.position.y = 3.25;
  ladderBarrier.position.x = -1;
  ladderBarrier.material = new StandardMaterial('texture1', scene);
  ladderBarrier.material.alpha = 0;

  let ladder = Mesh.MergeMeshes([rail1, rail2, rung1, rung2, rung3, rung4, rung5, ladderBarrier], true, true, undefined, false, true);
  ladder.position.x = x - 19;
  ladder.position.z = z - 14.75;
  ladder.physicsImpostor = new PhysicsImpostor(ladderBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  ladder.checkCollisions = true;
  global_objects.push({id: ladder.uniqueId, type: "ladder", exit_pos: {x: (x - 19), z: (z - 15.75), y: 10.5}});

  let tightRope = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 42.5, tessellation: 8}, scene);
  tightRope.position.y = 6;
  tightRope.rotation.x = Math.PI / 2;
  tightRope.material = new StandardMaterial('texture1', scene);
  tightRope.material.diffuseTexture = returnTreeTexture("bark_wavy", scene);

  let tightRopeBarrier = MeshBuilder.CreateBox("box", {width: 0.35, height: 0.5, depth: 43}, scene);
  tightRopeBarrier.position.y = 6.25;
  tightRopeBarrier.material = new StandardMaterial('texture1', scene);
  tightRopeBarrier.material.alpha = 0;

  let rope = Mesh.MergeMeshes([tightRope, tightRopeBarrier], true, true, undefined, false, true);
  rope.position.x = x;
  rope.position.z = z;
  rope.rotation.y = 0.785;
  rope.physicsImpostor = new PhysicsImpostor(tightRopeBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  rope.checkCollisions = true;

  let pitWall1 = MeshBuilder.CreateBox("box", {width: 1, height: 3, depth: 32}, scene);
  pitWall1.position.y = 1.5;
  pitWall1.position.x = -7;
  pitWall1.material = new StandardMaterial('texture1', scene);
  pitWall1.material.diffuseTexture = returnStoneTexture("stone", scene);
  pitWall1.material.diffuseTexture.uScale = 4;
  pitWall1.material.diffuseTexture.vScale = 4;

  let pitWall2 = MeshBuilder.CreateBox("box", {width: 1, height: 3, depth: 32}, scene);
  pitWall2.position.y = 1.5;
  pitWall2.position.x = 7;
  pitWall2.material = new StandardMaterial('texture1', scene);
  pitWall2.material.diffuseTexture = returnStoneTexture("stone", scene);
  pitWall2.material.diffuseTexture.uScale = 4;
  pitWall2.material.diffuseTexture.vScale = 4;

  let pitWall3 = MeshBuilder.CreateBox("box", {width: 13, height: 3, depth: 1}, scene);
  pitWall3.position.y = 1.5;
  pitWall3.position.z = -15.5;
  pitWall3.material = new StandardMaterial('texture1', scene);
  pitWall3.material.diffuseTexture = returnStoneTexture("stone", scene);
  pitWall3.material.diffuseTexture.uScale = 2;
  pitWall3.material.diffuseTexture.vScale = 2;

  let pitWall4 = MeshBuilder.CreateBox("box", {width: 13, height: 3, depth: 1}, scene);
  pitWall4.position.y = 1.5;
  pitWall4.position.z = 15.5;
  pitWall4.material = new StandardMaterial('texture1', scene);
  pitWall4.material.diffuseTexture = returnStoneTexture("stone", scene);
  pitWall4.material.diffuseTexture.uScale = 2;
  pitWall4.material.diffuseTexture.vScale = 2;

  let pitAcid = MeshBuilder.CreateBox("box", {width: 13, height: 2, depth: 30}, scene);
  pitAcid.position.y = 1;
  pitAcid.material = new StandardMaterial('texture1', scene);
  pitAcid.material.diffuseTexture = returnLiquidTexture(acidColors[0].acid_color, scene);
  pitAcid.material.diffuseTexture.uScale = 3;
  pitAcid.material.diffuseTexture.vScale = 1;

  let pitBarrier = MeshBuilder.CreateBox("box", {width: 15, height: 1.5, depth: 32}, scene);
  pitBarrier.position.y = 0.75;
  pitBarrier.material = new StandardMaterial('texture1', scene);
  pitBarrier.material.alpha = 0;

  let thePit = Mesh.MergeMeshes([pitWall1, pitWall2, pitWall3, pitWall4, pitBarrier, pitAcid], true, true, undefined, false, true);
  thePit.position.x = x;
  thePit.position.z = z;
  thePit.rotation.y = 0.785;
  thePit.physicsImpostor = new PhysicsImpostor(pitBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  thePit.checkCollisions = true;

  let bubble1 = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  bubble1.position.y = 2;
  bubble1.position.x = x + 5;
  bubble1.position.z = z + 10;
  bubble1.material = new StandardMaterial('texture1', scene);
  bubble1.material.diffuseTexture = returnLiquidTexture(acidColors[0].acid_color, scene);

  let bubble1Particles = new ParticleSystem("particles", 2000);
  bubble1Particles.particleTexture = new Texture("./imgs/circle.png");
  bubble1Particles.emitter = bubble1;
  bubble1Particles.addColorGradient(0, acidColors[0].bubble_color);
  bubble1Particles.start();

  let bubble2 = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  bubble2.position.y = 2;
  bubble2.position.x = x + 1;
  bubble2.position.z = z - 3;
  bubble2.material = new StandardMaterial('texture1', scene);
  bubble2.material.diffuseTexture = returnLiquidTexture(acidColors[0].acid_color, scene);

  let bubble2Particles = new ParticleSystem("particles", 2000);
  bubble2Particles.particleTexture = new Texture("./imgs/circle.png");
  bubble2Particles.emitter = bubble2;
  bubble2Particles.addColorGradient(0, acidColors[0].bubble_color);
  bubble2Particles.start();

  let bubble3 = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  bubble3.position.y = 2;
  bubble3.position.x = x - 9;
  bubble3.position.z = z - 4;
  bubble3.material = new StandardMaterial('texture1', scene);
  bubble3.material.diffuseTexture = returnLiquidTexture(acidColors[0].acid_color, scene);

  let bubble3Particles = new ParticleSystem("particles", 2000);
  bubble3Particles.particleTexture = new Texture("./imgs/circle.png");
  bubble3Particles.emitter = bubble3;
  bubble3Particles.addColorGradient(0, acidColors[0].bubble_color);
  bubble3Particles.start();

  let acidDeath = MeshBuilder.CreateBox("box", {width: 13, height: 0.25, depth: 30}, scene);
  acidDeath.position.y = 2;
  acidDeath.position.x = x;
  acidDeath.position.z = z;
  acidDeath.rotation.y = 0.785;
  acidDeath.material = new StandardMaterial('texture1', scene);
  acidDeath.material.alpha = 0;
  acidDeath.physicsImpostor = new PhysicsImpostor(acidDeath, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  acidDeath.checkCollisions = true;
  global_objects.push({id: acidDeath.uniqueId, type: "acid", exit_pos: {x: (x - 20), z: (z + 16), y: 4}});

  let acidDeathSound = new Sound("acidDeathSound", "./sound/LavaLoop.wav", scene, null, { loop: true, autoplay: true, volume: 0.75, maxDistance: 50 });
  acidDeathSound.attachToMesh(acidDeath);

  let tombstone1 = MeshBuilder.CreateBox("box", {width: 3, height: 3, depth: 1}, scene);
  tombstone1.position.y = 1.5;
  tombstone1.material = new StandardMaterial('texture1', scene);
  tombstone1.material.diffuseTexture = returnStoneTexture("stone_dark", scene);

  let tombstone2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.9, tessellation: 20}, scene);
  tombstone2.position.y = 2.7;
  tombstone2.rotation.x = 1.57;
  tombstone2.material = new StandardMaterial('texture1', scene);
  tombstone2.material.diffuseTexture = returnStoneTexture("stone_dark", scene);

  let tombstoneBarrier = MeshBuilder.CreateBox("box", {width: 3, height: 3, depth: 1}, scene);
  tombstoneBarrier.position.y = 1.5;
  tombstoneBarrier.material = new StandardMaterial('texture1', scene);
  tombstoneBarrier.material.alpha = 0;

  let grave = Mesh.MergeMeshes([tombstone1, tombstone2, tombstoneBarrier], true, true, undefined, false, true);
  grave.position.x = x - 20;
  grave.position.z = z + 20;
  grave.physicsImpostor = new PhysicsImpostor(tombstoneBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  grave.checkCollisions = true;

  let board1 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.8, depth: 11.75}, scene);
  board1.position.y = 0.4;
  board1.position.x = x - 23;
  board1.position.z = z + 16;
  board1.material = new StandardMaterial('texture1', scene);
  board1.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let board2 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.8, depth: 11.75}, scene);
  board2.position.y = 0.4;
  board2.position.x = x - 17;
  board2.position.z = z + 16;
  board2.material = new StandardMaterial('texture1', scene);
  board2.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let board3 = MeshBuilder.CreateBox("box", {width: 6.25, height: 0.8, depth: 0.25}, scene);
  board3.position.y = 0.4;
  board3.position.x = x - 20;
  board3.position.z = z + 10;
  board3.material = new StandardMaterial('texture1', scene);
  board3.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let board4 = MeshBuilder.CreateBox("box", {width: 6.25, height: 0.8, depth: 0.25}, scene);
  board4.position.y = 0.4;
  board4.position.x = x - 20;
  board4.position.z = z + 22;
  board4.material = new StandardMaterial('texture1', scene);
  board4.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let dirt = MeshBuilder.CreateBox("box", {width: 6, height: 0.1, depth: 12}, scene);
  dirt.position.y = 0.4;
  dirt.position.x = x - 20;
  dirt.position.z = z + 16;
  dirt.material = new StandardMaterial('texture1', scene);
  dirt.material.diffuseTexture = returnFloorTexture("soil", scene);
}

export {tightRope};
