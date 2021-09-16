import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";

function generateBlaster(status, scene, x, z, camera) {
  if (status === "holding") {
    let gunBarrel = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.6, height: 6, tessellation: 20}, scene);
    gunBarrel.position.y = 3;
    gunBarrel.position.z = 3;
    gunBarrel.rotation.x = 1.57;
    gunBarrel.material = new StandardMaterial('texture1', scene);
    gunBarrel.material.diffuseColor = new Color3(0.18, 0.17, 0.16);

    let gunBarrel2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 0.6, tessellation: 20}, scene);
    gunBarrel2.position.y = 3;
    gunBarrel2.position.z = 6;
    gunBarrel2.rotation.x = 1.57;
    gunBarrel2.material = new StandardMaterial('texture1', scene);
    gunBarrel2.material.diffuseColor = new Color3(0.18, 0.17, 0.16);

    let gunCentral = MeshBuilder.CreateBox("box", {width: 0.9, height: 1.2, depth: 3}, scene);
    gunCentral.position.y = 3;
    gunCentral.material = new StandardMaterial('texture1', scene);
    gunCentral.material.diffuseColor = new Color3(0.35, 0.3, 0.24);

    let blaster = Mesh.MergeMeshes([gunBarrel, gunBarrel2, gunCentral], true, true, undefined, false, true);
    blaster.position.y = -1000;
    blaster.name = "blasterOb15";

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
    blast.material.diffuseColor = new Color3(0.99, 0.4, 0);
    blast.material.alpha = 0;
    blast.name = "blastOb15";
  }
  if (status === "item") {
    let gunBarrel = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 2, tessellation: 20}, scene);
    gunBarrel.position.y = 3;
    gunBarrel.position.z = 1;
    gunBarrel.rotation.x = 1.57;
    gunBarrel.material = new StandardMaterial('texture1', scene);
    gunBarrel.material.diffuseColor = new Color3(0.18, 0.17, 0.16);

    let gunBarrel2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.25, height: 0.2, tessellation: 20}, scene);
    gunBarrel2.position.y = 3;
    gunBarrel2.position.z = 2;
    gunBarrel2.rotation.x = 1.57;
    gunBarrel2.material = new StandardMaterial('texture1', scene);
    gunBarrel2.material.diffuseColor = new Color3(0.18, 0.17, 0.16);

    let gunBarrel3 = MeshBuilder.CreateTorus("torus", {diameter: 0.2, thickness: 0.05});
    gunBarrel3.position.y = 3;
    gunBarrel3.position.z = 2.1;
    gunBarrel3.rotation.x = 1.57;
    gunBarrel3.material = new StandardMaterial('texture1', scene);
    gunBarrel3.material.diffuseColor = new Color3(0.16, 0.16, 0.16);

    let gunBarrel4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 0.025, tessellation: 20}, scene);
    gunBarrel4.position.y = 3;
    gunBarrel4.position.z = 2.1;
    gunBarrel4.rotation.x = 1.57;
    gunBarrel4.material = new StandardMaterial('texture1', scene);
    gunBarrel4.material.diffuseColor = new Color3(0, 0, 0);

    let gunCentral = MeshBuilder.CreateBox("box", {width: 0.3, height: 0.4, depth: 1}, scene);
    gunCentral.position.y = 3;
    gunCentral.material = new StandardMaterial('texture1', scene);
    gunCentral.material.diffuseColor = new Color3(0.35, 0.3, 0.24);

    let clip = MeshBuilder.CreateBox("box", {width: 0.2, height: 1, depth: 0.5}, scene);
    clip.position.y = 2.5;
    clip.material = new StandardMaterial('texture1', scene);
    clip.material.diffuseColor = new Color3(0.33, 0.33, 0.33);

    let gunPart1 = MeshBuilder.CreateBox("box", {width: 0.3, height: 0.3, depth: 1}, scene);
    gunPart1.position.y = 3;
    gunPart1.position.z = -1;
    gunPart1.material = new StandardMaterial('texture1', scene);
    gunPart1.material.diffuseColor = new Color3(0.41, 0.41, 0.41);

    let gunPart2 = MeshBuilder.CreateBox("box", {width: 0.3, height: 0.85, depth: 0.3}, scene);
    gunPart2.position.y = 2.65;
    gunPart2.position.z = -1.5;
    gunPart2.rotation.x = 0.758;
    gunPart2.material = new StandardMaterial('texture1', scene);
    gunPart2.material.diffuseColor = new Color3(0.41, 0.41, 0.41);

    var gunPart3 = MeshBuilder.CreateTorus("torus", {diameter: 0.4, thickness: 0.1});
    gunPart3.position.y = 2.8;
    gunPart3.position.z = -0.9;
    gunPart3.rotation.x = 1.57;
    gunPart3.rotation.y = 1.57;
    gunPart3.material = new StandardMaterial('texture1', scene);
    gunPart3.material.diffuseColor = new Color3(0.16, 0.16, 0.16);

    let trigger = MeshBuilder.CreateBox("box", {width: 0.05, height: 0.2, depth: 0.05}, scene);
    trigger.position.y = 2.8;
    trigger.position.z = -0.9;
    trigger.material = new StandardMaterial('texture1', scene);
    trigger.material.diffuseColor = new Color3(0.15, 0.15, 0.15);

    let gunBarrier = MeshBuilder.CreateBox("box", {width: 1, height: 6, depth: 3.5}, scene);
    gunBarrier.position.y = 3;
    gunBarrier.material = new StandardMaterial('texture1', scene);
    gunBarrier.material.alpha = 0;

    let blaster = Mesh.MergeMeshes([gunBarrel, gunBarrel2, gunBarrel3, gunBarrel4, gunCentral, clip, gunPart1, gunPart2, gunPart3, trigger, gunBarrier], true, true, undefined, false, true);
    blaster.position.y = 2;
    blaster.position.x = x;
    blaster.position.z = z;
    blaster.physicsImpostor = new PhysicsImpostor(gunBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    blaster.checkCollisions = true;
    blaster.name = "blasterOb15item";

    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
      blaster.rotate(axis, angle, 1);
    });
  }
}

export {generateBlaster};
