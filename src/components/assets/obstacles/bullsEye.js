import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {generateBlaster} from "../objects/generateBlaster.js";
import {generateSign} from "../objects/generateSign.js";
import {returnMetalTexture, returnCrystalTexture, returnWoodTexture,
  genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function bullsEye(x, z, scene, global_objects, item_id, camera, global_language) {
  function generateTarget(x, z, rot) {
    let target1a = MeshBuilder.CreateCylinder("cylinder", {diameter: 5, height: 0.5, tessellation: 20, faceUV: genCylinderFaceUV([2.5, 2.5, 5, 0.5, 2.5, 2.5])}, scene);
    target1a.position.y = 6;
    target1a.rotation.x = Math.PI / 2;
    target1a.material = new StandardMaterial('texture1', scene);
    target1a.material.diffuseTexture = returnCrystalTexture("gem_black", scene);

    let target1b = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 20, faceUV: genCylinderFaceUV([2, 2, 4, 0.4, 2, 2])}, scene);
    target1b.position.y = 6;
    target1b.position.z = 0.03;
    target1b.rotation.x = Math.PI / 2;
    target1b.material = new StandardMaterial('texture1', scene);
    target1b.material.diffuseTexture = returnCrystalTexture("gem_white", scene);

    let target1c = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.5, tessellation: 20, faceUV: genCylinderFaceUV([1.5, 1.5, 3, 0.3, 1.5, 1.5])}, scene);
    target1c.position.y = 6;
    target1c.position.z = 0.06;
    target1c.rotation.x = Math.PI / 2;
    target1c.material = new StandardMaterial('texture1', scene);
    target1c.material.diffuseTexture = returnCrystalTexture("gem_black", scene);

    let target1d = MeshBuilder.CreateCylinder("cylinder", {diameter: 2, height: 0.5, tessellation: 20, faceUV: genCylinderFaceUV([1, 1, 2, 0.2, 1, 1])}, scene);
    target1d.position.y = 6;
    target1d.position.z = 0.09;
    target1d.rotation.x = Math.PI / 2;
    target1d.material = new StandardMaterial('texture1', scene);
    target1d.material.diffuseTexture = returnCrystalTexture("gem_white", scene);

    let target1support = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 6, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 1, 3, 0.1, 0.1])}, scene);
    target1support.position.y = 3;
    target1support.position.z = -0.5;
    target1support.material = new StandardMaterial('texture1', scene);
    target1support.material.diffuseTexture = returnWoodTexture("wood_brown", scene);
    target1support.material.diffuseTexture.uScale = 2;
    target1support.material.diffuseTexture.vScale = 2;

    let target = Mesh.MergeMeshes([target1a, target1b, target1c, target1d, target1support], true, true, undefined, false, true);
    target.position.x = x;
    target.position.z = z;
    target.rotation.y = rot;
  }
  generateTarget((x - 20), (z + 20), 2.355);
  generateTarget((x + 20), (z - 20), -0.785);
  generateTarget((x - 20), (z - 20), 0.785);
  generateTarget((x + 20), (z + 20), -2.355);

  let target1barrier = MeshBuilder.CreateBox("box", {width: 17, height: 3, depth: 3}, scene);
  target1barrier.position.y = 1.5;
  target1barrier.position.x = x - 20;
  target1barrier.position.z = z + 20;
  target1barrier.rotation.y = 2.355;
  target1barrier.material = new StandardMaterial('texture1', scene);
  target1barrier.material.alpha = 0;
  target1barrier.name = "target1barrier";
  target1barrier.physicsImpostor = new PhysicsImpostor(target1barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  target1barrier.checkCollisions = true;

  let target2barrier = MeshBuilder.CreateBox("box", {width: 17, height: 3, depth: 3}, scene);
  target2barrier.position.y = 1.5;
  target2barrier.position.x = x + 20;
  target2barrier.position.z = z - 20;
  target2barrier.rotation.y = -0.785;
  target2barrier.material = new StandardMaterial('texture1', scene);
  target2barrier.material.alpha = 0;
  target2barrier.name = "target2barrier";
  target2barrier.physicsImpostor = new PhysicsImpostor(target2barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  target2barrier.checkCollisions = true;

  let target3barrier = MeshBuilder.CreateBox("box", {width: 17, height: 3, depth: 3}, scene);
  target3barrier.position.y = 1.5;
  target3barrier.position.x = x - 20;
  target3barrier.position.z = z - 20;
  target3barrier.rotation.y = 0.785;
  target3barrier.material = new StandardMaterial('texture1', scene);
  target3barrier.material.alpha = 0;
  target3barrier.name = "target3barrier";
  target3barrier.physicsImpostor = new PhysicsImpostor(target3barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  target3barrier.checkCollisions = true;

  let target4barrier = MeshBuilder.CreateBox("box", {width: 17, height: 3, depth: 3}, scene);
  target4barrier.position.y = 1.5;
  target4barrier.position.x = x + 20;
  target4barrier.position.z = z + 20;
  target4barrier.rotation.y = -2.355;
  target4barrier.material = new StandardMaterial('texture1', scene);
  target4barrier.material.alpha = 0;
  target4barrier.name = "target4barrier";
  target4barrier.physicsImpostor = new PhysicsImpostor(target4barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  target4barrier.checkCollisions = true;

  let bullseye1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.75, tessellation: 20, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.35, 0.5, 0.5])}, scene);
  bullseye1.position.y = 6;
  bullseye1.position.z = z + 20;
  bullseye1.position.x = x - 20;
  bullseye1.rotation.x = Math.PI / 2;
  bullseye1.rotation.y = 2.355;
  bullseye1.material = new StandardMaterial('texture1', scene);
  bullseye1.material.diffuseTexture = returnCrystalTexture("gem_black", scene);
  bullseye1.name = "bullseye1";

  let bullseye2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.75, tessellation: 20, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.35, 0.5, 0.5])}, scene);
  bullseye2.position.y = 6;
  bullseye2.position.z = z - 20;
  bullseye2.position.x = x + 20;
  bullseye2.rotation.x = Math.PI / 2;
  bullseye2.rotation.y = -0.785;
  bullseye2.material = new StandardMaterial('texture1', scene);
  bullseye2.material.diffuseTexture = returnCrystalTexture("gem_black", scene);
  bullseye2.name = "bullseye2";

  let bullseye3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.75, tessellation: 20, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.35, 0.5, 0.5])}, scene);
  bullseye3.position.y = 6;
  bullseye3.position.z = z - 20;
  bullseye3.position.x = x - 20;
  bullseye3.rotation.x = Math.PI / 2;
  bullseye3.rotation.y = 0.785;
  bullseye3.material = new StandardMaterial('texture1', scene);
  bullseye3.material.diffuseTexture = returnCrystalTexture("gem_black", scene);
  bullseye3.name = "bullseye3";

  let bullseye4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.75, tessellation: 20, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.35, 0.5, 0.5])}, scene);
  bullseye4.position.y = 6;
  bullseye4.position.z = z + 20;
  bullseye4.position.x = x + 20;
  bullseye4.rotation.x = Math.PI / 2;
  bullseye4.rotation.y = -2.355;
  bullseye4.material = new StandardMaterial('texture1', scene);
  bullseye4.material.diffuseTexture = returnCrystalTexture("gem_black", scene);
  bullseye4.name = "bullseye4";

  let podium = MeshBuilder.CreateBox("box", {width: 10, height: 2, depth: 10, faceUV: genCubeFaceUV([3, 0.6, 3, 0.6, 0.6, 3, 0.6, 3, 3, 3, 3, 3])}, scene);
  podium.position.y = 1;
  podium.position.z = z;
  podium.position.x = x;
  podium.material = new StandardMaterial('texture1', scene);
  podium.material.diffuseTexture = returnWoodTexture("wood_brown", scene);
  podium.physicsImpostor = new PhysicsImpostor(podium, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  podium.checkCollisions = true;
  global_objects.push({id: podium.uniqueId, obstacle15_id: item_id, type: "structure", name: ""});

  let step1 = MeshBuilder.CreateBox("box", {width: 5, height: 1, depth: 1, faceUV: genCubeFaceUV([1.5, 0.3, 1.5, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 1.5, 0.3, 1.5])}, scene);
  step1.position.y = 0.5;
  step1.material = new StandardMaterial('texture1', scene);
  step1.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let stepBarrier = MeshBuilder.CreateBox("box", {width: 5, height: 2, depth: 1}, scene);
  stepBarrier.position.y = 1;
  stepBarrier.material = new StandardMaterial('texture1', scene);
  stepBarrier.material.alpha = 0;

  let step = Mesh.MergeMeshes([step1, stepBarrier], true, true, undefined, false, true);
  step.position.x = x;
  step.position.z = z + 5.5;
  step.physicsImpostor = new PhysicsImpostor(stepBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  step.checkCollisions = true;
  global_objects.push({id: step.uniqueId, type: "step", exit_pos: {x: x, z: (z + 6), y: 6}});

  generateSign((x + 4), (z + 7), "signOb15", scene);

  let canCan = MeshBuilder.CreateCylinder("cylinder", {diameter: 2.5, height: 3, tessellation: 20, faceUV: genCylinderFaceUV([1.5, 1.5, 6, 1.5, 1.5, 1.5])}, scene);
  canCan.position.y = 1.5;
  canCan.material = new StandardMaterial('texture1', scene);
  canCan.material.diffuseTexture = returnCrystalTexture("gem_green", scene);

  let canRim1 = MeshBuilder.CreateTorus("torus", {diameter: 2.5, thickness: 0.25});
  canRim1.position.y = 3;
  canRim1.material = new StandardMaterial('texture1', scene);
  canRim1.material.diffuseTexture = returnCrystalTexture("gem_green", scene);
  canRim1.material.diffuseTexture.uScale = 3.5;
  canRim1.material.diffuseTexture.vScale = 1;

  let canRim2 = MeshBuilder.CreateTorus("torus", {diameter: 2.5, thickness: 0.25});
  canRim2.position.y = 1.625;
  canRim2.material = new StandardMaterial('texture1', scene);
  canRim2.material.diffuseTexture = returnCrystalTexture("gem_green", scene);
  canRim2.material.diffuseTexture.uScale = 3.5;
  canRim2.material.diffuseTexture.vScale = 1;

  let canRim3 = MeshBuilder.CreateTorus("torus", {diameter: 2.5, thickness: 0.25});
  canRim3.position.y = 0.125;
  canRim3.material = new StandardMaterial('texture1', scene);
  canRim3.material.diffuseTexture = returnCrystalTexture("gem_green", scene);
  canRim3.material.diffuseTexture.uScale = 3.5;
  canRim3.material.diffuseTexture.vScale = 1;

  let canTop = MeshBuilder.CreateCylinder("cylinder", {diameter: 2.5, height: 0.025, tessellation: 20}, scene);
  canTop.position.y = 3;
  canTop.material = new StandardMaterial('texture1', scene);
  canTop.material.diffuseColor = new Color3(0, 0, 0);

  let canBarrier = MeshBuilder.CreateBox("box", {width: 3, height: 5, depth: 3}, scene);
  canBarrier.position.y = 2.5;
  canBarrier.material = new StandardMaterial('texture1', scene);
  canBarrier.material.alpha = 0;

  let can = Mesh.MergeMeshes([canCan, canRim1, canRim2, canRim3, canTop, canBarrier], true, true, undefined, false, true);
  can.position.x = x - 4;
  can.position.z = z + 7;
  can.physicsImpostor = new PhysicsImpostor(canBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  can.checkCollisions = true;
  can.name = "canOb15";

  generateBlaster("holding", scene, 0, 0, 0, camera, "blasterOb15", "blastOb15");
  generateBlaster("item", scene, x, z, 2, camera, "blasterOb15", "blastOb15");
  global_objects.push({id: "", type: "holdable", name: "blasterOb15", puzzle_pos: {x: x, z: z, y: 4}});
}

export {bullsEye};
