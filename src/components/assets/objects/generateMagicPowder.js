import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {plateColors} from "../pyramid_data.js";
import {returnCrystalTexture, returnWoodTexture} from "../textures.js";

function generateMagicPowder(num, obstacle_objects, scene) {
  let magicPowder = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 0.6, tessellation: 20}, scene);
  magicPowder.position.y = 2.9;
  magicPowder.material = new StandardMaterial('texture1', scene);
  magicPowder.material.diffuseTexture = returnCrystalTexture(plateColors[num].color_texture, scene);

  let glassContainer = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.9, height: 0.9, tessellation: 20}, scene);
  glassContainer.position.y = 3;
  glassContainer.material = new StandardMaterial('texture1', scene);
  glassContainer.material.diffuseColor = new Color3(0.46, 0.82, 0.84);
  glassContainer.material.alpha = 0.3;

  let glassContainerCork = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 0.25, tessellation: 20}, scene);
  glassContainerCork.position.y = 3.45;
  glassContainerCork.material = new StandardMaterial('texture1', scene);
  glassContainerCork.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let glassContainerBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  glassContainerBarrier.position.y = 5;
  glassContainerBarrier.material = new StandardMaterial('texture1', scene);
  glassContainerBarrier.material.diffuseColor = new Color3(0.34, 0.32, 0.32);
  glassContainerBarrier.material.alpha = 0;

  let powder = Mesh.MergeMeshes([magicPowder, glassContainer, glassContainerCork, glassContainerBarrier], true, true, undefined, false, true);
  powder.physicsImpostor = new PhysicsImpostor(glassContainerBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  powder.checkCollisions = true;
  powder.position.y = -1000;
  powder.name = plateColors[num].color_name + "_powderOb13";
  obstacle_objects.push({id: powder.uniqueId, type: "powder_Ob13", name: (plateColors[num].color_name + "_powder"), inventory: (plateColors[num].inv_name + " Magic Powder"), img: (plateColors[num].color_name + "_powder"), color_code: plateColors[num].color_code, color_name: plateColors[num].color_name});

  let axis = new Vector3(0, 6, 0);
  let angle = 0.02;
  scene.registerAfterRender(function () {
    powder.rotate(axis, angle, 1);
  });
}

export {generateMagicPowder};
