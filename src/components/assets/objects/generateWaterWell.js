import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnStoneTexture, returnLiquidTexture, returnMetalTexture,
  returnTreeTexture, returnWoodTexture, genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function generateWaterWell(scene, x, z, y, name) {
  let stones = MeshBuilder.CreateCylinder("cylinder", {diameter: 5, height: 2.5, tessellation: 20, faceUV: genCylinderFaceUV([0, 0, 6, 1.2, 0, 0])}, scene);
  stones.position.y = 1.25;
  stones.material = new StandardMaterial('texture1', scene);
  stones.material.diffuseTexture = returnStoneTexture("stone_dark", scene);
  stones.material.diffuseTexture.uScale = 2;
  stones.material.diffuseTexture.vScale = 2;

  let rim = MeshBuilder.CreateTorus("torus", {diameter: 5, thickness: 0.6}, scene);
  rim.position.y = 2.7;
  rim.material = new StandardMaterial('texture1', scene);
  rim.material.diffuseTexture = returnStoneTexture("stone_dark", scene);
  rim.material.diffuseTexture.uScale = 8;
  rim.material.diffuseTexture.vScale = 2;

  let hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 5, height: 0.01, tessellation: 20}, scene);
  hole.position.y = 2.7;
  hole.material = new StandardMaterial('texture1', scene);
  hole.material.diffuseTexture = returnLiquidTexture("water", scene);

  let support1 = MeshBuilder.CreateBox("box", {width: 0.25, height: 4, depth: 0.25, wrap: true, faceUV: genCubeFaceUV([0.1, 2, 0.1, 2, 0.1, 2, 0.1, 2, 0.1, 0.1, 0.1, 0.1])}, scene);
  support1.position.y = 4.75;
  support1.position.x = 2.5;
  support1.material = new StandardMaterial('texture1', scene);
  support1.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let support2 = MeshBuilder.CreateBox("box", {width: 0.25, height: 4, depth: 0.25, wrap: true, faceUV: genCubeFaceUV([0.1, 2, 0.1, 2, 0.1, 2, 0.1, 2, 0.1, 0.1, 0.1, 0.1])}, scene);
  support2.position.y = 4.75;
  support2.position.x = -2.5;
  support2.material = new StandardMaterial('texture1', scene);
  support2.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let roof1 = MeshBuilder.CreateBox("box", {width: 7, height: 0.25, depth: 3, wrap: true, faceUV: genCubeFaceUV([3.5, 0.1, 3.5, 0.1, 1.3, 0.1, 1.3, 0.1, 3.5, 1.3, 3, 1.3])}, scene);
  roof1.position.y = 6.2;
  roof1.position.z = 1.25;
  roof1.rotation.x = 0.5;
  roof1.material = new StandardMaterial('texture1', scene);
  roof1.material.diffuseTexture = returnWoodTexture("wood_lightbrown", scene);

  let roof2 = MeshBuilder.CreateBox("box", {width: 7, height: 0.25, depth: 3, wrap: true, faceUV: genCubeFaceUV([3.5, 0.1, 3.5, 0.1, 1.3, 0.1, 1.3, 0.1, 3.5, 1.3, 3, 1.3])}, scene);
  roof2.position.y = 6.2;
  roof2.position.z = -1.25;
  roof2.rotation.x = -0.5;
  roof2.material = new StandardMaterial('texture1', scene);
  roof2.material.diffuseTexture = returnWoodTexture("wood_lightbrown", scene);

  let roof3 = MeshBuilder.CreateBox("box", {width: 7.1, height: 0.57, depth: 0.57, wrap: true, faceUV: genCubeFaceUV([3.55, 0.25, 3.55, 0.25, 0.25, 0.25, 0.25, 0.25, 3.55, 0.25, 3.55, 0.25])}, scene);
  roof3.position.y = 6.75;
  roof3.material = new StandardMaterial('texture1', scene);
  roof3.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let roller = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 4.75, tessellation: 8}, scene);
  roller.position.y = 5;
  roller.rotation.z = Math.PI / 2;
  roller.material = new StandardMaterial('texture1', scene);
  roller.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let rod = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 5.75, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 5.75, 0.1, 0.1])}, scene);
  rod.position.y = 5;
  rod.rotation.z = Math.PI / 2;
  rod.material = new StandardMaterial('texture1', scene);
  rod.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let crank = MeshBuilder.CreateBox("box", {width: 0.1, height: 1, depth: 0.25, faceUV: genCubeFaceUV([0.05, 0.5, 0.05, 0.5, 0.5, 0.125, 0.5, 0.125, 0.125, 0.05, 0.125, 0.05])}, scene);
  crank.position.y = 4.75;
  crank.position.x = 2.75;
  crank.material = new StandardMaterial('texture1', scene);
  crank.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let handle = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 0.6, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 0.6, 0.1, 0.1])}, scene);
  handle.position.y = 4.5;
  handle.position.x = 3.1;
  handle.rotation.z = Math.PI / 2;
  handle.material = new StandardMaterial('texture1', scene);
  handle.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let rope1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 1, tessellation: 8}, scene);
  rope1.position.y = 5;
  rope1.rotation.z = Math.PI / 2;
  rope1.material = new StandardMaterial('texture1', scene);
  rope1.material.diffuseTexture = returnTreeTexture("bark_wavy", scene);

  let rope2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 4, tessellation: 8}, scene);
  rope2.position.y = 3;
  rope2.material = new StandardMaterial('texture1', scene);
  rope2.material.diffuseTexture = returnTreeTexture("bark_wavy", scene);

  let wellBarrier = MeshBuilder.CreateBox("barrier4_Ob8", {width: 7, height: 10, depth: 7}, scene);
  wellBarrier.position.y = 5;
  wellBarrier.material = new StandardMaterial('texture1', scene);
  wellBarrier.material.alpha = 0;

  let well = Mesh.MergeMeshes([stones, rim, hole, support1, support2, roof1, roof2, roof3, roller, rod, crank, handle, rope1, rope2, wellBarrier], true, true, undefined, false, true);
  well.position.x = x;
  well.position.z = z;
  well.position.y = y;
  well.physicsImpostor = new PhysicsImpostor(wellBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  well.checkCollisions = true;
  well.name = name;
}

export {generateWaterWell};
