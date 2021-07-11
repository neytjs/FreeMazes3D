import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {RecastJSPlugin} from "@babylonjs/core/Navigation/Plugins";
import Recast from 'recast-detour';
import {TransformNode} from "@babylonjs/core/Meshes";
import {generateNavMesh, sendAgent, createCrowd, generateMob} from "../mob_crowd.js";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {degrees} from "../../utilities/math.js";

function mobShoots(x, z, scene, global_objects, item_id, camera) {
  let crystalColors = [
    new Color3(0, 0.64, 1),
    new Color3(0, 0.47, 1),
    new Color3(0.16, 0.28, 0.98),
    new Color3(0.01, 0, 0.68)
  ];
  crystalColors = arrayShuffler(crystalColors);

  let eye1 = Mesh.CreateSphere("sphere", 20, 2, scene);
  eye1.position.y = 4;
  eye1.material = new StandardMaterial('texture1', scene);
  eye1.material.diffuseColor = new Color3(1, 1, 1);

  let eye2 = Mesh.CreateSphere("sphere", 20, 1.5, scene);
  eye2.position.y = 4;
  eye2.position.z = 0.35;
  eye2.material = new StandardMaterial('texture1', scene);
  eye2.material.diffuseColor = crystalColors[0];

  let eye3 = Mesh.CreateSphere("sphere", 20, 0.75, scene);
  eye3.position.y = 4;
  eye3.position.z = 0.8;
  eye3.material = new StandardMaterial('texture1', scene);
  eye3.material.diffuseColor = new Color3(0, 0, 0);

  let machine1 = MeshBuilder.CreateTorus("torus", {diameter: 2, thickness: 0.4}, scene);
  machine1.position.y = 4;
  machine1.rotation.x = 1.57;
  machine1.material = new StandardMaterial('texture1', scene);
  machine1.material.diffuseColor = new Color3(0.29, 0.26, 0.26);

  let machine2 = Mesh.CreateSphere("sphere", 20, 2, scene);
  machine2.position.y = 4;
  machine2.position.z = -0.25;
  machine2.material = new StandardMaterial('texture1', scene);
  machine2.material.diffuseColor = new Color3(0.29, 0.26, 0.26);

  let machine3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 2, tessellation: 8}, scene);
  machine3.position.y = 3.5;
  machine3.position.z = -0.4;
  machine3.material = new StandardMaterial('texture1', scene);
  machine3.material.diffuseColor = new Color3(0.29, 0.26, 0.26);

  let machine4 = MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 1}, scene);
  machine4.position.y = 2;
  machine4.position.z = -0.4;
  machine4.material = new StandardMaterial('texture1', scene);
  machine4.material.diffuseColor = new Color3(0.29, 0.26, 0.26);

  let machine5 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 1.5, tessellation: 8}, scene);
  machine5.position.y = 2;
  machine5.rotation.x = Math.PI / 2;
  machine5.material = new StandardMaterial('texture1', scene);
  machine5.material.diffuseColor = new Color3(0.4, 0.36, 0.36);

  let machine6 = MeshBuilder.CreateTorus("torus", {diameter: 0.5, thickness: 0.1}, scene);
  machine6.position.y = 2;
  machine6.rotation.x = 1.57;
  machine6.position.z = 0.75;
  machine6.material = new StandardMaterial('texture1', scene);
  machine6.material.diffuseColor = new Color3(0.4, 0.36, 0.36);

  let machine7 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 0.01, tessellation: 8}, scene);
  machine7.position.y = 2;
  machine7.position.z = 0.75;
  machine7.rotation.x = Math.PI / 2;
  machine7.material = new StandardMaterial('texture1', scene);
  machine7.material.diffuseColor = new Color3(0, 0, 0);

  let mob = Mesh.MergeMeshes([eye1, eye2, eye3, machine1, machine2, machine3, machine4, machine5, machine6, machine7], true, true, undefined, false, true);
  mob.name = "mobOb12";

  const pi = Math.PI;
  const degrees = [(pi * 2), (pi * 5/3), (pi * 4/3), pi, (pi * 2/3), (pi / 3)]; // external file in game version, utilities/math.js

  for (let i = 0, length = degrees.length; i < length; i++) {
    let pole = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8}, scene);
    pole.position.y = 1.75;
    pole.position.x = (17.5 * Math.cos(degrees[i])) + x;
    pole.position.z = (17.5 * Math.sin(degrees[i])) + z;
    pole.material = new StandardMaterial('texture1', scene);
    pole.material.diffuseColor = new Color3(0.25, 0.2, 0.15);
  }

  let top = MeshBuilder.CreateTorus("torus", {diameter: 35, thickness: 0.7, tessellation: 40}, scene);
  top.position.y = 3.4;
  top.position.x = x;
  top.position.z = z;
  top.material = new StandardMaterial('texture1', scene);
  top.material.diffuseColor = new Color3(0.4, 0.36, 0.36);
  global_objects.push({id: top.uniqueId, obstacle12_id: item_id, type: "structure", name: ""});

  let power1Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power1Shard1.position.y = 6;
  power1Shard1.material = new StandardMaterial('texture1', scene);
  power1Shard1.material.diffuseColor = crystalColors[0];

  let power1Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power1Shard2.position.y = 2;
  power1Shard2.material = new StandardMaterial('texture1', scene);
  power1Shard2.material.diffuseColor = crystalColors[0];

  let powerCrystal1Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  powerCrystal1Barrier.position.y = 5;
  powerCrystal1Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal1Barrier.material.alpha = 0;

  let powerCrystal1 = Mesh.MergeMeshes([power1Shard1, power1Shard2, powerCrystal1Barrier], true, true, undefined, false, true);
  powerCrystal1.position.x = x - 20;
  powerCrystal1.position.z = z + 20;
  powerCrystal1.physicsImpostor = new PhysicsImpostor(powerCrystal1Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal1.checkCollisions = true;
  powerCrystal1.name = "powerCrystal1Ob12";

  let power2Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power2Shard1.position.y = 6;
  power2Shard1.material = new StandardMaterial('texture1', scene);
  power2Shard1.material.diffuseColor = crystalColors[1];

  let power2Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power2Shard2.position.y = 2;
  power2Shard2.material = new StandardMaterial('texture1', scene);
  power2Shard2.material.diffuseColor = crystalColors[1];

  let powerCrystal2Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  powerCrystal2Barrier.position.y = 5;
  powerCrystal2Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal2Barrier.material.alpha = 0;

  let powerCrystal2 = Mesh.MergeMeshes([power2Shard1, power2Shard2, powerCrystal2Barrier], true, true, undefined, false, true);
  powerCrystal2.position.x = x - 20;
  powerCrystal2.position.z = z - 20;
  powerCrystal2.physicsImpostor = new PhysicsImpostor(powerCrystal2Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal2.checkCollisions = true;
  powerCrystal2.name = "powerCrystal2Ob12";

  let power3Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power3Shard1.position.y = 6;
  power3Shard1.material = new StandardMaterial('texture1', scene);
  power3Shard1.material.diffuseColor = crystalColors[2];

  let power3Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power3Shard2.position.y = 2;
  power3Shard2.material = new StandardMaterial('texture1', scene);
  power3Shard2.material.diffuseColor = crystalColors[2];

  let powerCrystal3Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  powerCrystal3Barrier.position.y = 5;
  powerCrystal3Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal3Barrier.material.alpha = 0;

  let powerCrystal3 = Mesh.MergeMeshes([power3Shard1, power3Shard2, powerCrystal3Barrier], true, true, undefined, false, true);
  powerCrystal3.position.x = x + 20;
  powerCrystal3.position.z = z - 20;
  powerCrystal3.physicsImpostor = new PhysicsImpostor(powerCrystal3Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal3.checkCollisions = true;
  powerCrystal3.name = "powerCrystal3Ob12";

  let power4Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power4Shard1.position.y = 6;
  power4Shard1.material = new StandardMaterial('texture1', scene);
  power4Shard1.material.diffuseColor = crystalColors[3];

  let power4Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power4Shard2.position.y = 2;
  power4Shard2.material = new StandardMaterial('texture1', scene);
  power4Shard2.material.diffuseColor = crystalColors[3];

  let powerCrystal4Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  powerCrystal4Barrier.position.y = 5;
  powerCrystal4Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal4Barrier.material.alpha = 0;

  let powerCrystal4 = Mesh.MergeMeshes([power4Shard1, power4Shard2, powerCrystal4Barrier], true, true, undefined, false, true);
  powerCrystal4.position.x = x + 20;
  powerCrystal4.position.z = z + 20;
  powerCrystal4.physicsImpostor = new PhysicsImpostor(powerCrystal4Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal4.checkCollisions = true;
  powerCrystal4.name = "powerCrystal4Ob12";

  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    powerCrystal1.rotate(axis, angle, 1);
    powerCrystal2.rotate(axis, angle, 1);
    powerCrystal3.rotate(axis, angle, 1);
    powerCrystal4.rotate(axis, angle, 1);
  });

  let powerMachine1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
  powerMachine1.position.y = 0.25;
  powerMachine1.position.x = x - 20;
  powerMachine1.position.z = z + 20;
  powerMachine1.material = new StandardMaterial('texture1', scene);
  powerMachine1.material.diffuseColor = new Color3(0.19, 0.19, 0.19);

  let powerMachine2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
  powerMachine2.position.y = 0.25;
  powerMachine2.position.x = x - 20;
  powerMachine2.position.z = z - 20;
  powerMachine2.material = new StandardMaterial('texture1', scene);
  powerMachine2.material.diffuseColor = new Color3(0.19, 0.19, 0.19);

  let powerMachine3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
  powerMachine3.position.y = 0.25;
  powerMachine3.position.x = x + 20;
  powerMachine3.position.z = z - 20;
  powerMachine3.material = new StandardMaterial('texture1', scene);
  powerMachine3.material.diffuseColor = new Color3(0.19, 0.19, 0.19);

  let powerMachine4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
  powerMachine4.position.y = 0.25;
  powerMachine4.position.x = x + 20;
  powerMachine4.position.z = z + 20;
  powerMachine4.material = new StandardMaterial('texture1', scene);
  powerMachine4.material.diffuseColor = new Color3(0.19, 0.19, 0.19);

  let wire1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 55, tessellation: 8}, scene);
  wire1.position.y = 0.05;
  wire1.position.x = x;
  wire1.position.z = z;
  wire1.rotation.x = Math.PI / 2;
  wire1.rotation.y = 0.785;
  wire1.material = new StandardMaterial('texture1', scene);
  wire1.material.diffuseColor = new Color3(0, 0, 0);

  let wire2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 55, tessellation: 8}, scene);
  wire2.position.y = 0.05;
  wire2.position.x = x;
  wire2.position.z = z;
  wire2.rotation.z = Math.PI / 2;
  wire2.rotation.y = 0.785;
  wire2.material = new StandardMaterial('texture1', scene);
  wire2.material.diffuseColor = new Color3(0, 0, 0);

  let bigPlatformMob = MeshBuilder.CreateCylinder("cylinder", {diameter: 35, height: 2, tessellation: 20}, scene);
  bigPlatformMob.position.y = 1;
  bigPlatformMob.position.x = x;
  bigPlatformMob.position.z = z;
  bigPlatformMob.material = new StandardMaterial('texture1', scene);
  bigPlatformMob.material.diffuseColor = new Color3(0.3, 0.3, 0.3);
  bigPlatformMob.physicsImpostor = new PhysicsImpostor(bigPlatformMob, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  bigPlatformMob.checkCollisions = true;
  bigPlatformMob.name = "bigPlatformMob";

  let bigPlatformBarrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 38, height: 2, tessellation: 20}, scene);
  bigPlatformBarrier.position.y = 1;
  bigPlatformBarrier.position.x = x;
  bigPlatformBarrier.position.z = z;
  bigPlatformBarrier.material = new StandardMaterial('texture1', scene);
  bigPlatformBarrier.material.diffuseColor = new Color3(0.3, 0.3, 0.3);
  bigPlatformBarrier.physicsImpostor = new PhysicsImpostor(bigPlatformBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  bigPlatformBarrier.checkCollisions = true;
  bigPlatformBarrier.material.alpha = 0;

  generateNavMesh(scene);
  createCrowd(scene);
  generateMob(scene, x, z);

  scene.onBeforeRenderObservable.add(function () {
    sendAgent(camera);
  });
}

export {mobShoots};
