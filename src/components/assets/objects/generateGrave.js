import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnStoneTexture, returnWoodTexture, returnFloorTexture,
   genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function generateGrave(scene, x, z, special) {
  let tombstone1 = MeshBuilder.CreateBox("box", {width: 3, height: 3, depth: 1, wrap: true, faceUV: genCubeFaceUV([1.5, 1.5, 1.5, 1.5, 0.5, 1.5, 0.5, 1.5, 1.5, 0.5, 1.5, 0.5])}, scene);
  tombstone1.position.y = 1.5;
  tombstone1.material = new StandardMaterial('texture1', scene);
  tombstone1.material.diffuseTexture = returnStoneTexture("stone_dark", scene);

  let tombstone2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.9, tessellation: 20, faceUV: genCylinderFaceUV([1.5, 1.5, 5, 0.5, 1.5, 1.5])}, scene);
  tombstone2.position.y = 2.7;
  tombstone2.rotation.x = 1.57;
  tombstone2.material = new StandardMaterial('texture1', scene);
  tombstone2.material.diffuseTexture = returnStoneTexture("stone_dark", scene);

  let tombstoneBarrier = MeshBuilder.CreateBox("box", {width: 3, height: 3, depth: 1}, scene);
  tombstoneBarrier.position.y = 1.5;
  tombstoneBarrier.material = new StandardMaterial('texture1', scene);
  tombstoneBarrier.material.alpha = 0;

  let tombstone = Mesh.MergeMeshes([tombstone1, tombstone2, tombstoneBarrier], true, true, undefined, false, true);
  tombstone.position.x = x;
  tombstone.position.z = z + special;
  tombstone.physicsImpostor = new PhysicsImpostor(tombstoneBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  tombstone.checkCollisions = true;

  let board1 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.8, depth: 11.75, wrap: true, faceUV: genCubeFaceUV([0.125, 0.4, 0.125, 0.4, 5.875, 0.4, 5.875, 0.4, 0.125, 5.875, 0.125, 5.875])}, scene);
  board1.position.y = 0.4;
  board1.position.x = 3;
  board1.position.z = -4;
  board1.material = new StandardMaterial('texture1', scene);
  board1.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let board2 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.8, depth: 11.75, wrap: true, faceUV: genCubeFaceUV([0.125, 0.4, 0.125, 0.4, 5.875, 0.4, 5.875, 0.4, 0.125, 5.875, 0.125, 5.875])}, scene);
  board2.position.y = 0.4;
  board2.position.x = -3;
  board2.position.z = -4;
  board2.material = new StandardMaterial('texture1', scene);
  board2.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let board3 = MeshBuilder.CreateBox("box", {width: 6.25, height: 0.8, depth: 0.25, wrap: true, faceUV: genCubeFaceUV([3.125, 0.4, 3.125, 0.4, 0.125, 0.4, 0.125, 0.4, 3.125, 0.125, 3.125, 0.125])}, scene);
  board3.position.y = 0.4;
  board3.position.z = -10;
  board3.material = new StandardMaterial('texture1', scene);
  board3.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let board4 = MeshBuilder.CreateBox("box", {width: 6.25, height: 0.8, depth: 0.25, wrap: true, faceUV: genCubeFaceUV([3.125, 0.4, 3.125, 0.4, 0.125, 0.4, 0.125, 0.4, 3.125, 0.125, 3.125, 0.125])}, scene);
  board4.position.y = 0.4;
  board4.position.z = 2;
  board4.material = new StandardMaterial('texture1', scene);
  board4.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let dirt = MeshBuilder.CreateBox("box", {width: 6, height: 0.1, depth: 12, faceUV: genCubeFaceUV([0, 0, 0, 0, 0, 0, 0, 0, 3, 1.5, 0, 0])}, scene);
  dirt.position.y = 0.4;
  dirt.position.z = -4;
  dirt.material = new StandardMaterial('texture1', scene);
  dirt.material.diffuseTexture = returnFloorTexture("soil", scene);

  let grave = Mesh.MergeMeshes([board1, board2, board3, board4, dirt], true, true, undefined, false, true);
  grave.position.x = x;
  grave.position.z = z;
}

export {generateGrave};
