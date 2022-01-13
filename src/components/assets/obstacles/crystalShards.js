import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {ParticleSystem} from "@babylonjs/core/Particles";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {generateCarryingCrystal} from "../objects/generateCarryingCrystal.js";
import {returnMetalTexture, returnCrystalTexture, returnLiquidTexture} from "../textures.js";

function crystalShards(x, z, scene, global_objects, item_id, camera) {
  generateCarryingCrystal(scene, "carryingCrystalOb19");

  let crystal_colors = [
    {color_name: "red", color_texture: "gem_red"},
    {color_name: "orange", color_texture: "gem_orange"},
    {color_name: "yellow", color_texture: "gem_yellow"},
    {color_name: "green", color_texture: "gem_green"}
  ];
  crystal_colors = arrayShuffler(crystal_colors);

  let structure_textures = [
    {main: "gem_pink", alt: "gem_hotpink"},
    {main: "gem_hotpink", alt: "gem_pink"},
    {main: "gem_bluepurple", alt: "gem_darkpurple"},
    {main: "gem_darkpurple", alt: "gem_bluepurple"}
  ];
  structure_textures = arrayShuffler(structure_textures);

  function generatePuzzleOrder() {
    let order1 = [
      0, 1,
      0, 1,
      1, 0,
      1, 0
    ];
    let order2 = [
      1, 0,
      1, 0,
      0, 1,
      0, 1
    ];
    let order3 = [
      0, 0,
      1, 1,
      1, 1,
      0, 0
    ];
    let order4 = [
      1, 1,
      0, 0,
      0, 0,
      1, 1
    ];
    let order5 = [
      1, 0,
      0, 1,
      0, 1,
      1, 0
    ];
    let order6 = [
      0, 1,
      1, 0,
      1, 0,
      0, 1
    ];
    let puzzle_orders = [order1, order2, order3, order4, order5, order6];
    puzzle_orders = arrayShuffler(puzzle_orders);
    puzzle_orders = puzzle_orders[0];
    let colors = ["red", "orange", "yellow", "green"];
    colors = arrayShuffler(colors);
    let empties = ["empty1", "empty2", "empty3", "empty4"];
    let c_counter = 0;
    let e_counter = 0;
    for (let i = 0, length = 8; i < length; i++) {
      if (puzzle_orders[i] === 1) {
        puzzle_orders[i] = colors[c_counter];
        c_counter = c_counter + 1;
      }
      if (puzzle_orders[i] === 0) {
        puzzle_orders[i] = empties[e_counter];
        e_counter = e_counter + 1;
      }
    }
    return puzzle_orders;
  }

  let puzzle_orders = generatePuzzleOrder();

  let teleporterVisualPad = MeshBuilder.CreateBox("box", {width: 5, height: 0.2, depth: 5}, scene);
  teleporterVisualPad.position.y = 0.1;
  teleporterVisualPad.position.x = x;
  teleporterVisualPad.position.z = z;
  teleporterVisualPad.material = new StandardMaterial('texture1', scene);
  teleporterVisualPad.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let teleportPad1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 4, tessellation: 8}, scene);
  teleportPad1.position.y = 2;
  teleportPad1.position.x = x;
  teleportPad1.position.z = z;
  teleportPad1.material = new StandardMaterial('texture1', scene);
  teleportPad1.material.alpha = 0;
  teleportPad1.physicsImpostor = new PhysicsImpostor(teleportPad1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  teleportPad1.checkCollisions = true;
  teleportPad1.name = "teleporterOb19";
  global_objects.push({id: teleportPad1.uniqueId, type: "teleporter19", exit_pos: {x: 20, z: -1, y: -246}});

  let particleSystem = new ParticleSystem("particles", 3000, scene);
  particleSystem.particleTexture = new Texture("./imgs/circle.png", scene);
  particleSystem.emitter = teleportPad1;

  particleSystem.addColorGradient(0, new Color4(0.01, 0.04, 0.45));
  particleSystem.addColorGradient(1, new Color4(0.33, 0.04, 0.33));

  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.5;

  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;

  particleSystem.emitRate = 3000;

  particleSystem.createSphereEmitter(2);

  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 3;
  particleSystem.updateSpeed = 0.005;

  particleSystem.start();

  let floatingPlatformFloor = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 50}, scene);
  floatingPlatformFloor.position.y = -300.5;
  floatingPlatformFloor.position.x = 0;
  floatingPlatformFloor.position.z = 0;
  floatingPlatformFloor.material = new StandardMaterial('texture1', scene);
  floatingPlatformFloor.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformFloor.material.diffuseTexture.uScale = 5;
  floatingPlatformFloor.material.diffuseTexture.vScale = 5;
  floatingPlatformFloor.physicsImpostor = new PhysicsImpostor(floatingPlatformFloor, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformFloor.checkCollisions = true;
  global_objects.push({id: floatingPlatformFloor.uniqueId, obstacle19_id: item_id, type: "structure", name: ""});

  let floatingPlatformCeiling = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 50, wrap: true}, scene);
  floatingPlatformCeiling.position.y = -200.5;
  floatingPlatformCeiling.position.x = 0;
  floatingPlatformCeiling.position.z = 0;
  floatingPlatformCeiling.material = new StandardMaterial('texture1', scene);
  floatingPlatformCeiling.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformCeiling.material.diffuseTexture.uScale = 5;
  floatingPlatformCeiling.material.diffuseTexture.vScale = 5;
  floatingPlatformCeiling.physicsImpostor = new PhysicsImpostor(floatingPlatformCeiling, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformCeiling.checkCollisions = true;

  let floatingPlatformBarrier = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 50}, scene);
  floatingPlatformBarrier.position.y = -201.5;
  floatingPlatformBarrier.position.x = 0;
  floatingPlatformBarrier.position.z = 0;
  floatingPlatformBarrier.material = new StandardMaterial('texture1', scene);
  floatingPlatformBarrier.material.alpha = 0;
  floatingPlatformBarrier.physicsImpostor = new PhysicsImpostor(floatingPlatformBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformBarrier.checkCollisions = true;

  let floatingPlatformSide1 = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide1.position.y = -225.5;
  floatingPlatformSide1.position.x = 0;
  floatingPlatformSide1.position.z = -30;
  floatingPlatformSide1.rotation.x = 1.9625;
  floatingPlatformSide1.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide1.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformSide1.material.diffuseTexture.uScale = 5;
  floatingPlatformSide1.material.diffuseTexture.vScale = 6;
  floatingPlatformSide1.physicsImpostor = new PhysicsImpostor(floatingPlatformSide1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide1.checkCollisions = true;

  let floatingPlatformSide2 = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide2.position.y = -225.5;
  floatingPlatformSide2.position.x = 0;
  floatingPlatformSide2.position.z = 30;
  floatingPlatformSide2.rotation.x = -1.9625;
  floatingPlatformSide2.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide2.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformSide2.material.diffuseTexture.uScale = 5;
  floatingPlatformSide2.material.diffuseTexture.vScale = 6;
  floatingPlatformSide2.physicsImpostor = new PhysicsImpostor(floatingPlatformSide2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide2.checkCollisions = true;

  let floatingPlatformSide3 = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide3.position.y = -225.5;
  floatingPlatformSide3.position.x = -30;
  floatingPlatformSide3.position.z = 0;
  floatingPlatformSide3.rotation.x = 1.9625;
  floatingPlatformSide3.rotation.y = 1.57;
  floatingPlatformSide3.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide3.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformSide3.material.diffuseTexture.uScale = 5;
  floatingPlatformSide3.material.diffuseTexture.vScale = 6;
  floatingPlatformSide3.physicsImpostor = new PhysicsImpostor(floatingPlatformSide3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide3.checkCollisions = true;

  let floatingPlatformSide4 = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide4.position.y = -225.5;
  floatingPlatformSide4.position.x = 30;
  floatingPlatformSide4.position.z = 0;
  floatingPlatformSide4.rotation.x = -1.9625;
  floatingPlatformSide4.rotation.y = 1.57;
  floatingPlatformSide4.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide4.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformSide4.material.diffuseTexture.uScale = 5;
  floatingPlatformSide4.material.diffuseTexture.vScale = 6;
  floatingPlatformSide4.physicsImpostor = new PhysicsImpostor(floatingPlatformSide4, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide4.checkCollisions = true;

  let floatingPlatformSide5 = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide5.position.y = -225.5;
  floatingPlatformSide5.position.x = 25;
  floatingPlatformSide5.position.z = 25;
  floatingPlatformSide5.rotation.x = -1.9625;
  floatingPlatformSide5.rotation.y = 0.785;
  floatingPlatformSide5.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide5.material.diffuseTexture = returnCrystalTexture(structure_textures[0].alt, scene);
  floatingPlatformSide5.material.diffuseTexture.uScale = 3;
  floatingPlatformSide5.material.diffuseTexture.vScale = 6;
  floatingPlatformSide5.physicsImpostor = new PhysicsImpostor(floatingPlatformSide5, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide5.checkCollisions = true;

  let floatingPlatformSide6 = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide6.position.y = -225.5;
  floatingPlatformSide6.position.x = -25;
  floatingPlatformSide6.position.z = -25;
  floatingPlatformSide6.rotation.x = 1.9625;
  floatingPlatformSide6.rotation.y = 0.785;
  floatingPlatformSide6.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide6.material.diffuseTexture = returnCrystalTexture(structure_textures[0].alt, scene);
  floatingPlatformSide6.material.diffuseTexture.uScale = 3;
  floatingPlatformSide6.material.diffuseTexture.vScale = 6;
  floatingPlatformSide6.physicsImpostor = new PhysicsImpostor(floatingPlatformSide6, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide6.checkCollisions = true;

  let floatingPlatformSide7 = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide7.position.y = -225.5;
  floatingPlatformSide7.position.x = -25;
  floatingPlatformSide7.position.z = 25;
  floatingPlatformSide7.rotation.x = -1.9625;
  floatingPlatformSide7.rotation.y = -0.785;
  floatingPlatformSide7.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide7.material.diffuseTexture = returnCrystalTexture(structure_textures[0].alt, scene);
  floatingPlatformSide7.material.diffuseTexture.uScale = 3;
  floatingPlatformSide7.material.diffuseTexture.vScale = 6;
  floatingPlatformSide7.physicsImpostor = new PhysicsImpostor(floatingPlatformSide7, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide7.checkCollisions = true;

  let floatingPlatformSide8 = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide8.position.y = -225.5;
  floatingPlatformSide8.position.x = 25;
  floatingPlatformSide8.position.z = -25;
  floatingPlatformSide8.rotation.x = 1.9625;
  floatingPlatformSide8.rotation.y = -0.785;
  floatingPlatformSide8.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide8.material.diffuseTexture = returnCrystalTexture(structure_textures[0].alt, scene);
  floatingPlatformSide8.material.diffuseTexture.uScale = 3;
  floatingPlatformSide8.material.diffuseTexture.vScale = 6;
  floatingPlatformSide8.physicsImpostor = new PhysicsImpostor(floatingPlatformSide8, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide8.checkCollisions = true;

  let floatingPlatformSide9 = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide9.position.y = -275.5;
  floatingPlatformSide9.position.x = 0;
  floatingPlatformSide9.position.z = -30;
  floatingPlatformSide9.rotation.x = -1.9625;
  floatingPlatformSide9.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide9.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformSide9.material.diffuseTexture.uScale = 5;
  floatingPlatformSide9.material.diffuseTexture.vScale = 6;
  floatingPlatformSide9.physicsImpostor = new PhysicsImpostor(floatingPlatformSide9, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide9.checkCollisions = true;

  let floatingPlatformSide10 = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide10.position.y = -275.5;
  floatingPlatformSide10.position.x = 0;
  floatingPlatformSide10.position.z = 30;
  floatingPlatformSide10.rotation.x = 1.9625;
  floatingPlatformSide10.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide10.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformSide10.material.diffuseTexture.uScale = 5;
  floatingPlatformSide10.material.diffuseTexture.vScale = 6;
  floatingPlatformSide10.physicsImpostor = new PhysicsImpostor(floatingPlatformSide10, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide10.checkCollisions = true;

  let floatingPlatformSide11 = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide11.position.y = -275.5;
  floatingPlatformSide11.position.x = -30;
  floatingPlatformSide11.position.z = 0;
  floatingPlatformSide11.rotation.x = -1.9625;
  floatingPlatformSide11.rotation.y = 1.57;
  floatingPlatformSide11.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide11.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformSide11.material.diffuseTexture.uScale = 5;
  floatingPlatformSide11.material.diffuseTexture.vScale = 6;
  floatingPlatformSide11.physicsImpostor = new PhysicsImpostor(floatingPlatformSide11, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide11.checkCollisions = true;

  let floatingPlatformSide12 = MeshBuilder.CreateBox("box", {width: 50, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide12.position.y = -275.5;
  floatingPlatformSide12.position.x = 30;
  floatingPlatformSide12.position.z = 0;
  floatingPlatformSide12.rotation.x = 1.9625;
  floatingPlatformSide12.rotation.y = 1.57;
  floatingPlatformSide12.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide12.material.diffuseTexture = returnCrystalTexture(structure_textures[0].main, scene);
  floatingPlatformSide12.material.diffuseTexture.uScale = 5;
  floatingPlatformSide12.material.diffuseTexture.vScale = 6;
  floatingPlatformSide12.physicsImpostor = new PhysicsImpostor(floatingPlatformSide12, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide12.checkCollisions = true;

  let floatingPlatformSide13 = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide13.position.y = -275.5;
  floatingPlatformSide13.position.x = 25;
  floatingPlatformSide13.position.z = 25;
  floatingPlatformSide13.rotation.x = 1.9625;
  floatingPlatformSide13.rotation.y = 0.785;
  floatingPlatformSide13.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide13.material.diffuseTexture = returnCrystalTexture(structure_textures[0].alt, scene);
  floatingPlatformSide13.material.diffuseTexture.uScale = 3;
  floatingPlatformSide13.material.diffuseTexture.vScale = 6;
  floatingPlatformSide13.physicsImpostor = new PhysicsImpostor(floatingPlatformSide13, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide13.checkCollisions = true;

  let floatingPlatformSide14 = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide14.position.y = -275.5;
  floatingPlatformSide14.position.x = -25;
  floatingPlatformSide14.position.z = -25;
  floatingPlatformSide14.rotation.x = -1.9625;
  floatingPlatformSide14.rotation.y = 0.785;
  floatingPlatformSide14.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide14.material.diffuseTexture = returnCrystalTexture(structure_textures[0].alt, scene);
  floatingPlatformSide14.material.diffuseTexture.uScale = 3;
  floatingPlatformSide14.material.diffuseTexture.vScale = 6;
  floatingPlatformSide14.physicsImpostor = new PhysicsImpostor(floatingPlatformSide14, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide14.checkCollisions = true;

  let floatingPlatformSide15 = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide15.position.y = -275.5;
  floatingPlatformSide15.position.x = -25;
  floatingPlatformSide15.position.z = 25;
  floatingPlatformSide15.rotation.x = 1.9625;
  floatingPlatformSide15.rotation.y = -0.785;
  floatingPlatformSide15.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide15.material.diffuseTexture = returnCrystalTexture(structure_textures[0].alt, scene);
  floatingPlatformSide15.material.diffuseTexture.uScale = 3;
  floatingPlatformSide15.material.diffuseTexture.vScale = 6;
  floatingPlatformSide15.physicsImpostor = new PhysicsImpostor(floatingPlatformSide15, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide15.checkCollisions = true;

  let floatingPlatformSide16 = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 60, wrap: true}, scene);
  floatingPlatformSide16.position.y = -275.5;
  floatingPlatformSide16.position.x = 25;
  floatingPlatformSide16.position.z = -25;
  floatingPlatformSide16.rotation.x = -1.9625;
  floatingPlatformSide16.rotation.y = -0.785;
  floatingPlatformSide16.material = new StandardMaterial('texture1', scene);
  floatingPlatformSide16.material.diffuseTexture = returnCrystalTexture(structure_textures[0].alt, scene);
  floatingPlatformSide16.material.diffuseTexture.uScale = 3;
  floatingPlatformSide16.material.diffuseTexture.vScale = 6;
  floatingPlatformSide16.physicsImpostor = new PhysicsImpostor(floatingPlatformSide16, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformSide16.checkCollisions = true;

  let exitTeleporter1 = Mesh.CreateSphere("barrier", 3, 8, scene)
  exitTeleporter1.position.y = -248;
  exitTeleporter1.position.x = 0;
  exitTeleporter1.position.z = 0;
  exitTeleporter1.material = new StandardMaterial('texture1', scene);
  exitTeleporter1.material.alpha = 0;
  exitTeleporter1.physicsImpostor = new PhysicsImpostor(exitTeleporter1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  exitTeleporter1.checkCollisions = true;
  exitTeleporter1.name = "exitTeleporterOb19";
  global_objects.push({id: exitTeleporter1.uniqueId, type: "teleporter19", exit_pos: {x: x, z: (z - 12), y: 4}});

  let particleSystem2 = new ParticleSystem("particles", 3000, scene);
  particleSystem2.particleTexture = new Texture("./imgs/circle.png", scene);
  particleSystem2.emitter = exitTeleporter1;

  particleSystem2.addColorGradient(0, new Color4(0.01, 0.04, 0.45));
  particleSystem2.addColorGradient(1, new Color4(0.33, 0.04, 0.33));

  particleSystem2.minSize = 0.1;
  particleSystem2.maxSize = 0.5;

  particleSystem2.minLifeTime = 0.3;
  particleSystem2.maxLifeTime = 1.5;

  particleSystem2.emitRate = 3000;

  particleSystem2.createSphereEmitter(2);

  particleSystem2.minEmitPower = 1;
  particleSystem2.maxEmitPower = 3;
  particleSystem2.updateSpeed = 0.005;

  particleSystem2.start();

  let power1Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power1Shard1.position.y = 6;
  power1Shard1.material = new StandardMaterial('texture1', scene);
  power1Shard1.material.diffuseTexture = returnCrystalTexture(crystal_colors[0].color_texture, scene);

  let power1Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power1Shard2.position.y = 2;
  power1Shard2.material = new StandardMaterial('texture1', scene);
  power1Shard2.material.diffuseTexture = returnCrystalTexture(crystal_colors[0].color_texture, scene);

  let powerCrystal1Barrier = Mesh.CreateSphere("barrier", 16, 8, scene);
  powerCrystal1Barrier.position.y = 5;
  powerCrystal1Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal1Barrier.material.alpha = 0;

  let powerCrystal1 = Mesh.MergeMeshes([power1Shard1, power1Shard2, powerCrystal1Barrier], true, true, undefined, false, true);
  powerCrystal1.physicsImpostor = new PhysicsImpostor(powerCrystal1Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal1.checkCollisions = true;
  powerCrystal1.name = crystal_colors[0].color_name+"_CrystalOb19";
  global_objects.push({type: "powerCrystalOb19", color_name: crystal_colors[0].color_name, color_code: crystal_colors[0].color_code});

  let power2Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power2Shard1.position.y = 6;
  power2Shard1.material = new StandardMaterial('texture1', scene);
  power2Shard1.material.diffuseTexture = returnCrystalTexture(crystal_colors[1].color_texture, scene);

  let power2Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power2Shard2.position.y = 2;
  power2Shard2.material = new StandardMaterial('texture1', scene);
  power2Shard2.material.diffuseTexture = returnCrystalTexture(crystal_colors[1].color_texture, scene);

  let powerCrystal2Barrier = Mesh.CreateSphere("barrier", 16, 8, scene);
  powerCrystal2Barrier.position.y = 5;
  powerCrystal2Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal2Barrier.material.alpha = 0;

  let powerCrystal2 = Mesh.MergeMeshes([power2Shard1, power2Shard2, powerCrystal2Barrier], true, true, undefined, false, true);
  powerCrystal2.physicsImpostor = new PhysicsImpostor(powerCrystal2Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal2.checkCollisions = true;
  powerCrystal2.name = crystal_colors[1].color_name+"_CrystalOb19";
  global_objects.push({type: "powerCrystalOb19", color_name: crystal_colors[1].color_name, color_code: crystal_colors[1].color_code});

  let power3Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power3Shard1.position.y = 6;
  power3Shard1.material = new StandardMaterial('texture1', scene);
  power3Shard1.material.diffuseTexture = returnCrystalTexture(crystal_colors[2].color_texture, scene);

  let power3Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power3Shard2.position.y = 2;
  power3Shard2.material = new StandardMaterial('texture1', scene);
  power3Shard2.material.diffuseTexture = returnCrystalTexture(crystal_colors[2].color_texture, scene);

  let powerCrystal3Barrier = Mesh.CreateSphere("barrier", 16, 8, scene);
  powerCrystal3Barrier.position.y = 5;
  powerCrystal3Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal3Barrier.material.alpha = 0;

  let powerCrystal3 = Mesh.MergeMeshes([power3Shard1, power3Shard2, powerCrystal3Barrier], true, true, undefined, false, true);
  powerCrystal3.physicsImpostor = new PhysicsImpostor(powerCrystal3Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal3.checkCollisions = true;
  powerCrystal3.name = crystal_colors[2].color_name+"_CrystalOb19";
  global_objects.push({type: "powerCrystalOb19", color_name: crystal_colors[2].color_name, color_code: crystal_colors[2].color_code});

  let power4Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  power4Shard1.position.y = 6;
  power4Shard1.material = new StandardMaterial('texture1', scene);
  power4Shard1.material.diffuseTexture = returnCrystalTexture(crystal_colors[3].color_texture, scene);

  let power4Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  power4Shard2.position.y = 2;
  power4Shard2.material = new StandardMaterial('texture1', scene);
  power4Shard2.material.diffuseTexture = returnCrystalTexture(crystal_colors[3].color_texture, scene);

  let powerCrystal4Barrier = Mesh.CreateSphere("barrier", 16, 8, scene);
  powerCrystal4Barrier.position.y = 5;
  powerCrystal4Barrier.material = new StandardMaterial('texture1', scene);
  powerCrystal4Barrier.material.alpha = 0;

  let powerCrystal4 = Mesh.MergeMeshes([power4Shard1, power4Shard2, powerCrystal4Barrier], true, true, undefined, false, true);
  powerCrystal4.physicsImpostor = new PhysicsImpostor(powerCrystal4Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  powerCrystal4.checkCollisions = true;
  powerCrystal4.name = crystal_colors[3].color_name+"_CrystalOb19";
  global_objects.push({type: "powerCrystalOb19", color_name: crystal_colors[3].color_name, color_code: crystal_colors[3].color_code});

  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    powerCrystal1.rotate(axis, angle, 1);
    powerCrystal2.rotate(axis, angle, 1);
    powerCrystal3.rotate(axis, angle, 1);
    powerCrystal4.rotate(axis, angle, 1);
  });

  let x1 = 0;
  let z1 = 0;
  let radius_s1 = 30;
  let s1pi1 = Math.PI;
  let s1pi2 = Math.PI;
  let s1height = -250;

  let x2 = 0;
  let z2 = 5;
  let y2 = -225;
  let radius_s2 = 10;
  let s2pi1 = Math.PI;
  let s2pi2 = Math.PI;

  let x3 = 0;
  let z3 = 0;
  let y3 = -275;
  let radius_s3 = 15;
  let s3pi1 = Math.PI;
  let s3pi2 = Math.PI;

  let x4 = 0;
  let z4 = 0;
  let y4 = -285;
  let radius_s4 = 15;
  let s4pi1 = Math.PI;
  let s4pi2 = Math.PI;

  scene.registerBeforeRender(function() {
    powerCrystal1.position = new Vector3((radius_s1 * Math.sin(s1pi1) + x1), s1height, (radius_s1 * Math.cos(s1pi2) + z1));
    s1pi1 = s1pi1 + 0.005;
    s1pi2 = s1pi2 - 0.015;

    powerCrystal2.position = new Vector3((radius_s2 * Math.sin(s2pi1) + x2), (radius_s2 * Math.sin(s2pi2) + y2), (radius_s2 * Math.cos(s2pi1) + z2));
    s2pi1 = s2pi1 + 0.01;
    s2pi2 = s2pi2 + 0.003;

    powerCrystal3.position = new Vector3((radius_s3 * Math.sin(s3pi1) + x3), (radius_s3 * Math.sin(s3pi2) + y3), (radius_s3 * Math.cos(s3pi1) + z3));
    s3pi1 = s3pi1 + 0.0075;
    s3pi2 = s3pi2 + 0.015;

    powerCrystal4.position = new Vector3((radius_s4 * Math.sin(s4pi1) + x4), (radius_s4 * Math.sin(s4pi2) + y4), (radius_s4 * Math.cos(s4pi1) + z4));
    s4pi1 = s4pi1 + 0.015;
    s4pi2 = s4pi2 + 0.0075;
  });

  function generatePowerDevice(x, y, z, rotate, name) {
    let powerDeviceHolder = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.5, height: 0.5, tessellation: 8}, scene);
    powerDeviceHolder.position.y = 0.25;
    powerDeviceHolder.material = new StandardMaterial('texture1', scene);
    powerDeviceHolder.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let powerDeviceBarrier = MeshBuilder.CreateBox("box", {width: 3.5, height: 10, depth: 3.5}, scene);
    powerDeviceBarrier.position.y = 5;
    powerDeviceBarrier.material = new StandardMaterial('texture1', scene);
    powerDeviceBarrier.material.alpha = 0;

    let powerDevice = Mesh.MergeMeshes([powerDeviceHolder, powerDeviceBarrier], true, true, undefined, false, true);
    powerDevice.position.y = y;
    powerDevice.position.x = x;
    powerDevice.position.z = z;
    powerDevice.rotation.x = rotate;
    powerDevice.physicsImpostor = new PhysicsImpostor(powerDeviceBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    powerDevice.checkCollisions = true;
    powerDevice.name = name;

    let color = name.slice(0, name.lastIndexOf('_'));
    if (color === "red" || color === "orange" || color === "yellow" || color === "green") {
      let beam = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.5, height: 98, tessellation: 8}, scene);
      beam.position.y = -250.5;
      beam.position.x = x;
      beam.position.z = z;
      beam.material = new StandardMaterial('texture1', scene);
      beam.material.diffuseTexture = returnLiquidTexture("acid_"+color, scene);
      beam.material.alpha = 0;
      beam.material.alphaMode = 1;
      beam.name = color+"Beam";
    }
  }

  function generatePowerCrystal(x, y, z, rotate, name, static_texture) {
    let shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
    shard1.position.y = 6;

    let shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
    shard2.position.y = 2;
    shard2.material = new StandardMaterial('texture1', scene);

    let crystal = Mesh.MergeMeshes([shard1, shard2], true, true, undefined, false, true);
    crystal.position.y = y;
    crystal.position.x = x;
    crystal.position.z = z;
    crystal.rotation.x = rotate;
    crystal.material = new StandardMaterial('texture1', scene);
    if (static_texture) {
      crystal.material.diffuseTexture = returnCrystalTexture(static_texture, scene);
    } else {
      crystal.material.alpha = 0;
    }
    crystal.name = name;

    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
      crystal.rotate(axis, angle, 1);
    });
  }
// outside crystals (visual display only)
  generatePowerDevice((x + 5), 0, (z + 5), 0, "");
  generatePowerCrystal((x + 5), 0, (z + 5), 0, "", "gem_red");

  generatePowerDevice((x - 5), 0, (z - 5), 0, "");
  generatePowerCrystal((x - 5), 0, (z - 5), 0, "", "gem_green");

  generatePowerDevice((x - 5), 0, (z + 5), 0, "");
  generatePowerCrystal((x - 5), 0,(z + 5), 0, "", "gem_yellow");

  generatePowerDevice((x + 5), 0, (z - 5), 0, "");
  generatePowerCrystal((x + 5), 0, (z - 5), 0, "", "gem_orange");

// bottom crystals
  generatePowerDevice(15, -300, 15, 0, (puzzle_orders[0] + "_deviceOb19"));
  generatePowerCrystal(15, -300, 15, 0, (puzzle_orders[0] + "_crystalOb19"));

  generatePowerDevice(-15, -300, -15, 0, (puzzle_orders[1] + "_deviceOb19"));
  generatePowerCrystal(-15, -300, -15, 0, (puzzle_orders[1] + "_crystalOb19"));

  generatePowerDevice(-15, -300, 15, 0, (puzzle_orders[2] + "_deviceOb19"));
  generatePowerCrystal(-15, -300, 15, 0, (puzzle_orders[2] + "_crystalOb19"));

  generatePowerDevice(15, -300, -15, 0, (puzzle_orders[3] + "_deviceOb19"));
  generatePowerCrystal(15, -300, -15, 0, (puzzle_orders[3] + "_crystalOb19"));

// top crystals
  generatePowerDevice(15, -201, 15, 3.14, (puzzle_orders[4] + "_deviceOb19"));
  generatePowerCrystal(15, -201, 15, 3.14, (puzzle_orders[4] + "_crystalOb19"));

  generatePowerDevice(-15, -201, -15, 3.14, (puzzle_orders[5] + "_deviceOb19"));
  generatePowerCrystal(-15, -201, -15, 3.14, (puzzle_orders[5] + "_crystalOb19"));

  generatePowerDevice(-15, -201, 15, 3.14, (puzzle_orders[6] + "_deviceOb19"));
  generatePowerCrystal(-15, -201, 15, 3.14, (puzzle_orders[6] + "_crystalOb19"));

  generatePowerDevice(15, -201, -15, 3.14, (puzzle_orders[7] + "_deviceOb19"));
  generatePowerCrystal(15, -201, -15, 3.14, (puzzle_orders[7] + "_crystalOb19"));
}

export {crystalShards};
