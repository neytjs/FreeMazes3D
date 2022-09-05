import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {returnMetalTexture, returnCrystalTexture, genCylinderFaceUV} from "../textures.js";

function downPipes(x, z, scene, global_objects, item_id, camera, global_language) {
  let pipeTextures = [
    "gem_purple",
    "gem_blue",
    "gem_green",
    "gem_yellow",
    "gem_orange",
    "gem_red"
  ];
  pipeTextures = arrayShuffler(pipeTextures);

  let plateColors = [
    {color_name: "pink", inv_name: global_language.text.items.puzzles.balls.pink_ball, texture: "gem_hotpink", color_code: new Color3(0.99, 0.1, 0.54)},
    {color_name: "blue", inv_name: global_language.text.items.puzzles.balls.blue_ball, texture: "gem_skyblue", color_code: new Color3(0, 0.79, 0.99)},
    {color_name: "red", inv_name: global_language.text.items.puzzles.balls.red_ball, texture: "gem_darkred", color_code: new Color3(0.59, 0.13, 0.13)},
    {color_name: "purple", inv_name: global_language.text.items.puzzles.balls.purple_ball, texture: "gem_verydarkpurple", color_code: new Color3(0.25, 0.05, 0.41)}
  ];
  plateColors = arrayShuffler(plateColors);
  let ballColors = arrayShuffler(plateColors);

  let pipe1base = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe1base.position.y = 1.5;
  pipe1base.material = new StandardMaterial('texture1', scene);
  pipe1base.material.diffuseTexture = returnCrystalTexture(pipeTextures[0], scene);

  let pipe1joint = Mesh.CreateSphere("sphere", 8, 3, scene);
  pipe1joint.position.y = 3;
  pipe1joint.material = new StandardMaterial('texture1', scene);
  pipe1joint.material.diffuseTexture = returnCrystalTexture(pipeTextures[0], scene);
  pipe1joint.material.diffuseTexture.uScale = 2.5;
  pipe1joint.material.diffuseTexture.vScale = 2.5;

  let pipe1arm = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe1arm.position.y = 3;
  pipe1arm.position.x = 1.5;
  pipe1arm.rotation.z = 1.57;
  pipe1arm.material = new StandardMaterial('texture1', scene);
  pipe1arm.material.diffuseTexture = returnCrystalTexture(pipeTextures[0], scene);

  let pipe1rim = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  pipe1rim.position.y = 3;
  pipe1rim.position.x = 3.2;
  pipe1rim.rotation.z = 1.57;
  pipe1rim.material = new StandardMaterial('texture1', scene);
  pipe1rim.material.diffuseTexture = returnCrystalTexture(pipeTextures[0], scene);
  pipe1rim.material.diffuseTexture.uScale = 4;
  pipe1rim.material.diffuseTexture.vScale = 1;

  let pipe1hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.01, tessellation: 20}, scene);
  pipe1hole.position.y = 3;
  pipe1hole.position.x = 3.2;
  pipe1hole.rotation.z = 1.57;
  pipe1hole.material = new StandardMaterial('texture1', scene);
  pipe1hole.material.diffuseColor = new Color3(0, 0, 0);

  let pipe1Barrier = MeshBuilder.CreateBox("box", {width: 10, height: 10, depth: 10}, scene);
  pipe1Barrier.position.y = 5;
  pipe1Barrier.material = new StandardMaterial('texture1', scene);
  pipe1Barrier.material.alpha = 0;

  let pipe1entrance = Mesh.MergeMeshes([pipe1base, pipe1joint, pipe1arm, pipe1rim, pipe1hole, pipe1Barrier], true, true, undefined, false, true);
  pipe1entrance.position.x = x - 20;
  pipe1entrance.position.z = z + 20;
  pipe1entrance.rotation.y = 0.785;
  pipe1entrance.physicsImpostor = new PhysicsImpostor(pipe1Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pipe1entrance.checkCollisions = true;
  pipe1entrance.name = "pipe1entrance";

  let pipe2base_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe2base_exit.position.y = 1.5;
  pipe2base_exit.material = new StandardMaterial('texture1', scene);
  pipe2base_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[1], scene);

  let pipe2joint_exit = Mesh.CreateSphere("sphere", 8, 3, scene);
  pipe2joint_exit.position.y = 3;
  pipe2joint_exit.material = new StandardMaterial('texture1', scene);
  pipe2joint_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[1], scene);
  pipe2joint_exit.material.diffuseTexture.uScale = 2.5;
  pipe2joint_exit.material.diffuseTexture.vScale = 2.5;

  let pipe2arm_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe2arm_exit.position.y = 3;
  pipe2arm_exit.position.x = 1.5;
  pipe2arm_exit.rotation.z = 1.57;
  pipe2arm_exit.material = new StandardMaterial('texture1', scene);
  pipe2arm_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[1], scene);

  let pipe2rim_exit = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  pipe2rim_exit.position.y = 3;
  pipe2rim_exit.position.x = 3.2;
  pipe2rim_exit.rotation.z = 1.57;
  pipe2rim_exit.material = new StandardMaterial('texture1', scene);
  pipe2rim_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[1], scene);
  pipe2rim_exit.material.diffuseTexture.uScale = 4;
  pipe2rim_exit.material.diffuseTexture.vScale = 1;

  let pipe2hole_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.01, tessellation: 20}, scene);
  pipe2hole_exit.position.y = 3;
  pipe2hole_exit.position.x = 3.2;
  pipe2hole_exit.rotation.z = 1.57;
  pipe2hole_exit.material = new StandardMaterial('texture1', scene);
  pipe2hole_exit.material.diffuseColor = new Color3(0, 0, 0);

  let pipe2Barrier_exit = MeshBuilder.CreateBox("box", {width: 10, height: 5, depth: 6.5}, scene);
  pipe2Barrier_exit.position.y = 2.5;
  pipe2Barrier_exit.position.x = 3.5;
  pipe2Barrier_exit.material = new StandardMaterial('texture1', scene);
  pipe2Barrier_exit.material.alpha = 0;

  let pipe2exit = Mesh.MergeMeshes([pipe2base_exit, pipe2joint_exit, pipe2arm_exit, pipe2rim_exit, pipe2hole_exit, pipe2Barrier_exit], true, true, undefined, false, true);
  pipe2exit.position.y = 8.5;
  pipe2exit.position.x = x - 10;
  pipe2exit.position.z = z + 25;
  pipe2exit.rotation.y = 1.57;
  pipe2exit.rotation.z = -1.57;
  pipe2exit.physicsImpostor = new PhysicsImpostor(pipe2Barrier_exit, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pipe2exit.checkCollisions = true;
  pipe2exit.name = "pipe2exit";

  let plate2holder = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.1, tessellation: 12, faceUV: genCylinderFaceUV([1, 1, 3, 0.1, 1, 1])}, scene);
  plate2holder.position.y = 2;
  plate2holder.material = new StandardMaterial('texture1', scene);
  plate2holder.material.diffuseTexture = returnCrystalTexture(plateColors[1].texture, scene);

  let plate2support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 2, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1, 0.25, 0.25])}, scene);
  plate2support.position.y = 1;
  plate2support.material = new StandardMaterial('texture1', scene);
  plate2support.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let plate2 = Mesh.MergeMeshes([plate2holder, plate2support], true, true, undefined, false, true);
  plate2.position.x = x - 10;
  plate2.position.z = z + 22;
  global_objects.push({id: plate2.uniqueId, obstacle9_id: item_id, type: "plate_Ob9", color_name: plateColors[1].color_name, plate_number: 2});

  let hiddenBall2 = Mesh.CreateSphere("sphere", 8, 1, scene);
  hiddenBall2.position.y = 6.5;
  hiddenBall2.position.x = x - 10;
  hiddenBall2.position.z = z + 22;
  hiddenBall2.material = new StandardMaterial('texture1', scene);
  hiddenBall2.name = "hiddenBall2";

  let pipe2base = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe2base.position.y = 1.5;
  pipe2base.material = new StandardMaterial('texture1', scene);
  pipe2base.material.diffuseTexture = returnCrystalTexture(pipeTextures[1], scene);

  let pipe2joint = Mesh.CreateSphere("sphere", 8, 3, scene);
  pipe2joint.position.y = 3;
  pipe2joint.material = new StandardMaterial('texture1', scene);
  pipe2joint.material.diffuseTexture = returnCrystalTexture(pipeTextures[1], scene);
  pipe2joint.material.diffuseTexture.uScale = 2.5;
  pipe2joint.material.diffuseTexture.vScale = 2.5;

  let pipe2arm = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe2arm.position.y = 3;
  pipe2arm.position.x = 1.5;
  pipe2arm.rotation.z = 1.57;
  pipe2arm.material = new StandardMaterial('texture1', scene);
  pipe2arm.material.diffuseTexture = returnCrystalTexture(pipeTextures[1], scene);

  let pipe2rim = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  pipe2rim.position.y = 3;
  pipe2rim.position.x = 3.2;
  pipe2rim.rotation.z = 1.57;
  pipe2rim.material = new StandardMaterial('texture1', scene);
  pipe2rim.material.diffuseTexture = returnCrystalTexture(pipeTextures[1], scene);
  pipe2rim.material.diffuseTexture.uScale = 4;
  pipe2rim.material.diffuseTexture.vScale = 1;

  let pipe2hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.01, tessellation: 20}, scene);
  pipe2hole.position.y = 3;
  pipe2hole.position.x = 3.2;
  pipe2hole.rotation.z = 1.57;
  pipe2hole.material = new StandardMaterial('texture1', scene);
  pipe2hole.material.diffuseColor = new Color3(0, 0, 0);

  let pipe2Barrier = MeshBuilder.CreateBox("box", {width: 10, height: 10, depth: 10}, scene);
  pipe2Barrier.position.y = 5;
  pipe2Barrier.material = new StandardMaterial('texture1', scene);
  pipe2Barrier.material.alpha = 0;

  let pipe2entrance = Mesh.MergeMeshes([pipe2base, pipe2joint, pipe2arm, pipe2rim, pipe2hole, pipe2Barrier], true, true, undefined, false, true);
  pipe2entrance.position.x = x + 20;
  pipe2entrance.position.z = z - 20;
  pipe2entrance.rotation.y = -2.355;
  pipe2entrance.physicsImpostor = new PhysicsImpostor(pipe2Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pipe2entrance.checkCollisions = true;
  pipe2entrance.name = "pipe2entrance";

  let pipe3base_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe3base_exit.position.y = 1.5;
  pipe3base_exit.material = new StandardMaterial('texture1', scene);
  pipe3base_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[2], scene);

  let pipe3joint_exit = Mesh.CreateSphere("sphere", 8, 3, scene);
  pipe3joint_exit.position.y = 3;
  pipe3joint_exit.material = new StandardMaterial('texture1', scene);
  pipe3joint_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[2], scene);
  pipe3joint_exit.material.diffuseTexture.uScale = 2.5;
  pipe3joint_exit.material.diffuseTexture.vScale = 2.5;

  let pipe3arm_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe3arm_exit.position.y = 3;
  pipe3arm_exit.position.x = 1.5;
  pipe3arm_exit.rotation.z = 1.57;
  pipe3arm_exit.material = new StandardMaterial('texture1', scene);
  pipe3arm_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[2], scene);

  let pipe3rim_exit = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  pipe3rim_exit.position.y = 3;
  pipe3rim_exit.position.x = 3.2;
  pipe3rim_exit.rotation.z = 1.57;
  pipe3rim_exit.material = new StandardMaterial('texture1', scene);
  pipe3rim_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[2], scene);
  pipe3rim_exit.material.diffuseTexture.uScale = 4;
  pipe3rim_exit.material.diffuseTexture.vScale = 1;

  let pipe3hole_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.01, tessellation: 20}, scene);
  pipe3hole_exit.position.y = 3;
  pipe3hole_exit.position.x = 3.2;
  pipe3hole_exit.rotation.z = 1.57;
  pipe3hole_exit.material = new StandardMaterial('texture1', scene);
  pipe3hole_exit.material.diffuseColor = new Color3(0, 0, 0);

  let pipe3Barrier_exit = MeshBuilder.CreateBox("box", {width: 10, height: 5, depth: 6.5}, scene);
  pipe3Barrier_exit.position.y = 2.5;
  pipe3Barrier_exit.position.x = 3.5;
  pipe3Barrier_exit.material = new StandardMaterial('texture1', scene);
  pipe3Barrier_exit.material.alpha = 0;

  let pipe3exit = Mesh.MergeMeshes([pipe3base_exit, pipe3joint_exit, pipe3arm_exit, pipe3rim_exit, pipe3hole_exit, pipe3Barrier_exit], true, true, undefined, false, true);
  pipe3exit.position.y = 8.5;
  pipe3exit.position.x = x + 10;
  pipe3exit.position.z = z - 25;
  pipe3exit.rotation.y = -1.57;
  pipe3exit.rotation.z = -1.57;
  pipe3exit.physicsImpostor = new PhysicsImpostor(pipe3Barrier_exit, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pipe3exit.checkCollisions = true;
  pipe3exit.name = "pipe3exit";

  let plate3holder = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.1, tessellation: 12, faceUV: genCylinderFaceUV([1, 1, 3, 0.1, 1, 1])}, scene);
  plate3holder.position.y = 2;
  plate3holder.material = new StandardMaterial('texture1', scene);
  plate3holder.material.diffuseTexture = returnCrystalTexture(plateColors[2].texture, scene);

  let plate3support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 2, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1, 0.25, 0.25])}, scene);
  plate3support.position.y = 1;
  plate3support.material = new StandardMaterial('texture1', scene);
  plate3support.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let plate3 = Mesh.MergeMeshes([plate3holder, plate3support], true, true, undefined, false, true);
  plate3.position.x = x + 10;
  plate3.position.z = z - 22;
  global_objects.push({id: plate3.uniqueId, obstacle9_id: item_id, type: "plate_Ob9", color_name: plateColors[2].color_name, plate_number: 3});

  let hiddenBall3 = Mesh.CreateSphere("sphere", 8, 1, scene);
  hiddenBall3.position.y = 6.5;
  hiddenBall3.position.x = x + 10;
  hiddenBall3.position.z = z - 22;
  hiddenBall3.material = new StandardMaterial('texture1', scene);
  hiddenBall3.name = "hiddenBall3";

  let pipe3base = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe3base.position.y = 1.5;
  pipe3base.material = new StandardMaterial('texture1', scene);
  pipe3base.material.diffuseTexture = returnCrystalTexture(pipeTextures[2], scene);

  let pipe3joint = Mesh.CreateSphere("sphere", 8, 3, scene);
  pipe3joint.position.y = 3;
  pipe3joint.material = new StandardMaterial('texture1', scene);
  pipe3joint.material.diffuseTexture = returnCrystalTexture(pipeTextures[2], scene);
  pipe3joint.material.diffuseTexture.uScale = 2.5;
  pipe3joint.material.diffuseTexture.vScale = 2.5;

  let pipe3arm = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe3arm.position.y = 3;
  pipe3arm.position.x = 1.5;
  pipe3arm.rotation.z = 1.57;
  pipe3arm.material = new StandardMaterial('texture1', scene);
  pipe3arm.material.diffuseTexture = returnCrystalTexture(pipeTextures[2], scene);

  let pipe3rim = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  pipe3rim.position.y = 3;
  pipe3rim.position.x = 3.2;
  pipe3rim.rotation.z = 1.57;
  pipe3rim.material = new StandardMaterial('texture1', scene);
  pipe3rim.material.diffuseTexture = returnCrystalTexture(pipeTextures[2], scene);
  pipe3rim.material.diffuseTexture.uScale = 4;
  pipe3rim.material.diffuseTexture.vScale = 1;

  let pipe3hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.01, tessellation: 20}, scene);
  pipe3hole.position.y = 3;
  pipe3hole.position.x = 3.2;
  pipe3hole.rotation.z = 1.57;
  pipe3hole.material = new StandardMaterial('texture1', scene);
  pipe3hole.material.diffuseColor = new Color3(0, 0, 0);

  let pipe3Barrier = MeshBuilder.CreateBox("box", {width: 10, height: 10, depth: 10}, scene);
  pipe3Barrier.position.y = 5;
  pipe3Barrier.material = new StandardMaterial('texture1', scene);
  pipe3Barrier.material.alpha = 0;

  let pipe3entrance = Mesh.MergeMeshes([pipe3base, pipe3joint, pipe3arm, pipe3rim, pipe3hole, pipe3Barrier], true, true, undefined, false, true);
  pipe3entrance.position.x = x - 20;
  pipe3entrance.position.z = z - 20;
  pipe3entrance.rotation.y = -0.785;
  pipe3entrance.physicsImpostor = new PhysicsImpostor(pipe3Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pipe3entrance.checkCollisions = true;
  pipe3entrance.name = "pipe3entrance";

  let pipe4base_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe4base_exit.position.y = 1.5;
  pipe4base_exit.material = new StandardMaterial('texture1', scene);
  pipe4base_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[3], scene);

  let pipe4joint_exit = Mesh.CreateSphere("sphere", 8, 3, scene);
  pipe4joint_exit.position.y = 3;
  pipe4joint_exit.material = new StandardMaterial('texture1', scene);
  pipe4joint_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[3], scene);
  pipe4joint_exit.material.diffuseTexture.uScale = 2.5;
  pipe4joint_exit.material.diffuseTexture.vScale = 2.5;

  let pipe4arm_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe4arm_exit.position.y = 3;
  pipe4arm_exit.position.x = 1.5;
  pipe4arm_exit.rotation.z = 1.57;
  pipe4arm_exit.material = new StandardMaterial('texture1', scene);
  pipe4arm_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[3], scene);

  let pipe4rim_exit = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  pipe4rim_exit.position.y = 3;
  pipe4rim_exit.position.x = 3.2;
  pipe4rim_exit.rotation.z = 1.57;
  pipe4rim_exit.material = new StandardMaterial('texture1', scene);
  pipe4rim_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[3], scene);
  pipe4rim_exit.material.diffuseTexture.uScale = 4;
  pipe4rim_exit.material.diffuseTexture.vScale = 1;

  let pipe4hole_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.01, tessellation: 20}, scene);
  pipe4hole_exit.position.y = 3;
  pipe4hole_exit.position.x = 3.2;
  pipe4hole_exit.rotation.z = 1.57;
  pipe4hole_exit.material = new StandardMaterial('texture1', scene);
  pipe4hole_exit.material.diffuseColor = new Color3(0, 0, 0);

  let pipe4Barrier_exit = MeshBuilder.CreateBox("box", {width: 10, height: 5, depth: 6.5}, scene);
  pipe4Barrier_exit.position.y = 2.5;
  pipe4Barrier_exit.position.x = 3.5;
  pipe4Barrier_exit.material = new StandardMaterial('texture1', scene);
  pipe4Barrier_exit.material.alpha = 0;

  let pipe4exit = Mesh.MergeMeshes([pipe4base_exit, pipe4joint_exit, pipe4arm_exit, pipe4rim_exit, pipe4hole_exit, pipe4Barrier_exit], true, true, undefined, false, true);
  pipe4exit.position.y = 8.5;
  pipe4exit.position.x = x - 10;
  pipe4exit.position.z = z - 25;
  pipe4exit.rotation.y = -1.57;
  pipe4exit.rotation.z = -1.57;
  pipe4exit.physicsImpostor = new PhysicsImpostor(pipe4Barrier_exit, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pipe4exit.checkCollisions = true;
  pipe4exit.name = "pipe4exit";

  let plate4holder = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.1, tessellation: 12, faceUV: genCylinderFaceUV([1, 1, 3, 0.1, 1, 1])}, scene);
  plate4holder.position.y = 2;
  plate4holder.material = new StandardMaterial('texture1', scene);
  plate4holder.material.diffuseTexture = returnCrystalTexture(plateColors[3].texture, scene);

  let plate4support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 2, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1, 0.25, 0.25])}, scene);
  plate4support.position.y = 1;
  plate4support.material = new StandardMaterial('texture1', scene);
  plate4support.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let plate4 = Mesh.MergeMeshes([plate4holder, plate4support], true, true, undefined, false, true);
  plate4.position.x = x - 10;
  plate4.position.z = z - 22;
  global_objects.push({id: plate4.uniqueId, obstacle9_id: item_id, type: "plate_Ob9", color_name: plateColors[3].color_name, plate_number: 4});

  let hiddenBall4 = Mesh.CreateSphere("sphere", 8, 1, scene);
  hiddenBall4.position.y = 6.5;
  hiddenBall4.position.x = x - 10;
  hiddenBall4.position.z = z - 22;
  hiddenBall4.material = new StandardMaterial('texture1', scene);
  hiddenBall4.name = "hiddenBall4";

  let pipe4base = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe4base.position.y = 1.5;
  pipe4base.material = new StandardMaterial('texture1', scene);
  pipe4base.material.diffuseTexture = returnCrystalTexture(pipeTextures[3], scene);

  let pipe4joint = Mesh.CreateSphere("sphere", 8, 3, scene);
  pipe4joint.position.y = 3;
  pipe4joint.material = new StandardMaterial('texture1', scene);
  pipe4joint.material.diffuseTexture = returnCrystalTexture(pipeTextures[3], scene);
  pipe4joint.material.diffuseTexture.uScale = 2.5;
  pipe4joint.material.diffuseTexture.vScale = 2.5;

  let pipe4arm = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe4arm.position.y = 3;
  pipe4arm.position.x = 1.5;
  pipe4arm.rotation.z = 1.57;
  pipe4arm.material = new StandardMaterial('texture1', scene);
  pipe4arm.material.diffuseTexture = returnCrystalTexture(pipeTextures[3], scene);

  let pipe4rim = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  pipe4rim.position.y = 3;
  pipe4rim.position.x = 3.2;
  pipe4rim.rotation.z = 1.57;
  pipe4rim.material = new StandardMaterial('texture1', scene);
  pipe4rim.material.diffuseTexture = returnCrystalTexture(pipeTextures[3], scene);
  pipe4rim.material.diffuseTexture.uScale = 4;
  pipe4rim.material.diffuseTexture.vScale = 1;

  let pipe4hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.01, tessellation: 20}, scene);
  pipe4hole.position.y = 3;
  pipe4hole.position.x = 3.2;
  pipe4hole.rotation.z = 1.57;
  pipe4hole.material = new StandardMaterial('texture1', scene);
  pipe4hole.material.diffuseColor = new Color3(0, 0, 0);

  let pipe4Barrier = MeshBuilder.CreateBox("box", {width: 10, height: 10, depth: 10}, scene);
  pipe4Barrier.position.y = 5;
  pipe4Barrier.material = new StandardMaterial('texture1', scene);
  pipe4Barrier.material.alpha = 0;

  let pipe4entrance = Mesh.MergeMeshes([pipe4base, pipe4joint, pipe4arm, pipe4rim, pipe4hole, pipe4Barrier], true, true, undefined, false, true);
  pipe4entrance.position.x = x + 20;
  pipe4entrance.position.z = z + 20;
  pipe4entrance.rotation.y = 2.355;
  pipe4entrance.physicsImpostor = new PhysicsImpostor(pipe4Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pipe4entrance.checkCollisions = true;
  pipe4entrance.name = "pipe4entrance";

  let pipe1base_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe1base_exit.position.y = 1.5;
  pipe1base_exit.material = new StandardMaterial('texture1', scene);
  pipe1base_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[0], scene);

  let pipe1joint_exit = Mesh.CreateSphere("sphere", 8, 3, scene);
  pipe1joint_exit.position.y = 3;
  pipe1joint_exit.material = new StandardMaterial('texture1', scene);
  pipe1joint_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[0], scene);
  pipe1joint_exit.material.diffuseTexture.uScale = 2.5;
  pipe1joint_exit.material.diffuseTexture.vScale = 2.5;

  let pipe1arm_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 3, tessellation: 12, faceUV: genCylinderFaceUV([0, 0, 3, 1, 0, 0])}, scene);
  pipe1arm_exit.position.y = 3;
  pipe1arm_exit.position.x = 1.5;
  pipe1arm_exit.rotation.z = 1.57;
  pipe1arm_exit.material = new StandardMaterial('texture1', scene);
  pipe1arm_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[0], scene);

  let pipe1rim_exit = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.6}, scene);
  pipe1rim_exit.position.y = 3;
  pipe1rim_exit.position.x = 3.2;
  pipe1rim_exit.rotation.z = 1.57;
  pipe1rim_exit.material = new StandardMaterial('texture1', scene);
  pipe1rim_exit.material.diffuseTexture = returnCrystalTexture(pipeTextures[0], scene);
  pipe1rim_exit.material.diffuseTexture.uScale = 4;
  pipe1rim_exit.material.diffuseTexture.vScale = 1;

  let pipe1hole_exit = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.01, tessellation: 20}, scene);
  pipe1hole_exit.position.y = 3;
  pipe1hole_exit.position.x = 3.2;
  pipe1hole_exit.rotation.z = 1.57;
  pipe1hole_exit.material = new StandardMaterial('texture1', scene);
  pipe1hole_exit.material.diffuseColor = new Color3(0, 0, 0);

  let pipe1Barrier_exit = MeshBuilder.CreateBox("box", {width: 10, height: 5, depth: 6.5}, scene);
  pipe1Barrier_exit.position.y = 2.5;
  pipe1Barrier_exit.position.x = 3.5;
  pipe1Barrier_exit.material = new StandardMaterial('texture1', scene);
  pipe1Barrier_exit.material.alpha = 0;

  let pipe1exit = Mesh.MergeMeshes([pipe1base_exit, pipe1joint_exit, pipe1arm_exit, pipe1rim_exit, pipe1hole_exit, pipe1Barrier_exit], true, true, undefined, false, true);
  pipe1exit.position.y = 8.5;
  pipe1exit.position.x = x + 10;
  pipe1exit.position.z = z + 25;
  pipe1exit.rotation.y = 1.57;
  pipe1exit.rotation.z = -1.57;
  pipe1exit.physicsImpostor = new PhysicsImpostor(pipe1Barrier_exit, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pipe1exit.checkCollisions = true;
  pipe1exit.name = "pipe1exit";

  let plate1holder = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.1, tessellation: 12, faceUV: genCylinderFaceUV([1, 1, 3, 0.1, 1, 1])}, scene);
  plate1holder.position.y = 2;
  plate1holder.material = new StandardMaterial('texture1', scene);
  plate1holder.material.diffuseTexture = returnCrystalTexture(plateColors[0].texture, scene);

  let plate1support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 2, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1, 0.25, 0.25])}, scene);
  plate1support.position.y = 1;
  plate1support.material = new StandardMaterial('texture1', scene);
  plate1support.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let plate1 = Mesh.MergeMeshes([plate1holder, plate1support], true, true, undefined, false, true);
  plate1.position.x = x + 10;
  plate1.position.z = z + 22;
  global_objects.push({id: plate1.uniqueId, obstacle9_id: item_id, type: "plate_Ob9", color_name: plateColors[0].color_name, plate_number: 1});

  let hiddenBall1 = Mesh.CreateSphere("sphere", 8, 1, scene);
  hiddenBall1.position.y = 6.5;
  hiddenBall1.position.x = x + 10;
  hiddenBall1.position.z = z + 22;
  hiddenBall1.material = new StandardMaterial('texture1', scene);
  hiddenBall1.name = "hiddenBall1";

  let ball1sphere = Mesh.CreateSphere("sphere", 8, 1, scene);
  ball1sphere.position.y = 3.5;
  ball1sphere.material = new StandardMaterial('texture1', scene);
  ball1sphere.material.diffuseTexture = returnCrystalTexture(ballColors[0].texture, scene);

  let ball1Barrier = MeshBuilder.CreateBox("box", {width: 1, height: 10, depth: 1}, scene);
  ball1Barrier.position.y = 5;
  ball1Barrier.material = new StandardMaterial('texture1', scene);
  ball1Barrier.material.alpha = 0;

  let ball1 = Mesh.MergeMeshes([ball1sphere, ball1Barrier], true, true, undefined, false, true);
  ball1.position.x = x + 3;
  ball1.position.z = z + 3;
  ball1.physicsImpostor = new PhysicsImpostor(ball1Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  ball1.checkCollisions = true;
  ball1.name = "ball1";
  global_objects.push({id: ball1.uniqueId, obstacle_id: item_id, type: "ball_Ob9", name: (ballColors[0].color_name + "_ball"), inventory: (ballColors[0].inv_name), img: (ballColors[0].color_name + "_ball"), texture: ballColors[0].texture, color_name: ballColors[0].color_name, color_code: ballColors[0].color_code});

  let ball2sphere = Mesh.CreateSphere("sphere", 8, 1, scene);
  ball2sphere.position.y = 3.5;
  ball2sphere.material = new StandardMaterial('texture1', scene);
  ball2sphere.material.diffuseTexture = returnCrystalTexture(ballColors[1].texture, scene);

  let ball2Barrier = MeshBuilder.CreateBox("box", {width: 1, height: 10, depth: 1}, scene);
  ball2Barrier.position.y = 5;
  ball2Barrier.material = new StandardMaterial('texture1', scene);
  ball2Barrier.material.alpha = 0;

  let ball2 = Mesh.MergeMeshes([ball2sphere, ball2Barrier], true, true, undefined, false, true);
  ball2.position.x = x - 3;
  ball2.position.z = z - 3;
  ball2.physicsImpostor = new PhysicsImpostor(ball2Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  ball2.checkCollisions = true;
  ball2.name = "ball2";
  global_objects.push({id: ball2.uniqueId, obstacle_id: item_id, type: "ball_Ob9", name: (ballColors[1].color_name + "_ball"), inventory: (ballColors[1].inv_name), img: (ballColors[1].color_name + "_ball"), texture: ballColors[1].texture, color_name: ballColors[1].color_name, color_code: ballColors[1].color_code});

  let ball3sphere = Mesh.CreateSphere("sphere", 8, 1, scene);
  ball3sphere.position.y = 3.5;
  ball3sphere.material = new StandardMaterial('texture1', scene);
  ball3sphere.material.diffuseTexture = returnCrystalTexture(ballColors[2].texture, scene);

  let ball3Barrier = MeshBuilder.CreateBox("box", {width: 1, height: 10, depth: 1}, scene);
  ball3Barrier.position.y = 5;
  ball3Barrier.material = new StandardMaterial('texture1', scene);
  ball3Barrier.material.alpha = 0;

  let ball3 = Mesh.MergeMeshes([ball3sphere, ball3Barrier], true, true, undefined, false, true);
  ball3.position.x = x + 3;
  ball3.position.z = z - 3;
  ball3.physicsImpostor = new PhysicsImpostor(ball3Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  ball3.checkCollisions = true;
  ball3.name = "ball3";
  global_objects.push({id: ball3.uniqueId, obstacle_id: item_id, type: "ball_Ob9", name: (ballColors[2].color_name + "_ball"), inventory: (ballColors[2].inv_name), img: (ballColors[2].color_name + "_ball"), texture: ballColors[2].texture, color_name: ballColors[2].color_name, color_code: ballColors[2].color_code});

  let ball4sphere = Mesh.CreateSphere("sphere", 8, 1, scene);
  ball4sphere.position.y = 3.5;
  ball4sphere.material = new StandardMaterial('texture1', scene);
  ball4sphere.material.diffuseTexture = returnCrystalTexture(ballColors[3].texture, scene);

  let ball4Barrier = MeshBuilder.CreateBox("box", {width: 1, height: 10, depth: 1}, scene);
  ball4Barrier.position.y = 5;
  ball4Barrier.material = new StandardMaterial('texture1', scene);
  ball4Barrier.material.alpha = 0;

  let ball4 = Mesh.MergeMeshes([ball4sphere, ball4Barrier], true, true, undefined, false, true);
  ball4.position.x = x - 3;
  ball4.position.z = z + 3;
  ball4.physicsImpostor = new PhysicsImpostor(ball4Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  ball4.checkCollisions = true;
  ball4.name = "ball4";
  global_objects.push({id: ball4.uniqueId, obstacle_id: item_id, type: "ball_Ob9", name: (ballColors[3].color_name + "_ball"), inventory: (ballColors[3].inv_name), img: (ballColors[3].color_name + "_ball"), texture: ballColors[3].texture, color_name: ballColors[3].color_name, color_code: ballColors[3].color_code});

  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    ball1.rotate(axis, angle, 1);
    ball2.rotate(axis, angle, 1);
    ball3.rotate(axis, angle, 1);
    ball4.rotate(axis, angle, 1);
  });
}

export {downPipes};
