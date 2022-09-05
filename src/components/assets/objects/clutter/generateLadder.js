import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, genCylinderFaceUV} from "../../textures.js";

function generateLadder(x, z, scene) {
  let rail1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 9, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 4.5, 0.25, 0.25])}, scene);
  rail1.position.y = 0.25;
  rail1.position.x = 1.5;
  rail1.rotation.x = Math.PI / 2;

  let rail2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 9, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 4.5, 0.25, 0.25])}, scene);
  rail2.position.y = 0.25;
  rail2.position.x = -1.5;
  rail2.rotation.x = Math.PI / 2;

  let rung1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
  rung1.position.y = 0.25;
  rung1.position.z = -4;
  rung1.rotation.z = Math.PI / 2;

  let rung2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
  rung2.position.y = 0.25;
  rung2.position.z = -2;
  rung2.rotation.z = Math.PI / 2;

  let rung3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
  rung3.position.y = 0.25;
  rung3.rotation.z = Math.PI / 2;

  let rung4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
  rung4.position.y = 0.25;
  rung4.position.z = 2;
  rung4.rotation.z = Math.PI / 2;

  let rung5 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
  rung5.position.y = 0.25;
  rung5.position.z = 4;
  rung5.rotation.z = Math.PI / 2;

  let ladder = Mesh.MergeMeshes([rail1, rail2, rung1, rung2, rung3, rung4, rung5], true, true, undefined, false, true);
  ladder.position.x = x;
  ladder.position.z = z;
  ladder.material = new StandardMaterial('texture1', scene);
  ladder.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);
}

export {generateLadder};
