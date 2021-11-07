import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture} from "../../textures.js";

function generateMachine(x, z, scene) {
  let box1 = MeshBuilder.CreateBox("box", {width: 3, height: 2, depth: 2}, scene);
  box1.position.y = 1;
  box1.position.x = x + 2;
  box1.position.z = z + 3;
  box1.material = new StandardMaterial('texture1', scene);
  box1.material.diffuseTexture = returnMetalTexture("iron", scene);

  let pipe1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.75, tessellation: 12}, scene);
  pipe1.position.y = 2.25;
  pipe1.position.x = x + 2.5;
  pipe1.position.z = z + 3;
  pipe1.material = new StandardMaterial('texture1', scene);
  pipe1.material.diffuseTexture = returnMetalTexture("iron", scene);

  let pipe2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 1, tessellation: 12}, scene);
  pipe2.position.y = 1;
  pipe2.position.x = x + 2.5;
  pipe2.position.z = z + 1.5;
  pipe2.rotation.x = Math.PI / 2;
  pipe2.material = new StandardMaterial('texture1', scene);
  pipe2.material.diffuseTexture = returnMetalTexture("iron", scene);

  let pipe3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 1, tessellation: 12}, scene);
  pipe3.position.y = 0.5;
  pipe3.position.x = x + 2.5;
  pipe3.position.z = z + 1;
  pipe3.material = new StandardMaterial('texture1', scene);
  pipe3.material.diffuseTexture = returnMetalTexture("iron", scene);

  let pipe4 = MeshBuilder.CreateSphere("sphere", {diameter: 1, segments: 8}, scene);
  pipe4.position.y = 1;
  pipe4.position.x = x + 2.5;
  pipe4.position.z = z + 1;
  pipe4.material = new StandardMaterial('texture1', scene);
  pipe4.material.diffuseTexture = returnMetalTexture("iron", scene);

  var rim1 = MeshBuilder.CreateTorus("torus", {diameter: 1, thickness: 0.25});
  rim1.position.y = 2.75;
  rim1.position.x = x + 2.5;
  rim1.position.z = z + 3;
  rim1.material = new StandardMaterial('texture1', scene);
  rim1.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  var rim2 = MeshBuilder.CreateTorus("torus", {diameter: 1, thickness: 0.25});
  rim2.position.y = 0.1;
  rim2.position.x = x + 2.5;
  rim2.position.z = z + 1;
  rim2.material = new StandardMaterial('texture1', scene);
  rim2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let top = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.95, height: 0.025, tessellation: 20}, scene);
  top.position.y = 2.65;
  top.position.x = x + 2.5;
  top.position.z = z + 3;
  top.material = new StandardMaterial('texture1', scene);
  top.material.diffuseColor = new Color3(0, 0, 0);
}

export {generateMachine};
