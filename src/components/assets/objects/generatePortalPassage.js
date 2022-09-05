import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnStoneTexture, returnMetalTexture, returnCrystalTexture,
  genCubeFaceUV} from "../textures.js";

function generatePortalPassage(scene, global_objects, color_name, x, z, y, portal_name, portal_type, exit_x, exit_z, exit_y) {
  let portal_color = {};
  let portal_texture = {};
  let stone_texture = {};
  let metal_texture = {};
  switch (color_name) {
    case "red":
      portal_color = new Color3(1, 0, 0);
      portal_texture = "gem_red";
      stone_texture = "rock";
    break;
    case "green":
      portal_color = new Color3(0, 1, 0);
      portal_texture = "gem_green";
      stone_texture = "rock";
    break;
    case "yellow":
      portal_color = new Color3(1, 1, 0);
      portal_texture = "gem_yellow";
      metal_texture = "iron";
    break;
  }

  let stone1 = MeshBuilder.CreateBox("box", {width: 2, height: 7, depth: 2, faceUV: genCubeFaceUV([1, 3.5, 1, 3.5, 3.5, 1, 3.5, 1, 1, 1, 1, 1])}, scene);
  stone1.position.y = y + 3.5;
  stone1.position.x = x;
  stone1.position.z = z - 3;
  stone1.material = new StandardMaterial('texture1', scene);
  if (color_name === "yellow") {
    stone1.material.diffuseTexture = returnMetalTexture(metal_texture, scene);
  } else {
    stone1.material.diffuseTexture = returnStoneTexture(stone_texture, scene);
  }
  stone1.physicsImpostor = new PhysicsImpostor(stone1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  stone1.checkCollisions = true;

  let stone2 = MeshBuilder.CreateBox("box", {width: 2, height: 7, depth: 2, faceUV: genCubeFaceUV([1, 3.5, 1, 3.5, 3.5, 1, 3.5, 1, 1, 1, 1, 1])}, scene);
  stone2.position.y = y + 3.5;
  stone2.position.x = x;
  stone2.position.z = z + 3;
  stone2.material = new StandardMaterial('texture1', scene);
  if (color_name === "yellow") {
    stone2.material.diffuseTexture = returnMetalTexture(metal_texture, scene);
  } else {
    stone2.material.diffuseTexture = returnStoneTexture(stone_texture, scene);
  }
  stone2.physicsImpostor = new PhysicsImpostor(stone2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  stone2.checkCollisions = true;

  let stone3 = MeshBuilder.CreateBox("box", {width: 2, height: 2, depth: 10, faceUV: genCubeFaceUV([1, 1, 1, 1, 1, 5, 1, 5, 5, 1, 5, 1])}, scene);
  stone3.position.y = y + 8;
  stone3.position.x = x;
  stone3.position.z = z;
  stone3.material = new StandardMaterial('texture1', scene);
  if (color_name === "yellow") {
    stone3.material.diffuseTexture = returnMetalTexture(metal_texture, scene);
  } else {
    stone3.material.diffuseTexture = returnStoneTexture(stone_texture, scene);
  }

  let teleporter = MeshBuilder.CreateBox("box", {width: 1, height: 7, depth: 4}, scene);
  teleporter.position.y = y + 3.5;
  teleporter.position.x = x;
  teleporter.position.z = z;
  teleporter.material = new StandardMaterial('texture1', scene);
  teleporter.material.diffuseTexture = returnCrystalTexture(portal_texture, scene);;
  teleporter.physicsImpostor = new PhysicsImpostor(teleporter, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  teleporter.checkCollisions = true;
  teleporter.name = portal_name;

  let teleporterGlow = MeshBuilder.CreateBox("box", {width: 1.5, height: 7, depth: 4}, scene);
  teleporterGlow.position.y = y + 3.5;
  teleporterGlow.position.x = x;
  teleporterGlow.position.z = z;
  teleporterGlow.material = new StandardMaterial('texture1', scene);
  teleporterGlow.material.diffuseColor = portal_color;
  teleporterGlow.material.specularColor = portal_color;
  teleporterGlow.material.emissiveColor = portal_color;
  teleporterGlow.material.ambientColor = portal_color;
  teleporterGlow.material.alpha = 0.1;

  global_objects.push({id: teleporter.uniqueId, type: portal_type, exit_pos: {x: exit_x, z: exit_z, y: exit_y}});
}

export {generatePortalPassage};
