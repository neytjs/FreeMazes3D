import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial, DynamicTexture} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {generateSign} from "../objects/generateSign.js";
import {shuffleMasterCoins} from "../coins_data.js";
import {returnMetalTexture, returnWoodTexture, returnCrystalTexture,
  genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function coinMatch(x, z, scene, global_objects, item_id, camera, global_language) {
  shuffleMasterCoins();

  let pos_array1 = [-15, 0, 15];
  pos_array1 = arrayShuffler(pos_array1);

  let pos_array2 = [-15, 0, 15];
  pos_array2 = arrayShuffler(pos_array2);

  function createCoin(x, z, texture, name, inv_name, mesh_name) {
    let coin = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.1, tessellation: 20, faceUV: genCylinderFaceUV([1, 1, 2, 0.1, 1, 1])}, scene);
    coin.position.y = 3.5;
    coin.rotation.z = Math.PI / 2;
    coin.material = new StandardMaterial('texture1', scene);
    coin.material.diffuseTexture = returnMetalTexture(texture, scene);

    let coin_barrier = MeshBuilder.CreateBox("barrier", {width: 2, height: 10, depth: 2}, scene);
    coin_barrier.position.y = 5;
    coin_barrier.material = new StandardMaterial('texture1', scene);
    coin_barrier.material.diffuseColor = new Color3(0.87, 0.83, 0.21);
    coin_barrier.material.alpha = 0;

    let a_coin = Mesh.MergeMeshes([coin, coin_barrier], true, true, undefined, false, true);
    a_coin.position.y = 0;
    a_coin.position.x = x;
    a_coin.position.z = z;
    a_coin.physicsImpostor = new PhysicsImpostor(coin_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    a_coin.checkCollisions = true;
    a_coin.name = mesh_name + "_Ob1";

    global_objects.push({id: a_coin.uniqueId, type: "Ob1_coin", name: name, inventory: inv_name, img: name});

    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
      a_coin.rotate(axis, angle, 1);
    });
  }
  createCoin((x + pos_array1[0]), (z + 8), "copper", "copper_coin", global_language.text.items.puzzles.coins.copper_coin, "copper_1");
  createCoin((x + pos_array1[1]), (z + 8), "silver", "silver_coin", global_language.text.items.puzzles.coins.silver_coin, "silver_1");
  createCoin((x + pos_array1[2]), (z + 8), "gold", "gold_coin", global_language.text.items.puzzles.coins.gold_coin, "gold_1");

  createCoin((x + pos_array2[0]), (z + 12), "copper", "copper_coin", global_language.text.items.puzzles.coins.copper_coin, "copper_2");
  createCoin((x + pos_array2[1]), (z + 12), "silver", "silver_coin", global_language.text.items.puzzles.coins.silver_coin, "silver_2");
  createCoin((x + pos_array2[2]), (z + 12), "gold", "gold_coin", global_language.text.items.puzzles.coins.gold_coin, "gold_2");

  let machine = MeshBuilder.CreateBox("box", {width: 6, height: 3.5, depth: 3, faceUV: genCubeFaceUV([2.4, 1.4, 2.4, 1.4, 1.4, 1.2, 1.4, 1.2, 1.2, 2.4, 1.2, 2.4])}, scene);
  machine.position.y = 1.75;
  machine.position.z = -0.8;
  machine.material = new StandardMaterial('texture1', scene);
  machine.material.diffuseTexture = returnMetalTexture("iron", scene);
  machine.material.diffuseTexture.uScale = 2;
  machine.material.diffuseTexture.vScale = 2;
  global_objects.push({id: machine.uniqueId, obstacle1_id: item_id, type: "structure", name: ""});

  let board1 = MeshBuilder.CreateBox("box", {width: 6, height: 0.2, depth: 1, faceUV: genCubeFaceUV([4.8, 0.16, 4.8, 0.16, 0.16, 0.4, 0.16, 0.4, 0.4, 4.8, 0.4, 4.8])}, scene);
  board1.position.y = 5.7;
  board1.material = new StandardMaterial('texture1', scene);
  board1.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let board2 = MeshBuilder.CreateBox("box", {width: 6, height: 0.2, depth: 1, faceUV: genCubeFaceUV([4.8, 0.16, 4.8, 0.16, 0.16, 0.4, 0.16, 0.4, 0.4, 4.8, 0.4, 4.8])}, scene);
  board2.position.y = 3.6;
  board2.material = new StandardMaterial('texture1', scene);
  board2.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let board3 = MeshBuilder.CreateBox("box", {width: 6, height: 2.3, depth: 0.2, faceUV: genCubeFaceUV([4.8, 1.84, 4.8, 1.84, 1.84, 0.16, 1.84, 0.16, 0.16, 4.8, 0.16, 4.8])}, scene);
  board3.position.y = 4.65;
  board3.position.z = 0.6;
  board3.material = new StandardMaterial('texture1', scene);
  board3.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let board4 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.9, depth: 1, faceUV: genCubeFaceUV([0.16, 1.52, 0.16, 1.52, 1.52, 0.8, 1.52, 0.8, 0.8, 0.16, 0.8, 0.16])}, scene);
  board4.position.y = 4.65;
  board4.position.x = -2.9;
  board4.material = new StandardMaterial('texture1', scene);
  board4.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let board5 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.9, depth: 1, faceUV: genCubeFaceUV([0.16, 1.52, 0.16, 1.52, 1.52, 0.8, 1.52, 0.8, 0.8, 0.16, 0.8, 0.16])}, scene);
  board5.position.y = 4.65;
  board5.position.x = 2.9;
  board5.material = new StandardMaterial('texture1', scene);
  board5.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let board6 = MeshBuilder.CreateBox("box", {width: 0.4, height: 1.9, depth: 1, faceUV: genCubeFaceUV([0.24, 1.52, 0.24, 1.52, 1.52, 0.8, 1.52, 0.8, 0.8, 0.24, 0.8, 0.24])}, scene);
  board6.position.y = 4.65;
  board6.position.x = 1;
  board6.material = new StandardMaterial('texture1', scene);
  board6.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let board7 = MeshBuilder.CreateBox("box", {width: 0.4, height: 1.9, depth: 1, faceUV: genCubeFaceUV([0.24, 1.52, 0.24, 1.52, 1.52, 0.8, 1.52, 0.8, 0.8, 0.24, 0.8, 0.24])}, scene);
  board7.position.y = 4.65;
  board7.position.x = -1;
  board7.material = new StandardMaterial('texture1', scene);
  board7.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let slot1 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1, depth: 0.2, faceUV: genCubeFaceUV([0.16, 0.8, 0.16, 0.8, 0.8, 0.16, 0.8, 0.16, 0.8, 0.16, 0.8, 0.16])}, scene);
  slot1.position.y = 2.25;
  slot1.position.z = -2.4;
  slot1.position.x = 2.2;
  slot1.material = new StandardMaterial('texture1', scene);
  slot1.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

  let slot2 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1, depth: 0.2, faceUV: genCubeFaceUV([0.16, 0.8, 0.16, 0.8, 0.8, 0.16, 0.8, 0.16, 0.8, 0.16, 0.8, 0.16])}, scene);
  slot2.position.y = 2.25;
  slot2.position.z = -2.4;
  slot2.position.x = 1.8;
  slot2.material = new StandardMaterial('texture1', scene);
  slot2.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

  let slot3 = MeshBuilder.CreateBox("box", {width: 0.6, height: 0.2, depth: 0.2, faceUV: genCubeFaceUV([0.48, 0.16, 0.48, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.48, 0.16, 0.48])}, scene);
  slot3.position.y = 2.85;
  slot3.position.z = -2.4;
  slot3.position.x = 2;
  slot3.material = new StandardMaterial('texture1', scene);
  slot3.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

  let slot4 = MeshBuilder.CreateBox("box", {width: 0.6, height: 0.2, depth: 0.2, faceUV: genCubeFaceUV([0.48, 0.16, 0.48, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.48, 0.16, 0.48])}, scene);
  slot4.position.y = 1.65;
  slot4.position.z = -2.4;
  slot4.position.x = 2;
  slot4.material = new StandardMaterial('texture1', scene);
  slot4.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

  let slot5 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1, depth: 0.1}, scene);
  slot5.position.y = 2.25;
  slot5.position.z = -2.3;
  slot5.position.x = 2;
  slot5.material = new StandardMaterial('texture1', scene);
  slot5.material.diffuseColor = new Color3(0, 0, 0);

  let holder1 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.5, depth: 0.2, faceUV: genCubeFaceUV([0.16, 1.2, 0.16, 1.2, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16])}, scene);
  holder1.position.y = 2;
  holder1.position.z = -2.4;
  holder1.position.x = -2.2;
  holder1.material = new StandardMaterial('texture1', scene);
  holder1.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

  let holder2 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.5, depth: 0.2, faceUV: genCubeFaceUV([0.16, 1.2, 0.16, 1.2, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16])}, scene);
  holder2.position.y = 2;
  holder2.position.z = -2.4;
  holder2.position.x = -1.8;
  holder2.material = new StandardMaterial('texture1', scene);
  holder2.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

  let holder3 = MeshBuilder.CreateBox("box", {width: 0.6, height: 0.2, depth: 0.2, faceUV: genCubeFaceUV([0.48, 0.16, 0.48, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.48, 0.16, 0.48])}, scene);
  holder3.position.y = 2.85;
  holder3.position.z = -2.4;
  holder3.position.x = -2;
  holder3.material = new StandardMaterial('texture1', scene);
  holder3.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

  let holder4 = MeshBuilder.CreateBox("box", {width: 0.6, height: 0.2, depth: 0.2, faceUV: genCubeFaceUV([0.48, 0.16, 0.48, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.48, 0.16, 0.48])}, scene);
  holder4.position.y = 1.15;
  holder4.position.z = -2.4;
  holder4.position.x = -2;
  holder4.material = new StandardMaterial('texture1', scene);
  holder4.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

  let holder5 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.5, depth: 0.1}, scene);
  holder5.position.y = 2;
  holder5.position.z = -2.3;
  holder5.position.x = -2;
  holder5.material = new StandardMaterial('texture1', scene);
  holder5.material.diffuseColor = new Color3(0, 0, 0);

  let machine_barrier =  MeshBuilder.CreateBox("box", {width: 6, height: 10, depth: 3.2}, scene);
  machine_barrier.position.y = 5;
  machine_barrier.position.z = -0.9;
  machine_barrier.material = new StandardMaterial('texture1', scene);
  machine_barrier.material.diffuseColor = new Color3(0.29, 0.29, 0.29);
  machine_barrier.material.alpha = 0;

  let slot_machine = Mesh.MergeMeshes([machine, board1, board2, board3, board4, board5, board6, board7, slot1, slot2, slot3, slot4, slot5, holder1, holder2, holder3, holder4, holder5, machine_barrier], true, true, undefined, false, true);
  slot_machine.position.x = x;
  slot_machine.position.z = z;
  slot_machine.physicsImpostor = new PhysicsImpostor(machine_barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  slot_machine.checkCollisions = true;

  let machine_detector = MeshBuilder.CreateBox("box", {width: 6, height: 10, depth: 1}, scene);
  machine_detector.position.y = 5;
  machine_detector.position.x = x;
  machine_detector.position.z = z - 2.2;
  machine_detector.material = new StandardMaterial('texture1', scene);
  machine_detector.material.diffuseColor = new Color3(1, 0.12, 0.12);
  machine_detector.material.alpha = 0;
  machine_detector.name = "machineOb1";

  let backgroundPlane1 = MeshBuilder.CreatePlane("plane", {width: 1.6, height: 2}, scene);
  backgroundPlane1.position.y = 4.6;
  backgroundPlane1.position.x = x - 2;
  backgroundPlane1.position.z = z - 0.15;
  backgroundPlane1.material = new StandardMaterial('texture1', scene);
  backgroundPlane1.material.diffuseTexture = returnCrystalTexture("gem_white", scene);

  let backgroundPlane2 = MeshBuilder.CreatePlane("plane", {width: 1.6, height: 2}, scene);
  backgroundPlane2.position.y = 4.6;
  backgroundPlane2.position.x = x;
  backgroundPlane2.position.z = z - 0.15;
  backgroundPlane2.material = new StandardMaterial('texture1', scene);
  backgroundPlane2.material.diffuseTexture = returnCrystalTexture("gem_white", scene);

  let backgroundPlane3 = MeshBuilder.CreatePlane("plane", {width: 1.6, height: 2}, scene);
  backgroundPlane3.position.y = 4.6;
  backgroundPlane3.position.x = x + 2;
  backgroundPlane3.position.z = z - 0.15;
  backgroundPlane3.material = new StandardMaterial('texture1', scene);
  backgroundPlane3.material.diffuseTexture = returnCrystalTexture("gem_white", scene);

  let plane1 = MeshBuilder.CreatePlane("plane", {width: 1.6, height: 2}, scene);
  plane1.position.y = 4.6;
  plane1.position.x = x - 2;
  plane1.position.z = z - 0.25;
  plane1.name = "plane_1_Ob1";

  let plane2 = MeshBuilder.CreatePlane("plane", {width: 1.6, height: 2}, scene);
  plane2.position.y = 4.6;
  plane2.position.x = x;
  plane2.position.z = z - 0.25;
  plane2.name = "plane_2_Ob1";

  let plane3 = MeshBuilder.CreatePlane("plane", {width: 1.6, height: 2}, scene);
  plane3.position.y = 4.6;
  plane3.position.x = x + 2;
  plane3.position.z = z - 0.25;
  plane3.name = "plane_3_Ob1";

  let size = 256;
  let dynamicTexture = new DynamicTexture("DynamicTexture", size, scene);
  let font_size = 96;
  let font_type = "Arial";
  let font = font_size + "px " + font_type;

  dynamicTexture.drawText("", null, null, font, "#000000", "transparent", true);

  let mat = new StandardMaterial("mat", scene);
  mat.diffuseTexture = dynamicTexture;
  mat.diffuseTexture.hasAlpha = true;

  plane1.material = mat;
  plane2.material = mat;
  plane3.material = mat;

  let lever_support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 1.5, tessellation: 20}, scene);
  lever_support.position.y = 2.6;
  lever_support.rotation.x = 1.57;
  lever_support.material = new StandardMaterial('texture1', scene);
  lever_support.material.diffuseTexture = returnMetalTexture("metal_yellow", scene);

  let lever_handle = Mesh.CreateSphere("sphere", 8, 0.5, scene);
  lever_handle.position.y = 2.6;
  lever_handle.position.z = -0.75;
  lever_handle.rotation.x = 1.57;
  lever_handle.material = new StandardMaterial('texture1', scene);
  lever_handle.material.diffuseTexture = returnMetalTexture("metal_red", scene);

  let lever = Mesh.MergeMeshes([lever_support, lever_handle], true, true, undefined, false, true);
  lever.position.z = z - 2.3;
  lever.position.x = x - 2;
  lever.name = "slotLeverOb1";

  generateSign((x - 5), (z - 1.5), "signOb1", scene);
}

export {coinMatch};
