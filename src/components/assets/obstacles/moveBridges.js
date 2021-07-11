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

function moveBridges(x, z, scene, global_objects, item_id, camera) {
  // declare and shuffle the colors
    let bridge_colors = [
      new Color3(1, 0, 0),
      new Color3(0.13, 0.55, 0.13),
      new Color3(0, 0, 1),
      new Color3(0.55, 0, 1),
      new Color3(1, 1, 0),
      new Color3(1, 0.4, 0)
    ];
    bridge_colors = arrayShuffler(bridge_colors);
    let color1 = bridge_colors[0];
    let color2 = bridge_colors[1];
    let color3 = bridge_colors[2];

  let buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
  buttonHolder1.position.y = 7.5;
  buttonHolder1.position.x = x + 20;
  buttonHolder1.position.z = z - 20;
  buttonHolder1.material = new StandardMaterial('texture1', scene);
  buttonHolder1.material.diffuseColor = new Color3(0.37, 0.32, 0.32);
  buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder1.checkCollisions = true;

  let buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier1.position.y = 11;
  buttonBarrier1.position.x = x + 20;
  buttonBarrier1.position.z = z - 20;
  buttonBarrier1.material = new StandardMaterial('texture1', scene);
  buttonBarrier1.material.alpha = 0;
  buttonBarrier1.name = "button1p4a";
  global_objects.push({id: buttonBarrier1.uniqueId, obstacle4_id: item_id, type: "structure", name: ""}); // just for obstacle4_id

  let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
  pushButton1.position.y = 9.25;
  pushButton1.position.x = x + 20;
  pushButton1.position.z = z - 20;
  pushButton1.material = new StandardMaterial('texture1', scene);
  pushButton1.material.diffuseColor = new Color3(0.64, 0.11, 0.11);
  pushButton1.name = "pushButton1p4a";

  let buttonHolder2 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
  buttonHolder2.position.y = 7.5;
  buttonHolder2.position.x = x - 20;
  buttonHolder2.position.z = z + 20;
  buttonHolder2.material = new StandardMaterial('texture1', scene);
  buttonHolder2.material.diffuseColor = new Color3(0.37, 0.32, 0.32);
  buttonHolder2.physicsImpostor = new PhysicsImpostor(buttonHolder2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder2.checkCollisions = true;

  let buttonBarrier2 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier2.position.y = 11;
  buttonBarrier2.position.x = x - 20;
  buttonBarrier2.position.z = z + 20;
  buttonBarrier2.material = new StandardMaterial('texture1', scene);
  buttonBarrier2.material.alpha = 0;
  buttonBarrier2.name = "button1p4b";

  let pushButton2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
  pushButton2.position.y = 9.25;
  pushButton2.position.x = x - 20;
  pushButton2.position.z = z + 20;
  pushButton2.material = new StandardMaterial('texture1', scene);
  pushButton2.material.diffuseColor = new Color3(0.64, 0.11, 0.11);
  pushButton2.name = "pushButton1p4b";

  let buttonHolder3 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
  buttonHolder3.position.y = 7.5;
  buttonHolder3.position.x = x - 20;
  buttonHolder3.position.z = z - 20;
  buttonHolder3.material = new StandardMaterial('texture1', scene);
  buttonHolder3.material.diffuseColor = new Color3(0.37, 0.32, 0.32);
  buttonHolder3.physicsImpostor = new PhysicsImpostor(buttonHolder3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder3.checkCollisions = true;

  let buttonBarrier3 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier3.position.y = 11;
  buttonBarrier3.position.x = x - 20;
  buttonBarrier3.position.z = z - 20;
  buttonBarrier3.material = new StandardMaterial('texture1', scene);
  buttonBarrier3.material.alpha = 0;
  buttonBarrier3.name = "button1p4c";

  let pushButton3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
  pushButton3.position.y = 9.25;
  pushButton3.position.x = x - 20;
  pushButton3.position.z = z - 20;
  pushButton3.material = new StandardMaterial('texture1', scene);
  pushButton3.material.diffuseColor = new Color3(0.64, 0.11, 0.11);
  pushButton3.name = "pushButton1p4c";

  let teleporterVisualPad = MeshBuilder.CreateBox("box", {width: 5, height: 0.2, depth: 5}, scene);
  teleporterVisualPad.position.y = 0.1;
  teleporterVisualPad.position.x = x;
  teleporterVisualPad.position.z = z;
  teleporterVisualPad.material = new StandardMaterial('texture1', scene);
  teleporterVisualPad.material.diffuseColor = new Color3(0, 0, 0);

  let teleportPad = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 4, tessellation: 8}, scene);
  teleportPad.position.y = 2;
  teleportPad.position.x = x;
  teleportPad.position.z = z;
  teleportPad.name = "teleportPad";
  teleportPad.material = new StandardMaterial('texture1', scene);
  teleportPad.material.alpha = 0;
  teleportPad.physicsImpostor = new PhysicsImpostor(teleportPad, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  teleportPad.checkCollisions = true;
  global_objects.push({id: teleportPad.uniqueId, type: "teleporter", exit_pos: {x: (x + 20), z: (z + 20), y: 10.5}});

  let theStartBase = MeshBuilder.CreateBox("box", {width: 10, height: 1, depth: 10}, scene);
  theStartBase.position.y = 6;
  theStartBase.position.x = x + 20;
  theStartBase.position.z = z + 20;
  theStartBase.material = new StandardMaterial('texture1', scene);
  theStartBase.material.diffuseColor = color1;
  theStartBase.physicsImpostor = new PhysicsImpostor(theStartBase, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theStartBase.checkCollisions = true;

  let theStartWall1 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1}, scene);
  theStartWall1.position.y = 7.5;
  theStartWall1.position.x = x + 23.75;
  theStartWall1.position.z = z + 15.5;
  theStartWall1.material = new StandardMaterial('texture1', scene);
  theStartWall1.material.diffuseColor = color1;
  theStartWall1.physicsImpostor = new PhysicsImpostor(theStartWall1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theStartWall1.checkCollisions = true;

  let theStartWall2 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1}, scene);
  theStartWall2.position.y = 7.5;
  theStartWall2.position.x = x + 16.25;
  theStartWall2.position.z = z + 15.5;
  theStartWall2.material = new StandardMaterial('texture1', scene);
  theStartWall2.material.diffuseColor = color1;
  theStartWall2.physicsImpostor = new PhysicsImpostor(theStartWall2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theStartWall2.checkCollisions = true;

  let theStartWall3 = MeshBuilder.CreateBox("box", {width: 1, height: 2, depth: 1.5}, scene);
  theStartWall3.position.y = 7.5;
  theStartWall3.position.x = x + 15.5;
  theStartWall3.position.z = z + 16.75;
  theStartWall3.material = new StandardMaterial('texture1', scene);
  theStartWall3.material.diffuseColor = color1;
  theStartWall3.physicsImpostor = new PhysicsImpostor(theStartWall3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theStartWall3.checkCollisions = true;

  let theStartWall4 = MeshBuilder.CreateBox("box", {width: 1, height: 2, depth: 2.5}, scene);
  theStartWall4.position.y = 7.5;
  theStartWall4.position.x = x + 15.5;
  theStartWall4.position.z = z + 23.75;
  theStartWall4.material = new StandardMaterial('texture1', scene);
  theStartWall4.material.diffuseColor = color1;
  theStartWall4.physicsImpostor = new PhysicsImpostor(theStartWall3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theStartWall4.checkCollisions = true;

  let theStart = Mesh.MergeMeshes([theStartBase, theStartWall1, theStartWall2, theStartWall3, theStartWall4], true, true, undefined, false, true);

  let theMiddleBase = MeshBuilder.CreateBox("box", {width: 10, height: 1, depth: 10}, scene);
  theMiddleBase.position.y = 6;
  theMiddleBase.position.x = x - 20;
  theMiddleBase.position.z = z + 20;
  theMiddleBase.material = new StandardMaterial('texture1', scene);
  theMiddleBase.material.diffuseColor = color1;
  theMiddleBase.physicsImpostor = new PhysicsImpostor(theMiddleBase, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theMiddleBase.checkCollisions = true;

  let theMiddleWall1 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1}, scene);
  theMiddleWall1.position.y = 7.5;
  theMiddleWall1.position.x = x - 23.75;
  theMiddleWall1.position.z = z + 15.5;
  theMiddleWall1.material = new StandardMaterial('texture1', scene);
  theMiddleWall1.material.diffuseColor = color1;
  theMiddleWall1.physicsImpostor = new PhysicsImpostor(theMiddleWall1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theMiddleWall1.checkCollisions = true;

  let theMiddleWall2 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1}, scene);
  theMiddleWall2.position.y = 7.5;
  theMiddleWall2.position.x = x - 16.25;
  theMiddleWall2.position.z = z + 15.5;
  theMiddleWall2.material = new StandardMaterial('texture1', scene);
  theMiddleWall2.material.diffuseColor = color1;
  theMiddleWall2.physicsImpostor = new PhysicsImpostor(theMiddleWall2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theMiddleWall2.checkCollisions = true;

  let theMiddleWall3 = MeshBuilder.CreateBox("box", {width: 1, height: 2, depth: 1.5}, scene);
  theMiddleWall3.position.y = 7.5;
  theMiddleWall3.position.x = x - 15.5;
  theMiddleWall3.position.z = z + 16.75;
  theMiddleWall3.material = new StandardMaterial('texture1', scene);
  theMiddleWall3.material.diffuseColor = color1;
  theMiddleWall3.physicsImpostor = new PhysicsImpostor(theMiddleWall3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theMiddleWall3.checkCollisions = true;

  let theMiddleWall4 = MeshBuilder.CreateBox("box", {width: 1, height: 2, depth: 2.5}, scene);
  theMiddleWall4.position.y = 7.5;
  theMiddleWall4.position.x = x - 15.5;
  theMiddleWall4.position.z = z + 23.75;
  theMiddleWall4.material = new StandardMaterial('texture1', scene);
  theMiddleWall4.material.diffuseColor = color1;
  theMiddleWall4.physicsImpostor = new PhysicsImpostor(theMiddleWall4, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theMiddleWall4.checkCollisions = true;

  let theMiddle = Mesh.MergeMeshes([theMiddleBase, theMiddleWall1, theMiddleWall2, theMiddleWall3, theMiddleWall4], true, true, undefined, false, true);

  let theMiddle2Base = MeshBuilder.CreateBox("box", {width: 10, height: 1, depth: 10}, scene);
  theMiddle2Base.position.y = 6;
  theMiddle2Base.position.x = x + 20;
  theMiddle2Base.position.z = z - 20;
  theMiddle2Base.material = new StandardMaterial('texture1', scene);
  theMiddle2Base.material.diffuseColor = color1;
  theMiddle2Base.physicsImpostor = new PhysicsImpostor(theMiddle2Base, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theMiddle2Base.checkCollisions = true;

  let theMiddle2Wall1 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1}, scene);
  theMiddle2Wall1.position.y = 7.5;
  theMiddle2Wall1.position.x = x + 23.75;
  theMiddle2Wall1.position.z = z - 15.5;
  theMiddle2Wall1.material = new StandardMaterial('texture1', scene);
  theMiddle2Wall1.material.diffuseColor = color1;
  theMiddle2Wall1.physicsImpostor = new PhysicsImpostor(theMiddle2Wall1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theMiddle2Wall1.checkCollisions = true;

  let theMiddle2Wall2 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1}, scene);
  theMiddle2Wall2.position.y = 7.5;
  theMiddle2Wall2.position.x = x + 16.25;
  theMiddle2Wall2.position.z = z - 15.5;
  theMiddle2Wall2.material = new StandardMaterial('texture1', scene);
  theMiddle2Wall2.material.diffuseColor = color1;
  theMiddle2Wall2.physicsImpostor = new PhysicsImpostor(theMiddle2Wall2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theMiddle2Wall2.checkCollisions = true;

  let theMiddle2Wall3 = MeshBuilder.CreateBox("box", {width: 1, height: 2, depth: 9.5}, scene);
  theMiddle2Wall3.position.y = 7.5;
  theMiddle2Wall3.position.x = x + 15.5;
  theMiddle2Wall3.position.z = z - 20.75;
  theMiddle2Wall3.material = new StandardMaterial('texture1', scene);
  theMiddle2Wall3.material.diffuseColor = color1;
  theMiddle2Wall3.physicsImpostor = new PhysicsImpostor(theMiddle2Wall3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theMiddle2Wall3.checkCollisions = true;

  let theMiddle2 = Mesh.MergeMeshes([theMiddle2Base, theMiddle2Wall1, theMiddle2Wall2, theMiddle2Wall3], true, true, undefined, false, true);

  let theExitBase = MeshBuilder.CreateBox("box", {width: 10, height: 1, depth: 10}, scene);
  theExitBase.position.y = 6;
  theExitBase.position.x = x - 20;
  theExitBase.position.z = z - 20;
  theExitBase.material = new StandardMaterial('texture1', scene);
  theExitBase.material.diffuseColor = color1;
  theExitBase.physicsImpostor = new PhysicsImpostor(theExitBase, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theExitBase.checkCollisions = true;

  let theExitWall1 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1}, scene);
  theExitWall1.position.y = 7.5;
  theExitWall1.position.x = x - 23.75;
  theExitWall1.position.z = z - 15.5;
  theExitWall1.material = new StandardMaterial('texture1', scene);
  theExitWall1.material.diffuseColor = color1;
  theExitWall1.physicsImpostor = new PhysicsImpostor(theExitWall1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theExitWall1.checkCollisions = true;

  let theExitWall2 = MeshBuilder.CreateBox("box", {width: 2.5, height: 2, depth: 1}, scene);
  theExitWall2.position.y = 7.5;
  theExitWall2.position.x = x - 16.25;
  theExitWall2.position.z = z - 15.5;
  theExitWall2.material = new StandardMaterial('texture1', scene);
  theExitWall2.material.diffuseColor = color1;
  theExitWall2.physicsImpostor = new PhysicsImpostor(theExitWall2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theExitWall2.checkCollisions = true;

  let theExitWall3 = MeshBuilder.CreateBox("box", {width: 1, height: 2, depth: 9.5}, scene);
  theExitWall3.position.y = 7.5;
  theExitWall3.position.x = x - 15.5;
  theExitWall3.position.z = z - 20.75;
  theExitWall3.material = new StandardMaterial('texture1', scene);
  theExitWall3.material.diffuseColor = color1;
  theExitWall3.physicsImpostor = new PhysicsImpostor(theExitWall3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  theExitWall3.checkCollisions = true

  let greenBridge = MeshBuilder.CreateBox("box", {width: 30, height: 1, depth: 5}, scene);
  greenBridge.position.y = 6;
  greenBridge.position.x = x;
  greenBridge.position.z = z;
  greenBridge.material = new StandardMaterial('texture1', scene);
  greenBridge.material.diffuseColor = color2;
  greenBridge.physicsImpostor = new PhysicsImpostor(greenBridge, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  greenBridge.checkCollisions = true;
  greenBridge.name = "greenBridge";

  let blueBridge = MeshBuilder.CreateBox("box", {width: 5, height: 1, depth: 30}, scene);
  blueBridge.position.y = 6;
  blueBridge.position.x = x + 20;
  blueBridge.position.z = z;
  blueBridge.material = new StandardMaterial('texture1', scene);
  blueBridge.material.diffuseColor = color3;
  blueBridge.physicsImpostor = new PhysicsImpostor(greenBridge, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  blueBridge.checkCollisions = true;
  blueBridge.name = "blueBridge";

  let particleSystem = new ParticleSystem("particles", 3000, scene);
  particleSystem.particleTexture = new Texture("./imgs/circle.png", scene);
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
}

export {moveBridges};
