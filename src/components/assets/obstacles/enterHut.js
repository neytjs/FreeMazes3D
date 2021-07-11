import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {Sound} from "@babylonjs/core/Audio";
import {generateSpear} from "../objects/generateSpear.js";
import {arrayShuffler} from "../../utilities/shuffler.js";

function enterHut(x, z, scene, global_objects, item_id, camera) {
// generate the spear
  generateSpear("item", "hut", scene, x, z);
  // declare and shuffle the colors
    let power_colors = [
      new Color3(0.23, 0.83, 0.25),
      new Color3(1, 1, 0),
      new Color3(1, 0, 0)
    ];
    power_colors = arrayShuffler(power_colors);
    let color1 = power_colors[0];
    let color2 = power_colors[1];
    let color3 = power_colors[2];

    let buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
    buttonHolder1.position.y = 1.5;
    buttonHolder1.position.x = x;
    buttonHolder1.position.z = z;
    buttonHolder1.material = new StandardMaterial('texture1', scene);
    buttonHolder1.material.diffuseColor = new Color3(0.37, 0.32, 0.32);
    buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    buttonHolder1.checkCollisions = true;

    let buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
    buttonBarrier1.position.y = 5;
    buttonBarrier1.position.x = x;
    buttonBarrier1.position.z = z;
    buttonBarrier1.material = new StandardMaterial('texture1', scene);
    buttonBarrier1.material.alpha = 0;
    buttonBarrier1.name = "button1p7a";

    let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
    pushButton1.position.y = 3.25;
    pushButton1.position.x = x;
    pushButton1.position.z = z;
    pushButton1.material = new StandardMaterial('texture1', scene);
    pushButton1.material.diffuseColor = new Color3(0.64, 0.11, 0.11);
    pushButton1.name = "pushButton1p7a";
    global_objects.push({id: buttonBarrier1.uniqueId, obstacle7_id: item_id, type: "structure", name: ""}); // just for obstacle7_id

// hut
    let wall1 = MeshBuilder.CreateBox("box", {width: 10, height: 10, depth: 1}, scene);
    wall1.position.y = 5;
    wall1.position.x = x;
    wall1.position.z = z + 5;
    wall1.material = new StandardMaterial('texture1', scene);
    wall1.material.diffuseColor = new Color3(0.53, 0.43, 0.24);
    wall1.physicsImpostor = new PhysicsImpostor(wall1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    wall1.checkCollisions = true;

    let wall2 = MeshBuilder.CreateBox("box", {width: 1, height: 10, depth: 10}, scene);
    wall2.position.y = 5;
    wall2.position.x = x - 5;
    wall2.position.z = z + 0.5;
    wall2.material = new StandardMaterial('texture1', scene);
    wall2.material.diffuseColor = new Color3(0.53, 0.43, 0.24);
    wall2.physicsImpostor = new PhysicsImpostor(wall2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    wall2.checkCollisions = true;

    let wall3 = MeshBuilder.CreateBox("box", {width: 1, height: 10, depth: 10}, scene);
    wall3.position.y = 5;
    wall3.position.x = x + 5;
    wall3.position.z = z + 0.5;
    wall3.material = new StandardMaterial('texture1', scene);
    wall3.material.diffuseColor = new Color3(0.53, 0.43, 0.24);
    wall3.physicsImpostor = new PhysicsImpostor(wall3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    wall3.checkCollisions = true;

    let wall4 = MeshBuilder.CreateBox("box", {width: 3, height: 10, depth: 1}, scene);
    wall4.position.y = 5;
    wall4.position.x = x - 4;
    wall4.position.z = z - 5;
    wall4.material = new StandardMaterial('texture1', scene);
    wall4.material.diffuseColor = new Color3(0.53, 0.43, 0.24);
    wall4.physicsImpostor = new PhysicsImpostor(wall4, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    wall4.checkCollisions = true;

    let wall5 = MeshBuilder.CreateBox("box", {width: 3, height: 10, depth: 1}, scene);
    wall5.position.y = 5;
    wall5.position.x = x + 4;
    wall5.position.z = z - 5;
    wall5.material = new StandardMaterial('texture1', scene);
    wall5.material.diffuseColor = new Color3(0.53, 0.43, 0.24);
    wall5.physicsImpostor = new PhysicsImpostor(wall5, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    wall5.checkCollisions = true;

    var wall6 = MeshBuilder.CreateBox("box", {width: 5, height: 2, depth: 1}, scene);
    wall6.position.y = 9;
    wall6.position.x = x;
    wall6.position.z = z - 5;
    wall6.material = new StandardMaterial('texture1', scene);
    wall6.material.diffuseColor = new Color3(0.53, 0.43, 0.24);
    wall6.physicsImpostor = new PhysicsImpostor(wall6, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    wall6.checkCollisions = true;

    let roof1 = MeshBuilder.CreateBox("box", {width: 12, height: 1, depth: 12}, scene);
    roof1.position.y = 10;
    roof1.position.x = x;
    roof1.position.z = z;
    roof1.material = new StandardMaterial('texture1', scene);
    roof1.material.diffuseColor = new Color3(0.39, 0.3, 0.1);
    roof1.physicsImpostor = new PhysicsImpostor(roof1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    roof1.checkCollisions = true;

    let part1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
    part1.position.y = 0.25;
    part1.position.x = x - 1.5;
    part1.position.z = z - 5;
    part1.material = new StandardMaterial('texture1', scene);
    part1.material.diffuseColor = new Color3(0, 0, 0);

    let part2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
    part2.position.y = 0.25;
    part2.position.x = x;
    part2.position.z = z - 5;
    part2.material = new StandardMaterial('texture1', scene);
    part2.material.diffuseColor = new Color3(0, 0, 0);

    let part3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
    part3.position.y = 0.25;
    part3.position.x = x + 1.5;
    part3.position.z = z - 5;
    part3.material = new StandardMaterial('texture1', scene);
    part3.material.diffuseColor = new Color3(0, 0, 0);

    let part4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
    part4.position.y = 7.75;
    part4.position.x = x - 1.5;
    part4.position.z = z - 5;
    part4.material = new StandardMaterial('texture1', scene);
    part4.material.diffuseColor = new Color3(0, 0, 0);

    let part5 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
    part5.position.y = 7.75;
    part5.position.x = x;
    part5.position.z = z - 5;
    part5.material = new StandardMaterial('texture1', scene);
    part5.material.diffuseColor = new Color3(0, 0, 0);

    let part6 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
    part6.position.y = 7.75;
    part6.position.x = x + 1.5;
    part6.position.z = z - 5;
    part6.material = new StandardMaterial('texture1', scene);
    part6.material.diffuseColor = new Color3(0, 0, 0);

    let power1 = MeshBuilder.CreateCylinder("power1", {diameter: 1, height: 7, tessellation: 8}, scene);
    power1.position.y = 4;
    power1.position.x = x - 1.5;
    power1.position.z = z - 5;
    power1.material = new StandardMaterial('texture1', scene);
    power1.material.diffuseColor = color1;
    power1.material.alpha = 0.5;

    let power2 = MeshBuilder.CreateCylinder("power2", {diameter: 1, height: 7, tessellation: 8}, scene);
    power2.position.y = 4;
    power2.position.x = x;
    power2.position.z = z - 5;
    power2.material = new StandardMaterial('texture1', scene);
    power2.material.diffuseColor = color2;
    power2.material.alpha = 0.5;

    let power3 = MeshBuilder.CreateCylinder("power3", {diameter: 1, height: 7, tessellation: 8}, scene);
    power3.position.y = 4;
    power3.position.x = x + 1.5;
    power3.position.z = z - 5;
    power3.material = new StandardMaterial('texture1', scene);
    power3.material.diffuseColor = color3;
    power3.material.alpha = 0.5;

    let hutBarrier = MeshBuilder.CreateBox("hutBarrier", {width: 5, height: 8, depth: 1}, scene);
    hutBarrier.position.y = 4;
    hutBarrier.position.x = x;
    hutBarrier.position.z = z - 5;
    hutBarrier.material = new StandardMaterial('texture1', scene);
    hutBarrier.material.diffuseColor = new Color3(0, 0, 0);
    hutBarrier.physicsImpostor = new PhysicsImpostor(hutBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    hutBarrier.checkCollisions = true;
    hutBarrier.material.alpha = 0;

    let hutBarrierSound = new Sound("hutBarrierSound", "./sound/Sci-Fi_Drone.wav", scene, null, { loop: true, autoplay: true, volume: 0.5, maxDistance: 50 });
    hutBarrierSound.attachToMesh(hutBarrier);

    let power1Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
    power1Shard1.position.y = 6;
    power1Shard1.material = new StandardMaterial('texture1', scene);
    power1Shard1.material.diffuseColor = color1;

    let power1Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
    power1Shard2.position.y = 2;
    power1Shard2.material = new StandardMaterial('texture1', scene);
    power1Shard2.material.diffuseColor = color1;

    let powerCrystal1Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
    powerCrystal1Barrier.position.y = 5;
    powerCrystal1Barrier.material = new StandardMaterial('texture1', scene);
    powerCrystal1Barrier.material.alpha = 0;

    let powerCrystal1 = Mesh.MergeMeshes([power1Shard1, power1Shard2, powerCrystal1Barrier], true, true, undefined, false, true);
    powerCrystal1.position.x = x - 20;
    powerCrystal1.position.z = z + 20;
    powerCrystal1.physicsImpostor = new PhysicsImpostor(powerCrystal1Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    powerCrystal1.checkCollisions = true;
    powerCrystal1.name = "power1crystal";

    let power2Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
    power2Shard1.position.y = 6;
    power2Shard1.material = new StandardMaterial('texture1', scene);
    power2Shard1.material.diffuseColor = color2;

    let power2Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
    power2Shard2.position.y = 2;
    power2Shard2.material = new StandardMaterial('texture1', scene);
    power2Shard2.material.diffuseColor = color2;

    let powerCrystal2Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
    powerCrystal2Barrier.position.y = 5;
    powerCrystal2Barrier.material = new StandardMaterial('texture1', scene);
    powerCrystal2Barrier.material.alpha = 0;

    let powerCrystal2 = Mesh.MergeMeshes([power2Shard1, power2Shard2, powerCrystal2Barrier], true, true, undefined, false, true);
    powerCrystal2.position.x = x - 20;
    powerCrystal2.position.z = z - 20;
    powerCrystal2.physicsImpostor = new PhysicsImpostor(powerCrystal2Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    powerCrystal2.checkCollisions = true;
    powerCrystal2.name = "power2crystal";

    let power3Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
    power3Shard1.position.y = 6;
    power3Shard1.material = new StandardMaterial('texture1', scene);
    power3Shard1.material.diffuseColor = color3;

    let power3Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
    power3Shard2.position.y = 2;
    power3Shard2.material = new StandardMaterial('texture1', scene);
    power3Shard2.material.diffuseColor = color3;

    let powerCrystal3Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
    powerCrystal3Barrier.position.y = 5;
    powerCrystal3Barrier.material = new StandardMaterial('texture1', scene);
    powerCrystal3Barrier.material.alpha = 0;

    let powerCrystal3 = Mesh.MergeMeshes([power3Shard1, power3Shard2, powerCrystal3Barrier], true, true, undefined, false, true);
    powerCrystal3.position.x = x + 20;
    powerCrystal3.position.z = z - 20;
    powerCrystal3.physicsImpostor = new PhysicsImpostor(powerCrystal3Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    powerCrystal3.checkCollisions = true;
    powerCrystal3.name = "power3crystal";

    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
      powerCrystal1.rotate(axis, angle, 1);
      powerCrystal2.rotate(axis, angle, 1);
      powerCrystal3.rotate(axis, angle, 1);
    });

    let machine1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
    machine1.position.y = 0.25;
    machine1.position.x = x - 20;
    machine1.position.z = z + 20;
    machine1.material = new StandardMaterial('texture1', scene);
    machine1.material.diffuseColor = new Color3(0.19, 0.19, 0.19);

    let machine2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
    machine2.position.y = 0.25;
    machine2.position.x = x - 20;
    machine2.position.z = z - 20;
    machine2.material = new StandardMaterial('texture1', scene);
    machine2.material.diffuseColor = new Color3(0.19, 0.19, 0.19);

    let machine3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 8}, scene);
    machine3.position.y = 0.25;
    machine3.position.x = x + 20;
    machine3.position.z = z - 20;
    machine3.material = new StandardMaterial('texture1', scene);
    machine3.material.diffuseColor = new Color3(0.19, 0.19, 0.19);

    let machine4 = MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 2}, scene);
    machine4.position.y = 0.5;
    machine4.position.x = x + 20;
    machine4.position.z = z - 3;
    machine4.material = new StandardMaterial('texture1', scene);
    machine4.material.diffuseColor = new Color3(0.33, 0.32, 0.32);

    let machine5 = MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 2}, scene);
    machine5.position.y = 0.5;
    machine5.position.x = x + 6;
    machine5.position.z = z - 3;
    machine5.material = new StandardMaterial('texture1', scene);
    machine5.material.diffuseColor = new Color3(0.33, 0.32, 0.32);

    let wire1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 37, tessellation: 8}, scene);
    wire1.position.y = 0.05;
    wire1.position.x = x - 20;
    wire1.position.z = z;
    wire1.rotation.x = Math.PI / 2;
    wire1.material = new StandardMaterial('texture1', scene);
    wire1.material.diffuseColor = new Color3(0, 0, 0);

    let wire2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 37, tessellation: 8}, scene);
    wire2.position.y = 0.05;
    wire2.position.x = x;
    wire2.position.z = z - 20;
    wire2.rotation.z = Math.PI / 2;
    wire2.material = new StandardMaterial('texture1', scene);
    wire2.material.diffuseColor = new Color3(0, 0, 0);

    let wire3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 15, tessellation: 8}, scene);
    wire3.position.y = 0.05;
    wire3.position.x = x + 20;
    wire3.position.z = z - 11;
    wire3.rotation.x = Math.PI / 2;
    wire3.material = new StandardMaterial('texture1', scene);
    wire3.material.diffuseColor = new Color3(0, 0, 0);

    let wire4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 13, tessellation: 8}, scene);
    wire4.position.y = 0.05;
    wire4.position.x = x + 13;
    wire4.position.z = z - 3;
    wire4.rotation.z = Math.PI / 2;
    wire4.material = new StandardMaterial('texture1', scene);
    wire4.material.diffuseColor = new Color3(0, 0, 0);
}

export {enterHut};
