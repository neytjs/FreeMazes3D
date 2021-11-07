import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, returnTreeTexture, returnWoodTexture} from "../../textures.js";

function generatePottedTree(x, z, scene) {
  let pot = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 2, diameterBottom: 2, height: 2, tessellation: 12}, scene);
  pot.position.y = 1;
  pot.material = new StandardMaterial('texture1', scene);
  pot.material.diffuseTexture = returnWoodTexture("wood_brown", scene);
  pot.material.diffuseTexture.uScale = 2;
  pot.material.diffuseTexture.vScale = 2;

  var rim = MeshBuilder.CreateTorus("torus", {diameter: 2, thickness: 0.25});
  rim.position.y = 2;
  rim.material = new StandardMaterial('texture1', scene);
  rim.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let trunk = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12}, scene);
  trunk.position.y = 3;
  trunk.material = new StandardMaterial('texture1', scene);
  trunk.material.diffuseTexture = returnTreeTexture("bark_wavy", scene);
  trunk.material.diffuseTexture.uScale = 2;
  trunk.material.diffuseTexture.vScale = 2;

  let leaves = Mesh.CreateSphere("sphere", 8, 3, scene);
  leaves.position.y = 5;
  leaves.material = new StandardMaterial('texture1', scene);
  leaves.material.diffuseTexture = returnTreeTexture("leaves", scene);
  leaves.material.diffuseTexture.uScale = 4;
  leaves.material.diffuseTexture.vScale = 4;

  let barrier = MeshBuilder.CreateBox("barrier", {width: 3, height: 10, depth: 3}, scene);
  barrier.position.y = 5;
  barrier.material = new StandardMaterial('texture1', scene);
  barrier.material.alpha = 0;

  let tree = Mesh.MergeMeshes([pot, rim, trunk, leaves, barrier], true, true, undefined, false, true);
  tree.position.x = x + 3.5;
  tree.position.z = z + 3.5;
  tree.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  tree.checkCollisions = true;
}

export {generatePottedTree};
