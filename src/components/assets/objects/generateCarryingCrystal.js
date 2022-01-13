import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";

function generateCarryingCrystal(scene, name) {
  let carryingCrystalShard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  carryingCrystalShard1.position.y = 8;

  let carryingCrystalShard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  carryingCrystalShard2.position.y = 4;

  let carryingCrystal = Mesh.MergeMeshes([carryingCrystalShard1, carryingCrystalShard2], true, true, undefined, false, true);
  carryingCrystal.material = new StandardMaterial('texture1', scene);
  carryingCrystal.material.alpha = 0;
  carryingCrystal.position.y = -1000;
  carryingCrystal.name = name;
  carryingCrystal.rotation.x = Math.PI / 3;
}

export {generateCarryingCrystal};
