import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Color3} from "@babylonjs/core/Maths/math";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {generateTree} from "./generate_tree.js";
import {generateObjects} from "./generate_objects.js";
import {selectTreasure} from "./select_treasure.js";
import {returnFloorTexture, genCubeFaceUV} from "../assets/textures.js";

function generateSecretArea(floor_x, floor_y, secret_data, scene, treasure_objects, secret_environments) {
  let ground_textures = {
    alpine: "grass",
    winter: "snow",
    wasteland: "wasteland"
  };
  let ground_texture = ground_textures[secret_environments[0]];
  let tree = generateTree(secret_environments, scene);
  tree.isVisible = false;

  function generateTreeBarriers(piece, floor_x, floor_y, plus_x, plus_z) {
    let TreesData = [
      {
        piece: "horizontal_up",
        data: [
          ["X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "_", "_", "_", "X", "X"],
          ["X", "_", "_", "_", "_", "_", "X"],
          ["X", "_", "_", "_", "_", "_", "X"],
          ["X", "_", "_", "_", "_", "_", "X"],
          ["X", "_", "_", "_", "_", "_", "X"],
          ["X", "_", "_", "_", "_", "_", "X"]
        ]
      },
      {
        piece: "horizontal_down",
        data: [
          ["X", "_", "_", "_", "_", "_", "X"],
          ["X", "_", "_", "_", "_", "_", "X"],
          ["X", "_", "_", "_", "_", "_", "X"],
          ["X", "_", "_", "_", "_", "_", "X"],
          ["X", "_", "_", "_", "_", "_", "X"],
          ["X", "X", "_", "_", "_", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X"]
        ]
      },
      {
        piece: "vertical_left",
        data: [
          ["X", "X", "X", "X", "X", "X", "X"],
          ["X", "X", "_", "_", "_", "_", "_"],
          ["X", "_", "_", "_", "_", "_", "_"],
          ["X", "_", "_", "_", "_", "_", "_"],
          ["X", "_", "_", "_", "_", "_", "_"],
          ["X", "X", "_", "_", "_", "_", "_"],
          ["X", "X", "X", "X", "X", "X", "X"]
        ]
      },
      {
        piece: "vertical_right",
        data: [
          ["X", "X", "X", "X", "X", "X", "X"],
          ["_", "_", "_", "_", "_", "X", "X"],
          ["_", "_", "_", "_", "_", "_", "X"],
          ["_", "_", "_", "_", "_", "_", "X"],
          ["_", "_", "_", "_", "_", "_", "X"],
          ["_", "_", "_", "_", "_", "X", "X"],
          ["X", "X", "X", "X", "X", "X", "X"]
        ]
      }
    ];
    for (let i = 0, length = TreesData.length; i < length; i++) {
      if (TreesData[i].piece === piece) {
        for (let j = 0, jlength = 7; j < jlength; j++) {
          for (let k = 0, klength = 7; k < klength; k++) {
            if (TreesData[i].data[j][k] !== "_") {
              if (TreesData[i].data[j][k] === "X") {
                let newTreeInstance = tree.createInstance("i" + (i + j + k));
                newTreeInstance.position.x = ((k * 10) + (floor_x * 70) + plus_z);
                newTreeInstance.position.z = (((j * 10) - (((j * 10) * 2) + (floor_y * 70))) + plus_x);

                let treesBarrier = MeshBuilder.CreateBox("wall", {width: 10, height: 10, depth: 10}, scene);
                treesBarrier.position.y = 5;
                treesBarrier.position.x = ((k * 10) + (floor_x * 70) + plus_z);
                treesBarrier.position.z = (((j * 10) - (((j * 10) * 2) + (floor_y * 70))) + plus_x);
                treesBarrier.material = new StandardMaterial('texture1', scene);
                treesBarrier.material.diffuseColor = new Color3(0, 1, 0);
                treesBarrier.material.alpha = 0;
                treesBarrier.physicsImpostor = new PhysicsImpostor(treesBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
                treesBarrier.checkCollisions = true;
              }
            }
          }
        }
      }
    }
  }
  let secret_ground = {};
  if (secret_data.type === "horizontal_up") {
    secret_ground = MeshBuilder.CreateBox("floor", {width: 70, height: 1, depth: 70, wrap: true, faceUV: genCubeFaceUV([7, 0.1, 7, 0.1, 7, 0.1, 7, 0.1, 7, 7, 7, 7])}, scene);
    secret_ground.position.x = (floor_x * 70) + 30;
    secret_ground.position.z = ((floor_y * 70) + 40);
    secret_ground.position.y = -0.5;
    secret_ground.material = new StandardMaterial('texture1', scene);
    secret_ground.material.diffuseTexture = returnFloorTexture(ground_texture, scene);
    secret_ground.physicsImpostor = new PhysicsImpostor(secret_ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    secret_ground.checkCollisions = true;
    generateTreeBarriers("horizontal_up", floor_x, floor_y, 70, 0);
    generateObjects(selectTreasure(), (floor_x * 70) + 30, ((floor_y * 70) + 40), scene, treasure_objects);
  }
  if (secret_data.type === "horizontal_down") {
    secret_ground = MeshBuilder.CreateBox("floor", {width: 70, height: 1, depth: 70, wrap: true, faceUV: genCubeFaceUV([7, 0.1, 7, 0.1, 7, 0.1, 7, 0.1, 7, 7, 7, 7])}, scene);
    secret_ground.position.x = (floor_x * 70) + 30;
    secret_ground.position.z = -((floor_y * 70) + 100);
    secret_ground.position.y = -0.5;
    secret_ground.material = new StandardMaterial('texture1', scene);
    secret_ground.material.diffuseTexture = returnFloorTexture(ground_texture, scene);
    secret_ground.physicsImpostor = new PhysicsImpostor(secret_ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    secret_ground.checkCollisions = true;
    generateTreeBarriers("horizontal_down", floor_x, floor_y, -70, 0);
    generateObjects(selectTreasure(), (floor_x * 70) + 30, -((floor_y * 70) + 100), scene, treasure_objects);
  }
  if (secret_data.type === "vertical_left") {
    secret_ground = MeshBuilder.CreateBox("floor", {width: 70, height: 1, depth: 70, wrap: true, faceUV: genCubeFaceUV([7, 0.1, 7, 0.1, 7, 0.1, 7, 0.1, 7, 7, 7, 7])}, scene);
    secret_ground.position.x = (floor_x * 70) - 40;
    secret_ground.position.z = -((floor_y * 70) + 30);
    secret_ground.position.y = -0.5;
    secret_ground.material = new StandardMaterial('texture1', scene);
    secret_ground.material.diffuseTexture = returnFloorTexture(ground_texture, scene);
    secret_ground.physicsImpostor = new PhysicsImpostor(secret_ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    secret_ground.checkCollisions = true;
    generateTreeBarriers("vertical_left", floor_x, floor_y, 0, -70);
    generateObjects(selectTreasure(), (floor_x * 70) - 40, -((floor_y * 70) + 30), scene, treasure_objects);
  }
  if (secret_data.type === "vertical_right") {
    secret_ground = MeshBuilder.CreateBox("floor", {width: 70, height: 1, depth: 70, wrap: true, faceUV: genCubeFaceUV([7, 0.1, 7, 0.1, 7, 0.1, 7, 0.1, 7, 7, 7, 7])}, scene);
    secret_ground.position.x = (floor_x * 70) + 100;
    secret_ground.position.z = -((floor_y * 70) + 30);
    secret_ground.position.y = -0.5;
    secret_ground.material = new StandardMaterial('texture1', scene);
    secret_ground.material.diffuseTexture = returnFloorTexture(ground_texture, scene);
    secret_ground.physicsImpostor = new PhysicsImpostor(secret_ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    secret_ground.checkCollisions = true;
    generateTreeBarriers("vertical_right", floor_x, floor_y, 0, 70);
    generateObjects(selectTreasure(), (floor_x * 70) + 100, -((floor_y * 70) + 30), scene, treasure_objects);
  }
}

export {generateSecretArea};
