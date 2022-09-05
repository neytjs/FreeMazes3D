import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function generateGate(x, z, scene, global_objects, item_id, special) {
  let box = MeshBuilder.CreateBox("box", {width: 0.1, height: 9.9, depth: 1, wrap: true, faceUV: genCubeFaceUV([0.05, 4.45, 0.05, 4.45, 0.5, 4.45, 0.5, 4.45, 0.05, 0.5, 0.05, 0.5])}, scene);
  box.position.y = 2;
  box.rotation.z = Math.PI / 2;
  box.rotation.x = Math.PI / 2;

   let box1 = MeshBuilder.CreateBox("box", {width: 0.1, height: 9.9, depth: 1, wrap: true, faceUV: genCubeFaceUV([0.05, 4.45, 0.05, 4.45, 0.5, 4.45, 0.5, 4.45, 0.05, 0.5, 0.05, 0.5])}, scene);
  box1.position.y = 8;
  box1.rotation.z = Math.PI / 2;
  box1.rotation.x = Math.PI / 2;

  let cylinder = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
  cylinder.position.y = 5;
  cylinder.position.x = -4;

  let cylinder1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
  cylinder1.position.y = 5;
  cylinder1.position.x = -3;

  let cylinder2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
  cylinder2.position.y = 5;
  cylinder2.position.x = -2;

  let cylinder3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
  cylinder3.position.y = 5;
  cylinder3.position.x = -1;

  let cylinder4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
  cylinder4.position.y = 5;
  cylinder4.position.x = 0;

  let cylinder5 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
  cylinder5.position.y = 5;
  cylinder5.position.x = 1;

  let cylinder6 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
  cylinder6.position.y = 5;
  cylinder6.position.x = 2;

  let cylinder7 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
  cylinder7.position.y = 5;
  cylinder7.position.x = 3;

  let cylinder8 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
  cylinder8.position.y = 5;
  cylinder8.position.x = 4;

  let door = Mesh.MergeMeshes([box, box1, cylinder, cylinder1, cylinder2, cylinder3, cylinder4, cylinder5, cylinder6, cylinder7, cylinder8], true, true, undefined, false, true);
  door.material = new StandardMaterial('texture1', scene);
  door.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

  let barrier = MeshBuilder.CreateBox("barrier", {width: 10, height: 10, depth: 2}, scene);
  barrier.position.y = 5;
  barrier.material = new StandardMaterial('texture1', scene);
  barrier.material.alpha = 0;
  barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  barrier.checkCollisions = true;

  let barrier_door = Mesh.MergeMeshes([barrier, door], true, true, undefined, false, true);
  barrier_door.position.y = 0;
  barrier_door.position.x = x;
  barrier_door.position.z = z;

  if (special === "right" || special === "left") {
    barrier_door.rotation.y = Math.PI / 2;
  }

  barrier_door.name = "door";
  global_objects.push({id: barrier_door.uniqueId, door: item_id});
}

export {generateGate};
