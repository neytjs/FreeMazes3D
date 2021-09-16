import {Scene} from "@babylonjs/core/scene";
import {SceneLoader} from "@babylonjs/core/Loading";
import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {HemisphericLight} from "@babylonjs/core/Lights";
import {Vector3, Color3} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture, CubeTexture} from "@babylonjs/core/Materials/Textures";
import "@babylonjs/core/Meshes/meshBuilder";
import {PiecesData} from "../assets/pieces_data.js";
import {generateObjects} from "../assets/generate_objects.js";
import {generateObstacles} from "../assets/generate_obstacles.js";
import {map, length, width, total_areas, createEmptyMap, createMap, createMapAreas,
  setStartPosition, setExitPosition, generateKeys, generateGem, generateTreasure,
  generateSecrets, declareObstacles, declareDoors, storeExitPos, storeStartPos, setMapSize,
  generateClutterLocations} from "../generators/maze_generator.js";
import {wallColors} from "../assets/wall_colors.js";
import {floorColors} from "../assets/floor_colors.js";
import {skyColors} from "../assets/sky_colors.js";
import {generateSecretArea} from "../assets/generate_secret_area.js";
import {selectTreasure} from "../assets/select_treasure.js";
import {selectPuzzle} from "../assets/select_puzzle.js";
import {generateClutter} from "../assets/generateClutter.js";
import {selectClutter} from "../assets/selectClutter.js";
import {selectEnvironment} from "../assets/selectEnvironment.js";

function sceneGenerator(scene, camera, door_objects, forcefield_objects, key_objects, portal_objects, gem_objects, treasure_objects, treasure_stats, obstacle_objects, secret_walls, secret_data, map_size, puzzles) {
  let light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  light.intensity = 1;

  light.specular = new Color3(0, 0, 0);
  light.groundColor = new Color3(0.25, 0.25, 0.25);

  let map_areas = [];
  let obstacles = [];
  let secrets = [];
  let start_pos = {};
  let exit_pos = {};
  let keys = [];
  let gem = {};
  let treasure = [];
  let doors = [];
  let updated_map = [];
  let clutter = [];

  function generatePlayableMap() {
  // set the map size
    setMapSize(map_size.size);
  // create the base map, full of empty space (i.e. declare maximum length/width)
    createEmptyMap(length, width);
  // now add the pieces and make sure that all sections are connected
    createMap();
  // now get the map_areas
    let amount_map_areas = total_areas; // needs to be four
    map_areas = createMapAreas(amount_map_areas);
  // if we do not have enough map areas, regenerate the map.
    if (map_areas.length < amount_map_areas) {
      generatePlayableMap();
    } else {
    // declare where the obstacles should be placed
      obstacles = declareObstacles(map_areas, total_areas);
    // get updated map_areas and then assign the obstacles
      map_areas = obstacles.map_areas;
      obstacles = obstacles.obstacles;
    // now make sure that we have enough obstacles
      if (obstacles.length < amount_map_areas) {
        generatePlayableMap();
      } else {
      // generating secrets
        secrets = generateSecrets(obstacles);
        updated_map = secrets.updated_map;
        secrets = secrets.secrets_length;
      // must be at least one secret
        if (secrets === 0) {
          generatePlayableMap();
        } else {
          secret_data.total = secrets;
        // set start position (pass in "first" to select the first room/hallway piece as start pos. otherwise, leave blank for random start pos.)
          start_pos = setStartPosition(map_areas, "first");
        // and the exit position and also store it globally
          exit_pos = setExitPosition(map_areas);
          storeExitPos(exit_pos);
        // generate the keys to open the doors blocking the map_areas
          keys = generateKeys(map_areas, start_pos, obstacles);
        // generate the portal gem to power the portal
          gem = generateGem(map_areas);
        // declare the doors
          doors = declareDoors(map_areas, obstacles, keys, exit_pos, total_areas);
        // generate treasure
          treasure = generateTreasure(start_pos, exit_pos, keys, gem, doors, updated_map);
          treasure_stats.treasure_total = treasure.length;
        // finally generate clutter
          clutter = generateClutterLocations(start_pos, exit_pos, keys, gem, doors, map_areas);
        }
      }
    }
  }
  generatePlayableMap();

// setting up the map from the map data to help draw the maze
  let terrain_pieces = [];
  for (let x = 0; x < width; x++) {
    terrain_pieces.push([]);
    for (let y = 0; y < length; y++) {
      terrain_pieces[x].push({ piece: "", area_id: 0 });
    }
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      terrain_pieces[x][y].piece = updated_map[x][y].piece;
    // also add secret data, if necessary
      if (updated_map[x][y].secret) {
        terrain_pieces[x][y].secret = updated_map[x][y].secret;
      }
    }
  }
// sets the area_ids for different wall colors for each area.
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      for (let a = 0, alength = map_areas.length; a < alength; a++) {
        for (let b = 0, blength = map_areas[a].area_pieces.length; b < blength; b++) {
          if (x === map_areas[a].area_pieces[b].x && y === map_areas[a].area_pieces[b].y) {
            terrain_pieces[x][y].area_id = map_areas[a].area_id;
          }
        }
      }
    }
  }

  let draw_pieces = PiecesData;
  let units = 10;
  let wall_colors = wallColors();
  let floor_colors = floorColors();
  let sky_colors = skyColors();
// set sky color
  scene.clearColor = sky_colors[0];

  let walls = [];
  let start = [];
  let exit = [];
  let floor = [];

  let easy_puzzles = selectPuzzle("easy");
  let hard_puzzles = selectPuzzle("hard");
  let clutter_types = selectClutter();
  let secret_environments = selectEnvironment();
  for (let i = 0, length = terrain_pieces.length; i < length; i++) {
    for (let j = 0, jlength = terrain_pieces[i].length; j < jlength; j++) {
      let floor_tile = MeshBuilder.CreateBox("floor", {width: 70, height: 1, depth: 70}, scene);
      floor_tile.position.x = (j * 70);
      floor_tile.position.z = (i * 70);
      floor_tile.material = new StandardMaterial('texture1', scene);
      floor_tile.physicsImpostor = new PhysicsImpostor(floor_tile, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
      floor_tile.checkCollisions = true;
      switch (terrain_pieces[i][j].area_id) {
        case 0:
          floor_tile.material.diffuseColor = floor_colors[0];
        break;
        case 1:
          floor_tile.material.diffuseColor = floor_colors[1];
        break;
        case 2:
          floor_tile.material.diffuseColor = floor_colors[2];
        break;
        case 3:
          floor_tile.material.diffuseColor = floor_colors[3];
        break;
        case 4:
          floor_tile.material.diffuseColor = floor_colors[4];
        break;
      }
      floor.push(floor_tile);
    }
  }
  let floor_final = Mesh.MergeMeshes(floor, true, true, undefined, false, true);
  floor_final.position.y = -0.5;
  floor_final.position.x = 30;
  floor_final.position.z = -30;
  floor_final.rotation.x = Math.PI;

  let secret_counter = 0;

  for (let i = 0, length = terrain_pieces.length; i < length; i++) {
    for (let j = 0, jlength = terrain_pieces[i].length; j < jlength; j++) {
      for (let k = 0, klength = draw_pieces.length; k < klength; k++) {
        if (terrain_pieces[i][j].piece === draw_pieces[k].piece) {
          for (let z = 0, zlength = 7; z < zlength; z++) {
            for (let x = 0, xlength = 7; x < xlength; x++) {
              if (draw_pieces[k].data[z][x] === "X") {
                function selectWallColor(wall_piece) {
                  switch (terrain_pieces[i][j].area_id) {
                    case 0:
                      wall_piece.material.diffuseColor = wall_colors[0];
                    break;
                    case 1:
                      wall_piece.material.diffuseColor = wall_colors[1];
                    break;
                    case 2:
                      wall_piece.material.diffuseColor = wall_colors[2];
                    break;
                    case 3:
                      wall_piece.material.diffuseColor = wall_colors[3];
                    break;
                    case 4:
                      wall_piece.material.diffuseColor = wall_colors[4];
                    break;
                  }
                }

                if ((terrain_pieces[i][j].secret && (terrain_pieces[i][j].secret.tile_pos.x === i && terrain_pieces[i][j].secret.tile_pos.z === j) && (terrain_pieces[i][j].secret.entry_pos.x === x && terrain_pieces[i][j].secret.entry_pos.z === z))) {
                  secret_counter = secret_counter + 1;
                  let secretWall = MeshBuilder.CreateBox("wall", {width: units, height: units, depth: units}, scene);
                  secretWall.position.y = 5;
                  secretWall.position.x = (x * units) + (j * 70);
                  secretWall.position.z = ((z * units) - (((z * units) * 2) + (i * 70)));
                  secretWall.material = new StandardMaterial('texture1', scene);
                  selectWallColor(secretWall);
                  secretWall.physicsImpostor = new PhysicsImpostor(secretWall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
                  secretWall.checkCollisions = true;
                  secretWall.name = "secret" + "_" + terrain_pieces[i][j].secret.direction + secret_counter;
                  let secret_wall_data = {
                    id: secretWall.uniqueId,
                    pos: {x: secretWall.position.x, z: secretWall.position.z},
                    type: (terrain_pieces[i][j].secret.hv + "_" + terrain_pieces[i][j].secret.direction),
                    name: secretWall.name
                  };
                  secret_walls.push(secret_wall_data);
                  generateSecretArea(j, i, secret_wall_data, scene, treasure_objects, secret_environments);
                } else {
                  let wall = MeshBuilder.CreateBox("wall", {width: units, height: units, depth: units}, scene);
                  wall.position.y = 5;
                  wall.position.x = (x * units) + (j * 70);
                  wall.position.z = ((z * units) - (((z * units) * 2) + (i * 70)));
                  wall.material = new StandardMaterial('texture1', scene);
                  selectWallColor(wall);
                  wall.physicsImpostor = new PhysicsImpostor(wall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
                  wall.checkCollisions = true;
                  walls.push(wall);
                }
              }
            }
          }
        // check for doors
          for (let l = 0, llength = doors.length; l < llength; l++) {
            if (doors[l].pos.x === i && doors[l].pos.y === j) {
              let xtra = 0;
              let ztra = 0;
              if (doors[l].direction === "top") {
                xtra = 0;
                ztra = +30;
              }
              if (doors[l].direction === "right") {
                xtra = 30;
                ztra = 0;
              }
              if (doors[l].direction === "bottom") {
                xtra = 0;
                ztra = -30;
              }
              if (doors[l].direction === "left") {
                xtra = -30;
                ztra = 0;
              }
            // for the portal gem force field
              if (doors[l].type === "forcefield") {
                generateObjects("force_field", ((j * 70) + 30) + xtra, (((i * 70) - ((i * 70) * 2)) - 30) + ztra, scene, forcefield_objects, doors[l].id, doors[l].direction);
              } else if (doors[l].type === "door") { // for all other gates
                generateObjects("gate", ((j * 70) + 30) + xtra, (((i * 70) - ((i * 70) * 2)) - 30) + ztra, scene, door_objects, doors[l].id, doors[l].direction);
              }
            }
          }
        // check for keys
          for (let m = 0, mlength = keys.length; m < mlength; m++) {
            if (keys[m].pos.x === i && keys[m].pos.y === j) {
              let key_type = "";
              if (keys[m].key_id === 1) {
                key_type = "copper_key";
              } else if (keys[m].key_id === 2) {
                key_type = "silver_key";
              } else {
                key_type = "gold_key";
              }
              generateObjects(key_type, (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene, key_objects, keys[m].key_id);
            }
          }
        // check for obstacles
          for (let n = 0, nlength = obstacles.length; n < nlength; n++) {
            if (obstacles[n].pos.x === i && obstacles[n].pos.y === j && obstacles[n].obstacle_id === 1) {
              generateObstacles(easy_puzzles[0], (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene, obstacle_objects, obstacles[n].obstacle_id, camera);
              puzzles.push(easy_puzzles[0]);
            }
            if (obstacles[n].pos.x === i && obstacles[n].pos.y === j && obstacles[n].obstacle_id === 2) {
              generateObstacles(hard_puzzles[0], (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene, obstacle_objects, obstacles[n].obstacle_id, camera);
              puzzles.push(hard_puzzles[0]);
            }
            if (obstacles[n].pos.x === i && obstacles[n].pos.y === j && obstacles[n].obstacle_id === 3) {
              generateObstacles(hard_puzzles[1], (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene, obstacle_objects, obstacles[n].obstacle_id, camera);
              puzzles.push(hard_puzzles[1]);
            }
            if (obstacles[n].pos.x === i && obstacles[n].pos.y === j && obstacles[n].obstacle_id === 4) {
              generateObstacles(easy_puzzles[1], (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene, obstacle_objects, obstacles[n].obstacle_id, camera);
              puzzles.push(easy_puzzles[1]);
            }
          }
        // check for gem
          if (gem.pos.x === i && gem.pos.y === j) {
            generateObjects("portal_gem", (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene, gem_objects);
          }
        // check for start
          if (start_pos.x === i && start_pos.y === j) {
            generateObjects("start", (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene);
          // also reset the camera position there
            camera.position.x = (j * 70) + 30;
            camera.position.z = ((i * 70) - ((i * 70) * 2)) - 30;
            storeStartPos({x: ((j * 70) + 30), y: (((i * 70) - ((i * 70) * 2)) - 30)});
          }
        // check for exit
          if (exit_pos.x === i && exit_pos.y === j) {
            generateObjects("exit_unpowered", (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene, portal_objects);
            generateObjects("exit_powered", (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene, portal_objects);
          }
        // check for treasure
          for (let t = 0, tlength = treasure.length; t < tlength; t++) {
            if (treasure[t].secret === false && treasure[t].pos.x === i && treasure[t].pos.y === j) {
              generateObjects(selectTreasure(), (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene, treasure_objects);
            }
          }
        // check for clutter
          for (let c = 0, clength = clutter.length; c < clength; c++) {
            if (clutter[c].pos.x === i && clutter[c].pos.y === j) {
              generateClutter(clutter_types[c], (j * 70) + 30, ((i * 70) - ((i * 70) * 2)) - 30, scene)
            }
          }
        }
      }
    }
  }

  let walls_final = Mesh.MergeMeshes(walls, true, true, undefined, false, true);

  return scene;
}

export {sceneGenerator};
