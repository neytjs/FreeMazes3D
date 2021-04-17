import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Color3} from "@babylonjs/core/Maths/math";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";

function generateTree(x, z, floor_x, floor_z, plus_x, plus_z, scene) {
  let tree_parts = [];

  let cylinder = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8}, scene);
  cylinder.position.y = 1;
  cylinder.position.x = 0;
  cylinder.position.z = 0;
  cylinder.material = new StandardMaterial('texture1', scene);
  cylinder.material.diffuseColor = new Color3(0.42, 0.25, 0.14);
  tree_parts.push(cylinder);

  let cone = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8}, scene);
  cone.position.y = 6;
  cone.position.x = 0;
  cone.position.z = 0;
  cone.material = new StandardMaterial('texture1', scene);
  cone.material.diffuseColor = new Color3(0.04, 0.39, 0.05);
  tree_parts.push(cone);

  let cylinder2 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8}, scene);
  cylinder2.position.y = 1;
  cylinder2.position.x = 3;
  cylinder2.position.z = 3;
  cylinder2.material = new StandardMaterial('texture1', scene);
  cylinder2.material.diffuseColor = new Color3(0.42, 0.25, 0.14);
  tree_parts.push(cylinder2);

  let cone2 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8}, scene);
  cone2.position.y = 6;
  cone2.position.x = 3;
  cone2.position.z = 3;
  cone2.material = new StandardMaterial('texture1', scene);
  cone2.material.diffuseColor = new Color3(0.04, 0.39, 0.05);
  tree_parts.push(cone2);

  let cylinder3 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8}, scene);
  cylinder3.position.y = 1;
  cylinder3.position.x = -3;
  cylinder3.position.z = -3;
  cylinder3.material = new StandardMaterial('texture1', scene);
  cylinder3.material.diffuseColor = new Color3(0.42, 0.25, 0.14);
  tree_parts.push(cylinder3);

  let cone3 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8}, scene);
  cone3.position.y = 6;
  cone3.position.x = -3;
  cone3.position.z = -3;
  cone3.material = new StandardMaterial('texture1', scene);
  cone3.material.diffuseColor = new Color3(0.04, 0.39, 0.05);
  tree_parts.push(cone3);

  let cylinder4 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8}, scene);
  cylinder4.position.y = 1;
  cylinder4.position.x = 3;
  cylinder4.position.z = -3;
  cylinder4.material = new StandardMaterial('texture1', scene);
  cylinder4.material.diffuseColor = new Color3(0.42, 0.25, 0.14);
  tree_parts.push(cylinder4);

  let cone4 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8}, scene);
  cone4.position.y = 6;
  cone4.position.x = 3;
  cone4.position.z = -3;
  cone4.material = new StandardMaterial('texture1', scene);
  cone4.material.diffuseColor = new Color3(0.04, 0.39, 0.05);
  tree_parts.push(cone4);

  let cylinder5 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8}, scene);
  cylinder5.position.y = 1;
  cylinder5.position.x = -3;
  cylinder5.position.z = 3;
  cylinder5.material = new StandardMaterial('texture1', scene);
  cylinder5.material.diffuseColor = new Color3(0.42, 0.25, 0.14);
  tree_parts.push(cylinder5);

  let cone5 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8}, scene);
  cone5.position.y = 6;
  cone5.position.x = -3;
  cone5.position.z = 3;
  cone5.material = new StandardMaterial('texture1', scene);
  cone5.material.diffuseColor = new Color3(0.04, 0.39, 0.05);
  tree_parts.push(cone5);

  var treesBarrier = MeshBuilder.CreateBox("wall", {width: 10, height: 10, depth: 10}, scene);
  treesBarrier.position.y = 5;
  treesBarrier.material = new StandardMaterial('texture1', scene);
  treesBarrier.material.diffuseColor = new Color3(0, 1, 0);
  treesBarrier.material.alpha = 0;
  tree_parts.push(treesBarrier);

  let fullTrees = Mesh.MergeMeshes(tree_parts, true, true, undefined, false, true);
  fullTrees.position.x = ((x * 10) + (floor_z * 70) + plus_z);
  fullTrees.position.z = (((z * 10) - (((z * 10) * 2) + (floor_x * 70))) + plus_x);
  fullTrees.physicsImpostor = new PhysicsImpostor(treesBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  fullTrees.checkCollisions = true;
}

export {generateTree};
