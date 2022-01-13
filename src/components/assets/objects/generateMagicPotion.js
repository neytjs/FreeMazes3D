import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {returnLiquidTexture, returnWoodTexture} from "../textures.js";

function generateMagicPotion(x, z, color, global_objects, scene) {
  let magicPotionBottom = Mesh.CreateSphere("sphere", 8, 1.3, scene);
  magicPotionBottom.position.y = 3;
  magicPotionBottom.material = new StandardMaterial('texture1', scene);
  magicPotionBottom.material.diffuseTexture = returnLiquidTexture(color.texture, scene);

  let glassContainer = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 0.9, tessellation: 20}, scene);
  glassContainer.position.y = 4.15;
  glassContainer.material = new StandardMaterial('texture1', scene);
  glassContainer.material.diffuseColor = new Color3(0.46, 0.82, 0.84);
  glassContainer.material.alpha = 0.3;

  let glassContainerBottom = Mesh.CreateSphere("sphere", 8, 1.5, scene);
  glassContainerBottom.position.y = 3;
  glassContainerBottom.material = new StandardMaterial('texture1', scene);
  glassContainerBottom.material.diffuseColor = new Color3(0.46, 0.82, 0.84);
  glassContainerBottom.material.alpha = 0.3;

  let glassContainerCork = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 0.25, tessellation: 20}, scene);
  glassContainerCork.position.y = 4.55;
  glassContainerCork.material = new StandardMaterial('texture1', scene);
  glassContainerCork.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let glassContainerBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  glassContainerBarrier.position.y = 5;
  glassContainerBarrier.material = new StandardMaterial('texture1', scene);
  glassContainerBarrier.material.diffuseColor = new Color3(0.34, 0.32, 0.32);
  glassContainerBarrier.material.alpha = 0;

  let potion = Mesh.MergeMeshes([magicPotionBottom, glassContainer, glassContainerBottom, glassContainerCork, glassContainerBarrier], true, true, undefined, false, true);
  potion.position.x = x;
  potion.position.z = z;
  potion.physicsImpostor = new PhysicsImpostor(glassContainerBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  potion.checkCollisions = true;
  potion.name = color.color_name + "_potionOb17";
  global_objects.push({
    id: potion.uniqueId,
    type: "potion_Ob17",
    name: (color.color_name + "_potion"),
    inventory: (color.inv_name + " Magic Potion"),
    img: (color.color_name + "_potion"),
    color_name: color.color_name
  });

  let axis = new Vector3(0, 6, 0);
  let angle = 0.02;
  scene.registerAfterRender(function () {
    potion.rotate(axis, angle, 1);
  });
}

export {generateMagicPotion};
