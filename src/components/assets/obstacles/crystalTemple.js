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
import {returnMetalTexture, returnCrystalTexture, returnFloorTexture, returnWallTexture,
  returnStoneTexture, returnWoodTexture, genCylinderFaceUV, genCubeFaceUV} from "../textures.js";
import {cloneAndShuffleSoundMachineColors} from "../sound_machines_colors.js";
import {generatePole} from "../objects/generatePole.js";

function crystalTemple(x, z, scene, global_objects, item_id, camera, global_language) {
  cloneAndShuffleSoundMachineColors();

  let sound_machines = [
    "smachine_one",
    "smachine_two",
    "smachine_three",
    "smachine_four",
    "smachine_five",
    "smachine_six"
  ];
  sound_machines = arrayShuffler(sound_machines);

  let crystal_colors = [
    "gem_blue",
    "gem_bluepurple",
    "gem_darkred",
    "gem_darkgreen"
  ];
  crystal_colors = arrayShuffler(crystal_colors);

  let teleporterVisualPad = MeshBuilder.CreateBox("box", {width: 5, height: 0.2, depth: 5, wrap: true, faceUV: genCubeFaceUV([2.5, 0.1, 2.5, 0.1, 2.5, 0.1, 2.5, 0.1, 2.5, 2.5, 2.5, 2.5])}, scene);
  teleporterVisualPad.position.y = 0.1;
  teleporterVisualPad.position.x = x;
  teleporterVisualPad.position.z = z;
  teleporterVisualPad.material = new StandardMaterial('texture1', scene);
  teleporterVisualPad.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
  teleporterVisualPad.name = "teleporterOb18";
  global_objects.push({id: teleporterVisualPad.uniqueId, obstacle18_id: item_id, type: "structure", name: ""});

  let teleportPad = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 4, tessellation: 8}, scene);
  teleportPad.position.y = 2;
  teleportPad.position.x = x;
  teleportPad.position.z = z;
  teleportPad.material = new StandardMaterial('texture1', scene);
  teleportPad.material.alpha = 0;
  teleportPad.physicsImpostor = new PhysicsImpostor(teleportPad, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  teleportPad.checkCollisions = true;
  global_objects.push({id: teleportPad.uniqueId, type: "teleporter18", exit_pos: {x: 990, z: 999, y: 4}});

  let particleSystem = new ParticleSystem("particles", 3000, scene);
  particleSystem.particleTexture = new Texture("./imgs/circle_light.png", scene);
  particleSystem.emitter = teleportPad;

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

  let floatingPlatformFloor = MeshBuilder.CreateBox("box", {width: 70, height: 1, depth: 70}, scene);
  floatingPlatformFloor.position.y = -0.5;
  floatingPlatformFloor.position.x = 1000;
  floatingPlatformFloor.position.z = 1000;
  floatingPlatformFloor.material = new StandardMaterial('texture1', scene);
  floatingPlatformFloor.material.diffuseTexture = returnFloorTexture("stone_slabs_temple", scene);
  floatingPlatformFloor.material.diffuseTexture.uScale = 7;
  floatingPlatformFloor.material.diffuseTexture.vScale = 7;
  floatingPlatformFloor.physicsImpostor = new PhysicsImpostor(floatingPlatformFloor, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floatingPlatformFloor.checkCollisions = true;

  let floatingPlatformCeiling = MeshBuilder.CreateBox("box", {width: 70, height: 1, depth: 70}, scene);
  floatingPlatformCeiling.position.y = 10.5;
  floatingPlatformCeiling.position.x = 1000;
  floatingPlatformCeiling.position.z = 1000;
  floatingPlatformCeiling.material = new StandardMaterial('texture1', scene);
  floatingPlatformCeiling.material.diffuseTexture = returnFloorTexture("stone_slabs_temple", scene);
  floatingPlatformCeiling.material.diffuseTexture.uScale = 7;
  floatingPlatformCeiling.material.diffuseTexture.vScale = 7;

  let PieceData = [
     ["X", "X", "X", "X", "X", "X", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "X", "X", "X", "X", "X", "X"]
  ];
  let units = 10;
  let walls = [];

  for (let z = 0, zlength = 7; z < zlength; z++) {
    for (let x = 0, xlength = 7; x < xlength; x++) {
      if (PieceData[z][x] !== "_") {
        if (PieceData[z][x] === "X") {
          let wall = MeshBuilder.CreateBox("wall", {width: units, height: units, depth: units, wrap: true}, scene);
          wall.position.y = 5;
          wall.position.x = ((x * units) - 30) + 1000;
          wall.position.z = (((z * units) - (((z * units) * 2))) + 30) + 1000;
          wall.material = new StandardMaterial('texture1', scene);
          wall.material.diffuseTexture = returnWallTexture("stone_blocks_temple", scene);
          wall.material.diffuseTexture.uScale = 2;
          wall.material.diffuseTexture.vScale = 2;
          wall.physicsImpostor = new PhysicsImpostor(wall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
          wall.checkCollisions = true;
          walls.push(wall);
        }
      }
    }
  }

  let walls_final = Mesh.MergeMeshes(walls, true, true, undefined, false, true);

  let exitTeleporterVisualPad = MeshBuilder.CreateBox("box", {width: 5, height: 0.2, depth: 5, wrap: true, faceUV: genCubeFaceUV([2.5, 0.1, 2.5, 0.1, 2.5, 0.1, 2.5, 0.1, 2.5, 2.5, 2.5, 2.5])}, scene);
  exitTeleporterVisualPad.position.y = 0.1;
  exitTeleporterVisualPad.position.x = 980;
  exitTeleporterVisualPad.position.z = 1000;
  exitTeleporterVisualPad.material = new StandardMaterial('texture1', scene);
  exitTeleporterVisualPad.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let exitTeleportPad = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 4, tessellation: 8}, scene);
  exitTeleportPad.position.y = 2;
  exitTeleportPad.position.x = 980;
  exitTeleportPad.position.z = 1000;
  exitTeleportPad.material = new StandardMaterial('texture1', scene);
  exitTeleportPad.material.alpha = 0;
  exitTeleportPad.physicsImpostor = new PhysicsImpostor(exitTeleportPad, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  exitTeleportPad.checkCollisions = true;
  global_objects.push({id: exitTeleportPad.uniqueId, type: "teleporter18", exit_pos: {x: x, z: (z - 12), y: 4}});

  let particleSystem2 = new ParticleSystem("particles", 3000, scene);
  particleSystem2.particleTexture = new Texture("./imgs/circle_light.png", scene);
  particleSystem2.emitter = exitTeleportPad;

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

  let buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder1.position.y = 1.5;
  buttonHolder1.position.x = 1020;
  buttonHolder1.position.z = 1000;
  buttonHolder1.material = new StandardMaterial('texture1', scene);
  buttonHolder1.material.diffuseTexture = returnMetalTexture("iron", scene);
  buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder1.checkCollisions = true;

  let buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier1.position.y = 5;
  buttonBarrier1.position.x = 1020;
  buttonBarrier1.position.z = 1000;
  buttonBarrier1.material = new StandardMaterial('texture1', scene);
  buttonBarrier1.material.alpha = 0;
  buttonBarrier1.name = "button1p18a";

  let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton1.position.y = 3.25;
  pushButton1.position.x = 1020;
  pushButton1.position.z = 1000;
  pushButton1.material = new StandardMaterial('texture1', scene);
  pushButton1.material.diffuseTexture = returnCrystalTexture("gem_darkred", scene);
  pushButton1.name = "pushButton1p18a";

  let shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 8, height: 8, tessellation: 4}, scene);
  shard1.position.y = 7;
  shard1.material = new StandardMaterial('texture1', scene);
  shard1.material.diffuseTexture = returnCrystalTexture(crystal_colors[0], scene);
  shard1.material.alpha = 0.8;
  shard1.material.diffuseTexture.uScale = 3;
  shard1.material.diffuseTexture.vScale = 3;

  let shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 8, height: 4, tessellation: 4}, scene);
  shard2.position.y = 1;
  shard2.material = new StandardMaterial('texture1', scene);
  shard2.material.diffuseTexture = returnCrystalTexture(crystal_colors[0], scene);
  shard2.material.alpha = 0.8;

  let crystal = Mesh.MergeMeshes([shard1, shard2], true, true, undefined, false, true);
  crystal.position.y = -1;
  crystal.position.x = 1020;
  crystal.position.z = 1000;
  crystal.name = "crystalShardsOb18";

  let crystalBarrier = MeshBuilder.CreateBox("barrier", {width: 8, height: 10, depth: 8}, scene);
  crystalBarrier.position.y = 5;
  crystalBarrier.position.x = 1020;
  crystalBarrier.position.z = 1000;
  crystalBarrier.material = new StandardMaterial('texture1', scene);
  crystalBarrier.material.alpha = 0;
  crystalBarrier.name = "crystalOb18";
  crystalBarrier.physicsImpostor = new PhysicsImpostor(crystalBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  crystalBarrier.checkCollisions = true;

  let pillarCentral = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 9, tessellation: 20}, scene);
  pillarCentral.position.y = 5;
  pillarCentral.material = new StandardMaterial('texture1', scene);
  pillarCentral.material.diffuseTexture = returnStoneTexture("stone_teal", scene);
  pillarCentral.material.diffuseTexture.uScale = 5;
  pillarCentral.material.diffuseTexture.vScale = 5;

  let pillarTop = MeshBuilder.CreateCylinder("cylinder", {diameter: 6, height: 1, tessellation: 20, faceUV: genCylinderFaceUV([2, 2, 8, 0.4, 2, 2])}, scene);
  pillarTop.position.y = 9.5;
  pillarTop.material = new StandardMaterial('texture1', scene);
  pillarTop.material.diffuseColor = new Color3(0.77, 0.72, 0.72);
  pillarTop.material.diffuseTexture = returnStoneTexture("stone_tealdark", scene);

  let pillarBottom = MeshBuilder.CreateCylinder("cylinder", {diameter: 6, height: 1, tessellation: 20, faceUV: genCylinderFaceUV([2, 2, 8, 0.4, 2, 2])}, scene);
  pillarBottom.position.y = 0.5;
  pillarBottom.material = new StandardMaterial('texture1', scene);
  pillarBottom.material.diffuseColor = new Color3(0.77, 0.72, 0.72);
  pillarBottom.material.diffuseTexture = returnStoneTexture("stone_tealdark", scene);

  let pillar = Mesh.MergeMeshes([pillarCentral, pillarTop, pillarBottom], true, true, undefined, false, true);
  pillar.position.y = -1000;
  pillar.isVisible = false;

  function createPillar(x, z) {
    let newPillarInstance = pillar.createInstance("instance");
    newPillarInstance.position.y = 0;
    newPillarInstance.position.x = x;
    newPillarInstance.position.z = z;

    let pillarBarrier = MeshBuilder.CreateBox("box", {width: 6, height: 10, depth: 6}, scene);
    pillarBarrier.position.y = 5;
    pillarBarrier.position.x = x;
    pillarBarrier.position.z = z;
    pillarBarrier.material = new StandardMaterial('texture1', scene);
    pillarBarrier.material.alpha = 0;
    pillarBarrier.physicsImpostor = new PhysicsImpostor(pillarBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    pillarBarrier.checkCollisions = true;
  }

  createPillar((x + 5), (z + 5));
  createPillar((x - 5), (z - 5));
  createPillar((x - 5), (z + 5));
  createPillar((x + 5), (z - 5));

  createPillar(985, 1015);
  createPillar(1000, 1015);
  createPillar(1015, 1015);

  createPillar(985, 985);
  createPillar(1000, 985);
  createPillar(1015, 985);

  function createSoundMachine(x, z, rotate, mach_name) {
    let post = MeshBuilder.CreateBox("box", {width: 0.5, height: 5, depth: 0.5, wrap: true, faceUV: genCubeFaceUV([0.25, 2.5, 0.25, 2.5, 0.25, 2.5, 0.25, 2.5, 0.25, 0.25, 0.25, 0.25])}, scene);
    post.position.y = 2.5;
    post.material = new StandardMaterial('texture1', scene);
    post.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

    let pipe = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.25, height: 1, tessellation: 20}, scene);
    pipe.position.y = 4;
    pipe.position.z = -0.5;
    pipe.rotation.x = 1.57;
    pipe.material = new StandardMaterial('texture1', scene);
    pipe.material.diffuseTexture = returnMetalTexture("iron", scene);

    let horn = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 1, diameterBottom: 0.25, height: 0.5, tessellation: 8}, scene);
    horn.position.y = 4;
    horn.position.z = -1;
    horn.rotation.x = -1.57;
    horn.material = new StandardMaterial('texture1', scene);
    horn.material.diffuseTexture = returnMetalTexture("gold", scene);

    let rim = MeshBuilder.CreateTorus("torus", {diameter: 1, thickness: 0.1}, scene);
    rim.position.y = 4;
    rim.position.z = -1.25;
    rim.rotation.x = -1.57;
    rim.material = new StandardMaterial('texture1', scene);
    rim.material.diffuseTexture = returnMetalTexture("gold", scene);

    let top = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.05, tessellation: 20}, scene);
    top.position.y = 4;
    top.position.z = -1.26;
    top.rotation.x = -1.57;
    top.material = new StandardMaterial('texture1', scene);
    top.material.diffuseColor = new Color3(0, 0, 0);

    let base = MeshBuilder.CreateCylinder("cylinder", {diameter: 2, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([1, 1, 4, 0.4, 1, 1])}, scene);
    base.position.y = 0.25;
    base.material = new StandardMaterial('texture1', scene);
    base.material.diffuseColor = new Color3(0.61, 0.61, 0.61);
    base.material.diffuseTexture = returnMetalTexture("iron", scene);

    let pipe2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.25, height: 0.5, tessellation: 20}, scene);
    pipe2.position.y = 5;
    pipe2.material = new StandardMaterial('texture1', scene);
    pipe2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let barrier = MeshBuilder.CreateBox("box", {width: 3, height: 10, depth: 3}, scene);
    barrier.position.y = 5;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.alpha = 0;

    let machine = Mesh.MergeMeshes([post, pipe, horn, rim, top, base, pipe2, barrier], true, true, undefined, false, true);
    machine.position.y = 0;
    machine.position.x = x;
    machine.position.z = z;
    machine.rotation.y = rotate;
    machine.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    machine.checkCollisions = true;
    machine.name = mach_name;

    let bulb = Mesh.CreateSphere("sphere", 8, 0.5, scene);
    bulb.position.y = 5.5;
    bulb.position.x = x;
    bulb.position.z = z;
    bulb.material = new StandardMaterial('texture1', scene);
    bulb.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
    bulb.name = mach_name + "_bulb";
  }

  createSoundMachine(985, 1010, 0, sound_machines[0]);
  createSoundMachine(1000, 1010, 0, sound_machines[1]);
  createSoundMachine(1015, 1010, 0, sound_machines[2]);

  createSoundMachine(985, 990, 3.14, sound_machines[3]);
  createSoundMachine(1000, 990, 3.14, sound_machines[4]);
  createSoundMachine(1015, 990, 3.14, sound_machines[5]);

  generatePole(995, 0, 1000, "bulb1Ob18", new Color3(0.55, 0.48, 0.48), scene);
  generatePole(997, 0, 1000, "bulb2Ob18", new Color3(0.55, 0.48, 0.48), scene);
  generatePole(999, 0, 1000, "bulb3Ob18", new Color3(0.55, 0.48, 0.48), scene);
  generatePole(1001, 0, 1000, "bulb4Ob18", new Color3(0.55, 0.48, 0.48), scene);
  generatePole(1003, 0, 1000, "bulb5Ob18", new Color3(0.55, 0.48, 0.48), scene);
  generatePole(1005, 0, 1000, "bulb6Ob18", new Color3(0.55, 0.48, 0.48), scene);

  let polesBase = MeshBuilder.CreateBox("box", {width: 12, height: 0.5, depth: 0.5, wrap: true, faceUV: genCubeFaceUV([6, 0.25, 6, 0.25, 0.25, 0.25, 0.25, 0.25, 6, 0.25, 6, 0.25])}, scene);
  polesBase.position.y = 0.25;
  polesBase.position.x = 1000;
  polesBase.position.z = 1000;
  polesBase.material = new StandardMaterial('texture1', scene);
  polesBase.material.diffuseColor = new Color3(0.55, 0.48, 0.48);
  polesBase.material.diffuseTexture = returnStoneTexture("stone_pink", scene);

  let polesBarrier = MeshBuilder.CreateBox("box", {width: 12, height: 5, depth: 0.5}, scene);
  polesBarrier.position.y = 2.5;
  polesBarrier.position.x = 1000;
  polesBarrier.position.z = 1000;
  polesBarrier.material = new StandardMaterial('texture1', scene);
  polesBarrier.material.alpha = 0;
  polesBarrier.physicsImpostor = new PhysicsImpostor(polesBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  polesBarrier.checkCollisions = true;

  let wire1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 30, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 30, 0.1, 0.1])}, scene);
  wire1.position.y = 0.05;
  wire1.position.x = 1000;
  wire1.position.z = 990;
  wire1.rotation.z = 1.57;
  wire1.material = new StandardMaterial('texture1', scene);
  wire1.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 30, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 30, 0.1, 0.1])}, scene);
  wire2.position.y = 0.05;
  wire2.position.x = 1000;
  wire2.position.z = 1010;
  wire2.rotation.z = 1.57;
  wire2.material = new StandardMaterial('texture1', scene);
  wire2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 20, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 30, 0.1, 0.1])}, scene);
  wire3.position.y = 0.05;
  wire3.position.x = 1000;
  wire3.position.z = 1000;
  wire3.rotation.x = 1.57;
  wire3.material = new StandardMaterial('texture1', scene);
  wire3.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
}

export {crystalTemple};
