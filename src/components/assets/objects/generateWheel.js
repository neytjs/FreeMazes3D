import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function generateWheel(scene, x, z, wheel_name, wheel_color) {
  let wheel_main = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.35}, scene);
  wheel_main.position.y = 3;
  wheel_main.material = new StandardMaterial('texture1', scene);
  wheel_main.material.diffuseTexture = returnMetalTexture(wheel_color, scene);
  wheel_main.material.diffuseTexture.uScale = 4;
  wheel_main.material.diffuseTexture.vScale = 1;

  let wheel_bar1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 3, tessellation: 20, faceUV: genCylinderFaceUV([0.15, 0.15, 1, 1.5, 0.15, 0.15])}, scene);
  wheel_bar1.rotation.x = 1.57;
  wheel_bar1.position.y = 3;
  wheel_bar1.material = new StandardMaterial('texture1', scene);
  wheel_bar1.material.diffuseTexture = returnMetalTexture(wheel_color, scene);

  let wheel_bar2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 3, tessellation: 20, faceUV: genCylinderFaceUV([0.15, 0.15, 1, 1.5, 0.15, 0.15])}, scene);
  wheel_bar2.rotation.x = 1.57;
  wheel_bar2.rotation.z = 1.57;
  wheel_bar2.position.y = 3;
  wheel_bar2.material = new StandardMaterial('texture1', scene);
  wheel_bar2.material.diffuseTexture = returnMetalTexture(wheel_color, scene);

  let wheel_support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 3, tessellation: 20, faceUV: genCylinderFaceUV([0.15, 0.15, 1, 1.5, 0.15, 0.15])}, scene);
  wheel_support.position.y = 1.5;
  wheel_support.material = new StandardMaterial('texture1', scene);
  wheel_support.material.diffuseTexture = returnMetalTexture("iron", scene);

  let wheel = Mesh.MergeMeshes([wheel_main, wheel_bar1, wheel_bar2, wheel_support], true, true, undefined, false, true);
  wheel.position.x = x;
  wheel.position.z = z;
  wheel.name = wheel_name;
}

function generateWheelBaseBarrier(scene, x, z, wheel_base_name) {
  let wheel_base = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 0.25, tessellation: 20, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 0.25, 0.25, 0.25])}, scene);
  wheel_base.position.y = 0.125;
  wheel_base.material = new StandardMaterial('texture1', scene);
  wheel_base.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let barrier =  MeshBuilder.CreateBox("box", {width: 3.5, height: 10, depth: 3.5}, scene);
  barrier.position.y = 5;
  barrier.material = new StandardMaterial('texture1', scene);
  barrier.material.diffuseColor = new Color3(0.29, 0.29, 0.29);
  barrier.material.alpha = 0;

  let wheel_base_barrier = Mesh.MergeMeshes([wheel_base, barrier], true, true, undefined, false, true);
  wheel_base_barrier.position.x = x;
  wheel_base_barrier.position.z = z;
  wheel_base_barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  wheel_base_barrier.checkCollisions = true;
  wheel_base_barrier.name = wheel_base_name;
}

export {generateWheel, generateWheelBaseBarrier};
