import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {sphere_colors, pole_colors, cloneAndShuffleColors, cloneAndShufflePoleColors} from "../sphere_pole_colors.js";
import {generateNavMesh, sendAgent, createCrowd} from "../sphere_pole_crowd.js";
import {degrees} from "../../utilities/math.js";
import {returnMetalTexture, returnCrystalTexture, returnWoodTexture,
  genCylinderFaceUV, genCubeFaceUV} from "../textures.js";

function sphereAgents(x, z, scene, global_objects, item_id, camera, global_language) {
  if (sphere_colors.length === 0) {
    cloneAndShuffleColors();
    cloneAndShufflePoleColors();
  }

  var buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder1.position.y = 1.5;
  buttonHolder1.position.x = x - 20;
  buttonHolder1.position.z = z - 20;
  buttonHolder1.material = new StandardMaterial('texture1', scene);
  buttonHolder1.material.diffuseTexture = returnMetalTexture("iron", scene);
  buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder1.checkCollisions = true;

  var buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier1.position.y = 5;
  buttonBarrier1.position.x = x - 20;
  buttonBarrier1.position.z = z - 20;
  buttonBarrier1.material = new StandardMaterial('texture1', scene);
  buttonBarrier1.material.alpha = 0;
  buttonBarrier1.name = "button1p3";
  global_objects.push({id: buttonBarrier1.uniqueId, obstacle3_id: item_id, type: "structure", name: ""});

  let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton1.position.y = 3.25;
  pushButton1.position.x = x - 20;
  pushButton1.position.z = z - 20;
  pushButton1.material = new StandardMaterial('texture1', scene);
  pushButton1.material.diffuseTexture = returnCrystalTexture("gem_darkred", scene);
  pushButton1.name = "pushButton1p3";

  let wire1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 10, tessellation: 8}, scene);
  wire1.position.y = 0.05;
  wire1.position.x = x - 20;
  wire1.position.z = z - 14;
  wire1.rotation.x = Math.PI / 2;
  wire1.material = new StandardMaterial('texture1', scene);
  wire1.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  var powerBox = MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 1}, scene);
  powerBox.position.y = 0;
  powerBox.position.x = x - 20;
  powerBox.position.z = z - 9;
  powerBox.material = new StandardMaterial('texture1', scene);
  powerBox.material.diffuseTexture = returnMetalTexture("iron", scene);

  let wire2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 5, tessellation: 8}, scene);
  wire2.position.y = 0.05;
  wire2.position.x = x - 17;
  wire2.position.z = z - 9;
  wire2.rotation.z = Math.PI / 2;
  wire2.material = new StandardMaterial('texture1', scene);
  wire2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  for (let i = 0, length = degrees.length; i < length; i++) {
    let pole = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 3.5, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1.75, 0.25, 0.25])}, scene);
    pole.position.y = 1.75;
    pole.position.x = (17.5 * Math.cos(degrees[i])) + x;
    pole.position.z = (17.5 * Math.sin(degrees[i])) + z;
    pole.material = new StandardMaterial('texture1', scene);
    pole.material.diffuseTexture = returnCrystalTexture(pole_colors[i].texture, scene);
    pole.name = pole_colors[i].color_name + "Pole";

    let bulb = Mesh.CreateSphere('mob', 5, 2.5, scene);
    bulb.position.y = 4;
    bulb.position.x = (17.5 * Math.cos(degrees[i])) + x;
    bulb.position.z = (17.5 * Math.sin(degrees[i])) + z;
    bulb.material = new StandardMaterial('texture1', scene);
    for (let j = 0, jlength = sphere_colors.length; j < jlength; j++) {
      if (pole_colors[i].color_name === sphere_colors[j].color_name) {
        bulb.material.diffuseColor = sphere_colors[j].color_code;
        bulb.material.specularColor = sphere_colors[j].color_code;
        bulb.material.emissiveColor = sphere_colors[j].color_code;
        bulb.material.ambientColor = sphere_colors[j].color_code;
        break;
      }
    }
    bulb.material.alpha = 0;
    bulb.name = pole_colors[i].color_name + "Bulb";

    let poleBarrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 2.5, height: 6, tessellation: 8}, scene);
    poleBarrier.position.y = 3;
    poleBarrier.position.x = (17.5 * Math.cos(degrees[i])) + x;
    poleBarrier.position.z = (17.5 * Math.sin(degrees[i])) + z;
    poleBarrier.material = new StandardMaterial('texture1', scene);
    poleBarrier.material.alpha = 0;
    poleBarrier.physicsImpostor = new PhysicsImpostor(poleBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    poleBarrier.checkCollisions = true;
  }

  let bigPlatform = MeshBuilder.CreateCylinder("cylinder", {diameter: 35, height: 2, tessellation: 20, faceUV: genCylinderFaceUV([0, 0, 20, 1, 10, 10])}, scene);
  bigPlatform.position.y = 1;
  bigPlatform.position.x = x;
  bigPlatform.position.z = z;
  bigPlatform.material = new StandardMaterial('texture1', scene);
  bigPlatform.material.diffuseTexture = returnWoodTexture("wood_lightbrown", scene);
  bigPlatform.physicsImpostor = new PhysicsImpostor(bigPlatform, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  bigPlatform.checkCollisions = true;
  bigPlatform.name = "bigPlatform";

  generateNavMesh(scene);
  createCrowd(scene);

  scene.onBeforeRenderObservable.add(function () {
    sendAgent(camera);
  });
}

export {sphereAgents};
