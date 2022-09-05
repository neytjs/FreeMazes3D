import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {getBulbMasterColor, getBulb1colors, getBulb2colors, getBulb3colors, getBulb4colors, cloneAndShuffleMasterColor} from "../bulb_colors.js";
import {returnMetalTexture, returnCrystalTexture, genCubeFaceUV,
  genCylinderFaceUV} from "../textures.js";

function bulbMatch(x, z, scene, global_objects, item_id, camera, global_language) {
  cloneAndShuffleMasterColor();

  let pedestal = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 10, wrap: true, faceUV: genCubeFaceUV([9, 0.3, 9, 0.3, 3, 0.3, 3, 0.3, 9, 3, 9, 3])}, scene);
  pedestal.position.y = 0.5;
  pedestal.position.x = x;
  pedestal.position.z = z;
  pedestal.material = new StandardMaterial('texture1', scene);
  pedestal.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);
  pedestal.physicsImpostor = new PhysicsImpostor(pedestal, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  pedestal.checkCollisions = true;

  let pedestalBarrier = MeshBuilder.CreateBox("box", {width: 30, height: 10, depth: 10}, scene);
  pedestalBarrier.position.y = 5;
  pedestalBarrier.position.x = x;
  pedestalBarrier.position.z = z;
  pedestalBarrier.material = new StandardMaterial('texture1', scene);
  pedestalBarrier.material.alpha = 0;
  pedestalBarrier.physicsImpostor = new PhysicsImpostor(pedestalBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  pedestalBarrier.checkCollisions = true;

  let pylon1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.75, 0.25, 0.25])}, scene);
  pylon1.position.y = 1.75;
  pylon1.position.x = x - 12;
  pylon1.position.z = z;
  pylon1.material = new StandardMaterial('texture1', scene);
  pylon1.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let pylon2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.75, 0.25, 0.25])}, scene);
  pylon2.position.y = 1.75;
  pylon2.position.x = x - 4;
  pylon2.position.z = z;
  pylon2.material = new StandardMaterial('texture1', scene);
  pylon2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let pylon3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.75, 0.25, 0.25])}, scene);
  pylon3.position.y = 1.75;
  pylon3.position.x = x + 4;
  pylon3.position.z = z;
  pylon3.material = new StandardMaterial('texture1', scene);
  pylon3.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let pylon4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.75, 0.25, 0.25])}, scene);
  pylon4.position.y = 1.75;
  pylon4.position.x = x + 12;
  pylon4.position.z = z;
  pylon4.material = new StandardMaterial('texture1', scene);
  pylon4.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder1.position.y = 1.5;
  buttonHolder1.position.x = x - 12;
  buttonHolder1.position.z = z - 12;
  buttonHolder1.material = new StandardMaterial('texture1', scene);
  buttonHolder1.material.diffuseTexture = returnMetalTexture("iron", scene);
  buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder1.checkCollisions = true;

  let buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier1.position.y = 5;
  buttonBarrier1.position.x = x - 12;
  buttonBarrier1.position.z = z - 12;
  buttonBarrier1.material = new StandardMaterial('texture1', scene);
  buttonBarrier1.material.alpha = 0;
  buttonBarrier1.name = "button1";
  global_objects.push({id: buttonBarrier1.uniqueId, obstacle2_id: item_id, type: "structure", name: ""});

  let buttonHolder2 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder2.position.y = 1.5;
  buttonHolder2.position.x = x - 4;
  buttonHolder2.position.z = z - 12;
  buttonHolder2.material = new StandardMaterial('texture1', scene);
  buttonHolder2.material.diffuseTexture = returnMetalTexture("iron", scene);
  buttonHolder2.physicsImpostor = new PhysicsImpostor(buttonHolder2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder2.checkCollisions = true;

  let buttonBarrier2 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier2.position.y = 5;
  buttonBarrier2.position.x = x - 4;
  buttonBarrier2.position.z = z - 12;
  buttonBarrier2.material = new StandardMaterial('texture1', scene);
  buttonBarrier2.material.alpha = 0;
  buttonBarrier2.name = "button2";

  let buttonHolder3 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder3.position.y = 1.5;
  buttonHolder3.position.x = x + 4;
  buttonHolder3.position.z = z - 12;
  buttonHolder3.material = new StandardMaterial('texture1', scene);
  buttonHolder3.material.diffuseTexture = returnMetalTexture("iron", scene);
  buttonHolder3.physicsImpostor = new PhysicsImpostor(buttonHolder3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder3.checkCollisions = true;

  let buttonBarrier3 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier3.position.y = 5;
  buttonBarrier3.position.x = x + 4;
  buttonBarrier3.position.z = z - 12;
  buttonBarrier3.material = new StandardMaterial('texture1', scene);
  buttonBarrier3.material.alpha = 0;
  buttonBarrier3.name = "button3";

  let buttonHolder4 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder4.position.y = 1.5;
  buttonHolder4.position.x = x + 12;
  buttonHolder4.position.z = z - 12;
  buttonHolder4.material = new StandardMaterial('texture1', scene);
  buttonHolder4.material.diffuseTexture = returnMetalTexture("iron", scene);
  buttonHolder4.physicsImpostor = new PhysicsImpostor(buttonHolder4, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder4.checkCollisions = true;

  let buttonBarrier4 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier4.position.y = 5;
  buttonBarrier4.position.x = x + 12;
  buttonBarrier4.position.z = z - 12;
  buttonBarrier4.material = new StandardMaterial('texture1', scene);
  buttonBarrier4.material.alpha = 0;
  buttonBarrier4.name = "button4";

  let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton1.position.y = 3.25;
  pushButton1.position.x = x - 12;
  pushButton1.position.z = z - 12;
  pushButton1.material = new StandardMaterial('texture1', scene);
  pushButton1.material.diffuseTexture = returnCrystalTexture("gem_darkred", scene);
  pushButton1.name = "pushButton1";

  let pushButton2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton2.position.y = 3.25;
  pushButton2.position.x = x - 4;
  pushButton2.position.z = z - 12;
  pushButton2.material = new StandardMaterial('texture1', scene);
  pushButton2.material.diffuseTexture = returnCrystalTexture("gem_darkred", scene);
  pushButton2.name = "pushButton2";

  let pushButton3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton3.position.y = 3.25;
  pushButton3.position.x = x + 4;
  pushButton3.position.z = z - 12;
  pushButton3.material = new StandardMaterial('texture1', scene);
  pushButton3.material.diffuseTexture = returnCrystalTexture("gem_darkred", scene);
  pushButton3.name = "pushButton3";

  let pushButton4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton4.position.y = 3.25;
  pushButton4.position.x = x + 12;
  pushButton4.position.z = z - 12;
  pushButton4.material = new StandardMaterial('texture1', scene);
  pushButton4.material.diffuseTexture = returnCrystalTexture("gem_darkred", scene);
  pushButton4.name = "pushButton4";

  let wire1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 6, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 6, 0.1, 0.1])}, scene);
  wire1.position.y = 0.05;
  wire1.position.x = x - 12;
  wire1.position.z = z - 8;
  wire1.rotation.x = Math.PI / 2;
  wire1.material = new StandardMaterial('texture1', scene);
  wire1.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 6, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 6, 0.1, 0.1])}, scene);
  wire2.position.y = 0.05;
  wire2.position.x = x - 4;
  wire2.position.z = z - 8;
  wire2.rotation.x = Math.PI / 2;
  wire2.material = new StandardMaterial('texture1', scene);
  wire2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 6, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 6, 0.1, 0.1])}, scene);
  wire3.position.y = 0.05;
  wire3.position.x = x + 4;
  wire3.position.z = z - 8;
  wire3.rotation.x = Math.PI / 2;
  wire3.material = new StandardMaterial('texture1', scene);
  wire3.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 6, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 6, 0.1, 0.1])}, scene);
  wire4.position.y = 0.05;
  wire4.position.x = x + 12;
  wire4.position.z = z - 8;
  wire4.rotation.x = Math.PI / 2;
  wire4.material = new StandardMaterial('texture1', scene);
  wire4.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let bulb1 = Mesh.CreateSphere("sphere", 8, 3, scene);
  bulb1.position.y = 4.5;
  bulb1.position.x = x - 12;
  bulb1.position.z = z;
  bulb1.material = new StandardMaterial('texture1', scene);
  bulb1.material.diffuseColor = getBulb1colors(0);
  bulb1.material.specularColor = getBulb1colors(0);
  bulb1.material.emissiveColor = getBulb1colors(0);
  bulb1.material.ambientColor = getBulb1colors(0);
  bulb1.name = "bulb1";

  let bulb2 = Mesh.CreateSphere("sphere", 8, 3, scene);
  bulb2.position.y = 4.5;
  bulb2.position.x = x - 4;
  bulb2.position.z = z;
  bulb2.material = new StandardMaterial('texture1', scene);
  bulb2.material.diffuseColor = getBulb2colors(0);
  bulb2.material.specularColor = getBulb2colors(0);
  bulb2.material.emissiveColor = getBulb2colors(0);
  bulb2.material.ambientColor = getBulb2colors(0);
  bulb2.name = "bulb2";

  let bulb3 = Mesh.CreateSphere("sphere", 8, 3, scene);
  bulb3.position.y = 4.5;
  bulb3.position.x = x + 4;
  bulb3.position.z = z;
  bulb3.material = new StandardMaterial('texture1', scene);
  bulb3.material.diffuseColor = getBulb3colors(0);
  bulb3.material.specularColor = getBulb3colors(0);
  bulb3.material.emissiveColor = getBulb3colors(0);
  bulb3.material.ambientColor = getBulb3colors(0);
  bulb3.name = "bulb3";

  let bulb4 = Mesh.CreateSphere("sphere", 8, 3, scene);
  bulb4.position.y = 4.5;
  bulb4.position.x = x + 12;
  bulb4.position.z = z;
  bulb4.material = new StandardMaterial('texture1', scene);
  bulb4.material.diffuseColor = getBulb4colors(0);
  bulb4.material.specularColor = getBulb4colors(0);
  bulb4.material.emissiveColor = getBulb4colors(0);
  bulb4.material.ambientColor = getBulb4colors(0);
  bulb4.name = "bulb4";

  let hint_colors = getBulbMasterColor();

  function createHint(x, z, num) {
    let hintBulb = Mesh.CreateSphere("sphere", 8, 3, scene);
    hintBulb.position.y = 1.5;
    hintBulb.position.z = 0;
    hintBulb.position.x = 0;
    hintBulb.material = new StandardMaterial('texture1', scene);
    hintBulb.material.diffuseColor = hint_colors[num];
    hintBulb.material.specularColor = hint_colors[num];
    hintBulb.material.emissiveColor = hint_colors[num];
    hintBulb.material.ambientColor = hint_colors[num];

    let hintPylon = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.75, 0.25, 0.25])}, scene);
    hintPylon.position.y = 1.5;
    hintPylon.position.z = -1.75;
    hintPylon.position.x = 0;
    hintPylon.rotation.x = Math.PI / 2;
    hintPylon.material = new StandardMaterial('texture1', scene);
    hintPylon.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let hint = Mesh.MergeMeshes([hintBulb, hintPylon], true, true, undefined, false, true);
    hint.position.y = 0;
    hint.position.x = x;
    hint.position.z = z;
    hint.rotation.x = -0.35;
  }
  createHint((x - 23), (z - 21), 0);
  createHint((x + 23), (z - 21), 3);

  let hintBarrier1 = MeshBuilder.CreateBox("box", {width: 5, height: 4, depth: 6}, scene);
  hintBarrier1.position.y = 2;
  hintBarrier1.position.x = x - 23;
  hintBarrier1.position.z = z - 22;
  hintBarrier1.material = new StandardMaterial('texture1', scene);
  hintBarrier1.material.alpha = 0;
  hintBarrier1.physicsImpostor = new PhysicsImpostor(hintBarrier1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  hintBarrier1.checkCollisions = true;
  hintBarrier1.name = "hint1Ob2";

  let hintBarrier2 = MeshBuilder.CreateBox("box", {width: 5, height: 4, depth: 6}, scene);
  hintBarrier2.position.y = 2;
  hintBarrier2.position.x = x + 23;
  hintBarrier2.position.z = z - 22;
  hintBarrier2.material = new StandardMaterial('texture1', scene);
  hintBarrier2.material.alpha = 0;
  hintBarrier2.physicsImpostor = new PhysicsImpostor(hintBarrier2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  hintBarrier2.checkCollisions = true;
  hintBarrier2.name = "hint2Ob2";
}

export {bulbMatch};
