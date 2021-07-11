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

function generateSecretArea(floor_x, floor_y, secret_data, scene, treasure_objects, secret_environments) {
  let ground_colors = {
    alpine: new Color3(0.49, 0.92, 0),
    winter: new Color3(0.91, 0.97, 0.98),
    wasteland: new Color3(0.8, 0.45, 0.06)
  };
  let ground_color = ground_colors[secret_environments[0]];

  function generateTreeBarriers(piece, floor_x, floor_y, plus_x, plus_z) {
    var TreesData = [
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
                generateTree(k, j, floor_y, floor_x, plus_x, plus_z, scene, secret_environments);
              }
            }
          }
        }
      }
    }
  }
  if (secret_data.type === "horizontal_up") {
    var secret_ground = MeshBuilder.CreateBox("floor", {width: 70, height: 1, depth: 70}, scene);
    secret_ground.position.x = (floor_x * 70) + 30;
    secret_ground.position.z = ((floor_y * 70) + 40);
    secret_ground.position.y = -0.5;
    secret_ground.material = new StandardMaterial('texture1', scene);
    secret_ground.material.diffuseColor = ground_color;
    secret_ground.physicsImpostor = new PhysicsImpostor(secret_ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    secret_ground.checkCollisions = true;
    generateTreeBarriers("horizontal_up", floor_x, floor_y, 70, 0);
    generateObjects(selectTreasure(), (floor_x * 70) + 30, ((floor_y * 70) + 40), scene, treasure_objects);
  }
  if (secret_data.type === "horizontal_down") {
    var secret_ground = MeshBuilder.CreateBox("floor", {width: 70, height: 1, depth: 70}, scene);
    secret_ground.position.x = (floor_x * 70) + 30;
    secret_ground.position.z = -((floor_y * 70) + 100);
    secret_ground.position.y = -0.5;
    secret_ground.material = new StandardMaterial('texture1', scene);
    secret_ground.material.diffuseColor = ground_color;
    secret_ground.physicsImpostor = new PhysicsImpostor(secret_ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    secret_ground.checkCollisions = true;
    generateTreeBarriers("horizontal_down", floor_x, floor_y, -70, 0);
    generateObjects(selectTreasure(), (floor_x * 70) + 30, -((floor_y * 70) + 100), scene, treasure_objects);
  }
  if (secret_data.type === "vertical_left") {
    var secret_ground = MeshBuilder.CreateBox("floor", {width: 70, height: 1, depth: 70}, scene);
    secret_ground.position.x = (floor_x * 70) - 40;
    secret_ground.position.z = -((floor_y * 70) + 30);
    secret_ground.position.y = -0.5;
    secret_ground.material = new StandardMaterial('texture1', scene);
    secret_ground.material.diffuseColor = ground_color;
    secret_ground.physicsImpostor = new PhysicsImpostor(secret_ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    secret_ground.checkCollisions = true;
    generateTreeBarriers("vertical_left", floor_x, floor_y, 0, -70);
    generateObjects(selectTreasure(), (floor_x * 70) - 40, -((floor_y * 70) + 30), scene, treasure_objects);
  }
  if (secret_data.type === "vertical_right") {
    var secret_ground = MeshBuilder.CreateBox("floor", {width: 70, height: 1, depth: 70}, scene);
    secret_ground.position.x = (floor_x * 70) + 100;
    secret_ground.position.z = -((floor_y * 70) + 30);
    secret_ground.position.y = -0.5;
    secret_ground.material = new StandardMaterial('texture1', scene);
    secret_ground.material.diffuseColor = ground_color;
    secret_ground.physicsImpostor = new PhysicsImpostor(secret_ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    secret_ground.checkCollisions = true;
    generateTreeBarriers("vertical_right", floor_x, floor_y, 0, 70);
    generateObjects(selectTreasure(), (floor_x * 70) + 100, -((floor_y * 70) + 30), scene, treasure_objects);
  }
}

export {generateSecretArea};
