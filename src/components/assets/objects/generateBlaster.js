import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, returnCrystalTexture, genCylinderFaceUV,
  genCubeFaceUV} from "../textures.js";

function generateBlaster(status, scene, x, z, y, camera, blaster_name, blast_name) {
  let barrel_texture = {};
  let central_texture = {};
  let clip_texture = {};
  let part_texture = {};
  let trigger_texture = {};
  let blast_texture = {};
  switch (blaster_name) {
    case "blasterOb15":
      barrel_texture = "iron_dark";
      central_texture = "iron_tan";
      clip_texture = "iron_medium";
      part_texture = "iron";
      trigger_texture = "iron_dark";
      blast_texture = "gem_orange";
    break;
    case "blasterOb24":
      barrel_texture = "iron_dark";
      central_texture = "iron_dark";
      clip_texture = "iron_dark";
      part_texture = "iron_dark";
      trigger_texture = "iron_dark";
      blast_texture = "gem_green";
    break;
  }

  if (status === "holding") {
    let gunBarrel = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.6, height: 6, tessellation: 20, faceUV: genCylinderFaceUV([0.3, 0.3, 0.75, 3, 0.3, 0.3])}, scene);
    gunBarrel.position.y = 3;
    gunBarrel.position.z = 3;
    gunBarrel.rotation.x = 1.57;
    gunBarrel.material = new StandardMaterial('texture1', scene);
    gunBarrel.material.diffuseTexture = returnMetalTexture(barrel_texture, scene);

    let gunBarrel2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 0.6, tessellation: 20, faceUV: genCylinderFaceUV([0.3, 0.3, 0.6, 0.3, 0.3, 0.3])}, scene);
    gunBarrel2.position.y = 3;
    gunBarrel2.position.z = 6;
    gunBarrel2.rotation.x = 1.57;
    gunBarrel2.material = new StandardMaterial('texture1', scene);
    gunBarrel2.material.diffuseTexture = returnMetalTexture(barrel_texture, scene);

    let gunCentral = MeshBuilder.CreateBox("box", {width: 0.9, height: 1.2, depth: 3, wrap: true, faceUV: genCubeFaceUV([0.45, 0.6, 0.45, 0.6, 1.5, 0.6, 1.5, 0.6, 0.45, 1.5, 0.45, 1.5])}, scene);
    gunCentral.position.y = 3;
    gunCentral.material = new StandardMaterial('texture1', scene);
    gunCentral.material.diffuseTexture = returnMetalTexture(central_texture, scene);

    let blaster = Mesh.MergeMeshes([gunBarrel, gunBarrel2, gunCentral], true, true, undefined, false, true);
    blaster.position.y = -1000;
    blaster.name = blaster_name;

    let blast1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 2, height: 3, tessellation: 4}, scene);
    blast1.position.y = 4;

    let blast2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 2, height: 1, tessellation: 4}, scene);
    blast2.position.y = 2;

    let blast = Mesh.MergeMeshes([blast1, blast2], true, true, undefined, false, true);
    blast.position.y = -3;
    blast.position.z = 11;
    blast.rotation.x = 1.2;
    blast.renderingGroupId = 1;
    blast.parent = camera;
    blast.material = new StandardMaterial('texture1', scene);
    blast.material.diffuseTexture = returnCrystalTexture(blast_texture, scene);
    blast.material.alpha = 0;
    blast.name = blast_name;
  }
  if (status === "item") {
    let gunBarrel = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 2, tessellation: 20, faceUV: genCylinderFaceUV([0.1, 0.1, 0.25, 1, 0.1, 0.1])}, scene);
    gunBarrel.position.y = 3;
    gunBarrel.position.z = 1;
    gunBarrel.rotation.x = 1.57;
    gunBarrel.material = new StandardMaterial('texture1', scene);
    gunBarrel.material.diffuseTexture = returnMetalTexture(barrel_texture, scene);

    let gunBarrel2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.25, height: 0.2, tessellation: 20, faceUV: genCylinderFaceUV([0.1, 0.1, 0.3, 0.1, 0.1, 0.1])}, scene);
    gunBarrel2.position.y = 3;
    gunBarrel2.position.z = 2;
    gunBarrel2.rotation.x = 1.57;
    gunBarrel2.material = new StandardMaterial('texture1', scene);
    gunBarrel2.material.diffuseTexture = returnMetalTexture(barrel_texture, scene);

    let gunBarrel3 = MeshBuilder.CreateTorus("torus", {diameter: 0.2, thickness: 0.05});
    gunBarrel3.position.y = 3;
    gunBarrel3.position.z = 2.1;
    gunBarrel3.rotation.x = 1.57;
    gunBarrel3.material = new StandardMaterial('texture1', scene);
    gunBarrel3.material.diffuseTexture = returnMetalTexture(barrel_texture, scene);

    let gunBarrel4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 0.025, tessellation: 20}, scene);
    gunBarrel4.position.y = 3;
    gunBarrel4.position.z = 2.1;
    gunBarrel4.rotation.x = 1.57;
    gunBarrel4.material = new StandardMaterial('texture1', scene);
    gunBarrel4.material.diffuseColor = new Color3(0, 0, 0);

    let gunCentral = MeshBuilder.CreateBox("box", {width: 0.3, height: 0.4, depth: 1, wrap: true, faceUV: genCubeFaceUV([0.15, 0.2, 0.15, 0.2, 0.5, 0.2, 0.5, 0.2, 0.15, 0.5, 0.15, 0.5])}, scene);
    gunCentral.position.y = 3;
    gunCentral.material = new StandardMaterial('texture1', scene);
    gunCentral.material.diffuseTexture = returnMetalTexture(central_texture, scene);

    let clip = MeshBuilder.CreateBox("box", {width: 0.2, height: 1, depth: 0.5, wrap: true, faceUV: genCubeFaceUV([0.1, 0.5, 0.1, 0.5, 0.25, 0.5, 0.25, 0.5, 0.1, 0.25, 0.1, 0.25])}, scene);
    clip.position.y = 2.5;
    clip.material = new StandardMaterial('texture1', scene);
    clip.material.diffuseTexture = returnMetalTexture(clip_texture, scene);

    let gunPart1 = MeshBuilder.CreateBox("box", {width: 0.3, height: 0.3, depth: 1, wrap: true, faceUV: genCubeFaceUV([0.15, 0.15, 0.15, 0.15, 0.5, 0.15, 0.5, 0.15, 0.15, 0.5, 0.15, 0.5])}, scene);
    gunPart1.position.y = 3;
    gunPart1.position.z = -1;
    gunPart1.material = new StandardMaterial('texture1', scene);
    gunPart1.material.diffuseTexture = returnMetalTexture(part_texture, scene);

    let gunPart2 = MeshBuilder.CreateBox("box", {width: 0.2, height: 0.85, depth: 0.3, wrap: true, faceUV: genCubeFaceUV([0.1, 0.425, 0.1, 0.425, 0.15, 0.425, 0.15, 0.425, 0.1, 0.15, 0.1, 0.15])}, scene);
    gunPart2.position.y = 2.65;
    gunPart2.position.z = -1.5;
    gunPart2.rotation.x = 0.758;
    gunPart2.material = new StandardMaterial('texture1', scene);
    gunPart2.material.diffuseTexture = returnMetalTexture(part_texture, scene);

    let gunPart3 = MeshBuilder.CreateTorus("torus", {diameter: 0.4, thickness: 0.1});
    gunPart3.position.y = 2.8;
    gunPart3.position.z = -0.9;
    gunPart3.rotation.x = 1.57;
    gunPart3.rotation.y = 1.57;
    gunPart3.material = new StandardMaterial('texture1', scene);
    gunPart3.material.diffuseTexture = returnMetalTexture(trigger_texture, scene);

    let trigger = MeshBuilder.CreateBox("box", {width: 0.05, height: 0.2, depth: 0.05, wrap: true, faceUV: genCubeFaceUV([0.025, 0.1, 0.025, 0.1, 0.025, 0.1, 0.025, 0.1, 0.025, 0.025, 0.025, 0.025])}, scene);
    trigger.position.y = 2.8;
    trigger.position.z = -0.9;
    trigger.material = new StandardMaterial('texture1', scene);
    trigger.material.diffuseTexture = returnMetalTexture(trigger_texture, scene);

    let gunBarrier = MeshBuilder.CreateBox("box", {width: 1, height: 6, depth: 3.5}, scene);
    gunBarrier.position.y = 3;
    gunBarrier.material = new StandardMaterial('texture1', scene);
    gunBarrier.material.alpha = 0;

    let blaster = Mesh.MergeMeshes([gunBarrel, gunBarrel2, gunBarrel3, gunBarrel4, gunCentral, clip, gunPart1, gunPart2, gunPart3, trigger, gunBarrier], true, true, undefined, false, true);
    blaster.position.y = y;
    blaster.position.x = x;
    blaster.position.z = z;
    blaster.physicsImpostor = new PhysicsImpostor(gunBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    blaster.checkCollisions = true;
    blaster.name = blaster_name + "item";

    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
      blaster.rotate(axis, angle, 1);
    });
  }
}

export {generateBlaster};
