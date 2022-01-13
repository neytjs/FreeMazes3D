import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {puzzleColors, buttonColors, cloneAndShufflePuzzleColors, buttonColorOrganizer} from "../bulb_button_colors.js";
import {returnMetalTexture, returnCrystalTexture, returnStoneTexture} from "../textures.js";
import {generatePole} from "../objects/generatePole.js";

function timedButtons(x, z, scene, global_objects, item_id, camera) {
  cloneAndShufflePuzzleColors();
  buttonColorOrganizer(puzzleColors);

  function generateButton(x, z, barrier_name, button_name, button_color, holder_color, color_name, button_texture) {
    let buttonHolder = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
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

    let pushButton = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
    pushButton.position.y = 3.25;
    pushButton.position.x = x;
    pushButton.position.z = z;
    pushButton.material = new StandardMaterial('texture1', scene);
    pushButton.material.diffuseTexture = returnCrystalTexture(button_texture, scene);
    pushButton.name = button_name;

    if (color_name) {
      global_objects.push({button_name: button_name, color_name: color_name, color_code: button_color});
    }
  }
  generateButton(x, z, "button1p16", "pushButton1p16", null, "iron", null, "gem_darkred");
  generateButton((x - 20), (z + 20), "button2p16", "pushButton2p16", buttonColors[0].button_code, buttonColors[0].holder_code, buttonColors[0].color_name, buttonColors[0].button_texture);
  generateButton((x + 20), (z - 20), "button3p16", "pushButton3p16", buttonColors[1].button_code, buttonColors[1].holder_code, buttonColors[1].color_name, buttonColors[1].button_texture);
  generateButton((x - 20), (z - 20), "button4p16", "pushButton4p16", buttonColors[2].button_code, buttonColors[2].holder_code, buttonColors[2].color_name, buttonColors[2].button_texture);
  generateButton((x + 20), (z + 20), "button5p16", "pushButton5p16", buttonColors[3].button_code, buttonColors[3].holder_code, buttonColors[3].color_name, buttonColors[3].button_texture);

  let wire1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 40, tessellation: 8}, scene);
  wire1.position.y = 0.05;
  wire1.position.x = x + 20;
  wire1.position.z = z;
  wire1.rotation.x = Math.PI / 2;
  wire1.material = new StandardMaterial('texture1', scene);
  wire1.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
  global_objects.push({id: wire1.uniqueId, obstacle16_id: item_id, type: "structure", name: ""});

  let wire2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 40, tessellation: 8}, scene);
  wire2.position.y = 0.05;
  wire2.position.x = x - 20;
  wire2.position.z = z;
  wire2.rotation.x = Math.PI / 2;
  wire2.material = new StandardMaterial('texture1', scene);
  wire2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let wire3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 40, tessellation: 8}, scene);
  wire3.position.y = 0.05;
  wire3.position.x = x;
  wire3.position.z = z;
  wire3.rotation.z = Math.PI / 2;
  wire3.material = new StandardMaterial('texture1', scene);
  wire3.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let connectBox1 = MeshBuilder.CreateBox("box", {width: 0.5, height: 0.3, depth: 0.5}, scene);
  connectBox1.position.y = 0.15;
  connectBox1.position.x = x + 20;
  connectBox1.position.z = z;
  connectBox1.material = new StandardMaterial('texture1', scene);
  connectBox1.material.diffuseTexture = returnMetalTexture("iron", scene);

  let connectBox2 = MeshBuilder.CreateBox("box", {width: 0.5, height: 0.3, depth: 0.5}, scene);
  connectBox2.position.y = 0.15;
  connectBox2.position.x = x - 20;
  connectBox2.position.z = z;
  connectBox2.material = new StandardMaterial('texture1', scene);
  connectBox2.material.diffuseTexture = returnMetalTexture("iron", scene);

  let controlBase = MeshBuilder.CreateBox("box", {width: 10, height: 0.2, depth: 10, wrap: true}, scene);
  controlBase.position.y = 0.1;
  controlBase.position.x = x;
  controlBase.position.z = z;
  controlBase.material = new StandardMaterial('texture1', scene);
  controlBase.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);
  controlBase.material.diffuseTexture.uScale = 2;
  controlBase.material.diffuseTexture.vScale = 2;

  let controlBase1 = MeshBuilder.CreateBox("box", {width: 4, height: 0.2, depth: 4}, scene);
  controlBase1.position.y = 0.1;
  controlBase1.position.x = x - 20;
  controlBase1.position.z = z + 20;
  controlBase1.material = new StandardMaterial('texture1', scene);
  controlBase1.material.diffuseTexture = returnMetalTexture("iron", scene);

  let controlBase2 = MeshBuilder.CreateBox("box", {width: 4, height: 0.2, depth: 4}, scene);
  controlBase2.position.y = 0.1;
  controlBase2.position.x = x + 20;
  controlBase2.position.z = z - 20;
  controlBase2.material = new StandardMaterial('texture1', scene);
  controlBase2.material.diffuseTexture = returnMetalTexture("iron", scene);

  let controlBase3 = MeshBuilder.CreateBox("box", {width: 4, height: 0.2, depth: 4}, scene);
  controlBase3.position.y = 0.1;
  controlBase3.position.x = x - 20;
  controlBase3.position.z = z - 20;
  controlBase3.material = new StandardMaterial('texture1', scene);
  controlBase3.material.diffuseTexture = returnMetalTexture("iron", scene);

  let controlBase4 = MeshBuilder.CreateBox("box", {width: 4, height: 0.2, depth: 4}, scene);
  controlBase4.position.y = 0.1;
  controlBase4.position.x = x + 20;
  controlBase4.position.z = z + 20;
  controlBase4.material = new StandardMaterial('texture1', scene);
  controlBase4.material.diffuseTexture = returnMetalTexture("iron", scene);

  generatePole((x + 2.25), 0, (z + 4.5), "bulb1Ob16", new Color3(0.55, 0.48, 0.48), scene);
  generatePole((x + 0.75), 0, (z + 4.5), "bulb2Ob16", new Color3(0.55, 0.48, 0.48), scene);
  generatePole((x - 0.75), 0, (z + 4.5), "bulb3Ob16", new Color3(0.55, 0.48, 0.48), scene);
  generatePole((x - 2.25), 0, (z + 4.5), "bulb4Ob16", new Color3(0.55, 0.48, 0.48), scene);
  generatePole((x + 2.25), 0, (z - 4.5), "", puzzleColors[0].color_code, scene);
  generatePole((x + 0.75), 0, (z - 4.5), "", puzzleColors[1].color_code, scene);
  generatePole((x - 0.75), 0, (z - 4.5), "", puzzleColors[2].color_code, scene);
  generatePole((x - 2.25), 0, (z - 4.5), "", puzzleColors[3].color_code, scene);

  let polesBase1 = MeshBuilder.CreateBox("box", {width: 6, height: 0.5, depth: 0.5}, scene);
  polesBase1.position.y = 0.25;
  polesBase1.position.x = x;
  polesBase1.position.z = z + 4.5;
  polesBase1.material = new StandardMaterial('texture1', scene);
  polesBase1.material.diffuseTexture = returnStoneTexture("stone_pink", scene);

  let polesBase2 = MeshBuilder.CreateBox("box", {width: 6, height: 0.5, depth: 0.5}, scene);
  polesBase2.position.y = 0.25;
  polesBase2.position.x = x;
  polesBase2.position.z = z - 4.5;
  polesBase2.material = new StandardMaterial('texture1', scene);
  polesBase2.material.diffuseTexture = returnStoneTexture("stone_pink", scene);

  let polesBarrier1 = MeshBuilder.CreateBox("box", {width: 6, height: 5, depth: 0.5}, scene);
  polesBarrier1.position.y = 2.5;
  polesBarrier1.position.x = x;
  polesBarrier1.position.z = z + 4.5;
  polesBarrier1.material = new StandardMaterial('texture1', scene);
  polesBarrier1.material.alpha = 0;
  polesBarrier1.physicsImpostor = new PhysicsImpostor(polesBarrier1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  polesBarrier1.checkCollisions = true;

  let polesBarrier2 = MeshBuilder.CreateBox("box", {width: 6, height: 5, depth: 0.5}, scene);
  polesBarrier2.position.y = 2.5;
  polesBarrier2.position.x = x;
  polesBarrier2.position.z = z - 4.5;
  polesBarrier2.material = new StandardMaterial('texture1', scene);
  polesBarrier2.material.alpha = 0;
  polesBarrier2.physicsImpostor = new PhysicsImpostor(polesBarrier2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  polesBarrier2.checkCollisions = true;
}

export {timedButtons};
