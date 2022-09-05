import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Sound} from "@babylonjs/core/Audio";
import {generatePortalPassage} from "../objects/generatePortalPassage.js";
import {generateBucket} from "../objects/generateBucket.js";
import {generateBlaster} from "../objects/generateBlaster.js";
import {generateWheel, generateWheelBaseBarrier} from "../objects/generateWheel.js";
import {returnMetalTexture, returnFloorTexture, returnCrystalTexture,
  returnStoneTexture, genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function lavaRoom(x, z, scene, global_objects, item_id, camera, global_language) {
  generateBucket(scene, (x - 20), z, 0, global_objects, "water_Ob24", "water_pail", global_language.text.items.puzzles.water_pail);

  generateWheel(scene, (x - 20), (z - 20), "Ob24_wheel1", "silver");
  generateWheel(scene, (x + 20), (z + 20), "Ob24_wheel2", "silver");
  generateWheel(scene, (x + 20), (z - 20), "Ob24_wheel3", "silver");
  generateWheel(scene, (x - 20), (z + 20), "Ob24_wheel4", "silver");

  generateWheelBaseBarrier(scene, (x - 20), (z - 20), "base_Ob24_wheel1");
  generateWheelBaseBarrier(scene, (x + 20), (z + 20), "base_Ob24_wheel2");
  generateWheelBaseBarrier(scene, (x + 20), (z - 20), "base_Ob24_wheel3");
  generateWheelBaseBarrier(scene, (x - 20), (z + 20), "base_Ob24_wheel4");

  generatePortalPassage(scene, global_objects, "yellow", x, z, 0, "teleporterOb24a", "teleporter24", -34, 0, 2029);
  generatePortalPassage(scene, global_objects, "yellow", -39, 0, 2025, "teleporterOb24b", "teleporter24", (x + 5), z, 4);

  function generatePortalPassagePipe(x, z, top_name) {
    let pipe = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 3, tessellation: 12}, scene);
    pipe.position.y = 1.5;
    pipe.material = new StandardMaterial('texture1', scene);
    pipe.material.diffuseTexture = returnMetalTexture("iron_medium", scene);
    pipe.material.diffuseTexture.uScale = 2;
    pipe.material.diffuseTexture.vScale = 3;

    let rim = MeshBuilder.CreateTorus("torus", {diameter: 1.5, thickness: 0.25});
    rim.position.y = 3;
    rim.material = new StandardMaterial('texture1', scene);
    rim.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
    rim.material.diffuseTexture.uScale = 2.75;
    rim.material.diffuseTexture.vScale = 1;

    let hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.45, height: 0.025, tessellation: 20}, scene);
    hole.position.y = 3;
    hole.material = new StandardMaterial('texture1', scene);
    hole.material.diffuseColor = new Color3(0, 0, 0);

    let base = MeshBuilder.CreateBox("box", {width: 3, height: 0.2, depth: 3, wrap: true, faceUV: genCubeFaceUV([1.5, 0.1, 1.5, 0.1, 1.5, 0.1, 1.5, 0.1, 1.5, 1.5, 1.5, 1.5])}, scene);
    base.position.y = 0.1;
    base.material = new StandardMaterial('texture1', scene);
    base.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let barrier = MeshBuilder.CreateBox("box", {width: 4, height: 10, depth: 4}, scene);
    barrier.position.y = 5;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.diffuseColor = new Color3(1, 0, 0);
    barrier.material.alpha = 0;

    let machine = Mesh.MergeMeshes([pipe, rim, hole, base, barrier], true, true, undefined, false, true);
    machine.position.x = x;
    machine.position.z = z;
    machine.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    machine.checkCollisions = true;

    let top = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.45, height: 0.025, tessellation: 20}, scene);
    top.position.y = 3.55;
    top.position.x = x;
    top.position.z = z;
    top.material = new StandardMaterial('texture1', scene);
    top.material.diffuseColor = new Color3(1, 0, 0);
    top.material.alpha = 0;
    top.name = top_name;
  }
  generatePortalPassagePipe(x - 4, z - 4, "top_ob24_1");
  generatePortalPassagePipe(x + 4, z + 4, "top_ob24_2");
  generatePortalPassagePipe(x + 4, z - 4, "top_ob24_3");
  generatePortalPassagePipe(x - 4, z + 4, "top_ob24_4");

  function generatePortalMachine(x, z, rotation, name) {
    let box = MeshBuilder.CreateBox("box", {width: 4, height: 2, depth: 2, wrap: true, faceUV: genCubeFaceUV([2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1])}, scene);
    box.position.y = 1;
    box.material = new StandardMaterial('texture1', scene);
    box.material.diffuseTexture = returnMetalTexture("iron_medium", scene);

    let wire = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 6, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 6, 0.1, 0.1])}, scene);
    wire.position.y = 0.05;
    wire.rotation.z = Math.PI / 2;
    wire.position.z = -0.5;
    wire.material = new StandardMaterial('texture1', scene);
    wire.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let machine = Mesh.MergeMeshes([box, wire], true, true, undefined, false, true);
    machine.position.x = x;
    machine.position.z = z;
    machine.rotation.y = rotation;
    machine.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    machine.checkCollisions = true;
  }
  generatePortalMachine(x, z - 5.5, 3.14);
  generatePortalMachine(x, z + 5.5, 0);

  function generatePortalDoor(x, z, y, name) {
    let door = MeshBuilder.CreateBox("box", {width: 1, height: 7, depth: 4, faceUV: genCubeFaceUV([0.5, 3.5, 0.5, 3.5, 3.5, 2, 3.5, 2, 2, 0.5, 2, 0.5])}, scene);
    door.position.x = x;
    door.position.z = z;
    door.position.y = y + 3.5;
    door.material = new StandardMaterial('texture1', scene);
    door.material.diffuseTexture = returnMetalTexture("iron_blue", scene);
    door.name = name;

    let doorBarrier = MeshBuilder.CreateBox("box", {width: 1, height: 7, depth: 4}, scene);
    doorBarrier.position.x = x;
    doorBarrier.position.z = z;
    doorBarrier.position.y = y + 3.5;
    doorBarrier.material = new StandardMaterial('texture1', scene);
    doorBarrier.material.alpha = 0;
    doorBarrier.physicsImpostor = new PhysicsImpostor(doorBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    doorBarrier.checkCollisions = true;
    doorBarrier.name = name + "Barrier";
  }
  generatePortalDoor(x - 2, z, 0, "doorOb24_a");
  generatePortalDoor(x + 2, z, 0, "doorOb24_b");
  generatePortalDoor(-37, 0, 2025, "doorOb24_c");

  function generatePortalDoorSlot(x, z, y) {
    let base1 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.25, depth: 4.5, faceUV: genCubeFaceUV([0.125, 0.125, 0.125, 0.125, 0.125, 2.25, 0.125, 2.25, 2.25, 0.125, 2.25, 0.125])}, scene);
    base1.position.x = 0.625;
    base1.material = new StandardMaterial('texture1', scene);
    base1.material.diffuseTexture = returnMetalTexture("iron", scene);

    let base2 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.25, depth: 4.5, faceUV: genCubeFaceUV([0.125, 0.125, 0.125, 0.125, 0.125, 2.25, 0.125, 2.25, 2.25, 0.125, 2.25, 0.125])}, scene);
    base2.position.x = -0.625;
    base2.material = new StandardMaterial('texture1', scene);
    base2.material.diffuseTexture = returnMetalTexture("iron", scene);

    let base3 = MeshBuilder.CreateBox("box", {width: 1, height: 0.25, depth: 0.25, faceUV: genCubeFaceUV([0.5, 0.125, 0.5, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.5, 0.125, 0.5])}, scene);
    base3.position.z = 2.125;
    base3.material = new StandardMaterial('texture1', scene);
    base3.material.diffuseTexture = returnMetalTexture("iron", scene);

    let base4 = MeshBuilder.CreateBox("box", {width: 1, height: 0.25, depth: 0.25, faceUV: genCubeFaceUV([0.5, 0.125, 0.5, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.5, 0.125, 0.5])}, scene);
    base4.position.z = -2.125;
    base4.material = new StandardMaterial('texture1', scene);
    base4.material.diffuseTexture = returnMetalTexture("iron", scene);

    let hole = MeshBuilder.CreateBox("box", {width: 1, height: 0.05, depth: 4}, scene);
    hole.position.y = -0.1;
    hole.material = new StandardMaterial('texture1', scene);
    hole.material.diffuseColor = new Color3(0, 0, 0);

    let slot = Mesh.MergeMeshes([base1, base2, base3, base4, hole], true, true, undefined, false, true);
    slot.position.y = y + 0.125;
    slot.position.x = x;
    slot.position.z = z;
  }
  generatePortalDoorSlot(x - 2, z, 0);
  generatePortalDoorSlot(x + 2, z, 0);
  generatePortalDoorSlot(-37, 0, 2025);

  generateBlaster("holding", scene, 0, 0, -1000, camera, "blasterOb24", "blastOb24");
  generateBlaster("item", scene, 10, 0, 2025, camera, "blasterOb24", "blastOb24");
  global_objects.push({id: "", type: "holdable", name: "blasterOb24", puzzle_pos: {x: 10, z: 0, y: 2025}});

  let floor = MeshBuilder.CreateBox("floor", {width: 80, height: 1, depth: 40}, scene);
  floor.position.y = 1999.5;
  floor.material = new StandardMaterial('texture1', scene);
  floor.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);
  floor.material.diffuseTexture.uScale = 8;
  floor.material.diffuseTexture.vScale = 16;
  floor.physicsImpostor = new PhysicsImpostor(floor, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  floor.checkCollisions = true;
  floor.name = "landableSurface";
  global_objects.push({id: floor.uniqueId, obstacle24_id: item_id, type: "structure", name: ""});

  let ceiling = MeshBuilder.CreateBox("floor", {width: 80, height: 1, depth: 40}, scene);
  ceiling.position.y = 2039.5;
  ceiling.material = new StandardMaterial('texture1', scene);
  ceiling.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);
  ceiling.material.diffuseTexture.uScale = 8;
  ceiling.material.diffuseTexture.vScale = 16;

  let lava = MeshBuilder.CreateBox("lava", {width: 80, height: 1, depth: 40}, scene);
  lava.position.y = 2020;
  lava.material = new StandardMaterial('texture1', scene);
  lava.material.diffuseTexture = returnFloorTexture("lava", scene);
  lava.material.diffuseTexture.uScale = 4;
  lava.material.diffuseTexture.vScale = 8;
  lava.physicsImpostor = new PhysicsImpostor(lava, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  lava.checkCollisions = true;
  lava.name = "lavaOb24";
  global_objects.push({id: lava.uniqueId, type: "acid", exit_pos: {x: (x + 5), z: z, y: 4}});

  let lavaSound = new Sound("lavaSoundOb24", "./sound/LavaLoop.mp3", scene, null, { loop: true, autoplay: true, volume: 0.75, maxDistance: 100 });
  lavaSound.attachToMesh(lava);

  let lavaGlow = MeshBuilder.CreateBox("lava", {width: 80, height: 1, depth: 40}, scene);
  lavaGlow.position.y = 2020.25;
  lavaGlow.material = new StandardMaterial('texture1', scene);
  lavaGlow.material.alpha = 0.2;
  lavaGlow.material.diffuseColor = new Color3(0.83, 0.2, 0.01);
  lavaGlow.material.specularColor = new Color3(0.83, 0.2, 0.01);
  lavaGlow.material.emissiveColor = new Color3(0.83, 0.2, 0.01);
  lavaGlow.material.ambientColor = new Color3(0.83, 0.2, 0.01);
  lavaGlow.name = "lavaGlowOb24";

  function generateLavaRoomWall(x, z, width, depth) {
    let scale = width > depth ? width: depth;

    let generateLavaRoomWall = MeshBuilder.CreateBox("box", {width: width, height: 41, depth: depth, wrap: true}, scene);
    generateLavaRoomWall.position.y = 2019.5;
    generateLavaRoomWall.position.x = x;
    generateLavaRoomWall.position.z = z;
    generateLavaRoomWall.material = new StandardMaterial('texture1', scene);
    generateLavaRoomWall.material.diffuseTexture = returnStoneTexture("stone_verydark", scene);
    generateLavaRoomWall.material.diffuseTexture.uScale = (scale / 5);
    generateLavaRoomWall.material.diffuseTexture.vScale = 8.2;
    generateLavaRoomWall.physicsImpostor = new PhysicsImpostor(generateLavaRoomWall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    generateLavaRoomWall.checkCollisions = true;
  }
  generateLavaRoomWall(-40.5, 0, 1, 42);
  generateLavaRoomWall(40.5, 0, 1, 42);
  generateLavaRoomWall(0, 20.5, 80, 1);
  generateLavaRoomWall(0, -20.5, 80, 1);

  function generateLavaRoomPlatform(x, z) {
    let gardenRoomPlatform = MeshBuilder.CreateBox("box", {width: 10, height: 25, depth: 10, wrap: true, faceUV: genCubeFaceUV([4, 9, 4, 9, 4, 9, 4, 9, 4, 4, 4, 4])}, scene);
    gardenRoomPlatform.position.y = 2012.5;
    gardenRoomPlatform.position.x = x;
    gardenRoomPlatform.position.z = z;
    gardenRoomPlatform.material = new StandardMaterial('texture1', scene);
    gardenRoomPlatform.material.diffuseTexture = returnMetalTexture("iron_tan", scene);
    gardenRoomPlatform.physicsImpostor = new PhysicsImpostor(gardenRoomPlatform, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    gardenRoomPlatform.checkCollisions = true;
  }
  generateLavaRoomPlatform(-35, 0);
  generateLavaRoomPlatform(10, 0);
  generateLavaRoomPlatform(35, 0);

  function generateLavaRoomBridge(x, z, width, depth) {
    let gardenRoomBridge = MeshBuilder.CreateBox("box", {width: width, height: 1, depth: depth, faceUV: genCubeFaceUV([13, 0.25, 13, 0.25, 0.25, 1, 0.25, 1, 1, 13, 1, 13])}, scene);
    gardenRoomBridge.position.y = 2024.5;
    gardenRoomBridge.position.x = x;
    gardenRoomBridge.position.z = z;
    gardenRoomBridge.material = new StandardMaterial('texture1', scene);
    gardenRoomBridge.material.diffuseTexture = returnMetalTexture("iron_blue", scene);
    gardenRoomBridge.physicsImpostor = new PhysicsImpostor(gardenRoomBridge, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    gardenRoomBridge.checkCollisions = true;
  }
  generateLavaRoomBridge(-12.5, 0, 35, 4);

  function generateLavaDrain(x) {
    let rim = MeshBuilder.CreateTorus("torus", {diameter: 5, thickness: 1}, scene);
    rim.position.y = 0.5;
    rim.material = new StandardMaterial('texture1', scene);
    rim.material.diffuseTexture = returnMetalTexture("gold", scene);
    rim.material.diffuseTexture.uScale = 4;
    rim.material.diffuseTexture.vScale = 1;

    let hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 4.5, height: 0.5, tessellation: 20}, scene);
    hole.position.y = 0.3;
    hole.material = new StandardMaterial('texture1', scene);
    hole.material.diffuseColor = new Color3(0, 0, 0);

    let drain = Mesh.MergeMeshes([rim, hole], true, true, undefined, false, true);
    drain.position.x = x;
    drain.position.z = 0;
    drain.position.y = 1999.5;
    drain.rotation.x = 0;

    let top = MeshBuilder.CreateCylinder("cylinder", {diameter: 5, height: 0.025, tessellation: 20}, scene);
    top.position.x = x;
    top.position.z = 0;
    top.position.y = 2000.5;
    top.material = new StandardMaterial('texture1', scene);
    top.material.diffuseColor = new Color3(1, 0, 0);
    top.material.alpha = 0;
    top.name = "lavaDrainTopOb24";

    let steam = MeshBuilder.CreateCylinder("cylinder", {diameter: 10, height: 24, tessellation: 20}, scene);
    steam.position.x = x;
    steam.position.z = 0;
    steam.position.y = -1000;
    steam.material = new StandardMaterial('texture1', scene);
    steam.material.diffuseColor = new Color3(1, 0, 0.95);
    steam.material.alpha = 0;
    steam.name = "steamOb24";
    steam.physicsImpostor = new PhysicsImpostor(steam, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    steam.checkCollisions = true;

    let steamTop = MeshBuilder.CreateCylinder("cylinder", {diameter: 18, height: 1, tessellation: 20}, scene);
    steamTop.position.x = x;
    steamTop.position.z = 0;
    steamTop.position.y = -1000;
    steamTop.material = new StandardMaterial('texture1', scene);
    steamTop.material.diffuseColor = new Color3(0.67, 0.79, 0.98);
    steamTop.material.alpha = 0;
    steamTop.name = "steamTopOb24";
    steamTop.physicsImpostor = new PhysicsImpostor(steamTop, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    steamTop.checkCollisions = true;
  }
  generateLavaDrain(22.5);

  function generateMiniPole(x, y, z, bulb_name, bulb_color, scene) {
    let pole = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.25, height: 1, tessellation: 8, tessellation: 8}, scene);
    pole.position.y = y;
    pole.position.x = x;
    pole.position.z = z;
    pole.material = new StandardMaterial('texture1', scene);
    pole.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let bulb = Mesh.CreateSphere("sphere", 8, 1, scene);
    bulb.position.y = y - 1;
    bulb.position.x = x;
    bulb.position.z = z;
    bulb.material = new StandardMaterial('texture1', scene);
    bulb.material.diffuseColor = bulb_color;
    bulb.material.specularColor = bulb_color;
    bulb.material.emissiveColor = bulb_color;
    bulb.material.ambientColor = bulb_color;
    bulb.name = bulb_name;
  }
  generateMiniPole(37, 2038.5, 15, "bulbOb24_1", new Color3(0.55, 0.48, 0.48), scene);
  generateMiniPole(37, 2038.5, 5, "bulbOb24_2", new Color3(0.55, 0.48, 0.48), scene);
  generateMiniPole(37, 2038.5, -5, "bulbOb24_3", new Color3(0.55, 0.48, 0.48), scene);
  generateMiniPole(37, 2038.5, -15, "bulbOb24_4", new Color3(0.55, 0.48, 0.48), scene);

  function generateBigWheel(x, z, y, wheel_name) {
    let wheel_main = MeshBuilder.CreateTorus("torus", {diameter: 5, thickness: 0.55}, scene);
    wheel_main.position.y = 13;
    wheel_main.material = new StandardMaterial('texture1', scene);
    wheel_main.material.diffuseTexture = returnMetalTexture("gold", scene);
    wheel_main.material.diffuseTexture.uScale = 6;
    wheel_main.material.diffuseTexture.vScale = 1;

    let wheel_bar1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 5, tessellation: 20, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 2.5, 0.25, 0.25])}, scene);
    wheel_bar1.rotation.x = 1.57;
    wheel_bar1.position.y = 13;
    wheel_bar1.material = new StandardMaterial('texture1', scene);
    wheel_bar1.material.diffuseTexture = returnMetalTexture("gold", scene);

    let wheel_bar2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 5, tessellation: 20, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 2.5, 0.25, 0.25])}, scene);
    wheel_bar2.rotation.x = 1.57;
    wheel_bar2.rotation.z = 1.57;
    wheel_bar2.position.y = 13;
    wheel_bar2.material = new StandardMaterial('texture1', scene);
    wheel_bar2.material.diffuseTexture = returnMetalTexture("gold", scene);

    let wheel_support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3, tessellation: 20, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
    wheel_support.position.y = 11.5;
    wheel_support.material = new StandardMaterial('texture1', scene);
    wheel_support.material.diffuseTexture = returnMetalTexture("iron", scene);

    let wheel = Mesh.MergeMeshes([wheel_main, wheel_bar1, wheel_bar2, wheel_support], true, true, undefined, false, true);
    wheel.position.y = y;
    wheel.position.x = x;
    wheel.position.z = z;
    wheel.name = wheel_name;
  }
  generateBigWheel(-13, 0, 1989.5, "Ob24_bigwheel");

  function generateBigWheelBaseBarrier(x, z, y, wheel_base_name) {
    let wheel_base = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.7, height: 0.25, tessellation: 20, faceUV: genCylinderFaceUV([0.35, 0.35, 1, 0.125, 0.35, 0.35])}, scene);
    wheel_base.position.y = 10.5;
    wheel_base.material = new StandardMaterial('texture1', scene);
    wheel_base.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let barrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.5, height: 10, tessellation: 20}, scene);
    barrier.position.y = 15;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.diffuseColor = new Color3(0.29, 0.29, 0.29);
    barrier.material.alpha = 0;

    let wheel_base_barrier = Mesh.MergeMeshes([wheel_base, barrier], true, true, undefined, false, true);
    wheel_base_barrier.position.y = y;
    wheel_base_barrier.position.x = x;
    wheel_base_barrier.position.z = z;
    wheel_base_barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    wheel_base_barrier.checkCollisions = true;
    wheel_base_barrier.name = wheel_base_name;
  }
  generateBigWheelBaseBarrier(-13, 0, 1989.5, "base_Ob24_bigwheel");

  let buttonBoxBarrier = MeshBuilder.CreateBox("box", {width: 1, height: 5, depth: 7}, scene);
  buttonBoxBarrier.position.y = 2027.5;
  buttonBoxBarrier.position.x = 35;
  buttonBoxBarrier.position.z = 0;
  buttonBoxBarrier.material = new StandardMaterial('texture1', scene);
  buttonBoxBarrier.material.diffuseColor = new Color3(1, 0, 0);
  buttonBoxBarrier.material.alpha = 0;
  buttonBoxBarrier.physicsImpostor = new PhysicsImpostor(buttonBoxBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonBoxBarrier.checkCollisions = true;
  buttonBoxBarrier.name = "warningSoundSourceOb24";

  function generateBigHitButton(x, z, y, button_texture, color, name) {
    let box = MeshBuilder.CreateBox("box", {width: 1, height: 5, depth: 3, faceUV: genCubeFaceUV([0.5, 2.5, 0.5, 2.5, 2.5, 1.5, 2.5, 1.5, 1.5, 0.5, 1.5, 0.5])}, scene);
    box.position.y = y;
    box.position.x = x;
    box.position.z = z;
    box.material = new StandardMaterial('texture1', scene);
    box.material.diffuseTexture = returnCrystalTexture("gem_black", scene);

    let button = MeshBuilder.CreateCylinder("cylinder", {diameter: 2, height: 0.5, tessellation: 20, faceUV: genCylinderFaceUV([1, 1, 2, 0.2, 1, 1])}, scene);
    button.position.y = y;
    button.position.x = x - 0.75;
    button.position.z = z;
    button.rotation.z = Math.PI / 2;
    button.material = new StandardMaterial('texture1', scene);
    button.material.diffuseTexture = returnCrystalTexture(button_texture, scene);
    button.name = name;

    let glowButton = MeshBuilder.CreateCylinder("cylinder", {diameter: 2, height: 0.5, tessellation: 20}, scene);
    glowButton.position.y = -1000;
    glowButton.position.x = x - 0.75;
    glowButton.position.z = z;
    glowButton.rotation.z = Math.PI / 2;
    glowButton.material = new StandardMaterial('texture1', scene);
    glowButton.material.alpha = 0.2;
    glowButton.material.diffuseColor = color;
    glowButton.material.specularColor = color;
    glowButton.material.emissiveColor = color;
    glowButton.material.ambientColor = color;
    glowButton.name = name + "Glow";
  }
  generateBigHitButton(35, 2, 2027.5, "gem_yellow", new Color3(1, 1, 0), "bigButtonOb24_a");
  generateBigHitButton(35, -2, 2027.5, "gem_red", new Color3(1, 0, 0), "bigButtonOb24_b");
}

export {lavaRoom};
