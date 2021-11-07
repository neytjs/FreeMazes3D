import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {returnMetalTexture, returnCrystalTexture} from "../textures.js";

function dodgeTurret(x, z, scene, global_objects, item_id, camera) {
  let turretBase = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 8}, scene);
  turretBase.position.y = 1.5;
  turretBase.material = new StandardMaterial('texture1', scene);
  turretBase.material.diffuseTexture = returnMetalTexture("iron_blue", scene);
  global_objects.push({id: turretBase.uniqueId, obstacle11_id: item_id, type: "structure", name: ""});

  let turretTower = MeshBuilder.CreateBox("box", {width: 4, height: 2.5, depth: 5}, scene);
  turretTower.position.y = 4;
  turretTower.material = new StandardMaterial('texture1', scene);
  turretTower.material.diffuseTexture = returnMetalTexture("iron", scene);

  let turretBarrel1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.75, diameterBottom: 1, height: 4, tessellation: 8}, scene);
  turretBarrel1.position.y = 4;
  turretBarrel1.position.z = 4;
  turretBarrel1.position.x = -1;
  turretBarrel1.rotation.x = Math.PI / 2;
  turretBarrel1.material = new StandardMaterial('texture1', scene);
  turretBarrel1.material.diffuseTexture = returnMetalTexture("iron_medium", scene);

  let turretBarrel2 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.75, diameterBottom: 1, height: 4, tessellation: 8}, scene);
  turretBarrel2.position.y = 4;
  turretBarrel2.position.z = 4;
  turretBarrel2.position.x = 1;
  turretBarrel2.rotation.x = Math.PI / 2;
  turretBarrel2.material = new StandardMaterial('texture1', scene);
  turretBarrel2.material.diffuseTexture = returnMetalTexture("iron_medium", scene);

  let turretBarrelRim1 = MeshBuilder.CreateTorus("torus", {diameter: 0.75, thickness: 0.2}, scene);
  turretBarrelRim1.position.y = 4;
  turretBarrelRim1.position.z = 6;
  turretBarrelRim1.position.x = 1;
  turretBarrelRim1.rotation.x = 1.57;
  turretBarrelRim1.material = new StandardMaterial('texture1', scene);
  turretBarrelRim1.material.diffuseTexture = returnMetalTexture("iron_medium", scene);

  let turretBarrelRim2 = MeshBuilder.CreateTorus("torus", {diameter: 0.75, thickness: 0.2}, scene);
  turretBarrelRim2.position.y = 4;
  turretBarrelRim2.position.z = 6;
  turretBarrelRim2.position.x = -1;
  turretBarrelRim2.rotation.x = 1.57;
  turretBarrelRim2.material = new StandardMaterial('texture1', scene);
  turretBarrelRim2.material.diffuseTexture = returnMetalTexture("iron_medium", scene);

  let turretBarrelBackRim1 = MeshBuilder.CreateTorus("torus", {diameter: 1, thickness: 0.6}, scene);
  turretBarrelBackRim1.position.y = 4;
  turretBarrelBackRim1.position.z = 2.5;
  turretBarrelBackRim1.position.x = 1;
  turretBarrelBackRim1.rotation.x = 1.57;
  turretBarrelBackRim1.material = new StandardMaterial('texture1', scene);
  turretBarrelBackRim1.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

  let turretBarrelBackRim2 = MeshBuilder.CreateTorus("torus", {diameter: 1, thickness: 0.6}, scene);
  turretBarrelBackRim2.position.y = 4;
  turretBarrelBackRim2.position.z = 2.5;
  turretBarrelBackRim2.position.x = -1;
  turretBarrelBackRim2.rotation.x = 1.57;
  turretBarrelBackRim2.material = new StandardMaterial('texture1', scene);
  turretBarrelBackRim2.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

  let turretBarrelHole1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.7, height: 0.1, tessellation: 8}, scene);
  turretBarrelHole1.position.y = 4;
  turretBarrelHole1.position.z = 6;
  turretBarrelHole1.position.x = 1;
  turretBarrelHole1.rotation.x = Math.PI / 2;
  turretBarrelHole1.material = new StandardMaterial('texture1', scene);
  turretBarrelHole1.material.diffuseColor = new Color3(0, 0, 0);

  let turretBarrelHole2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.7, height: 0.1, tessellation: 8}, scene);
  turretBarrelHole2.position.y = 4;
  turretBarrelHole2.position.z = 6;
  turretBarrelHole2.position.x = -1;
  turretBarrelHole2.rotation.x = Math.PI / 2;
  turretBarrelHole2.material = new StandardMaterial('texture1', scene);
  turretBarrelHole2.material.diffuseColor = new Color3(0, 0, 0);

  let turretBarrier = Mesh.CreateSphere("sphere", 8, 9, scene);
  turretBarrier.position.y = 3;
  turretBarrier.position.z = 1.75;
  turretBarrier.material = new StandardMaterial('texture1', scene);
  turretBarrier.material.alpha = 0;

  let turret = Mesh.MergeMeshes([turretBase, turretTower, turretBarrel1, turretBarrel2, turretBarrelRim1, turretBarrelRim2, turretBarrelBackRim1, turretBarrelBackRim2, turretBarrelHole1, turretBarrelHole2, turretBarrier], true, true, undefined, false, true);
  turret.position.x = x;
  turret.position.z = z;
  turret.physicsImpostor = new PhysicsImpostor(turretBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  turret.checkCollisions = true;
  turret.name = "turretOb11";

  let power1Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power1Shard1.position.y = 6;
  power1Shard1.material = new StandardMaterial('texture1', scene);
  power1Shard1.material.diffuseTexture = returnCrystalTexture("gem_red", scene);
  power1Shard1.material.diffuseTexture.uScale = 3;
  power1Shard1.material.diffuseTexture.vScale = 3;

  let power1Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power1Shard2.position.y = 2;
  power1Shard2.material = new StandardMaterial('texture1', scene);
  power1Shard2.material.diffuseTexture = returnCrystalTexture("gem_red", scene);

  let powerCrystal1Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  powerCrystal1Barrier.position.y = 5;
  powerCrystal1Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal1Barrier.material.alpha = 0;

  let powerCrystal1 = Mesh.MergeMeshes([power1Shard1, power1Shard2, powerCrystal1Barrier], true, true, undefined, false, true);
  powerCrystal1.position.x = x - 20;
  powerCrystal1.position.z = z + 20;
  powerCrystal1.physicsImpostor = new PhysicsImpostor(powerCrystal1Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal1.checkCollisions = true;
  powerCrystal1.name = "powerCrystal1Ob11";

  let power2Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power2Shard1.position.y = 6;
  power2Shard1.material = new StandardMaterial('texture1', scene);
  power2Shard1.material.diffuseTexture = returnCrystalTexture("gem_red", scene);
  power2Shard1.material.diffuseTexture.uScale = 3;
  power2Shard1.material.diffuseTexture.vScale = 3;

  let power2Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power2Shard2.position.y = 2;
  power2Shard2.material = new StandardMaterial('texture1', scene);
  power2Shard2.material.diffuseTexture = returnCrystalTexture("gem_red", scene);

  let powerCrystal2Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  powerCrystal2Barrier.position.y = 5;
  powerCrystal2Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal2Barrier.material.alpha = 0;

  let powerCrystal2 = Mesh.MergeMeshes([power2Shard1, power2Shard2, powerCrystal2Barrier], true, true, undefined, false, true);
  powerCrystal2.position.x = x - 20;
  powerCrystal2.position.z = z - 20;
  powerCrystal2.physicsImpostor = new PhysicsImpostor(powerCrystal2Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal2.checkCollisions = true;
  powerCrystal2.name = "powerCrystal2Ob11";

  let power3Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power3Shard1.position.y = 6;
  power3Shard1.material = new StandardMaterial('texture1', scene);
  power3Shard1.material.diffuseTexture = returnCrystalTexture("gem_red", scene);
  power3Shard1.material.diffuseTexture.uScale = 3;
  power3Shard1.material.diffuseTexture.vScale = 3;

  let power3Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power3Shard2.position.y = 2;
  power3Shard2.material = new StandardMaterial('texture1', scene);
  power3Shard2.material.diffuseTexture = returnCrystalTexture("gem_red", scene);

  let powerCrystal3Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  powerCrystal3Barrier.position.y = 5;
  powerCrystal3Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal3Barrier.material.alpha = 0;

  let powerCrystal3 = Mesh.MergeMeshes([power3Shard1, power3Shard2, powerCrystal3Barrier], true, true, undefined, false, true);
  powerCrystal3.position.x = x + 20;
  powerCrystal3.position.z = z - 20;
  powerCrystal3.physicsImpostor = new PhysicsImpostor(powerCrystal3Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal3.checkCollisions = true;
  powerCrystal3.name = "powerCrystal3Ob11";

  let power4Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power4Shard1.position.y = 6;
  power4Shard1.material = new StandardMaterial('texture1', scene);
  power4Shard1.material.diffuseTexture = returnCrystalTexture("gem_red", scene);
  power4Shard1.material.diffuseTexture.uScale = 3;
  power4Shard1.material.diffuseTexture.vScale = 3;

  let power4Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power4Shard2.position.y = 2;
  power4Shard2.material = new StandardMaterial('texture1', scene);
  power4Shard2.material.diffuseTexture = returnCrystalTexture("gem_red", scene);

  let powerCrystal4Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  powerCrystal4Barrier.position.y = 5;
  powerCrystal4Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal4Barrier.material.alpha = 0;

  let powerCrystal4 = Mesh.MergeMeshes([power4Shard1, power4Shard2, powerCrystal4Barrier], true, true, undefined, false, true);
  powerCrystal4.position.x = x + 20;
  powerCrystal4.position.z = z + 20;
  powerCrystal4.physicsImpostor = new PhysicsImpostor(powerCrystal4Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal4.checkCollisions = true;
  powerCrystal4.name = "powerCrystal4Ob11";

  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    powerCrystal1.rotate(axis, angle, 1);
    powerCrystal2.rotate(axis, angle, 1);
    powerCrystal3.rotate(axis, angle, 1);
    powerCrystal4.rotate(axis, angle, 1);
  });

  let machine1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
  machine1.position.y = 0.25;
  machine1.position.x = x - 20;
  machine1.position.z = z + 20;
  machine1.material = new StandardMaterial('texture1', scene);
  machine1.material.diffuseTexture = returnMetalTexture("iron", scene);

  let machine2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
  machine2.position.y = 0.25;
  machine2.position.x = x - 20;
  machine2.position.z = z - 20;
  machine2.material = new StandardMaterial('texture1', scene);
  machine2.material.diffuseTexture = returnMetalTexture("iron", scene);

  let machine3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
  machine3.position.y = 0.25;
  machine3.position.x = x + 20;
  machine3.position.z = z - 20;
  machine3.material = new StandardMaterial('texture1', scene);
  machine3.material.diffuseTexture = returnMetalTexture("iron", scene);

  let machine4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
  machine4.position.y = 0.25;
  machine4.position.x = x + 20;
  machine4.position.z = z + 20;
  machine4.material = new StandardMaterial('texture1', scene);
  machine4.material.diffuseTexture = returnMetalTexture("iron", scene);

  let wire1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 55, tessellation: 8}, scene);
  wire1.position.y = 0.05;
  wire1.position.x = x;
  wire1.position.z = z;
  wire1.rotation.x = Math.PI / 2;
  wire1.rotation.y = 0.785;
  wire1.material = new StandardMaterial('texture1', scene);
  wire1.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 55, tessellation: 8}, scene);
  wire2.position.y = 0.05;
  wire2.position.x = x;
  wire2.position.z = z;
  wire2.rotation.z = Math.PI / 2;
  wire2.rotation.y = 0.785;
  wire2.material = new StandardMaterial('texture1', scene);
  wire2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let turretBottom = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 2}, scene);
  turretBottom.position.y = 0.5;
  turretBottom.position.x = x;
  turretBottom.position.z = z;
  turretBottom.material = new StandardMaterial('texture1', scene);
  turretBottom.material.diffuseTexture = returnMetalTexture("iron_rustydark", scene);
  turretBottom.material.diffuseTexture.uScale = 4;
  turretBottom.material.diffuseTexture.vScale = 4;
}

export {dodgeTurret};
