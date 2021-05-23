import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";

function generateDesk(x, z, scene) {
  let leg1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.25, diameterBottom: 0.25, height: 2, tessellation: 12}, scene);
  leg1.position.y = 1;
  leg1.position.x = -3.5;
  leg1.position.x = -3.5;

  let leg2 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.25, diameterBottom: 0.25, height: 2, tessellation: 12}, scene);
  leg2.position.y = 1;
  leg2.position.x = -2;
  leg2.position.x = -2;

  let leg3 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.25, diameterBottom: 0.25, height: 2, tessellation: 12}, scene);
  leg3.position.y = 1;
  leg3.position.x = -2;
  leg3.position.z = -1.5;

  let leg4 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.25, diameterBottom: 0.25, height: 2, tessellation: 12}, scene);
  leg4.position.y = 1;
  leg4.position.x = -3.5;
  leg4.position.z = -1.5;

  let seat = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.25, tessellation: 20}, scene);
  seat.position.y = 2;
  seat.position.x = -2.75;
  seat.position.z = -0.75;

  let desk = Mesh.MergeMeshes([leg1, leg2, leg3, leg4, seat], true, true, undefined, false, true);
  desk.position.x = x;
  desk.position.z = z;
  desk.material = new StandardMaterial('texture1', scene);
  desk.material.diffuseColor = new Color3(0.23, 0.19, 0.05);
}

export {generateDesk};
