import {Scene} from "@babylonjs/core/scene";
import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {HemisphericLight} from "@babylonjs/core/Lights";
import {Vector3, Color3} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import "@babylonjs/core/Meshes/meshBuilder";
import {generateTree} from "../assets/generate_tree.js";
import {selectEnvironment} from "../assets/selectEnvironment.js";
import {wallTextures} from "../assets/wall_textures.js";
import {floorTextures} from "../assets/floor_textures.js";
import {skyColors} from "../assets/sky_colors.js";
import {returnWallTexture, returnFloorTexture} from "../assets/textures.js";

function menuSceneGenerator(scene, camera) {
  let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 1;

  let secret_environments = selectEnvironment();
  let ground_textures = {
    alpine: "grass",
    winter: "snow",
    wasteland: "wasteland"
  };
  let ground_texture = ground_textures[secret_environments[0]];
  let wall_textures = wallTextures();
  let floor_textures = floorTextures();
  let sky_colors = skyColors();

  scene.clearColor = sky_colors[0];

  let floor_tile = MeshBuilder.CreateGround("ground", {width: 70, height: 70}, scene);
  floor_tile.material = new StandardMaterial('texture1', scene);
  floor_tile.material.diffuseTexture = returnFloorTexture(floor_textures[0], scene);
  floor_tile.material.diffuseTexture.uScale = 7;
  floor_tile.material.diffuseTexture.vScale = 7;

/******************************* START WALLS **************************************/
  let PieceData = [
     ["X", "X", "X", "_", "X", "X", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "_", "_", "_", "_", "_", "X"],
     ["X", "X", "X", "X", "X", "X", "X"]
  ];
  let units = 10;

  let wall = MeshBuilder.CreateBox("wall", {width: units, height: units, depth: units}, scene);
  wall.position.y = 5;
  wall.material = new StandardMaterial('texture1', scene);
  wall.material.diffuseTexture = returnWallTexture(wall_textures[0], scene);
  wall.isVisible = false;

  for (let z = 0, zlength = 7; z < zlength; z++) {
    for (let x = 0, xlength = 7; x < xlength; x++) {
      if (PieceData[z][x] !== "_") {
        if (PieceData[z][x] === "X") {
          let newWallInstance = wall.createInstance("wall" + (z + x));
          newWallInstance.position.x = (x * units) - 30;
          newWallInstance.position.z = ((z * units) - (((z * units) * 2))) + 30;
        }
      }
    }
  }

  let ground = MeshBuilder.CreateGround("ground", {width: 70, height: 70}, scene);
  ground.position.z = 70;
  ground.material = new StandardMaterial('texture1', scene);
  ground.material.diffuseTexture = returnFloorTexture(ground_texture, scene);
  ground.material.diffuseTexture.uScale = 7;
  ground.material.diffuseTexture.vScale = 7;

  let tree = generateTree(secret_environments, scene);
  tree.isVisible = false;

  let TreesData = [
    {
      data: [
        ["_", "_", "_", "_", "_", "_", "_"],
        ["_", "_", "_", "_", "_", "_", "_"],
        ["X", "X", "_", "_", "_", "X", "X"],
        ["X", "X", "X", "_", "X", "X", "X"],
        ["X", "X", "X", "_", "X", "X", "X"],
        ["X", "X", "_", "_", "_", "X", "X"],
        ["X", "X", "_", "_", "_", "X", "X"]
      ]
    }
  ];
  let plus_x = 100;
  let plus_z = -30;
  for (let i = 0, length = TreesData.length; i < length; i++) {
    for (let j = 0, jlength = 7; j < jlength; j++) {
      for (let k = 0, klength = 7; k < klength; k++) {
        if (TreesData[i].data[j][k] !== "_") {
          if (TreesData[i].data[j][k] === "X") {
            let newTreeInstance = tree.createInstance("i" + (i + j + k));
            newTreeInstance.position.x = ((k * 10) + plus_z);
            newTreeInstance.position.z = (((j * 10) - (((j * 10) * 2))) + plus_x);
          }
        }
      }
    }
  }

  return scene;
}

export {menuSceneGenerator};
