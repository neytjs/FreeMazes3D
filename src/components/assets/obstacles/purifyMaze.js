import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {map, length, width, pieces, createEmptyMap, createMap, setMapSize} from "../../generators/maze_generator.js";
import {PiecesData} from "../pieces_data.js";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {plateColors, mazePos, cloneAndShuffleColors, cloneAndShuffleMapPos} from "../pyramid_data.js";
import {generateWateringCan} from "../objects/generateWateringCan.js";
import {generateWaterWell} from "../objects/generateWaterWell.js";
import {generatePortalPassage} from "../objects/generatePortalPassage.js";
import {returnTreeTexture, returnFloorTexture, returnWoodTexture,
  genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function purifyMaze(x, z, scene, global_objects, item_id, camera, global_language) {
  setMapSize("medium")
  createEmptyMap(length, width);
  createMap();

// set the starting piece to a room.
  let mazePos = [
    {lever1_x: 4, lever1_y: 3, lever2_x: 1, lever2_y: 4, lever3_x: 3, lever3_y: 0, final_x: 2, final_y: 2},
    {lever1_x: 4, lever1_y: 2, lever2_x: 0, lever2_y: 4, lever3_x: 2, lever3_y: 0, final_x: 1, final_y: 2},
    {lever1_x: 4, lever1_y: 1, lever2_x: 2, lever2_y: 4, lever3_x: 2, lever3_y: 1, final_x: 0, final_y: 2},
    {lever1_x: 1, lever1_y: 1, lever2_x: 3, lever2_y: 4, lever3_x: 4, lever3_y: 0, final_x: 3, final_y: 2}
  ];
  mazePos = arrayShuffler(mazePos);
  let start_x = 0;
  let start_y = 0;
  let lever1_x = mazePos[0].lever1_x;
  let lever1_y = mazePos[0].lever1_y;
  let lever2_x = mazePos[0].lever2_x;
  let lever2_y = mazePos[0].lever2_y;
  let lever3_x = mazePos[0].lever3_x;
  let lever3_y = mazePos[0].lever3_y;
  let final_x = mazePos[0].final_x;
  let final_y = mazePos[0].final_y;

  for (let j = 0, length = pieces.length; j < length ; j++) {
  // for the start room
    if (pieces[j].entries.top === map[start_x][start_y].entries.top && pieces[j].entries.right === map[start_x][start_y].entries.right && pieces[j].entries.bottom === map[start_x][start_y].entries.bottom && pieces[j].entries.left === map[start_x][start_y].entries.left && pieces[j].type === "room") {
      map[start_x][start_y] = pieces[j];
    }
  // lever rooms
    if (pieces[j].entries.top === map[lever1_x][lever1_y].entries.top && pieces[j].entries.right === map[lever1_x][lever1_y].entries.right && pieces[j].entries.bottom === map[lever1_x][lever1_y].entries.bottom && pieces[j].entries.left === map[lever1_x][lever1_y].entries.left && pieces[j].type === "room") {
      map[lever1_x][lever1_y] = pieces[j];
    }
    if (pieces[j].entries.top === map[lever2_x][lever2_y].entries.top && pieces[j].entries.right === map[lever2_x][lever2_y].entries.right && pieces[j].entries.bottom === map[lever2_x][lever2_y].entries.bottom && pieces[j].entries.left === map[lever2_x][lever2_y].entries.left && pieces[j].type === "room") {
      map[lever2_x][lever2_y] = pieces[j];
    }
    if (pieces[j].entries.top === map[lever3_x][lever3_y].entries.top && pieces[j].entries.right === map[lever3_x][lever3_y].entries.right && pieces[j].entries.bottom === map[lever3_x][lever3_y].entries.bottom && pieces[j].entries.left === map[lever3_x][lever3_y].entries.left && pieces[j].type === "room") {
      map[lever3_x][lever3_y] = pieces[j];
    }
  // final room
    if (pieces[j].entries.top === map[final_x][final_y].entries.top && pieces[j].entries.right === map[final_x][final_y].entries.right && pieces[j].entries.bottom === map[final_x][final_y].entries.bottom && pieces[j].entries.left === map[final_x][final_y].entries.left && pieces[j].type === "room") {
      map[final_x][final_y] = pieces[j];
    }
  }

// START for /ASSETS
  let terrain_pieces = [];
  for (let x = 0; x < width; x++) {
    terrain_pieces.push([]);
    for (let y = 0; y < length; y++) {
      terrain_pieces[x].push(0);
    }
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      terrain_pieces[x][y] = map[x][y].piece;
    }
  }

  function createHedgeMaze() {
    let wall = [];
    let meshes = [];
    let units = 5;

    let location = 1000;
    let ground = MeshBuilder.CreateBox("floor", {width: 175, height: 1, depth: 175}, scene);
    ground.position.y = location - 0.5;
    ground.position.x = 85;
    ground.position.z = -85;
    ground.material = new StandardMaterial('texture1', scene);
    ground.material.diffuseTexture = returnFloorTexture("sand", scene);
    ground.material.diffuseTexture.uScale = 17.5;
    ground.material.diffuseTexture.vScale = 17.5;
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    ground.checkCollisions = true;
    global_objects.push({id: ground.uniqueId, obstacle23_id: item_id, type: "puzzle_piece", name: ""});

    for (let i = 0, length = terrain_pieces.length; i < length; i++) {
      for (let j = 0, jlength = terrain_pieces[i].length; j < jlength; j++) {
        for (let k = 0, klength = PiecesData.length; k < klength; k++) {
          if (terrain_pieces[i][j] === PiecesData[k].piece) {
            for (let z = 0, zlength = 7; z < zlength; z++) {
              for (let x = 0, xlength = 7; x < xlength; x++) {
                if (PiecesData[k].data[z][x] !== "_") {
                  if (PiecesData[k].data[z][x] === "X") {
                    wall = MeshBuilder.CreateBox("wall", {width: units, height: 8, depth: units, wrap: true}, scene);
                    wall.position.y = location + 4;
                    wall.position.x = (x * units) + (j * 35);
                    wall.position.z = ((z * units) - (((z * units) * 2) + (i * 35)));
                    wall.material = new StandardMaterial('texture1', scene);
                    wall.material.diffuseTexture = returnTreeTexture("leaves", scene);
                    wall.material.diffuseTexture.uScale = 2;
                    wall.material.diffuseTexture.vScale = 4;
                    wall.physicsImpostor = new PhysicsImpostor(wall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
                    wall.checkCollisions = true;
                    meshes.push(wall);
                  }
                }
              }
            }
          }
        }
      }
    }

    let mesh = Mesh.MergeMeshes(meshes, true, true, undefined, false, true);
  }
  createHedgeMaze();

  let well_x = (start_y * 35) + 15;
  let well_z = -((start_x * 35) + 15);
  let can_x = (start_y * 35) + 20;
  let can_z = -((start_x * 35) + 20);
  let tree1_x = (lever1_y * 35) + 15;
  let tree1_z = -((lever1_x * 35) + 15);
  let tree2_x = (lever2_y * 35) + 15;
  let tree2_z = -((lever2_x * 35) + 15);
  let tree3_x = (lever3_y * 35) + 15;
  let tree3_z = -((lever3_x * 35) + 15);
  let exit_x = (final_y * 35) + 15;
  let exit_z = -((final_x * 35) + 15);

  generateWaterWell(scene, well_x, well_z, 1000, "waterWellHedgeMaze");

  generateWateringCan("item", scene, can_x, can_z, 1000, camera, "wateringCanHedgeMaze", "hedge");
  generateWateringCan("holding", scene, can_x, can_z, -1000, camera, "wateringCanHedgeMaze", "hedge");
  generateWateringCan("pouring", scene, can_x, can_z, -1000, camera, "wateringCanHedgeMaze", "hedge");

  generatePortalPassage(scene, global_objects, "green", x, z, 0, "teleporterOb23a", "teleporter23", 5, -5, 1004);
  generatePortalPassage(scene, global_objects, "green", exit_x, exit_z, 1000, "teleporterOb23b", "teleporter23", (x + 5), z, 4);

  function generateHedge(x, z, rotation) {
    let dirt1 = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.25, depth: 5.5, faceUV: genCubeFaceUV([0, 0, 0, 0, 0, 0, 0, 0, 1.375, 0.9375, 0, 0])}, scene);
    dirt1.position.y = 0.125;
    dirt1.position.z = -1;
    dirt1.material = new StandardMaterial('texture1', scene);
    dirt1.material.diffuseTexture = returnFloorTexture("soil", scene);

    let dirt2 = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.25, depth: 5.5, faceUV: genCubeFaceUV([0, 0, 0, 0, 0, 0, 0, 0, 1.375, 0.9375, 0, 0])}, scene);
    dirt2.position.y = 0.125;
    dirt2.position.x = 6.25;
    dirt2.position.z = -1;
    dirt2.material = new StandardMaterial('texture1', scene);
    dirt2.material.diffuseTexture = returnFloorTexture("soil", scene);

    let dirt3 = MeshBuilder.CreateBox("box", {width: 2.5, height: 0.25, depth: 3.5, faceUV: genCubeFaceUV([0, 0, 0, 0, 0, 0, 0, 0, 0.875, 0.625, 0, 0])}, scene);
    dirt3.position.y = 0.125;
    dirt3.position.x = 3.125;
    dirt3.position.z = -2;
    dirt3.material = new StandardMaterial('texture1', scene);
    dirt3.material.diffuseTexture = returnFloorTexture("soil", scene);

    let barrier1 = MeshBuilder.CreateBox("box", {width: 3.75, height: 10, depth: 5.5}, scene);
    barrier1.position.y = 5;
    barrier1.position.z = -1;
    barrier1.material = new StandardMaterial('texture1', scene);
    barrier1.material.alpha = 0;
    barrier1.physicsImpostor = new PhysicsImpostor(barrier1, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    barrier1.checkCollisions = true;

    let barrier2 = MeshBuilder.CreateBox("box", {width: 3.75, height: 10, depth: 5.5}, scene);
    barrier2.position.y = 5;
    barrier2.position.x = 6.25;
    barrier2.position.z = -1;
    barrier2.material = new StandardMaterial('texture1', scene);
    barrier2.material.alpha = 0;
    barrier2.physicsImpostor = new PhysicsImpostor(barrier2, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    barrier2.checkCollisions = true;

    let barrier3 = MeshBuilder.CreateBox("box", {width: 2.5, height: 10, depth: 3.5}, scene);
    barrier3.position.y = 5;
    barrier3.position.x = 3.125;
    barrier3.position.z = -2;
    barrier3.material = new StandardMaterial('texture1', scene);
    barrier3.material.alpha = 0;
    barrier3.physicsImpostor = new PhysicsImpostor(barrier3, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    barrier3.checkCollisions = true;

    let hedge1 = MeshBuilder.CreateBox("box", {width: 2, height: 4, depth: 2, faceUV: genCubeFaceUV([1, 2, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1])}, scene);
    hedge1.position.y = 2;
    hedge1.material = new StandardMaterial('texture1', scene);
    hedge1.material.diffuseTexture = returnTreeTexture("leaves", scene);

    let hedge2 = MeshBuilder.CreateBox("box", {width: 2, height: 4, depth: 2, faceUV: genCubeFaceUV([1, 2, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1])}, scene);
    hedge2.position.y = 2;
    hedge2.position.x = 6.25;
    hedge2.material = new StandardMaterial('texture1', scene);
    hedge2.material.diffuseTexture = returnTreeTexture("leaves", scene);

    let hedge3 = MeshBuilder.CreateBox("box", {width: 8.25, height: 4, depth: 2, faceUV: genCubeFaceUV([4.125, 2, 4.125, 2, 2, 1, 2, 1, 1, 4.125, 1, 4.125])}, scene);
    hedge3.position.y = 2;
    hedge3.position.x = 3.125;
    hedge3.position.z = -2;
    hedge3.material = new StandardMaterial('texture1', scene);
    hedge3.material.diffuseTexture = returnTreeTexture("leaves", scene);

    let board1 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.5, depth: 2, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 1, 0.25, 1, 1, 0.125, 1, 0.125])}, scene);
    board1.position.y = 0.25;
    board1.position.x = 2;
    board1.position.z = 1;
    board1.material = new StandardMaterial('texture1', scene);
    board1.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board2 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.5, depth: 6, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 3, 0.25, 3, 3, 0.125, 3, 0.125])}, scene);
    board2.position.y = 0.25;
    board2.position.x = -2;
    board2.position.z = -1;
    board2.material = new StandardMaterial('texture1', scene);
    board2.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board3 = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.5, depth: 0.25, faceUV: genCubeFaceUV([1.75, 0.25, 1.75, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 1.75, 0.125, 1.75])}, scene);
    board3.position.y = 0.25;
    board3.position.z = 1.875;
    board3.material = new StandardMaterial('texture1', scene);
    board3.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board4 = MeshBuilder.CreateBox("box", {width: 10, height: 0.5, depth: 0.25, faceUV: genCubeFaceUV([5, 0.25, 5, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 5, 0.125, 5])}, scene);
    board4.position.y = 0.25;
    board4.position.x = 3.125;
    board4.position.z = -3.875;
    board4.material = new StandardMaterial('texture1', scene);
    board4.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board5 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.5, depth: 2, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 1, 0.25, 1, 1, 0.125, 1, 0.125])}, scene);
    board5.position.y = 0.25;
    board5.position.x = 4.25;
    board5.position.z = 1;
    board5.material = new StandardMaterial('texture1', scene);
    board5.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board6 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.5, depth: 6, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 3, 0.25, 3, 3, 0.125, 3, 0.125])}, scene);
    board6.position.y = 0.25;
    board6.position.x = 8.25;
    board6.position.z = -1;
    board6.material = new StandardMaterial('texture1', scene);
    board6.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board7 = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.5, depth: 0.25, faceUV: genCubeFaceUV([1.75, 0.25, 1.75, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 1.75, 0.125, 1.75])}, scene);
    board7.position.y = 0.25;
    board7.position.x = 6.25;
    board7.position.z = 1.875;
    board7.material = new StandardMaterial('texture1', scene);
    board7.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board8 = MeshBuilder.CreateBox("box", {width: 2.5, height: 0.5, depth: 0.25, faceUV: genCubeFaceUV([1.25, 0.25, 1.25, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 1.25, 0.125, 1.25])}, scene);
    board8.position.y = 0.25;
    board8.position.x = 3.125;
    board8.position.z = -0.125;
    board8.material = new StandardMaterial('texture1', scene);
    board8.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let hedge = Mesh.MergeMeshes([barrier1, barrier2, barrier3, board1, board2, board3, board4, board5, board6, board7, board8, hedge1, hedge2, hedge3, dirt1, dirt2, dirt3], true, true, undefined, false, true);
    hedge.position.x = x;
    hedge.position.z = z;
    hedge.rotation.y = rotation;

    return hedge;
  }
  generateHedge(x - 3.125, z - 4, 0);
  generateHedge(x + 3.125, z + 4, 3.14);

  function generatePineTree(x, z, name) {
    let trunk = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 3, tessellation: 8, wrap: true}, scene);
    trunk.position.y = 1001.5;
    trunk.position.x = x;
    trunk.position.z = z;
    trunk.material = new StandardMaterial('texture1', scene);
    trunk.material.diffuseTexture = returnTreeTexture("bark_pine_big_haunted", scene);
    trunk.material.diffuseTexture.uScale = 3;
    trunk.material.diffuseTexture.vScale = 3;
    trunk.name = name + "trunk";

    let needles = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 5, height: 10, tessellation: 8, wrap: true}, scene);
    needles.position.y = 1007;
    needles.position.x = x;
    needles.position.z = z;
    needles.material = new StandardMaterial('texture1', scene);
    needles.material.diffuseTexture = returnTreeTexture("needles_pine_haunted", scene);
    needles.material.diffuseTexture.uScale = 6;
    needles.material.diffuseTexture.vScale = 6;
    needles.name = name + "needles";

    let dirt = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.25, depth: 3.5, faceUV: genCubeFaceUV([0, 0, 0, 0, 0, 0, 0, 0, 0.875, 0.9375, 0, 0])}, scene);
    dirt.position.y = 1000.125;
    dirt.position.x = x;
    dirt.position.z = z;
    dirt.material = new StandardMaterial('texture1', scene);
    dirt.material.diffuseTexture = returnFloorTexture("soil_haunted", scene);
    dirt.name = name + "dirt";

    let treeBarrier = MeshBuilder.CreateBox("box", {width: 4.25, height: 10, depth: 4}, scene);
    treeBarrier.position.y = 1005;
    treeBarrier.position.x = x;
    treeBarrier.position.z = z;
    treeBarrier.material = new StandardMaterial('texture1', scene);
    treeBarrier.material.alpha = 0;
    treeBarrier.name = name;
    treeBarrier.physicsImpostor = new PhysicsImpostor(treeBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    treeBarrier.checkCollisions = true;

    let board1 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.5, depth: 4, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 2, 0.25, 2, 2, 0.125, 2, 0.125]), faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 2, 0.25, 2, 2, 0.125, 2, 0.125])}, scene);
    board1.position.y = 0.25;
    board1.position.x = 2;
    board1.material = new StandardMaterial('texture1', scene);
    board1.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board2 = MeshBuilder.CreateBox("box", {width: 0.25, height: 0.5, depth: 4, faceUV: genCubeFaceUV([0.125, 0.25, 0.125, 0.25, 0.25, 2, 0.25, 2, 2, 0.125, 2, 0.125])}, scene);
    board2.position.y = 0.25;
    board2.position.x = -2;
    board2.material = new StandardMaterial('texture1', scene);
    board2.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board3 = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.5, depth: 0.25, faceUV: genCubeFaceUV([1.75, 0.25, 1.75, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 1.75, 0.125, 1.75])}, scene);
    board3.position.y = 0.25;
    board3.position.z = 1.875;
    board3.material = new StandardMaterial('texture1', scene);
    board3.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let board4 = MeshBuilder.CreateBox("box", {width: 3.75, height: 0.5, depth: 0.25, faceUV: genCubeFaceUV([1.75, 0.25, 1.75, 0.25, 0.25, 0.125, 0.25, 0.125, 0.125, 1.75, 0.125, 1.75])}, scene);
    board4.position.y = 0.25;
    board4.position.z = -1.875;
    board4.material = new StandardMaterial('texture1', scene);
    board4.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

    let boards = Mesh.MergeMeshes([board1, board2, board3, board4], true, true, undefined, false, true);
    boards.position.y = 1000;
    boards.position.x = x;
    boards.position.z = z;

    let sphere1 = Mesh.CreateSphere("barrier", 8, 2, scene);
    sphere1.position.x = x;
    sphere1.position.z = z;
    sphere1.position.y = 1000;
    sphere1.material = new StandardMaterial('texture1', scene);
    sphere1.material.diffuseColor = new Color3(0, 1, 0.16);
    sphere1.material.specularColor = new Color3(0, 1, 0.16);
    sphere1.material.emissiveColor = new Color3(0, 1, 0.16);
    sphere1.material.ambientColor = new Color3(0, 1, 0.16);
    sphere1.material.alpha = 0;
    sphere1.name = name + "SpecialEffect1";

    let sphere2 = Mesh.CreateSphere("barrier", 8, 2, scene);
    sphere2.position.x = x;
    sphere2.position.z = z;
    sphere2.position.y = 1000;
    sphere2.material = new StandardMaterial('texture1', scene);
    sphere2.material.diffuseColor = new Color3(0.1, 0.89, 0.76);
    sphere2.material.specularColor = new Color3(0.1, 0.89, 0.76);
    sphere2.material.emissiveColor = new Color3(0.1, 0.89, 0.76);
    sphere2.material.ambientColor = new Color3(0.1, 0.89, 0.76);
    sphere2.material.alpha = 0;
    sphere2.name = name + "SpecialEffect2";
  }
  generatePineTree(tree1_x, tree1_z, "pineTree1_Ob23");
  generatePineTree(tree2_x, tree2_z, "pineTree2_Ob23");
  generatePineTree(tree3_x, tree3_z, "pineTree3_Ob23");
}

export {purifyMaze};
