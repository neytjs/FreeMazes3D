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
import {setBridgeGlobals, shuffleMasterBridges, masterBridges} from "../bridge_data.js";
import {returnMetalTexture, returnCrystalTexture, returnLiquidTexture,
  genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function moveBridges(x, z, scene, global_objects, item_id, camera, global_language) {
  setBridgeGlobals(x, z);
  shuffleMasterBridges();

// declare and shuffle the colors
  let structure_colors = [
    "gem_red",
    "gem_orange",
    "gem_hotpink",
    "gem_teal",
    "gem_blue",
    "gem_darkpurple"
  ];
  structure_colors = arrayShuffler(structure_colors);

  let color1 = structure_colors[0];
  let color2 = structure_colors[1];
  let color3 = structure_colors[2];
  let color4 = structure_colors[3];

  function generateTeleporter(x, z, name) {
    let teleporterVisualPad = MeshBuilder.CreateBox("box", {width: 5, height: 0.2, depth: 5, wrap: true, faceUV: genCubeFaceUV([2.5, 0.1, 2.5, 0.1, 2.5, 0.1, 2.5, 0.1, 2.5, 2.5, 2.5, 2.5])}, scene);
    teleporterVisualPad.position.y = 0.1;
    teleporterVisualPad.position.x = x;
    teleporterVisualPad.position.z = z;
    teleporterVisualPad.material = new StandardMaterial('texture1', scene);
    teleporterVisualPad.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let teleportPad = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 4, tessellation: 8}, scene);
    teleportPad.position.y = 2;
    teleportPad.position.x = x;
    teleportPad.position.z = z;
    teleportPad.name = name;
    teleportPad.material = new StandardMaterial('texture1', scene);
    teleportPad.material.alpha = 0;
    teleportPad.physicsImpostor = new PhysicsImpostor(teleportPad, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    teleportPad.checkCollisions = true;
    global_objects.push({id: teleportPad.uniqueId, type: "teleporter4", exit_pos: {x: x, z: z, y: 10.5}});

    let particleSystem = new ParticleSystem("particles", 3000, scene);
    particleSystem.particleTexture = new Texture("./imgs/circle_light.png", scene);
    particleSystem.emitter = teleportPad;

    particleSystem.addColorGradient(0, new Color4(0.01, 0.04, 0.45));
    particleSystem.addColorGradient(1, new Color4(0.33, 0.04, 0.33));

    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1;

    particleSystem.emitRate = 3000;

    particleSystem.createSphereEmitter(2);

    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;

    particleSystem.start();
  }
  generateTeleporter(masterBridges.portal1_x, masterBridges.portal1_z, "teleportPadOb4_1");
  generateTeleporter(masterBridges.portal2_x, masterBridges.portal2_z, "teleportPadOb4_2");

  function generatePlatform(x, z, rotation) {
    let theBase = MeshBuilder.CreateBox("box", {width: 10, height: 1, depth: 10, faceUV: genCubeFaceUV([2, 0.2, 2, 0.2, 0.2, 2, 0.2, 2, 2, 2, 2, 2])}, scene);
    theBase.position.y = 6;
    theBase.material = new StandardMaterial('texture1', scene);
    theBase.material.diffuseTexture = returnCrystalTexture(color1, scene);
    theBase.physicsImpostor = new PhysicsImpostor(theBase, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    theBase.checkCollisions = true;

    let theWall1 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1, faceUV: genCubeFaceUV([0.4, 0.5, 0.4, 0.5, 0.5, 0.2, 0.5, 0.2, 0.2, 0.5, 0.2, 0.5])}, scene);
    theWall1.position.y = 7.5;
    theWall1.position.x = 3.75;
    theWall1.position.z = -4.5;
    theWall1.material = new StandardMaterial('texture1', scene);
    theWall1.material.diffuseTexture = returnCrystalTexture(color1, scene);
    theWall1.physicsImpostor = new PhysicsImpostor(theWall1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    theWall1.checkCollisions = true;

    let theWall2 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1, faceUV: genCubeFaceUV([0.4, 0.5, 0.4, 0.5, 0.5, 0.2, 0.5, 0.2, 0.2, 0.5, 0.2, 0.5])}, scene);
    theWall2.position.y = 7.5;
    theWall2.position.x = -3.75;
    theWall2.position.z = -4.5;
    theWall2.material = new StandardMaterial('texture1', scene);
    theWall2.material.diffuseTexture = returnCrystalTexture(color1, scene);
    theWall2.physicsImpostor = new PhysicsImpostor(theWall2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    theWall2.checkCollisions = true;

    let theWall3 = MeshBuilder.CreateBox("box", {width: 1, height: 2, depth: 1.5, faceUV: genCubeFaceUV([0.2, 0.3, 0.2, 0.3, 0.4, 0.3, 0.4, 0.3, 0.3, 0.2, 0.3, 0.2])}, scene);
    theWall3.position.y = 7.5;
    theWall3.position.x = -4.5;
    theWall3.position.z = -3.25;
    theWall3.material = new StandardMaterial('texture1', scene);
    theWall3.material.diffuseTexture = returnCrystalTexture(color1, scene);
    theWall3.physicsImpostor = new PhysicsImpostor(theWall3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    theWall3.checkCollisions = true;

    let theWall4 = MeshBuilder.CreateBox("box", {width: 1, height: 2, depth: 2.5, faceUV: genCubeFaceUV([0.2, 0.5, 0.2, 0.5, 0.4, 0.5, 0.4, 0.5, 0.5, 0.2, 0.5, 0.2])}, scene);
    theWall4.position.y = 7.5;
    theWall4.position.x = -4.5;
    theWall4.position.z = 3.75;
    theWall4.material = new StandardMaterial('texture1', scene);
    theWall4.material.diffuseTexture = returnCrystalTexture(color1, scene);
    theWall4.physicsImpostor = new PhysicsImpostor(theWall4, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    theWall4.checkCollisions = true;

    let thePlatform = Mesh.MergeMeshes([theBase, theWall1, theWall2, theWall3, theWall4], true, true, undefined, false, true);
    thePlatform.position.x = x;
    thePlatform.position.z = z;
    thePlatform.rotation.y = rotation;
  }

  generatePlatform((x + 20), (z + 20), 0);
  generatePlatform((x - 20), (z + 20), -1.57);
  generatePlatform((x + 20), (z - 20), 1.57);
  generatePlatform((x - 20), (z - 20), 3.14);

  let centralPlatformFloor = MeshBuilder.CreateBox("box", {width: 10, height: 1, depth: 10, faceUV: genCubeFaceUV([2, 0.2, 2, 0.2, 0.2, 2, 0.2, 2, 2, 2, 2, 2])}, scene);
  centralPlatformFloor.position.y = 6;
  centralPlatformFloor.position.x = x;
  centralPlatformFloor.position.z = z;
  centralPlatformFloor.material = new StandardMaterial('texture1', scene);
  centralPlatformFloor.material.diffuseTexture = returnCrystalTexture(color1, scene);
  centralPlatformFloor.physicsImpostor = new PhysicsImpostor(centralPlatformFloor, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  centralPlatformFloor.checkCollisions = true;
  global_objects.push({id: centralPlatformFloor.uniqueId, obstacle4_id: item_id, type: "structure", name: ""});

  let centralPlatformCeiling = MeshBuilder.CreateBox("box", {width: 10, height: 1, depth: 10, faceUV: genCubeFaceUV([2, 0.2, 2, 0.2, 0.2, 2, 0.2, 2, 2, 2, 2, 2])}, scene);
  centralPlatformCeiling.position.y = 13;
  centralPlatformCeiling.position.x = x;
  centralPlatformCeiling.position.z = z;
  centralPlatformCeiling.material = new StandardMaterial('texture1', scene);
  centralPlatformCeiling.material.diffuseTexture = returnCrystalTexture(color1, scene);

  let centralPlatformPillar1 = MeshBuilder.CreateBox("box", {width: 1, height: 6, depth: 1, faceUV: genCubeFaceUV([0.2, 1.2, 0.2, 1.2, 1.2, 0.2, 1.2, 0.2, 0.2, 0.2, 0.2, 0.2])}, scene);
  centralPlatformPillar1.position.y = 9.5;
  centralPlatformPillar1.position.x = x + 4.5;
  centralPlatformPillar1.position.z = z + 4.5;
  centralPlatformPillar1.material = new StandardMaterial('texture1', scene);
  centralPlatformPillar1.material.diffuseTexture = returnCrystalTexture(color2, scene);
  centralPlatformPillar1.physicsImpostor = new PhysicsImpostor(centralPlatformPillar1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  centralPlatformPillar1.checkCollisions = true;

  let centralPlatformPillar2 = MeshBuilder.CreateBox("box", {width: 1, height: 6, depth: 1, faceUV: genCubeFaceUV([0.2, 1.2, 0.2, 1.2, 1.2, 0.2, 1.2, 0.2, 0.2, 0.2, 0.2, 0.2])}, scene);
  centralPlatformPillar2.position.y = 9.5;
  centralPlatformPillar2.position.x = x - 4.5;
  centralPlatformPillar2.position.z = z + 4.5;
  centralPlatformPillar2.material = new StandardMaterial('texture1', scene);
  centralPlatformPillar2.material.diffuseTexture = returnCrystalTexture(color2, scene);
  centralPlatformPillar2.physicsImpostor = new PhysicsImpostor(centralPlatformPillar2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  centralPlatformPillar2.checkCollisions = true;

  let centralPlatformPillar3 = MeshBuilder.CreateBox("box", {width: 1, height: 6, depth: 1, faceUV: genCubeFaceUV([0.2, 1.2, 0.2, 1.2, 1.2, 0.2, 1.2, 0.2, 0.2, 0.2, 0.2, 0.2])}, scene);
  centralPlatformPillar3.position.y = 9.5;
  centralPlatformPillar3.position.x = x + 4.5;
  centralPlatformPillar3.position.z = z - 4.5;
  centralPlatformPillar3.material = new StandardMaterial('texture1', scene);
  centralPlatformPillar3.material.diffuseTexture = returnCrystalTexture(color2, scene);
  centralPlatformPillar3.physicsImpostor = new PhysicsImpostor(centralPlatformPillar3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  centralPlatformPillar3.checkCollisions = true;

  let centralPlatformPillar4 = MeshBuilder.CreateBox("box", {width: 1, height: 6, depth: 1, faceUV: genCubeFaceUV([0.2, 1.2, 0.2, 1.2, 1.2, 0.2, 1.2, 0.2, 0.2, 0.2, 0.2, 0.2])}, scene);
  centralPlatformPillar4.position.y = 9.5;
  centralPlatformPillar4.position.x = x - 4.5;
  centralPlatformPillar4.position.z = z - 4.5;
  centralPlatformPillar4.material = new StandardMaterial('texture1', scene);
  centralPlatformPillar4.material.diffuseTexture = returnCrystalTexture(color2, scene);
  centralPlatformPillar4.physicsImpostor = new PhysicsImpostor(centralPlatformPillar4, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  centralPlatformPillar4.checkCollisions = true;

  let centralPlatformBarrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 5, height: 6, tessellation: 8}, scene);
  centralPlatformBarrier.position.y = 9.5;
  centralPlatformBarrier.position.x = x;
  centralPlatformBarrier.position.z = z;
  centralPlatformBarrier.material = new StandardMaterial('texture1', scene);
  centralPlatformBarrier.material.diffuseTexture = returnLiquidTexture("acid_purple", scene);
  centralPlatformBarrier.material.alpha = 0.8;
  centralPlatformBarrier.physicsImpostor = new PhysicsImpostor(centralPlatformBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  centralPlatformBarrier.checkCollisions = true;
  centralPlatformBarrier.name = "centralPlatformBarrierOb4";

  let miniPlatform1 = MeshBuilder.CreateBox("box", {width: 5, height: 1, depth: 5, faceUV: genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 1, 0.2, 1, 1, 1, 1, 1])}, scene);
  miniPlatform1.position.y = 6;
  miniPlatform1.position.x = x;
  miniPlatform1.position.z = z + 20;
  miniPlatform1.material = new StandardMaterial('texture1', scene);
  miniPlatform1.material.diffuseTexture = returnCrystalTexture(color1, scene);
  miniPlatform1.physicsImpostor = new PhysicsImpostor(miniPlatform1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  miniPlatform1.checkCollisions = true;

  let miniPlatform2 = MeshBuilder.CreateBox("box", {width: 5, height: 1, depth: 5, faceUV: genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 1, 0.2, 1, 1, 1, 1, 1])}, scene);
  miniPlatform2.position.y = 6;
  miniPlatform2.position.x = x;
  miniPlatform2.position.z = z - 20;
  miniPlatform2.material = new StandardMaterial('texture1', scene);
  miniPlatform2.material.diffuseTexture = returnCrystalTexture(color1, scene);
  miniPlatform2.physicsImpostor = new PhysicsImpostor(miniPlatform2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  miniPlatform2.checkCollisions = true;

  let miniPlatform3 = MeshBuilder.CreateBox("box", {width: 5, height: 1, depth: 5, faceUV: genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 1, 0.2, 1, 1, 1, 1, 1])}, scene);
  miniPlatform3.position.y = 6;
  miniPlatform3.position.x = x + 20;
  miniPlatform3.position.z = z;
  miniPlatform3.material = new StandardMaterial('texture1', scene);
  miniPlatform3.material.diffuseTexture = returnCrystalTexture(color1, scene);
  miniPlatform3.physicsImpostor = new PhysicsImpostor(miniPlatform3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  miniPlatform3.checkCollisions = true;

  let miniPlatform4 = MeshBuilder.CreateBox("box", {width: 5, height: 1, depth: 5, faceUV: genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 1, 0.2, 1, 1, 1, 1, 1])}, scene);
  miniPlatform4.position.y = 6;
  miniPlatform4.position.x = x - 20;
  miniPlatform4.position.z = z;
  miniPlatform4.material = new StandardMaterial('texture1', scene);
  miniPlatform4.material.diffuseTexture = returnCrystalTexture(color1, scene);
  miniPlatform4.physicsImpostor = new PhysicsImpostor(miniPlatform4, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  miniPlatform4.checkCollisions = true;

  function generateBridge(x, z, width, depth, name, color, faceUV) {
    let bridge = MeshBuilder.CreateBox("box", {width: width, height: 1, depth: depth, faceUV: faceUV}, scene);
    bridge.position.y = -1000;
    bridge.position.x = x;
    bridge.position.z = z;
    bridge.material = new StandardMaterial('texture1', scene);
    bridge.material.diffuseTexture = returnCrystalTexture(color, scene);
    bridge.material.alpha = 0.8;
    bridge.physicsImpostor = new PhysicsImpostor(bridge, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    bridge.checkCollisions = true;
    bridge.name = name;
  }
  generateBridge((x - 20), (z + 8.75), 5, 12.5, "bridge1_Ob4", color3, genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 2.5, 0.2, 2.5, 2.5, 1, 2.5, 1]));
  generateBridge((x - 20), (z - 8.75), 5, 12.5, "bridge2_Ob4", color3, genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 2.5, 0.2, 2.5, 2.5, 1, 2.5, 1]));
  generateBridge((x + 20), (z + 8.75), 5, 12.5, "bridge3_Ob4", color3, genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 2.5, 0.2, 2.5, 2.5, 1, 2.5, 1]));
  generateBridge((x + 20), (z - 8.75), 5, 12.5, "bridge4_Ob4", color3, genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 2.5, 0.2, 2.5, 2.5, 1, 2.5, 1]));

  generateBridge((x - 8.75), (z + 20), 12.5, 5, "bridge5_Ob4", color3, genCubeFaceUV([2.5, 0.2, 2.5, 0.2, 0.2, 1, 0.2, 1, 1, 2.5, 1, 2.5]));
  generateBridge((x - 8.75), (z - 20), 12.5, 5, "bridge6_Ob4", color3, genCubeFaceUV([2.5, 0.2, 2.5, 0.2, 0.2, 1, 0.2, 1, 1, 2.5, 1, 2.5]));
  generateBridge((x + 8.75), (z + 20), 12.5, 5, "bridge7_Ob4", color3, genCubeFaceUV([2.5, 0.2, 2.5, 0.2, 0.2, 1, 0.2, 1, 1, 2.5, 1, 2.5]));
  generateBridge((x + 8.75), (z - 20), 12.5, 5, "bridge8_Ob4", color3, genCubeFaceUV([2.5, 0.2, 2.5, 0.2, 0.2, 1, 0.2, 1, 1, 2.5, 1, 2.5]));

  generateBridge((x - 11.25), z, 12.5, 5, "bridge9_Ob4", color4, genCubeFaceUV([2.5, 0.2, 2.5, 0.2, 0.2, 1, 0.2, 1, 1, 2.5, 1, 2.5]));
  generateBridge((x + 11.25), z, 12.5, 5, "bridge10_Ob4", color4, genCubeFaceUV([2.5, 0.2, 2.5, 0.2, 0.2, 1, 0.2, 1, 1, 2.5, 1, 2.5]));
  generateBridge(x, (z + 11.25), 5, 12.5, "bridge11_Ob4", color4, genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 2.5, 0.2, 2.5, 2.5, 1, 2.5, 1]));
  generateBridge(x, (z - 11.25), 5, 12.5, "bridge12_Ob4", color4, genCubeFaceUV([1, 0.2, 1, 0.2, 0.2, 2.5, 0.2, 2.5, 2.5, 1, 2.5, 1]));

  function generateButton(x, z, barrier_name, button_name, holder_texture, button_texture) {
    let buttonHolder = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
    buttonHolder.position.y = 7.5;
    buttonHolder.position.x = x;
    buttonHolder.position.z = z;
    buttonHolder.material = new StandardMaterial('texture1', scene);
    buttonHolder.material.diffuseTexture = returnMetalTexture(holder_texture, scene);
    buttonHolder.physicsImpostor = new PhysicsImpostor(buttonHolder, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    buttonHolder.checkCollisions = true;

    let buttonBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
    buttonBarrier.position.y = 11;
    buttonBarrier.position.x = x;
    buttonBarrier.position.z = z;
    buttonBarrier.material = new StandardMaterial('texture1', scene);
    buttonBarrier.material.alpha = 0;
    buttonBarrier.name = barrier_name;

    let pushButton = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
    pushButton.position.y = 9.25;
    pushButton.position.x = x;
    pushButton.position.z = z;
    pushButton.material = new StandardMaterial('texture1', scene);
    pushButton.material.diffuseTexture = returnCrystalTexture(button_texture, scene);
    pushButton.name = button_name;
  }
  generateButton(x, z, "buttonOb4Central", "pushButtonOb4Central", "metal_huntergreen", "gem_teal");

  generateButton((x + 17), (z + 24), "buttonOb4Top1", "pushButtonOb4Top1", "iron", "gem_darkred");
  generateButton((x + 24), (z + 17), "buttonOb4Top2", "pushButtonOb4Top2", "iron", "gem_darkred");
  generateButton((x + 17), (z - 24), "buttonOb4Top3", "pushButtonOb4Top3", "iron", "gem_darkred");
  generateButton((x + 24), (z - 17), "buttonOb4Top4", "pushButtonOb4Top4", "iron", "gem_darkred");
  generateButton((x - 17), (z + 24), "buttonOb4Top5", "pushButtonOb4Top5", "iron", "gem_darkred");
  generateButton((x - 24), (z + 17), "buttonOb4Top6", "pushButtonOb4Top6", "iron", "gem_darkred");
  generateButton((x - 17), (z - 24), "buttonOb4Top7", "pushButtonOb4Top7", "iron", "gem_darkred");
  generateButton((x - 24), (z - 17), "buttonOb4Top8", "pushButtonOb4Top8", "iron", "gem_darkred");

  generateButton(x, (z + 20), "buttonOb4TopMini1", "pushButtonOb4TopMini1", "iron", "gem_darkred");
  generateButton(x, (z - 20), "buttonOb4TopMini2", "pushButtonOb4TopMini2", "iron", "gem_darkred");
  generateButton((x + 20), z, "buttonOb4TopMini3", "pushButtonOb4TopMini3", "iron", "gem_darkred");
  generateButton((x - 20), z, "buttonOb4TopMini4", "pushButtonOb4TopMini4", "iron", "gem_darkred");
}

export {moveBridges};
