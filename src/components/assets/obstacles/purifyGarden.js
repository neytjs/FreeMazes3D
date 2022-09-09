import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {generatePortalPassage} from "../objects/generatePortalPassage.js";
import {returnMetalTexture, returnLiquidTexture, returnWallTexture, returnFloorTexture,
  returnWoodTexture, returnCrystalTexture, returnStoneTexture, returnTreeTexture,
  genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function purifyGarden(x, z, scene, global_objects, item_id, camera, global_language) {
  let fuel_pos = [{x: -48, z: 1000}, {x: 48, z: 1000}, {x: -48, z: 970}, {x: 48, z: 970}, {x: -48, z: 1030}, {x: 48, z: 1030}];
  fuel_pos = arrayShuffler(fuel_pos);
  fuel_pos = fuel_pos[0];

  let button_pos = [-15, 15];
  button_pos = arrayShuffler(button_pos);
  button_pos = button_pos[0];

  generatePortalPassage(scene, global_objects, "red", x, z, 0, "teleporterOb22a", "teleporter22", -45, 930, 14.5);
  generatePortalPassage(scene, global_objects, "red", -48.5, 930, 10.5, "teleporterOb22b", "teleporter22", (x + 5), z, 4);

  function generateTinyPineTree() {
    let trunk = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 2, tessellation: 8, wrap: true}, scene);
    trunk.position.y = 1;
    trunk.material = new StandardMaterial('texture1', scene);
    trunk.material.diffuseTexture = returnTreeTexture("bark_alpine", scene);
    trunk.material.diffuseTexture.uScale = 2;
    trunk.material.diffuseTexture.vScale = 2;

    let needles = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 4, height: 8, tessellation: 8, wrap: true}, scene);
    needles.position.y = 6;
    needles.material = new StandardMaterial('texture1', scene);
    needles.material.diffuseTexture = returnTreeTexture("needles_alpine", scene);
    needles.material.diffuseTexture.uScale = 5;
    needles.material.diffuseTexture.vScale = 5;

    let board1 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.5, depth: 4, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 2, 0.25, 2, 2, 0.125, 2, 0.125]), faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 2, 0.25, 2, 2, 0.125, 2, 0.125])}, scene);
    board1.position.y = 0.25;
    board1.position.x = 2;
    board1.material = new StandardMaterial('texture1', scene);
    board1.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board2 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.5, depth: 4, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 2, 0.25, 2, 2, 0.125, 2, 0.125])}, scene);
    board2.position.y = 0.25;
    board2.position.x = -2;
    board2.material = new StandardMaterial('texture1', scene);
    board2.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board3 = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.5, depth: 0.25, faceUV: genCubeFaceUV([1.75, 0.25, 1.75, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 1.75, 0.125, 1.75])}, scene);
    board3.position.y = 0.25;
    board3.position.z = 1.875;
    board3.material = new StandardMaterial('texture1', scene);
    board3.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board4 = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.5, depth: 0.25, faceUV: genCubeFaceUV([1.75, 0.25, 1.75, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 1.75, 0.125, 1.75])}, scene);
    board4.position.y = 0.25;
    board4.position.z = -1.875;
    board4.material = new StandardMaterial('texture1', scene);
    board4.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let dirt = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.25, depth: 3.5, faceUV: genCubeFaceUV([0, 0, 0, 0, 0, 0, 0, 0, 0.875, 0.9375, 0, 0])}, scene);
    dirt.position.y = 0.125;
    dirt.material = new StandardMaterial('texture1', scene);
    dirt.material.diffuseTexture = returnFloorTexture("soil", scene);

    let tree = Mesh.MergeMeshes([trunk, needles, board1, board2, board3, board4, dirt], true, true, undefined, false, true);

    return tree;
  }
  let tinyTree = generateTinyPineTree();
  tinyTree.isVisible = false;

  let newTinyTreeInstance1 = tinyTree.createInstance("tinyTree1");
  newTinyTreeInstance1.position.x = (x + 4);
  newTinyTreeInstance1.position.z = (z + 4);

  let newTinyTreeInstance2 = tinyTree.createInstance("tinyTree2");
  newTinyTreeInstance2.position.x = (x + 4);
  newTinyTreeInstance2.position.z = (z - 4);

  let newTinyTreeInstance3 = tinyTree.createInstance("tinyTree3");
  newTinyTreeInstance3.position.x = (x - 4);
  newTinyTreeInstance3.position.z = (z + 4);

  let newTinyTreeInstance4 = tinyTree.createInstance("tinyTree4");
  newTinyTreeInstance4.position.x = (x - 4);
  newTinyTreeInstance4.position.z = (z - 4);

  function generateTinyTreeBarrier(x, z) {
    let tinyTreeBarrier = MeshBuilder.CreateBox("box", {width: 4.25, height: 10, depth: 4}, scene);
    tinyTreeBarrier.position.y = 5;
    tinyTreeBarrier.position.x = x;
    tinyTreeBarrier.position.z = z;
    tinyTreeBarrier.material = new StandardMaterial('texture1', scene);
    tinyTreeBarrier.material.diffuseColor = new Color3(0.29, 0.18, 0.07);
    tinyTreeBarrier.material.alpha = 0;
    tinyTreeBarrier.physicsImpostor = new PhysicsImpostor(tinyTreeBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    tinyTreeBarrier.checkCollisions = true;
  }
  generateTinyTreeBarrier((x + 4), (z + 4));
  generateTinyTreeBarrier((x + 4), (z - 4));
  generateTinyTreeBarrier((x - 4), (z + 4));
  generateTinyTreeBarrier((x - 4), (z - 4));

  let gardenAreaFloor = MeshBuilder.CreateBox("box", {width: 100, height: 1, depth: 150}, scene);
  gardenAreaFloor.position.z = 1000;
  gardenAreaFloor.material = new StandardMaterial('texture1', scene);
  gardenAreaFloor.material.diffuseTexture = returnFloorTexture("stone_slabs_white", scene);
  gardenAreaFloor.material.diffuseTexture.uScale = 15;
  gardenAreaFloor.material.diffuseTexture.vScale = 10;
  gardenAreaFloor.physicsImpostor = new PhysicsImpostor(gardenAreaFloor, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  gardenAreaFloor.checkCollisions = true;
  gardenAreaFloor.name = "landableSurface";
  global_objects.push({id: gardenAreaFloor.uniqueId, obstacle22_id: item_id, type: "structure", name: ""});

  function generateGardenAreaWall(x, z, width, depth, scale) {
    let gardenAreaWall = MeshBuilder.CreateBox("box", {width: width, height: 20, depth: depth, wrap: true}, scene);
    gardenAreaWall.position.y = 9.5;
    gardenAreaWall.position.x = x;
    gardenAreaWall.position.z = z;
    gardenAreaWall.material = new StandardMaterial('texture1', scene);
    gardenAreaWall.material.diffuseTexture = returnWallTexture("stone_blocks_white", scene);
    gardenAreaWall.material.diffuseTexture.uScale = (scale / 10);
    gardenAreaWall.material.diffuseTexture.vScale = 2;
    gardenAreaWall.physicsImpostor = new PhysicsImpostor(gardenAreaWall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    gardenAreaWall.checkCollisions = true;
  }
  generateGardenAreaWall(-50.5, 1000, 1, 152, 152);
  generateGardenAreaWall(50.5, 1000, 1, 152, 152);
  generateGardenAreaWall(0, 924.5, 100, 1, 100);
  generateGardenAreaWall(0, 1075.5, 100, 1, 100);

  function generateGardenAreaPlatform(x, z) {
    let gardenAreaPlatform = MeshBuilder.CreateBox("box", {width: 10, height: 10, depth: 10, wrap: true}, scene);
    gardenAreaPlatform.position.y = 5.5;
    gardenAreaPlatform.position.x = x;
    gardenAreaPlatform.position.z = z;
    gardenAreaPlatform.material = new StandardMaterial('texture1', scene);
    gardenAreaPlatform.material.diffuseTexture = returnStoneTexture("stone_green", scene);
    gardenAreaPlatform.material.diffuseTexture.uScale = 5;
    gardenAreaPlatform.material.diffuseTexture.vScale = 5;
    gardenAreaPlatform.physicsImpostor = new PhysicsImpostor(gardenAreaPlatform, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    gardenAreaPlatform.checkCollisions = true;
  }
  generateGardenAreaPlatform(-45, 930);
  generateGardenAreaPlatform(45, 930);
  generateGardenAreaPlatform(45, 1070);
  generateGardenAreaPlatform(-45, 1070);
  generateGardenAreaPlatform(0, 1070);
  generateGardenAreaPlatform(0, 1000);
  generateGardenAreaPlatform(0, 930);

  function generateGardenAreaBridge(x, z, width, depth, scale) {
    let gardenAreaBridge = MeshBuilder.CreateBox("box", {width: width, height: 1, depth: depth, faceUV: scale}, scene);
    gardenAreaBridge.position.y = 10;
    gardenAreaBridge.position.x = x;
    gardenAreaBridge.position.z = z;
    gardenAreaBridge.material = new StandardMaterial('texture1', scene);
    gardenAreaBridge.material.diffuseTexture = returnWoodTexture("wood_brown", scene);
    gardenAreaBridge.physicsImpostor = new PhysicsImpostor(gardenAreaBridge, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    gardenAreaBridge.checkCollisions = true;
  }
  generateGardenAreaBridge(-22.5, 930, 35, 4, genCubeFaceUV([8.75, 0.25, 8.75, 0.25, 0.25, 1, 0.25, 1, 1, 8.75, 1, 8.75]));
  generateGardenAreaBridge(22.5, 930, 35, 4, genCubeFaceUV([8.75, 0.25, 8.75, 0.25, 0.25, 1, 0.25, 1, 1, 8.75, 1, 8.75]));
  generateGardenAreaBridge(-22.5, 1070, 35, 4, genCubeFaceUV([8.75, 0.25, 8.75, 0.25, 0.25, 1, 0.25, 1, 1, 8.75, 1, 8.75]));
  generateGardenAreaBridge(22.5, 1070, 35, 4, genCubeFaceUV([8.75, 0.25, 8.75, 0.25, 0.25, 1, 0.25, 1, 1, 8.75, 1, 8.75]));
  generateGardenAreaBridge(0, 965, 4, 60, genCubeFaceUV([1, 0.25, 1, 0.25, 0.25, 15, 0.25, 15, 15, 1, 15, 1]));
  generateGardenAreaBridge(0, 1035, 4, 60, genCubeFaceUV([1, 0.25, 1, 0.25, 0.25, 15, 0.25, 15, 15, 1, 15, 1]));

  function generateGardenDrain(z, drain_name) {
    let rim = MeshBuilder.CreateTorus("torus", {diameter: 5, thickness: 1}, scene);
    rim.position.y = 0.5;
    rim.material = new StandardMaterial('texture1', scene);
    rim.material.diffuseTexture = returnMetalTexture("iron", scene);
    rim.material.diffuseTexture.uScale = 4;
    rim.material.diffuseTexture.vScale = 1;

    let hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 4.5, height: 0.5, tessellation: 20}, scene);
    hole.position.y = 0.3;
    hole.material = new StandardMaterial('texture1', scene);
    hole.material.diffuseColor = new Color3(0, 0, 0);

    let drain = Mesh.MergeMeshes([rim, hole], true, true, undefined, false, true);
    drain.position.z = z;
    drain.rotation.x = 0;

    let barrier = MeshBuilder.CreateBox("box", {width: 5, height: 9, depth: 5}, scene);
    barrier.position.y = 5;
    barrier.position.z = z;
    barrier.rotation.x = 0;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.diffuseColor = new Color3(0.29, 0.18, 0.07);
    barrier.material.alpha = 0;
    barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    barrier.checkCollisions = true;
    barrier.name = drain_name;
  }
  generateGardenDrain(1035, "drainOb22a");
  generateGardenDrain(965, "drainOb22b");

  function generateGardenGroveEnclosure(x, z) {
    let board1 = MeshBuilder.CreateBox("box", {width: 0.5, height: 1, depth: 100, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 25, 0.25, 25, 25, 0.125, 25, 0.125])}, scene);
    board1.position.y = 1;
    board1.position.x = 0;
    board1.material = new StandardMaterial('texture1', scene);
    board1.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board2 = MeshBuilder.CreateBox("box", {width: 0.5, height: 1, depth: 100, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 25, 0.25, 25, 25, 0.125, 25, 0.125])}, scene);
    board2.position.y = 1;
    board2.position.x = 20;
    board2.material = new StandardMaterial('texture1', scene);
    board2.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board3 = MeshBuilder.CreateBox("box", {width: 20.5, height: 1, depth: 0.5, faceUV: genCubeFaceUV([5, 0.25, 5, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 5, 0.125, 5])}, scene);
    board3.position.y = 1;
    board3.position.x = 10;
    board3.position.z = 50.25;
    board3.material = new StandardMaterial('texture1', scene);
    board3.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board4 = MeshBuilder.CreateBox("box", {width: 20.5, height: 1, depth: 0.5, faceUV: genCubeFaceUV([5, 0.25, 5, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 5, 0.125, 5])}, scene);
    board4.position.y = 1;
    board4.position.x = 10;
    board4.position.z = -50.25;
    board4.material = new StandardMaterial('texture1', scene);
    board4.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let barrier = MeshBuilder.CreateBox("box", {width: 20.5, height: 20, depth: 101}, scene);
    barrier.position.y = 10;
    barrier.position.x = 10;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.alpha = 0;

    let enclosure = Mesh.MergeMeshes([board1, board2, board3, board4, barrier], true, true, undefined, false, true);
    enclosure.position.z = z;
    enclosure.position.x = x;
    enclosure.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    enclosure.checkCollisions = true;
  }
  generateGardenGroveEnclosure(-45, 1000);
  generateGardenGroveEnclosure(25, 1000);

  function generateGardenGroveDirt(x, z, dirt_name) {
    let dirt = MeshBuilder.CreateBox("box", {width: 19.5, height: 0.5, depth: 100}, scene);
    dirt.position.y = 0.5;
    dirt.position.x = x;
    dirt.position.z = z;
    dirt.material = new StandardMaterial('texture1', scene);
    dirt.material.diffuseTexture = returnFloorTexture("soil_haunted", scene);
    dirt.material.diffuseTexture.uScale = 10;
    dirt.material.diffuseTexture.vScale = 1.95;
    dirt.name = dirt_name;
  }
  generateGardenGroveDirt(-35, 1000, "groveDirtOb22a");
  generateGardenGroveDirt(35, 1000, "groveDirtOb22b");

  function generateGroveTreeTrunks(x, z, trunks_name) {
    let trunk1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 8, height: 16, tessellation: 20, wrap: true}, scene);
    trunk1.position.y = 8;
    trunk1.position.z = 35;

    let trunk2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 8, height: 16, tessellation: 20, wrap: true}, scene);
    trunk2.position.y = 8;

    let trunk3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 8, height: 16, tessellation: 20, wrap: true}, scene);
    trunk3.position.y = 8;
    trunk3.position.z = -35;

    let trunks = Mesh.MergeMeshes([trunk1, trunk2, trunk3], true, true, undefined, false, true);
    trunks.position.x = x;
    trunks.position.z = z;
    trunks.material = new StandardMaterial('texture1', scene);
    trunks.material.diffuseTexture = returnTreeTexture("bark_pine_big_haunted", scene);
    trunks.material.diffuseTexture.uScale = 6;
    trunks.material.diffuseTexture.vScale = 6;
    trunks.name = trunks_name;

    let sphere1t1 = Mesh.CreateSphere("barrier", 8, 4, scene);
    sphere1t1.position.x = x;
    sphere1t1.position.z = 1000;
    sphere1t1.material = new StandardMaterial('texture1', scene);
    sphere1t1.material.diffuseColor = new Color3(0, 1, 0.16);
    sphere1t1.material.specularColor = new Color3(0, 1, 0.16);
    sphere1t1.material.emissiveColor = new Color3(0, 1, 0.16);
    sphere1t1.material.ambientColor = new Color3(0, 1, 0.16);
    sphere1t1.material.alpha = 0.2;
    sphere1t1.name = trunks_name + "t1" + "SpecialEffect1";

    let sphere2t1 = Mesh.CreateSphere("barrier", 8, 4, scene);
    sphere2t1.position.x = x;
    sphere2t1.position.z = 1000;
    sphere2t1.material = new StandardMaterial('texture1', scene);
    sphere2t1.material.diffuseColor = new Color3(0.1, 0.89, 0.76);
    sphere2t1.material.specularColor = new Color3(0.1, 0.89, 0.76);
    sphere2t1.material.emissiveColor = new Color3(0.1, 0.89, 0.76);
    sphere2t1.material.ambientColor = new Color3(0.1, 0.89, 0.76);
    sphere2t1.material.alpha = 0.2;
    sphere2t1.name = trunks_name + "t1" + "SpecialEffect2";

    let sphere1t2 = Mesh.CreateSphere("barrier", 8, 4, scene);
    sphere1t2.position.x = x;
    sphere1t2.position.z = 1035;
    sphere1t2.material = new StandardMaterial('texture1', scene);
    sphere1t2.material.diffuseColor = new Color3(0, 1, 0.16);
    sphere1t2.material.specularColor = new Color3(0, 1, 0.16);
    sphere1t2.material.emissiveColor = new Color3(0, 1, 0.16);
    sphere1t2.material.ambientColor = new Color3(0, 1, 0.16);
    sphere1t2.material.alpha = 0.2;
    sphere1t2.name = trunks_name + "t2" + "SpecialEffect1";

    let sphere2t2 = Mesh.CreateSphere("barrier", 8, 4, scene);
    sphere2t2.position.x = x;
    sphere2t2.position.z = 1035;
    sphere2t2.material = new StandardMaterial('texture1', scene);
    sphere2t2.material.diffuseColor = new Color3(0.1, 0.89, 0.76);
    sphere2t2.material.specularColor = new Color3(0.1, 0.89, 0.76);
    sphere2t2.material.emissiveColor = new Color3(0.1, 0.89, 0.76);
    sphere2t2.material.ambientColor = new Color3(0.1, 0.89, 0.76);
    sphere2t2.material.alpha = 0.2;
    sphere2t2.name = trunks_name + "t2" + "SpecialEffect2";

    let sphere1t3 = Mesh.CreateSphere("barrier", 8, 4, scene);
    sphere1t3.position.x = x;
    sphere1t3.position.z = 965;
    sphere1t3.material = new StandardMaterial('texture1', scene);
    sphere1t3.material.diffuseColor = new Color3(0, 1, 0.16);
    sphere1t3.material.specularColor = new Color3(0, 1, 0.16);
    sphere1t3.material.emissiveColor = new Color3(0, 1, 0.16);
    sphere1t3.material.ambientColor = new Color3(0, 1, 0.16);
    sphere1t3.material.alpha = 0.2;
    sphere1t3.name = trunks_name + "t3" + "SpecialEffect1";

    let sphere2t3 = Mesh.CreateSphere("barrier", 8, 4, scene);
    sphere2t3.position.x = x;
    sphere2t3.position.z = 965;
    sphere2t3.material = new StandardMaterial('texture1', scene);
    sphere2t3.material.diffuseColor = new Color3(0.1, 0.89, 0.76);
    sphere2t3.material.specularColor = new Color3(0.1, 0.89, 0.76);
    sphere2t3.material.emissiveColor = new Color3(0.1, 0.89, 0.76);
    sphere2t3.material.ambientColor = new Color3(0.1, 0.89, 0.76);
    sphere2t3.material.alpha = 0.2;
    sphere2t3.name = trunks_name + "t3" + "SpecialEffect2";
  }
  generateGroveTreeTrunks(-35, 1000, "groveTrunksOb22a");
  generateGroveTreeTrunks(35, 1000, "groveTrunksOb22b");

  function generateGroveTreeNeedles(x, z, needles_name) {
    let needles1 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 28, height: 64, tessellation: 8, wrap: true}, scene);
    needles1.position.y = 48;
    needles1.position.z = 35;

    let needles2 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 28, height: 64, tessellation: 8, wrap: true}, scene);
    needles2.position.y = 48;

    let needles3 = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 28, height: 64, tessellation: 8, wrap: true}, scene);
    needles3.position.y = 48;
    needles3.position.z = -35;

    let needles = Mesh.MergeMeshes([needles1, needles2, needles3], true, true, undefined, false, true);
    needles.position.x = x;
    needles.position.z = z;
    needles.material = new StandardMaterial('texture1', scene);
    needles.material.diffuseTexture = returnTreeTexture("needles_pine_haunted", scene);
    needles.material.diffuseTexture.uScale = 15;
    needles.material.diffuseTexture.vScale = 15;
    needles.name = needles_name;
  }
  generateGroveTreeNeedles(-35, 1000, "groveNeedlesOb22a");
  generateGroveTreeNeedles(35, 1000, "groveNeedlesOb22b");

  let buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder1.position.y = 1.5;
  buttonHolder1.position.x = button_pos;
  buttonHolder1.position.z = 1000;
  buttonHolder1.material = new StandardMaterial('texture1', scene);
  buttonHolder1.material.diffuseTexture = returnMetalTexture("iron", scene);
  buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder1.checkCollisions = true;

  let buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier1.position.y = 5;
  buttonBarrier1.position.x = button_pos;
  buttonBarrier1.position.z = 1000;
  buttonBarrier1.material = new StandardMaterial('texture1', scene);
  buttonBarrier1.material.alpha = 0;
  buttonBarrier1.name = "button1p22";

  let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton1.position.y = 3.25;
  pushButton1.position.x = button_pos;
  pushButton1.position.z = 1000;
  pushButton1.material = new StandardMaterial('texture1', scene);
  pushButton1.material.diffuseTexture = returnCrystalTexture("gem_darkred", scene);
  pushButton1.name = "pushButton1p22";

  let buttonBarrierRim = MeshBuilder.CreateTorus("torus", {diameter: 9, thickness: 0.5}, scene);
  buttonBarrierRim.position.y = 0.5;
  buttonBarrierRim.position.x = button_pos;
  buttonBarrierRim.position.z = 1000;
  buttonBarrierRim.material = new StandardMaterial('texture1', scene);
  buttonBarrierRim.material.diffuseTexture = returnMetalTexture("iron_tan", scene);
  buttonBarrierRim.material.diffuseTexture.uScale = 8;
  buttonBarrierRim.material.diffuseTexture.vScale = 1;

  let buttonBarrierVisible = Mesh.CreateSphere("sphere", 8, 9, scene);
  buttonBarrierVisible.position.x = button_pos;
  buttonBarrierVisible.position.z = 1000;
  buttonBarrierVisible.material = new StandardMaterial('texture1', scene);
  buttonBarrierVisible.material.diffuseTexture = returnLiquidTexture("acid_purple", scene);
  buttonBarrierVisible.physicsImpostor = new PhysicsImpostor(buttonBarrierVisible, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonBarrierVisible.checkCollisions = true;
  buttonBarrierVisible.name = "finalButtonBarrierVisibleOb22";

  let buttonBarrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 10, height: 2, tessellation: 20}, scene);
  buttonBarrier.position.y = 2;
  buttonBarrier.position.x = button_pos;
  buttonBarrier.position.z = 1000;
  buttonBarrier.material = new StandardMaterial('texture1', scene);
  buttonBarrier.material.alpha = 0;
  buttonBarrier.physicsImpostor = new PhysicsImpostor(buttonBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonBarrier.checkCollisions = true;
  buttonBarrier.name = "finalButtonBarrierOb22";

  function generateWheel(x, z, wheel_name) {
    let wheel_main = MeshBuilder.CreateTorus("torus", {diameter: 5, thickness: 0.55}, scene);
    wheel_main.position.y = 13;
    wheel_main.material = new StandardMaterial('texture1', scene);
    wheel_main.material.diffuseTexture = returnMetalTexture("silver", scene);
    wheel_main.material.diffuseTexture.uScale = 6;
    wheel_main.material.diffuseTexture.vScale = 1;

    let wheel_bar1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 5, tessellation: 20, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 2.5, 0.25, 0.25])}, scene);
    wheel_bar1.rotation.x = 1.57;
    wheel_bar1.position.y = 13;
    wheel_bar1.material = new StandardMaterial('texture1', scene);
    wheel_bar1.material.diffuseTexture = returnMetalTexture("silver", scene);

    let wheel_bar2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 5, tessellation: 20, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 2.5, 0.25, 0.25])}, scene);
    wheel_bar2.rotation.x = 1.57;
    wheel_bar2.rotation.z = 1.57;
    wheel_bar2.position.y = 13;
    wheel_bar2.material = new StandardMaterial('texture1', scene);
    wheel_bar2.material.diffuseTexture = returnMetalTexture("silver", scene);

    let wheel_support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3, tessellation: 20, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
    wheel_support.position.y = 11.5;
    wheel_support.material = new StandardMaterial('texture1', scene);
    wheel_support.material.diffuseTexture = returnMetalTexture("iron", scene);

    let wheel = Mesh.MergeMeshes([wheel_main, wheel_bar1, wheel_bar2, wheel_support], true, true, undefined, false, true);
    wheel.position.x = x;
    wheel.position.z = z;
    wheel.name = wheel_name;
  }
  generateWheel(-45, 1070, "Ob22_wheel1");

  function generateWheelBaseBarrier(x, z, wheel_base_name) {
    let wheel_base = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.7, height: 0.25, tessellation: 20, faceUV: genCylinderFaceUV([0.35, 0.35, 1, 0.125, 0.35, 0.35])}, scene);
    wheel_base.position.y = 10.5;
    wheel_base.material = new StandardMaterial('texture1', scene);
    wheel_base.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let barrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.5, height: 10, tessellation: 20}, scene);
    barrier.position.y = 15;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.alpha = 0;

    let wheel_base_barrier = Mesh.MergeMeshes([wheel_base, barrier], true, true, undefined, false, true);
    wheel_base_barrier.position.x = x;
    wheel_base_barrier.position.z = z;
    wheel_base_barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    wheel_base_barrier.checkCollisions = true;
    wheel_base_barrier.name = wheel_base_name;
  }
  generateWheelBaseBarrier(-45, 1070, "base_Ob22_wheel1");

  function generateFuelTank(x, z, y, global_objects) {
    let tankMain = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 2, tessellation: 20, faceUV: genCylinderFaceUV([1.5, 1.5, 6, 1.5, 1.5, 1.5])}, scene);
    tankMain.position.y = 1.5;
    tankMain.material = new StandardMaterial('texture1', scene);
    tankMain.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

    let tankRim1 = MeshBuilder.CreateTorus("torus", {diameter: 1.5, thickness: 0.15});
    tankRim1.position.y = 2.5;
    tankRim1.material = new StandardMaterial('texture1', scene);
    tankRim1.material.diffuseTexture = returnMetalTexture("iron_tan", scene);
    tankRim1.material.diffuseTexture.uScale = 2.5;
    tankRim1.material.diffuseTexture.vScale = 1;

    let tankRim2 = MeshBuilder.CreateTorus("torus", {diameter: 1.5, thickness: 0.15});
    tankRim2.position.y = 1.5;
    tankRim2.material = new StandardMaterial('texture1', scene);
    tankRim2.material.diffuseTexture = returnMetalTexture("iron_tan", scene);
    tankRim2.material.diffuseTexture.uScale = 2.5;
    tankRim2.material.diffuseTexture.vScale = 1;

    let tankRim3 = MeshBuilder.CreateTorus("torus", {diameter: 1.5, thickness: 0.15});
    tankRim3.position.y = 0.5;
    tankRim3.material = new StandardMaterial('texture1', scene);
    tankRim3.material.diffuseTexture = returnMetalTexture("iron_tan", scene);
    tankRim3.material.diffuseTexture.uScale = 2.5;
    tankRim3.material.diffuseTexture.vScale = 1;

    let tankBarrier = MeshBuilder.CreateBox("box", {width: 3, height: 10, depth: 3}, scene);
    tankBarrier.position.y = 5;
    tankBarrier.material = new StandardMaterial('texture1', scene);
    tankBarrier.material.alpha = 0;

    let tank = Mesh.MergeMeshes([tankMain, tankRim1, tankRim2, tankRim3, tankBarrier], true, true, undefined, false, true);
    tank.position.x = x;
    tank.position.z = z;
    tank.position.y = y;
    tank.physicsImpostor = new PhysicsImpostor(tankBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    tank.checkCollisions = true;
    tank.name = "fuelTankOb22";

    global_objects.push({id: tank.uniqueId, type: "fuelTankOb22", name: "fuel_tank", inventory: global_language.text.items.puzzles.purify.fuel_tank, img: "fuel_tank"});

    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
     tank.rotate(axis, angle, 1);
    });
  }
  generateFuelTank(fuel_pos.x, fuel_pos.z, 1.5, global_objects);

  let gardenAreaLiquid = MeshBuilder.CreateBox("box", {width: 100, height: 8, depth: 150}, scene);
  gardenAreaLiquid.position.z = 1000;
  gardenAreaLiquid.position.y = 4.5;
  gardenAreaLiquid.material = new StandardMaterial('texture1', scene);
  gardenAreaLiquid.material.diffuseTexture = returnLiquidTexture("acid_green", scene);
  gardenAreaLiquid.material.diffuseTexture.uScale = 15;
  gardenAreaLiquid.material.diffuseTexture.vScale = 10;
  gardenAreaLiquid.material.alpha = 0.85;
  gardenAreaLiquid.physicsImpostor = new PhysicsImpostor(gardenAreaLiquid, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  gardenAreaLiquid.checkCollisions = true;
  gardenAreaLiquid.name = "liquidOb22";
  global_objects.push({id: gardenAreaLiquid.uniqueId, type: "acid", exit_pos: {x: (x + 5), z: z, y: 4}});

  function generatePurificationGem(x, z, y, global_objects) {
    let pyramid = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 1, height: 1, tessellation: 4}, scene);
    pyramid.position.y = 4;
    pyramid.material = new StandardMaterial('texture1', scene);
    pyramid.material.diffuseColor = new Color3(1, 1, 1);
    pyramid.material.diffuseTexture = returnCrystalTexture("gem_white", scene);

    let pyramid2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 1, height: 1, tessellation: 4}, scene);
    pyramid2.position.y = 3;
    pyramid2.material = new StandardMaterial('texture1', scene);
    pyramid2.material.diffuseColor = new Color3(1, 1, 1);
    pyramid2.material.diffuseTexture = returnCrystalTexture("gem_white", scene);

    let gem_barrier = MeshBuilder.CreateBox("barrier", {width: 2.5, height: 10, depth: 2.5}, scene);
    gem_barrier.position.y = 5;
    gem_barrier.material = new StandardMaterial('texture1', scene);
    gem_barrier.material.diffuseColor = new Color3(1, 1, 1);
    gem_barrier.material.alpha = 0;

    let gem = Mesh.MergeMeshes([pyramid, pyramid2, gem_barrier], true, true, undefined, false, true);
    gem.position.y = y;
    gem.position.x = x;
    gem.position.z = z;
    gem.physicsImpostor = new PhysicsImpostor(gem_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    gem.checkCollisions = true;
    gem.name = "purificationGemOb22";

    global_objects.push({id: gem.uniqueId, type: "purificationGemOb22", name: "purification_gem", inventory: global_language.text.items.puzzles.purify.gem, img: "purification_gem"});

    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
     gem.rotate(axis, angle, 1);
    });
  }
  generatePurificationGem(45, 930, 10, global_objects);

  function generateGardenAreaLadder(x, z, y) {
    let rail1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
    rail1.position.y = 3.25;
    rail1.material = new StandardMaterial('texture1', scene);
    rail1.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

    let rail2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 5, 0.25, 0.25])}, scene);
    rail2.position.y = 3.25;
    rail2.position.x = -2;
    rail2.material = new StandardMaterial('texture1', scene);
    rail2.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

    let rung = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
    rung.position.y = -1.25;
    rung.position.x = -1;
    rung.rotation.z = Math.PI / 2;
    rung.material = new StandardMaterial('texture1', scene);
    rung.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

    let rung1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
    rung1.position.y = 0.25;
    rung1.position.x = -1;
    rung1.rotation.z = Math.PI / 2;
    rung1.material = new StandardMaterial('texture1', scene);
    rung1.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

    let rung2 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
    rung2.position.y = 1.75;
    rung2.position.x = -1;
    rung2.rotation.z = Math.PI / 2;
    rung2.material = new StandardMaterial('texture1', scene);
    rung2.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

    let rung3 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
    rung3.position.y = 3.25;
    rung3.position.x = -1;
    rung3.rotation.z = Math.PI / 2;
    rung3.material = new StandardMaterial('texture1', scene);
    rung3.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

    let rung4 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
    rung4.position.y = 4.75;
    rung4.position.x = -1;
    rung4.rotation.z = Math.PI / 2;
    rung4.material = new StandardMaterial('texture1', scene);
    rung4.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

    let rung5 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
    rung5.position.y = 6.25;
    rung5.position.x = -1;
    rung5.rotation.z = Math.PI / 2;
    rung5.material = new StandardMaterial('texture1', scene);
    rung5.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

    let rung6 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.5, diameterBottom: 0.5, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.5, 0.25, 0.25])}, scene);
    rung6.position.y = 7.75;
    rung6.position.x = -1;
    rung6.rotation.z = Math.PI / 2;
    rung6.material = new StandardMaterial('texture1', scene);
    rung6.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

    let ladderBarrier = MeshBuilder.CreateBox("box", {width: 3, height: 10, depth: 1}, scene);
    ladderBarrier.position.y = 3.25;
    ladderBarrier.position.x = -1;
    ladderBarrier.material = new StandardMaterial('texture1', scene);
    ladderBarrier.material.alpha = 0;

    let ladder = Mesh.MergeMeshes([rail1, rail2, rung, rung1, rung2, rung3, rung4, rung5, rung6, ladderBarrier], true, true, undefined, false, true);
    ladder.position.y = y;
    ladder.position.x = x;
    ladder.position.z = z;
    ladder.physicsImpostor = new PhysicsImpostor(ladderBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    ladder.checkCollisions = true;
    ladder.name = "climbingLadder";
    global_objects.push({id: ladder.uniqueId, type: "ladder", exit_pos: {x: (x - 1), z: (z + 0.5), y: 14.5}});
  }
  generateGardenAreaLadder(-44, 1064.75, 2.25);

  function generateGardenAreaMachine(x, z, y) {
    let machine_main = MeshBuilder.CreateBox("box", {width: 8, height: 4.5, depth: 3, wrap: true, faceUV: genCubeFaceUV([4, 3.12, 4, 3.12, 2.25, 3.12, 2.25, 3.12, 2.25, 4, 2.25, 4])}, scene);
    machine_main.position.y = 2.25;
    machine_main.material = new StandardMaterial('texture1', scene);
    machine_main.material.diffuseTexture = returnMetalTexture("iron_medium", scene);

    let pipe = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 2, tessellation: 12}, scene);
    pipe.position.y = 5;
    pipe.position.x = -2;
    pipe.material = new StandardMaterial('texture1', scene);
    pipe.material.diffuseTexture = returnMetalTexture("iron", scene);
    pipe.material.diffuseTexture.uScale = 2;
    pipe.material.diffuseTexture.vScale = 2;

    let rim = MeshBuilder.CreateTorus("torus", {diameter: 1.5, thickness: 0.25});
    rim.position.y = 6;
    rim.position.x = -2;
    rim.material = new StandardMaterial('texture1', scene);
    rim.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
    rim.material.diffuseTexture.uScale = 2.75;
    rim.material.diffuseTexture.vScale = 1;

    let holder1 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.5, depth: 0.2, faceUV: genCubeFaceUV([0.16, 1.2, 0.16, 1.2, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16])}, scene);
    holder1.position.y = 3;
    holder1.position.x = -2.2;
    holder1.position.z = -1.6;
    holder1.material = new StandardMaterial('texture1', scene);
    holder1.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

    let holder2 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.5, depth: 0.2, faceUV: genCubeFaceUV([0.16, 1.2, 0.16, 1.2, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16])}, scene);
    holder2.position.y = 3;
    holder2.position.x = -1.8;
    holder2.position.z = -1.6;
    holder2.material = new StandardMaterial('texture1', scene);
    holder2.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

    let holder3 = MeshBuilder.CreateBox("box", {width: 0.6, height: 0.2, depth: 0.2, faceUV: genCubeFaceUV([0.48, 0.16, 0.48, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.48, 0.16, 0.48])}, scene);
    holder3.position.y = 3.85;
    holder3.position.x = -2;
    holder3.position.z = -1.6;
    holder3.material = new StandardMaterial('texture1', scene);
    holder3.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

    let holder4 = MeshBuilder.CreateBox("box", {width: 0.6, height: 0.2, depth: 0.2, faceUV: genCubeFaceUV([0.48, 0.16, 0.48, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.48, 0.16, 0.48])}, scene);
    holder4.position.y = 2.15;
    holder4.position.x = -2;
    holder4.position.z = -1.6;
    holder4.material = new StandardMaterial('texture1', scene);
    holder4.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

    let holder5 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.5, depth: 0.1}, scene);
    holder5.position.y = 3;
    holder5.position.x = -2;
    holder5.position.z = -1.5;
    holder5.material = new StandardMaterial('texture1', scene);
    holder5.material.diffuseColor = new Color3(0, 0, 0);

    let slot1 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.5, depth: 0.2, faceUV: genCubeFaceUV([0.16, 1.2, 0.16, 1.2, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16])}, scene);
    slot1.position.y = 3;
    slot1.position.x = 2.6;
    slot1.position.z = -1.6;
    slot1.material = new StandardMaterial('texture1', scene);
    slot1.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

    let slot2 = MeshBuilder.CreateBox("box", {width: 0.2, height: 1.5, depth: 0.2, faceUV: genCubeFaceUV([0.16, 1.2, 0.16, 1.2, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16, 1.2, 0.16])}, scene);
    slot2.position.y = 3;
    slot2.position.x = 1.4;
    slot2.position.z = -1.6;
    slot2.material = new StandardMaterial('texture1', scene);
    slot2.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

    let slot3 = MeshBuilder.CreateBox("box", {width: 1.4, height: 0.2, depth: 0.2, faceUV: genCubeFaceUV([1.12, 0.16, 1.12, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 1.12, 0.16, 1.12])}, scene);
    slot3.position.y = 3.85;
    slot3.position.x = 2;
    slot3.position.z = -1.6;
    slot3.material = new StandardMaterial('texture1', scene);
    slot3.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

    let slot4 = MeshBuilder.CreateBox("box", {width: 1.4, height: 0.2, depth: 0.2, faceUV: genCubeFaceUV([1.12, 0.16, 1.12, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 1.12, 0.16, 1.12])}, scene);
    slot4.position.y = 2.15;
    slot4.position.x = 2;
    slot4.position.z = -1.6;
    slot4.material = new StandardMaterial('texture1', scene);
    slot4.material.diffuseTexture = returnMetalTexture("iron_tan", scene);

    let slot5 = MeshBuilder.CreateBox("box", {width: 1, height: 1.5, depth: 0.1}, scene);
    slot5.position.y = 3;
    slot5.position.x = 2;
    slot5.position.z = -1.5;
    slot5.material = new StandardMaterial('texture1', scene);
    slot5.material.diffuseColor = new Color3(0, 0, 0);

    let machine = Mesh.MergeMeshes([machine_main, pipe, rim, holder1, holder2, holder3, holder4, holder5, slot1, slot2, slot3, slot4, slot5], true, true, undefined, false, true);
    machine.position.y = y;
    machine.position.x = x;
    machine.position.z = z;

    let lever_support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 1.5, tessellation: 20}, scene);
    lever_support.position.y = 3.6;
    lever_support.rotation.x = 1.57;
    lever_support.material = new StandardMaterial('texture1', scene);
    lever_support.material.diffuseTexture = returnMetalTexture("metal_yellow", scene);

    let lever_handle = Mesh.CreateSphere("sphere", 8, 0.5, scene);
    lever_handle.position.y = 3.6;
    lever_handle.position.z = -0.75;
    lever_handle.rotation.x = 1.57;
    lever_handle.material = new StandardMaterial('texture1', scene);
    lever_handle.material.diffuseTexture = returnMetalTexture("metal_red", scene);

    let lever = Mesh.MergeMeshes([lever_support, lever_handle], true, true, undefined, false, true);
    lever.position.y = y;
    lever.position.z = z - 1.5;
    lever.position.x = x - 2;
    lever.name = "handleLeverOb22";

    let leverBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 9, depth: 2}, scene);
    leverBarrier.position.y = 15;
    leverBarrier.position.z = z - 1.75;
    leverBarrier.position.x = x - 2;
    leverBarrier.material = new StandardMaterial('texture1', scene);
    leverBarrier.material.diffuseColor = new Color3(1, 1, 0);
    leverBarrier.material.alpha = 0;
    leverBarrier.name = "handleLeverBarrierOb22";

    let slotBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 9, depth: 2}, scene);
    slotBarrier.position.y = 15;
    slotBarrier.position.z = z - 1.75;
    slotBarrier.position.x = x + 2;
    slotBarrier.material = new StandardMaterial('texture1', scene);
    slotBarrier.material.diffuseColor = new Color3(1, 1, 0);
    slotBarrier.material.alpha = 0;
    slotBarrier.name = "slotBarrierOb22";

    let barrier = MeshBuilder.CreateBox("box", {width: 8, height: 9, depth: 3}, scene);
    barrier.position.y = 15;
    barrier.position.x = x;
    barrier.position.z = z;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.diffuseColor = new Color3(1, 0, 0);
    barrier.material.alpha = 0;
    barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    barrier.checkCollisions = true;

    let spawnPoint1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 2, height: 0.2, tessellation: 20, faceUV: genCylinderFaceUV([1, 1, 4, 0.2, 1, 1])}, scene);
    spawnPoint1.position.y = 10.6;
    spawnPoint1.position.x = x + 2;
    spawnPoint1.position.z = z - 3.5;
    spawnPoint1.material = new StandardMaterial('texture1', scene);
    spawnPoint1.material.diffuseTexture = returnMetalTexture("copper", scene);

    let spawnPoint2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 2, height: 0.2, tessellation: 20, faceUV: genCylinderFaceUV([1, 1, 4, 0.2, 1, 1])}, scene);
    spawnPoint2.position.y = 10.6;
    spawnPoint2.position.x = x + 2;
    spawnPoint2.position.z = z - 6.5;
    spawnPoint2.material = new StandardMaterial('texture1', scene);
    spawnPoint2.material.diffuseTexture = returnMetalTexture("copper", scene);

    let top = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.45, height: 0.025, tessellation: 20}, scene);
    top.position.y = 16.55;
    top.position.x = x - 2;
    top.position.z = z;
    top.material = new StandardMaterial('texture1', scene);
    top.material.diffuseColor = new Color3(1, 0, 0);
    top.material.alpha = 0;
    top.name = "top_ob22";
  }
  generateGardenAreaMachine(46, 1073.5, 10);

  function generatePurificationGemPowder(global_objects, scene, num, spawn_x, spawn_z) {
    let magicPowder = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 0.6, tessellation: 20, faceUV: genCylinderFaceUV([0.6, 0.6, 2, 1, 0.6, 0.6])}, scene);
    magicPowder.position.y = 2.9;
    magicPowder.material = new StandardMaterial('texture1', scene);
    magicPowder.material.diffuseTexture = returnCrystalTexture("gem_white", scene);

    let glassContainer = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.9, height: 0.9, tessellation: 20}, scene);
    glassContainer.position.y = 3;
    glassContainer.material = new StandardMaterial('texture1', scene);
    glassContainer.material.diffuseColor = new Color3(0.46, 0.82, 0.84);
    glassContainer.material.alpha = 0.3;

    let glassContainerCork = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 0.25, tessellation: 20, faceUV: genCylinderFaceUV([0.35, 0.35, 1, 0.25, 0.35, 0.35])}, scene);
    glassContainerCork.position.y = 3.45;
    glassContainerCork.material = new StandardMaterial('texture1', scene);
    glassContainerCork.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let glassContainerBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
    glassContainerBarrier.position.y = 5;
    glassContainerBarrier.material = new StandardMaterial('texture1', scene);
    glassContainerBarrier.material.diffuseColor = new Color3(0.34, 0.32, 0.32);
    glassContainerBarrier.material.alpha = 0;

    let powder = Mesh.MergeMeshes([magicPowder, glassContainer, glassContainerCork, glassContainerBarrier], true, true, undefined, false, true);
    powder.physicsImpostor = new PhysicsImpostor(glassContainerBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    powder.checkCollisions = true;
    powder.position.y = -1000;
    powder.position.x = spawn_x;
    powder.position.z = spawn_z;
    powder.name = "purificationGemPowderOb22_" + num;
    global_objects.push({id: powder.uniqueId, type: "purificationGemPowderOb22", name: "purification_powder", inventory: global_language.text.items.puzzles.purify.powder, img: "purification_powder"});

    let axis = new Vector3(0, 6, 0);
    let angle = 0.02;
    scene.registerAfterRender(function () {
     powder.rotate(axis, angle, 1);
    });
  }
  generatePurificationGemPowder(global_objects, scene, 1, 48, 1070);
  generatePurificationGemPowder(global_objects, scene, 2, 48, 1067);
}

export {purifyGarden};
