import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";

function generateSpear(status, spear_type, scene, x, z, camera) {
  let spear_name = "";
  let shaft_color = {};
  let blade_color = {};
  switch (spear_type) {
    case "hut":
      spear_name = "hutSpear";
      shaft_color = new Color3(0.45, 0.29, 0.14);
      blade_color = new Color3(0.65, 0.65, 0.65);
    break;
    case "ghost":
      spear_name = "ghostSpear";
      shaft_color = new Color3(0.58, 0.53, 0.42);
      blade_color = new Color3(0.59, 0.71, 0.73);
    break;
  }

  let shaft = MeshBuilder.CreateCylinder("shaft", {diameterTop: 0.3, diameterBottom: 0.4, height: 8, tessellation: 12}, scene);
  shaft.position.y = 4;
  shaft.material = new StandardMaterial('texture1', scene);
  shaft.material.diffuseColor = shaft_color;

  let blade1 = MeshBuilder.CreateCylinder("blade", {diameterTop: 0, diameter: 1.5, height: 2.5, tessellation: 4}, scene);
  blade1.position.y = 9;
  blade1.material = new StandardMaterial('texture1', scene);
  blade1.material.diffuseColor = blade_color;

  let blade2 = MeshBuilder.CreateCylinder("blade", {diameterBottom: 0, diameter: 1.5, height: 0.5, tessellation: 4}, scene);
  blade2.position.y = 7.5;
  blade2.material = new StandardMaterial('texture1', scene);
  blade2.material.diffuseColor = blade_color;

  if (status === "holding") {
    let spear = Mesh.MergeMeshes([shaft, blade1, blade2], true, true, undefined, false, true);
    spear.renderingGroupId = 1;
    spear.name = spear_name;
    spear.rotation.x = Math.PI / 3;
    spear.parent = camera;
    spear.position = new Vector3(0, -6, 8);
  }
  if (status === "item") {
    let spearBarrier = MeshBuilder.CreateCylinder("spearBarrier", {diameter: 2.5, height: 10, tessellation: 8}, scene);
    spearBarrier.position.y = 5;
    spearBarrier.position.x = x;
    spearBarrier.position.z = z;
    spearBarrier.material = new StandardMaterial('texture1', scene);
    spearBarrier.material.alpha = 0;
    let spear = Mesh.MergeMeshes([shaft, blade1, blade2, spearBarrier], true, true, undefined, false, true);
    spear.position.x = x + 15;
    spear.position.z = z + 20;
    spear.physicsImpostor = new PhysicsImpostor(spearBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    spear.checkCollisions = true;
    spear.name = spear_name;
  // make it rotate
    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
      spear.rotate(axis, angle, 1);
    });
  }
}

export {generateSpear};
