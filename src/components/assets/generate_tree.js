import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Color3} from "@babylonjs/core/Maths/math";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnTreeTexture} from "../assets/textures.js";

function generateTree(secret_environments, scene, x, z, floor_x, floor_z, plus_x, plus_z) {
  let trunk_textures = {
    alpine: "bark_alpine",
    winter: "bark_winter",
    wasteland: "bark_wasteland"
  };
  let needles_textures = {
    alpine: "needles_alpine",
    winter: "needles_winter",
    wasteland: "needles_wasteland"
  };
  let trunk_texture = trunk_textures[secret_environments[0]];
  let needles_texture = needles_textures[secret_environments[0]];
  let tree_parts = [];

  let cylinder = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8, wrap: true}, scene);
  cylinder.position.y = 1;
  cylinder.position.x = 0;
  cylinder.position.z = 0;
  cylinder.material = new StandardMaterial('texture1', scene);
  cylinder.material.diffuseTexture = returnTreeTexture(trunk_texture, scene);
  cylinder.material.diffuseTexture.uScale = 2;
  cylinder.material.diffuseTexture.vScale = 2;
  tree_parts.push(cylinder);

  let cone = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8, wrap: true}, scene);
  cone.position.y = 6;
  cone.position.x = 0;
  cone.position.z = 0;
  cone.material = new StandardMaterial('texture1', scene);
  cone.material.diffuseTexture = returnTreeTexture(needles_texture, scene);
  cone.material.diffuseTexture.uScale = 5;
  cone.material.diffuseTexture.vScale = 5;
  tree_parts.push(cone);

  let cylinder2 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8, wrap: true}, scene);
  cylinder2.position.y = 1;
  cylinder2.position.x = 3;
  cylinder2.position.z = 3;
  cylinder2.material = new StandardMaterial('texture1', scene);
  cylinder2.material.diffuseTexture = returnTreeTexture(trunk_texture, scene);
  cylinder2.material.diffuseTexture.uScale = 2;
  cylinder2.material.diffuseTexture.vScale = 2;
  tree_parts.push(cylinder2);

  let cone2 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8, wrap: true}, scene);
  cone2.position.y = 6;
  cone2.position.x = 3;
  cone2.position.z = 3;
  cone2.material = new StandardMaterial('texture1', scene);
  cone2.material.diffuseTexture = returnTreeTexture(needles_texture, scene);
  cone2.material.diffuseTexture.uScale = 5;
  cone2.material.diffuseTexture.vScale = 5;
  tree_parts.push(cone2);

  let cylinder3 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8, wrap: true}, scene);
  cylinder3.position.y = 1;
  cylinder3.position.x = -3;
  cylinder3.position.z = -3;
  cylinder3.material = new StandardMaterial('texture1', scene);
  cylinder3.material.diffuseTexture = returnTreeTexture(trunk_texture, scene);
  cylinder3.material.diffuseTexture.uScale = 2;
  cylinder3.material.diffuseTexture.vScale = 2;
  tree_parts.push(cylinder3);

  let cone3 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8}, scene);
  cone3.position.y = 6;
  cone3.position.x = -3;
  cone3.position.z = -3;
  cone3.material = new StandardMaterial('texture1', scene);
  cone3.material.diffuseTexture = returnTreeTexture(needles_texture, scene);
  cone3.material.diffuseTexture.uScale = 5;
  cone3.material.diffuseTexture.vScale = 5;
  tree_parts.push(cone3);

  let cylinder4 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8}, scene);
  cylinder4.position.y = 1;
  cylinder4.position.x = 3;
  cylinder4.position.z = -3;
  cylinder4.material = new StandardMaterial('texture1', scene);
  cylinder4.material.diffuseTexture = returnTreeTexture(trunk_texture, scene);
  cylinder4.material.diffuseTexture.uScale = 2;
  cylinder4.material.diffuseTexture.vScale = 2;
  tree_parts.push(cylinder4);

  let cone4 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8}, scene);
  cone4.position.y = 6;
  cone4.position.x = 3;
  cone4.position.z = -3;
  cone4.material = new StandardMaterial('texture1', scene);
  cone4.material.diffuseTexture = returnTreeTexture(needles_texture, scene);
  cone4.material.diffuseTexture.uScale = 5;
  cone4.material.diffuseTexture.vScale = 5;
  tree_parts.push(cone4);

  let cylinder5 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, height: 2, tessellation: 8}, scene);
  cylinder5.position.y = 1;
  cylinder5.position.x = -3;
  cylinder5.position.z = 3;
  cylinder5.material = new StandardMaterial('texture1', scene);
  cylinder5.material.diffuseTexture = returnTreeTexture(trunk_texture, scene);
  cylinder5.material.diffuseTexture.uScale = 2;
  cylinder5.material.diffuseTexture.vScale = 2;
  tree_parts.push(cylinder5);

  let cone5 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8}, scene);
  cone5.position.y = 6;
  cone5.position.x = -3;
  cone5.position.z = 3;
  cone5.material = new StandardMaterial('texture1', scene);
  cone5.material.diffuseTexture = returnTreeTexture(needles_texture, scene);
  cone5.material.diffuseTexture.uScale = 5;
  cone5.material.diffuseTexture.vScale = 5;
  tree_parts.push(cone5);

  let fullTrees = Mesh.MergeMeshes(tree_parts, true, true, undefined, false, true);

  return fullTrees;
}

export {generateTree};
