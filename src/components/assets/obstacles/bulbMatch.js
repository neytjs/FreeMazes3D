import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {getBulbMasterColor, getBulb1colors, getBulb2colors, getBulb3colors, getBulb4colors, cloneAndShuffleMasterColor} from "../bulb_colors.js";

function bulbMatch(x, z, scene, global_objects, item_id, camera) {
  cloneAndShuffleMasterColor();
  var pedestal = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 10}, scene);
  pedestal.position.y = 0.5;
  pedestal.position.x = x;
  pedestal.position.z = z;
  pedestal.material = new StandardMaterial('texture1', scene);
  pedestal.material.diffuseColor = new Color3(0.27, 0.2, 0.12);
  pedestal.physicsImpostor = new PhysicsImpostor(pedestal, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  pedestal.checkCollisions = true;

  var pedestalBarrier = MeshBuilder.CreateBox("box", {width: 30, height: 10, depth: 10}, scene);
  pedestalBarrier.position.y = 5;
  pedestalBarrier.position.x = x;
  pedestalBarrier.position.z = z;
  pedestalBarrier.material = new StandardMaterial('texture1', scene);
  pedestalBarrier.material.diffuseColor = new Color3(0.27, 0.2, 0.12);
  pedestalBarrier.material.alpha = 0;
  pedestalBarrier.physicsImpostor = new PhysicsImpostor(pedestalBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  pedestalBarrier.checkCollisions = true;

  let pylon1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8}, scene);
  pylon1.position.y = 1.75;
  pylon1.position.x = x - 12;
  pylon1.position.z = z;
  pylon1.material = new StandardMaterial('texture1', scene);
  pylon1.material.diffuseColor = new Color3(0, 0, 0);

  let pylon2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8}, scene);
  pylon2.position.y = 1.75;
  pylon2.position.x = x - 4;
  pylon2.position.z = z;
  pylon2.material = new StandardMaterial('texture1', scene);
  pylon2.material.diffuseColor = new Color3(0, 0, 0);

  let pylon3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8}, scene);
  pylon3.position.y = 1.75;
  pylon3.position.x = x + 4;
  pylon3.position.z = z;
  pylon3.material = new StandardMaterial('texture1', scene);
  pylon3.material.diffuseColor = new Color3(0, 0, 0);

  let pylon4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8}, scene);
  pylon4.position.y = 1.75;
  pylon4.position.x = x + 12;
  pylon4.position.z = z;
  pylon4.material = new StandardMaterial('texture1', scene);
  pylon4.material.diffuseColor = new Color3(0, 0, 0);

  var buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
  buttonHolder1.position.y = 1.5;
  buttonHolder1.position.x = x - 12;
  buttonHolder1.position.z = z - 12;
  buttonHolder1.material = new StandardMaterial('texture1', scene);
  buttonHolder1.material.diffuseColor = new Color3(0.37, 0.32, 0.32);
  buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder1.checkCollisions = true;

  var buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier1.position.y = 5;
  buttonBarrier1.position.x = x - 12;
  buttonBarrier1.position.z = z - 12;
  buttonBarrier1.material = new StandardMaterial('texture1', scene);
  buttonBarrier1.material.alpha = 0;
  buttonBarrier1.name = "button1";
  global_objects.push({id: buttonBarrier1.uniqueId, obstacle2_id: item_id, type: "puzzle_piece", name: ""});

  var buttonHolder2 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
  buttonHolder2.position.y = 1.5;
  buttonHolder2.position.x = x - 4;
  buttonHolder2.position.z = z - 12;
  buttonHolder2.material = new StandardMaterial('texture1', scene);
  buttonHolder2.material.diffuseColor = new Color3(0.37, 0.32, 0.32);
  buttonHolder2.physicsImpostor = new PhysicsImpostor(buttonHolder2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder2.checkCollisions = true;

  var buttonBarrier2 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier2.position.y = 5;
  buttonBarrier2.position.x = x - 4;
  buttonBarrier2.position.z = z - 12;
  buttonBarrier2.material = new StandardMaterial('texture1', scene);
  buttonBarrier2.material.alpha = 0;
  buttonBarrier2.name = "button2";

  var buttonHolder3 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
  buttonHolder3.position.y = 1.5;
  buttonHolder3.position.x = x + 4;
  buttonHolder3.position.z = z - 12;
  buttonHolder3.material = new StandardMaterial('texture1', scene);
  buttonHolder3.material.diffuseColor = new Color3(0.37, 0.32, 0.32);
  buttonHolder3.physicsImpostor = new PhysicsImpostor(buttonHolder3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder3.checkCollisions = true;

  var buttonBarrier3 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier3.position.y = 5;
  buttonBarrier3.position.x = x + 4;
  buttonBarrier3.position.z = z - 12;
  buttonBarrier3.material = new StandardMaterial('texture1', scene);
  buttonBarrier3.material.alpha = 0;
  buttonBarrier3.name = "button3";

  var buttonHolder4 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
  buttonHolder4.position.y = 1.5;
  buttonHolder4.position.x = x + 12;
  buttonHolder4.position.z = z - 12;
  buttonHolder4.material = new StandardMaterial('texture1', scene);
  buttonHolder4.material.diffuseColor = new Color3(0.37, 0.32, 0.32);
  buttonHolder4.physicsImpostor = new PhysicsImpostor(buttonHolder4, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder4.checkCollisions = true;

  var buttonBarrier4 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier4.position.y = 5;
  buttonBarrier4.position.x = x + 12;
  buttonBarrier4.position.z = z - 12;
  buttonBarrier4.material = new StandardMaterial('texture1', scene);
  buttonBarrier4.material.alpha = 0;
  buttonBarrier4.name = "button4";

  let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
  pushButton1.position.y = 3.25;
  pushButton1.position.x = x - 12;
  pushButton1.position.z = z - 12;
  pushButton1.material = new StandardMaterial('texture1', scene);
  pushButton1.material.diffuseColor = new Color3(0.64, 0.11, 0.11);
  pushButton1.name = "pushButton1";

  let pushButton2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
  pushButton2.position.y = 3.25;
  pushButton2.position.x = x - 4;
  pushButton2.position.z = z - 12;
  pushButton2.material = new StandardMaterial('texture1', scene);
  pushButton2.material.diffuseColor = new Color3(0.64, 0.11, 0.11);
  pushButton2.name = "pushButton2";

  let pushButton3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
  pushButton3.position.y = 3.25;
  pushButton3.position.x = x + 4;
  pushButton3.position.z = z - 12;
  pushButton3.material = new StandardMaterial('texture1', scene);
  pushButton3.material.diffuseColor = new Color3(0.64, 0.11, 0.11);
  pushButton3.name = "pushButton3";

  let pushButton4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
  pushButton4.position.y = 3.25;
  pushButton4.position.x = x + 12;
  pushButton4.position.z = z - 12;
  pushButton4.material = new StandardMaterial('texture1', scene);
  pushButton4.material.diffuseColor = new Color3(0.64, 0.11, 0.11);
  pushButton4.name = "pushButton4";

  let wire1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 6, tessellation: 8}, scene);
  wire1.position.y = 0.05;
  wire1.position.x = x - 12;
  wire1.position.z = z - 8;
  wire1.rotation.x = Math.PI / 2;
  wire1.material = new StandardMaterial('texture1', scene);
  wire1.material.diffuseColor = new Color3(0, 0, 0);

  let wire2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 6, tessellation: 8}, scene);
  wire2.position.y = 0.05;
  wire2.position.x = x - 4;
  wire2.position.z = z - 8;
  wire2.rotation.x = Math.PI / 2;
  wire2.material = new StandardMaterial('texture1', scene);
  wire2.material.diffuseColor = new Color3(0, 0, 0);

  let wire3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 6, tessellation: 8}, scene);
  wire3.position.y = 0.05;
  wire3.position.x = x + 4;
  wire3.position.z = z - 8;
  wire3.rotation.x = Math.PI / 2;
  wire3.material = new StandardMaterial('texture1', scene);
  wire3.material.diffuseColor = new Color3(0, 0, 0);

  let wire4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 6, tessellation: 8}, scene);
  wire4.position.y = 0.05;
  wire4.position.x = x + 12;
  wire4.position.z = z - 8;
  wire4.rotation.x = Math.PI / 2;
  wire4.material = new StandardMaterial('texture1', scene);
  wire4.material.diffuseColor = new Color3(0, 0, 0);

  let bulb1 = Mesh.CreateSphere("sphere", 8, 3, scene);
  bulb1.position.y = 4.5;
  bulb1.position.x = x - 12;
  bulb1.position.z = z;
  bulb1.material = new StandardMaterial('texture1', scene);
  bulb1.material.emissiveColor = getBulb1colors(0);
  bulb1.name = "bulb1";

  let bulb2 = Mesh.CreateSphere("sphere", 8, 3, scene);
  bulb2.position.y = 4.5;
  bulb2.position.x = x - 4;
  bulb2.position.z = z;
  bulb2.material = new StandardMaterial('texture1', scene);
  bulb2.material.emissiveColor = getBulb2colors(0);
  bulb2.name = "bulb2";

  let bulb3 = Mesh.CreateSphere("sphere", 8, 3, scene);
  bulb3.position.y = 4.5;
  bulb3.position.x = x + 4;
  bulb3.position.z = z;
  bulb3.material = new StandardMaterial('texture1', scene);
  bulb3.material.emissiveColor = getBulb3colors(0);
  bulb3.name = "bulb3";

  let bulb4 = Mesh.CreateSphere("sphere", 8, 3, scene);
  bulb4.position.y = 4.5;
  bulb4.position.x = x + 12;
  bulb4.position.z = z;
  bulb4.material = new StandardMaterial('texture1', scene);
  bulb4.material.emissiveColor = getBulb4colors(0);
  bulb4.name = "bulb4";

  let hintBulb = Mesh.CreateSphere("sphere", 8, 3, scene);
  hintBulb.position.y = 1.5;
  hintBulb.position.z = 0;
  hintBulb.position.x = 0;
  hintBulb.material = new StandardMaterial('texture1', scene);
  hintBulb.material.emissiveColor = getBulbMasterColor();

  let hintPylon = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8}, scene);
  hintPylon.position.y = 1.5;
  hintPylon.position.z = -1.75;
  hintPylon.position.x = 0;
  hintPylon.rotation.x = Math.PI / 2;
  hintPylon.material = new StandardMaterial('texture1', scene);
  hintPylon.material.diffuseColor = new Color3(0, 0, 0);

  var hint = Mesh.MergeMeshes([hintBulb, hintPylon], true, true, undefined, false, true);
  hint.position.y = 0;
  hint.position.x = x + 23;
  hint.position.z = z - 21;
  hint.rotation.x = -0.35;

  var hintBarrier = MeshBuilder.CreateBox("box", {width: 5, height: 4, depth: 6}, scene);
  hintBarrier.position.y = 2;
  hintBarrier.position.x = x + 23;
  hintBarrier.position.z = z - 22;
  hintBarrier.material = new StandardMaterial('texture1', scene);
  hintBarrier.material.alpha = 0;
  hintBarrier.physicsImpostor = new PhysicsImpostor(hintBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  hintBarrier.checkCollisions = true;
  hintBarrier.name = "hintOb2";
}

export {bulbMatch};
