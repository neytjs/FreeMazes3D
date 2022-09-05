import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {setXZ, shuffleMasterColors, masterColors} from "../rolling_data.js";
import {returnMetalTexture, returnCrystalTexture, returnLiquidTexture,
  genCubeFaceUV, genCylinderFaceUV} from "../textures.js";
import {generatePole} from "../objects/generatePole.js";

function rollingPipes(x, z, scene, global_objects, item_id, camera, global_language) {
  setXZ(x, z);
  shuffleMasterColors();

  let set = new Set();
  let s_counter = 0;
  let m_colors = [];
  function fillSet() {
    set.add(masterColors[s_counter]);
    s_counter = s_counter + 1;

    if (s_counter < 3) {
      fillSet();
    }
  }
  fillSet();

  function insertMasterColors(value) {
    if (value === "blue") {
      m_colors.push(new Color3(0, 0, 1));
    }
    if (value === "red") {
      m_colors.push(new Color3(1, 0, 0));
    }
    if (value === "green") {
      m_colors.push(new Color3(0.06, 0.64, 0.06));
    }
  }
// insert the random set of pos into the clutter array
  set.forEach(insertMasterColors);

  let buttonColors = [
    {color_name: "blue", button_code: new Color3(0, 0, 1), button_texture: "gem_blue", holder_code: "metal_blue"},
    {color_name: "red", button_code: new Color3(1, 0, 0), button_texture: "gem_red", holder_code: "metal_red"},
    {color_name: "green", button_code: new Color3(0.06, 0.64, 0.06), button_texture: "gem_green", holder_code: "metal_green"}
  ];
  buttonColors = arrayShuffler(buttonColors);

  function generatePipe(x, z) {
    let pipe1 = MeshBuilder.CreateTorus("torus", {diameter: 20, thickness: 4}, scene);
    pipe1.rotation.x = 1.57;
    pipe1.material = new StandardMaterial('texture1', scene);
    pipe1.material.diffuseTexture = returnLiquidTexture("water", scene);
    pipe1.material.alpha = 0.7;
    pipe1.physicsImpostor = new PhysicsImpostor(pipe1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    pipe1.checkCollisions = true;

    let pipe1Barrier1 = MeshBuilder.CreateBox("box", {width: 4.5, height: 4, depth: 4}, scene);
    pipe1Barrier1.position.y = 2;
    pipe1Barrier1.position.x = 10;
    pipe1Barrier1.material = new StandardMaterial('texture1', scene);
    pipe1Barrier1.material.diffuseColor = new Color3(0.34, 0.34, 0.33);
    pipe1Barrier1.physicsImpostor = new PhysicsImpostor(pipe1Barrier1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    pipe1Barrier1.checkCollisions = true;
    pipe1Barrier1.material.alpha = 0;

    let pipe1Barrier2 = MeshBuilder.CreateBox("box", {width: 4.5, height: 4, depth: 4}, scene);
    pipe1Barrier2.position.y = 2;
    pipe1Barrier2.position.x = -10;
    pipe1Barrier2.material = new StandardMaterial('texture1', scene);
    pipe1Barrier2.material.diffuseColor = new Color3(0.34, 0.34, 0.33);
    pipe1Barrier2.physicsImpostor = new PhysicsImpostor(pipe1Barrier2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    pipe1Barrier2.checkCollisions = true;
    pipe1Barrier2.material.alpha = 0;

    let rim1 = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 0.5}, scene);
    rim1.position.y = 0;
    rim1.position.x = 10;
    rim1.material = new StandardMaterial('texture1', scene);
    rim1.material.diffuseTexture = returnMetalTexture("silver", scene);

    let rim2 = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 0.5}, scene);
    rim2.position.y = 0;
    rim2.position.x = -10;
    rim2.material = new StandardMaterial('texture1', scene);
    rim2.material.diffuseTexture = returnMetalTexture("silver", scene);

    let rim3 = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 0.5}, scene);
    rim3.position.y = 8.2;
    rim3.rotation.z = -0.98125;
    rim3.position.x = -5.5;
    rim3.material = new StandardMaterial('texture1', scene);
    rim3.material.diffuseTexture = returnMetalTexture("silver", scene);

    let rim4 = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 0.5}, scene);
    rim4.position.y = 8.2;
    rim4.rotation.z = 0.98125;
    rim4.position.x = 5.5;
    rim4.material = new StandardMaterial('texture1', scene);
    rim4.material.diffuseTexture = returnMetalTexture("silver", scene);

    let hole1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.9, height: 0.1, tessellation: 20}, scene);
    hole1.position.x = 10;
    hole1.material = new StandardMaterial('texture1', scene);
    hole1.material.diffuseColor = new Color3(0, 0, 0);

    let hole2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.9, height: 0.1, tessellation: 20}, scene);
    hole2.position.x = -10;
    hole2.material = new StandardMaterial('texture1', scene);
    hole2.material.diffuseColor = new Color3(0, 0, 0);

    let pipe = Mesh.MergeMeshes([pipe1, pipe1Barrier1, pipe1Barrier2, rim1, rim2, rim3, rim4, hole1, hole2], true, true, undefined, false, true);
    pipe.position.x = x;
    pipe.position.z = z;
  }

  generatePipe(x, (z - 10));
  generatePipe(x, (z + 10));

  let machine1 = MeshBuilder.CreateBox("box", {width: 8, height: 3.5, depth: 8}, scene);
  machine1.position.y = 1.75;
  machine1.position.x = x - 20;
  machine1.position.z = z - 20;
  machine1.material = new StandardMaterial('texture1', scene);
  machine1.material.diffuseTexture = returnMetalTexture("iron_medium", scene);
  machine1.material.diffuseTexture.uScale = 2;
  machine1.material.diffuseTexture.vScale = 2;
  machine1.physicsImpostor = new PhysicsImpostor(machine1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  machine1.checkCollisions = true;
  global_objects.push({id: machine1.uniqueId, obstacle20_id: item_id, type: "structure", name: ""});

  let pipe2 = MeshBuilder.CreateTorus("torus", {diameter: 10, thickness: 4}, scene);
  pipe2.rotation.x = 1.57;
  pipe2.rotation.z = 1.57;
  pipe2.position.y = 2.5;
  pipe2.position.x = x - 20;
  pipe2.position.z = z - 25;
  pipe2.material = new StandardMaterial('texture1', scene);
  pipe2.material.diffuseTexture = returnLiquidTexture("water", scene);
  pipe2.material.alpha = 0.7;

  let rim5 = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 0.5}, scene);
  rim5.rotation.x = 1.57;
  rim5.position.y = 7.5;
  rim5.position.x = x - 20;
  rim5.position.z = z - 25;
  rim5.material = new StandardMaterial('texture1', scene);
  rim5.material.diffuseTexture = returnMetalTexture("silver", scene);

  let rim6 = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 0.5}, scene);
  rim6.position.y = 3.5;
  rim6.position.x = x - 20;
  rim6.position.z = z - 20.2;
  rim6.material = new StandardMaterial('texture1', scene);
  rim6.material.diffuseTexture = returnMetalTexture("silver", scene);

  let hole3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.9, height: 0.1, tessellation: 20}, scene);
  hole3.rotation.x = 1.57;
  hole3.position.y = 7.5;
  hole3.position.x = x - 20;
  hole3.position.z = z - 25;
  hole3.material = new StandardMaterial('texture1', scene);
  hole3.material.diffuseColor = new Color3(0, 0, 0);

  let hole4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.9, height: 0.1, tessellation: 20}, scene);
  hole4.position.y = 3.5;
  hole4.position.x = x - 20;
  hole4.position.z = z - 20.2;
  hole4.material = new StandardMaterial('texture1', scene);
  hole4.material.diffuseColor = new Color3(0, 0, 0);

  let machine2 = MeshBuilder.CreateBox("box", {width: 8, height: 3.5, depth: 8}, scene);
  machine2.position.y = 8.75;
  machine2.position.x = x;
  machine2.position.z = z;
  machine2.material = new StandardMaterial('texture1', scene);
  machine2.material.diffuseTexture = returnMetalTexture("iron_medium", scene);
  machine2.material.diffuseTexture.uScale = 2;
  machine2.material.diffuseTexture.vScale = 2;

  let support1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 7, tessellation: 20, faceUV: genCylinderFaceUV([0, 0, 1, 5, 0, 0])}, scene);
  support1.position.y = 3.5;
  support1.position.x = x - 3;
  support1.position.z = z - 3;
  support1.material = new StandardMaterial('texture1', scene);
  support1.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

  let support2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 7, tessellation: 20, faceUV: genCylinderFaceUV([0, 0, 1, 5, 0, 0])}, scene);
  support2.position.y = 3.5;
  support2.position.x = x + 3;
  support2.position.z = z + 3;
  support2.material = new StandardMaterial('texture1', scene);
  support2.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

  let support3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 7, tessellation: 20, faceUV: genCylinderFaceUV([0, 0, 1, 5, 0, 0])}, scene);
  support3.position.y = 3.5;
  support3.position.x = x - 3;
  support3.position.z = z + 3;
  support3.material = new StandardMaterial('texture1', scene);
  support3.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

  let support4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 7, tessellation: 20, faceUV: genCylinderFaceUV([0, 0, 1, 5, 0, 0])}, scene);
  support4.position.y = 3.5;
  support4.position.x = x + 3;
  support4.position.z = z - 3;
  support4.material = new StandardMaterial('texture1', scene);
  support4.material.diffuseTexture = returnMetalTexture("iron_blue", scene);

  let pipe3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 7, tessellation: 20}, scene);
  pipe3.position.y = 3.5;
  pipe3.position.x = x;
  pipe3.position.z = z;
  pipe3.material = new StandardMaterial('texture1', scene);
  pipe3.material.diffuseTexture = returnLiquidTexture("water", scene);
  pipe3.material.alpha = 0.7;

  let rim7 = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 0.5}, scene);
  rim7.position.x = x;
  rim7.position.z = z;
  rim7.material = new StandardMaterial('texture1', scene);
  rim7.material.diffuseTexture = returnMetalTexture("silver", scene);

  let hole5 = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.9, height: 0.1, tessellation: 20}, scene);
  hole5.position.x = x;
  hole5.position.z = z;
  hole5.material = new StandardMaterial('texture1', scene);
  hole5.material.diffuseColor = new Color3(0, 0, 0);

  let rim8 = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 0.5}, scene);
  rim8.position.y = 7;
  rim8.position.x = x;
  rim8.position.z = z;
  rim8.material = new StandardMaterial('texture1', scene);
  rim8.material.diffuseTexture = returnMetalTexture("silver", scene);

  let hole6 = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.9, height: 0.1, tessellation: 20}, scene);
  hole6.position.y = 7;
  hole6.position.x = x;
  hole6.position.z = z;
  hole6.material = new StandardMaterial('texture1', scene);
  hole6.material.diffuseColor = new Color3(0, 0, 0);

  let machine2Barrier = MeshBuilder.CreateBox("box", {width: 8, height: 10, depth: 8}, scene);
  machine2Barrier.position.y = 5;
  machine2Barrier.position.x = x;
  machine2Barrier.position.z = z;
  machine2Barrier.material = new StandardMaterial('texture1', scene);
  machine2Barrier.material.diffuseColor = new Color3(0.34, 0.34, 0.33);
  machine2Barrier.physicsImpostor = new PhysicsImpostor(machine2Barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  machine2Barrier.checkCollisions = true;
  machine2Barrier.material.alpha = 0;

  function generateButton(x, z, barrier_name, button_name, button_color, holder_color, color_name, button_texture) {
    let buttonHolder = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
    buttonHolder.position.y = 1.5;
    buttonHolder.position.x = x;
    buttonHolder.position.z = z;
    buttonHolder.material = new StandardMaterial('texture1', scene);
    buttonHolder.material.diffuseTexture = returnMetalTexture(holder_color, scene);
    buttonHolder.physicsImpostor = new PhysicsImpostor(buttonHolder, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    buttonHolder.checkCollisions = true;

    let buttonBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
    buttonBarrier.position.y = 5;
    buttonBarrier.position.x = x;
    buttonBarrier.position.z = z;
    buttonBarrier.material = new StandardMaterial('texture1', scene);
    buttonBarrier.material.alpha = 0;
    buttonBarrier.name = barrier_name;

    let pushButton = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
    pushButton.position.y = 3.25;
    pushButton.position.x = x;
    pushButton.position.z = z;
    pushButton.material = new StandardMaterial('texture1', scene);
    pushButton.material.diffuseTexture = returnCrystalTexture(button_texture, scene);
    pushButton.name = button_name;

    if (color_name) {
      global_objects.push({button_name: button_name, color_name: color_name, color_code: button_color, button_texture: button_texture});
    }
  }

  generateButton((x - 20), (z + 20), "button1p20", "pushButton1p20", buttonColors[0].button_code, buttonColors[0].holder_code, buttonColors[0].color_name, buttonColors[0].button_texture);
  generateButton((x + 20), (z - 20), "button2p20", "pushButton2p20", buttonColors[1].button_code, buttonColors[1].holder_code, buttonColors[1].color_name, buttonColors[1].button_texture);
  generateButton((x + 20), (z + 20), "button3p20", "pushButton3p20", buttonColors[2].button_code, buttonColors[2].holder_code, buttonColors[2].color_name, buttonColors[2].button_texture);

  let controlBase1 = MeshBuilder.CreateBox("box", {width: 4, height: 0.2, depth: 4, wrap: true, faceUV: genCubeFaceUV([2, 0.1, 2, 0.1, 2, 0.1, 2, 0.1, 2, 2, 2, 2])}, scene);
  controlBase1.position.y = 0.1;
  controlBase1.position.x = x - 20;
  controlBase1.position.z = z + 20;
  controlBase1.material = new StandardMaterial('texture1', scene);
  controlBase1.material.diffuseTexture = returnMetalTexture("iron", scene);

  let controlBase2 = MeshBuilder.CreateBox("box", {width: 4, height: 0.2, depth: 4, wrap: true, faceUV: genCubeFaceUV([2, 0.1, 2, 0.1, 2, 0.1, 2, 0.1, 2, 2, 2, 2])}, scene);
  controlBase2.position.y = 0.1;
  controlBase2.position.x = x + 20;
  controlBase2.position.z = z - 20;
  controlBase2.material = new StandardMaterial('texture1', scene);
  controlBase2.material.diffuseTexture = returnMetalTexture("iron", scene);

  let controlBase3 = MeshBuilder.CreateBox("box", {width: 4, height: 0.2, depth: 4, wrap: true, faceUV: genCubeFaceUV([2, 0.1, 2, 0.1, 2, 0.1, 2, 0.1, 2, 2, 2, 2])}, scene);
  controlBase3.position.y = 0.1;
  controlBase3.position.x = x + 20;
  controlBase3.position.z = z + 20;
  controlBase3.material = new StandardMaterial('texture1', scene);
  controlBase3.material.diffuseTexture = returnMetalTexture("iron", scene);

  let wire1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 40, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 40, 0.1, 0.1])}, scene);
  wire1.position.y = 0.05;
  wire1.position.x = x + 20;
  wire1.position.z = z;
  wire1.rotation.x = Math.PI / 2;
  wire1.material = new StandardMaterial('texture1', scene);
  wire1.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 40, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 40, 0.1, 0.1])}, scene);
  wire2.position.y = 0.05;
  wire2.position.x = x - 20;
  wire2.position.z = z;
  wire2.rotation.x = Math.PI / 2;
  wire2.material = new StandardMaterial('texture1', scene);
  wire2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 40, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 40, 0.1, 0.1])}, scene);
  wire3.position.y = 0.05;
  wire3.position.x = x;
  wire3.position.z = z + 20;
  wire3.rotation.z = Math.PI / 2;
  wire3.material = new StandardMaterial('texture1', scene);
  wire3.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 40, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 40, 0.1, 0.1])}, scene);
  wire4.position.y = 0.05;
  wire4.position.x = x;
  wire4.position.z = z - 20;
  wire4.rotation.z = Math.PI / 2;
  wire4.material = new StandardMaterial('texture1', scene);
  wire4.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let ball1 = Mesh.CreateSphere("sphere", 8, 3.4, scene);
  ball1.position.y = 8.75;
  ball1.position.x = x;
  ball1.position.z = z;
  ball1.material = new StandardMaterial('texture1', scene);
  ball1.name = "ball1Ob20";

  let ball2 = Mesh.CreateSphere("sphere", 8, 3.4, scene);
  ball2.position.y = -2;
  ball2.position.x = x - 10;
  ball2.position.z = z + 10;
  ball2.material = new StandardMaterial('texture1', scene);
  ball2.name = "ball2Ob20";

  let ball3 = Mesh.CreateSphere("sphere", 8, 3.4, scene);
  ball3.position.y = -2;
  ball3.position.x = x + 10;
  ball3.position.z = z - 10;
  ball3.material = new StandardMaterial('texture1', scene);
  ball3.name = "ball3Ob20";

  let ball4 = Mesh.CreateSphere("sphere", 8, 3.4, scene);
  ball4.position.y = 7.5;
  ball4.position.x = x - 20;
  ball4.position.z = z - 28;
  ball4.material = new StandardMaterial('texture1', scene);
  ball4.name = "ball4Ob20";

  let b2axis = new Vector3(0, 0, -10);
  let b3axis = new Vector3(0, 0, 10);
  let b4axis = new Vector3(10, 0, 0);
  let angle = 0.075;
  scene.registerAfterRender(function () {
    ball1.rotate(b2axis, angle, 1);
    ball2.rotate(b2axis, angle, 1);
    ball3.rotate(b3axis, angle, 1);
    ball4.rotate(b4axis, angle, 1);
  });

  generatePole((x - 17), 0.5, (z - 23), "bulb1Ob20", new Color3(0.55, 0.48, 0.48));
  generatePole((x - 17), 0.5, (z - 17), "bulb2Ob20", new Color3(0.55, 0.48, 0.48));
  generatePole((x - 23), 0.5, (z - 17), "bulb3Ob20", new Color3(0.55, 0.48, 0.48));

  generatePole(x, 0, (z - 10), "hintBulb", m_colors[0]);
  generatePole(x, 0, (z + 10), "hintBulb", m_colors[1]);

  let hintBulb1Barrier = MeshBuilder.CreateBox("hintBulb1Ob20", {width: 2, height: 10, depth: 2}, scene);
  hintBulb1Barrier.position.y = 5;
  hintBulb1Barrier.position.x = x;
  hintBulb1Barrier.position.z = z - 10;
  hintBulb1Barrier.material = new StandardMaterial('texture1', scene);
  hintBulb1Barrier.material.alpha = 0;
  hintBulb1Barrier.physicsImpostor = new PhysicsImpostor(hintBulb1Barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  hintBulb1Barrier.checkCollisions = true;

  let hintBulb2Barrier = MeshBuilder.CreateBox("hintBulb2Ob20", {width: 2, height: 10, depth: 2}, scene);
  hintBulb2Barrier.position.y = 5;
  hintBulb2Barrier.position.x = x;
  hintBulb2Barrier.position.z = z + 10;
  hintBulb2Barrier.material = new StandardMaterial('texture1', scene);
  hintBulb2Barrier.material.alpha = 0;
  hintBulb2Barrier.physicsImpostor = new PhysicsImpostor(hintBulb2Barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  hintBulb2Barrier.checkCollisions = true;

  let controlBase4 = MeshBuilder.CreateBox("box", {width: 2, height: 0.2, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 0.1, 1, 0.1, 1, 0.1, 1, 0.1, 1, 1, 1, 1])}, scene);
  controlBase4.position.y = 0.1;
  controlBase4.position.x = x;
  controlBase4.position.z = z - 10;
  controlBase4.material = new StandardMaterial('texture1', scene);
  controlBase4.material.diffuseTexture = returnMetalTexture("iron", scene);

  let controlBase5 = MeshBuilder.CreateBox("box", {width: 2, height: 0.2, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 0.1, 1, 0.1, 1, 0.1, 1, 0.1, 1, 1, 1, 1])}, scene);
  controlBase5.position.y = 0.1;
  controlBase5.position.x = x;
  controlBase5.position.z = z + 10;
  controlBase5.material = new StandardMaterial('texture1', scene);
  controlBase5.material.diffuseTexture = returnMetalTexture("iron", scene);

  let wire5 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 10, 0.1, 0.1])}, scene);
  wire5.position.y = 0.05;
  wire5.position.x = x;
  wire5.position.z = z - 15;
  wire5.rotation.x = Math.PI / 2;
  wire5.material = new StandardMaterial('texture1', scene);
  wire5.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire6 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 10, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 10, 0.1, 0.1])}, scene);
  wire6.position.y = 0.05;
  wire6.position.x = x;
  wire6.position.z = z + 15;
  wire6.rotation.x = Math.PI / 2;
  wire6.material = new StandardMaterial('texture1', scene);
  wire6.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let connectBox1 = MeshBuilder.CreateBox("box", {width: 0.5, height: 0.3, depth: 0.5, wrap: true, faceUV: genCubeFaceUV([0.5, 0.2, 0.5, 0.2, 0.5, 0.2, 0.5, 0.2, 0.5, 0.5, 0.5, 0.5])}, scene);
  connectBox1.position.y = 0.15;
  connectBox1.position.x = x;
  connectBox1.position.z = z - 20;
  connectBox1.material = new StandardMaterial('texture1', scene);
  connectBox1.material.diffuseTexture = returnMetalTexture("iron", scene);

  let connectBox2 = MeshBuilder.CreateBox("box", {width: 0.5, height: 0.3, depth: 0.5, wrap: true, faceUV: genCubeFaceUV([0.5, 0.2, 0.5, 0.2, 0.5, 0.2, 0.5, 0.2, 0.5, 0.5, 0.5, 0.5])}, scene);
  connectBox2.position.y = 0.15;
  connectBox2.position.x = x;
  connectBox2.position.z = z + 20;
  connectBox2.material = new StandardMaterial('texture1', scene);
  connectBox2.material.diffuseTexture = returnMetalTexture("iron", scene);
}

export {rollingPipes};
