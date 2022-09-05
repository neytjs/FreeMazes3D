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
import {plateColors, mazePos, cloneAndShuffleColors, cloneAndShuffleMapPos} from "../pyramid_data.js";
import {generateMagicPowder} from "../objects/generateMagicPowder.js";
import {returnMetalTexture, returnWallTexture, returnFloorTexture, returnStoneTexture,
  returnCrystalTexture, genCubeFaceUV, genCylinderFaceUV} from "../textures.js";

function powderPyramid(x, z, scene, global_objects, item_id, camera, global_language) {
  setMapSize("medium")
  createEmptyMap(length, width);
  createMap();
  cloneAndShuffleColors(global_language);
  cloneAndShuffleMapPos();

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

// lever 1
  let buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder1.position.y = -98.5;
  buttonHolder1.position.x = (lever1_y * 35) + 15;
  buttonHolder1.position.z = -((lever1_x * 35) + 15);
  buttonHolder1.material = new StandardMaterial('texture1', scene);
  buttonHolder1.material.diffuseTexture = returnStoneTexture("stone_pyramid", scene);
  buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder1.checkCollisions = true;

  let buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier1.position.y = -95;
  buttonBarrier1.position.x = (lever1_y * 35) + 15;
  buttonBarrier1.position.z = -((lever1_x * 35) + 15);
  buttonBarrier1.material = new StandardMaterial('texture1', scene);
  buttonBarrier1.material.alpha = 0;
  buttonBarrier1.name = "button1p13";

  let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton1.position.y = -96.75;
  pushButton1.position.x = (lever1_y * 35) + 15;
  pushButton1.position.z = -((lever1_x * 35) + 15);
  pushButton1.material = new StandardMaterial('texture1', scene);
  pushButton1.material.diffuseTexture = returnStoneTexture("stone_pyramiddark", scene);
  pushButton1.name = "pushButton1p13";

  let buttonHolder2 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder2.position.y = -98.5;
  buttonHolder2.position.x = (lever2_y * 35) + 15;
  buttonHolder2.position.z = -((lever2_x * 35) + 15);
  buttonHolder2.material = new StandardMaterial('texture1', scene);
  buttonHolder2.material.diffuseTexture = returnStoneTexture("stone_pyramid", scene);
  buttonHolder2.physicsImpostor = new PhysicsImpostor(buttonHolder2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder2.checkCollisions = true;

  let buttonBarrier2 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier2.position.y = -95;
  buttonBarrier2.position.x = (lever2_y * 35) + 15;
  buttonBarrier2.position.z = -((lever2_x * 35) + 15);
  buttonBarrier2.material = new StandardMaterial('texture1', scene);
  buttonBarrier2.material.alpha = 0;
  buttonBarrier2.name = "button2p13";

  let pushButton2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton2.position.y = -96.75;
  pushButton2.position.x = (lever2_y * 35) + 15;
  pushButton2.position.z = -((lever2_x * 35) + 15);
  pushButton2.material = new StandardMaterial('texture1', scene);
  pushButton2.material.diffuseTexture = returnStoneTexture("stone_pyramiddark", scene);
  pushButton2.name = "pushButton2p13";

  let buttonHolder3 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2, wrap: true, faceUV: genCubeFaceUV([1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1])}, scene);
  buttonHolder3.position.y = -98.5;
  buttonHolder3.position.x = (lever3_y * 35) + 15;
  buttonHolder3.position.z = -((lever3_x * 35) + 15);
  buttonHolder3.material = new StandardMaterial('texture1', scene);
  buttonHolder3.material.diffuseTexture = returnStoneTexture("stone_pyramid", scene);
  buttonHolder3.physicsImpostor = new PhysicsImpostor(buttonHolder3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder3.checkCollisions = true;

  let buttonBarrier3 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier3.position.y = -95;
  buttonBarrier3.position.x = (lever3_y * 35) + 15;
  buttonBarrier3.position.z = -((lever3_x * 35) + 15);
  buttonBarrier3.material = new StandardMaterial('texture1', scene);
  buttonBarrier3.material.alpha = 0;
  buttonBarrier3.name = "button3p13";

  let pushButton3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8, faceUV: genCylinderFaceUV([0.5, 0.5, 2, 0.25, 0.5, 0.5])}, scene);
  pushButton3.position.y = -96.75;
  pushButton3.position.x = (lever3_y * 35) + 15;
  pushButton3.position.z = -((lever3_x * 35) + 15);
  pushButton3.material = new StandardMaterial('texture1', scene);
  pushButton3.material.diffuseTexture = returnStoneTexture("stone_pyramiddark", scene);
  pushButton3.name = "pushButton3p13";

  let plate1holder = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.1, tessellation: 12, faceUV: genCylinderFaceUV([1, 1, 3, 0.1, 1, 1])}, scene);
  plate1holder.position.y = 2;
  plate1holder.material = new StandardMaterial('texture1', scene);
  plate1holder.material.diffuseTexture = returnMetalTexture(plateColors[0].plate_texture, scene);

  let plate1support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 2, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1, 0.25, 0.25])}, scene);
  plate1support.position.y = 1;
  plate1support.material = new StandardMaterial('texture1', scene);
  plate1support.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let plate1Barrier = MeshBuilder.CreateBox("box", {width: 4, height: 10, depth: 4}, scene);
  plate1Barrier.position.y = 5;
  plate1Barrier.material = new StandardMaterial('texture1', scene);
  plate1Barrier.material.alpha = 0;
  plate1Barrier.name = plateColors[0].color_name + "plate1Ob13";

  let plate1 = Mesh.MergeMeshes([plate1holder, plate1support, plate1Barrier], true, true, undefined, false, true);
  plate1.position.y = -100;
  plate1.position.x = (final_y * 35) + 15;
  plate1.position.z = -((final_x * 35) + 15);
  plate1.physicsImpostor = new PhysicsImpostor(plate1Barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  plate1.checkCollisions = true;
  plate1.name = plateColors[0].color_name + "Plate";

  let plate1Hidden = Mesh.CreateSphere("sphere", 8, 0.00001, scene);
  plate1Hidden.position.y = -97.5;
  plate1Hidden.position.x = (final_y * 35) + 15;
  plate1Hidden.position.z = -((final_x * 35) + 15);
  plate1Hidden.material = new StandardMaterial('texture1', scene);
  plate1Hidden.material.alpha = 0;
  plate1Hidden.name = plateColors[0].color_name + "HiddenOb13";

  let powder1Hidden = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.4, diameter: 1, height: 0.25, tessellation: 8}, scene);
  powder1Hidden.position.y = -97.875;
  powder1Hidden.position.x = (final_y * 35) + 15;
  powder1Hidden.position.z = -((final_x * 35) + 15);
  powder1Hidden.material = new StandardMaterial('texture1', scene);
  powder1Hidden.material.diffuseTexture = returnCrystalTexture(plateColors[0].color_texture, scene);
  powder1Hidden.material.alpha = 0;
  powder1Hidden.name = plateColors[0].color_name + "HiddenPowderOb13";

  let plate2holder = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.1, tessellation: 12, faceUV: genCylinderFaceUV([1, 1, 3, 0.1, 1, 1])}, scene);
  plate2holder.position.y = 2;
  plate2holder.material = new StandardMaterial('texture1', scene);
  plate2holder.material.diffuseTexture = returnMetalTexture(plateColors[1].plate_texture, scene);

  let plate2support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 2, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1, 0.25, 0.25])}, scene);
  plate2support.position.y = 1;
  plate2support.material = new StandardMaterial('texture1', scene);
  plate2support.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let plate2Barrier = MeshBuilder.CreateBox("box", {width: 4, height: 10, depth: 4}, scene);
  plate2Barrier.position.y = 5;
  plate2Barrier.material = new StandardMaterial('texture1', scene);
  plate2Barrier.material.alpha = 0;
  plate2Barrier.name = plateColors[1].color_name + "plate2Ob13";

  let plate2 = Mesh.MergeMeshes([plate2holder, plate2support, plate2Barrier], true, true, undefined, false, true);
  plate2.position.y = -100;
  plate2.position.x = (final_y * 35) + 10;
  plate2.position.z = -((final_x * 35) + 15);
  plate2.physicsImpostor = new PhysicsImpostor(plate2Barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  plate2.checkCollisions = true;
  plate2.name = plateColors[1].color_name + "Plate";

  let plate2Hidden = Mesh.CreateSphere("sphere", 8, 0.00001, scene);
  plate2Hidden.position.y = -97.5;
  plate2Hidden.position.x = (final_y * 35) + 10;
  plate2Hidden.position.z = -((final_x * 35) + 15);
  plate2Hidden.material = new StandardMaterial('texture1', scene);
  plate2Hidden.material.alpha = 0;
  plate2Hidden.name = plateColors[1].color_name + "HiddenOb13";

  let powder2Hidden = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.4, diameter: 1, height: 0.25, tessellation: 8}, scene);
  powder2Hidden.position.y = -97.875;
  powder2Hidden.position.x = (final_y * 35) + 10;
  powder2Hidden.position.z = -((final_x * 35) + 15);
  powder2Hidden.material = new StandardMaterial('texture1', scene);
  powder2Hidden.material.diffuseTexture = returnCrystalTexture(plateColors[1].color_texture, scene);
  powder2Hidden.material.alpha = 0;
  powder2Hidden.name = plateColors[1].color_name + "HiddenPowderOb13";

  let plate3holder = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.1, tessellation: 12, faceUV: genCylinderFaceUV([1, 1, 3, 0.1, 1, 1])}, scene);
  plate3holder.position.y = 2;
  plate3holder.material = new StandardMaterial('texture1', scene);
  plate3holder.material.diffuseTexture = returnMetalTexture(plateColors[2].plate_texture, scene);

  let plate3support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 2, tessellation: 8, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 1, 0.25, 0.25])}, scene);
  plate3support.position.y = 1;
  plate3support.material = new StandardMaterial('texture1', scene);
  plate3support.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let plate3Barrier = MeshBuilder.CreateBox("box", {width: 4, height: 10, depth: 4}, scene);
  plate3Barrier.position.y = 5;
  plate3Barrier.material = new StandardMaterial('texture1', scene);
  plate3Barrier.material.alpha = 0;
  plate3Barrier.name = plateColors[2].color_name + "plate3Ob13";

  let plate3 = Mesh.MergeMeshes([plate3holder, plate3support, plate3Barrier], true, true, undefined, false, true);
  plate3.position.y = -100;
  plate3.position.x = (final_y * 35) + 20;
  plate3.position.z = -((final_x * 35) + 15);
  plate3.physicsImpostor = new PhysicsImpostor(plate3Barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  plate3.checkCollisions = true;
  plate3.name = plateColors[2].color_name + "Plate";

  let plate3Hidden = Mesh.CreateSphere("sphere", 8, 0.00001, scene);
  plate3Hidden.position.y = -97.5;
  plate3Hidden.position.x = (final_y * 35) + 20;
  plate3Hidden.position.z = -((final_x * 35) + 15);
  plate3Hidden.material = new StandardMaterial('texture1', scene);
  plate3Hidden.material.alpha = 0;
  plate3Hidden.name = plateColors[2].color_name + "HiddenOb13";

  let powder3Hidden = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.4, diameter: 1, height: 0.25, tessellation: 8}, scene);
  powder3Hidden.position.y = -97.875;
  powder3Hidden.position.x = (final_y * 35) + 20;
  powder3Hidden.position.z = -((final_x * 35) + 15);
  powder3Hidden.material = new StandardMaterial('texture1', scene);
  powder3Hidden.material.diffuseTexture = returnCrystalTexture(plateColors[2].color_texture, scene);
  powder3Hidden.material.alpha = 0;
  powder3Hidden.name = plateColors[2].color_name + "HiddenPowderOb13";

  let spawnPoint1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.2, tessellation: 20, faceUV: genCylinderFaceUV([2, 2, 4, 0.2, 2, 2])}, scene);
  spawnPoint1.position.y = -100;
  spawnPoint1.position.x = (lever1_y * 35) + 5;
  spawnPoint1.position.z = -((lever1_x * 35) + 5);
  spawnPoint1.material = new StandardMaterial('texture1', scene);
  spawnPoint1.material.diffuseTexture = returnStoneTexture("stone_pyramiddark", scene);

  let spawnPoint2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.2, tessellation: 20, faceUV: genCylinderFaceUV([2, 2, 4, 0.2, 2, 2])}, scene);
  spawnPoint2.position.y = -100;
  spawnPoint2.position.x = (lever2_y * 35) + 5;
  spawnPoint2.position.z = -((lever2_x * 35) + 5);
  spawnPoint2.material = new StandardMaterial('texture1', scene);
  spawnPoint2.material.diffuseTexture = returnStoneTexture("stone_pyramiddark", scene);

  let spawnPoint3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.2, tessellation: 20, faceUV: genCylinderFaceUV([2, 2, 4, 0.2, 2, 2])}, scene);
  spawnPoint3.position.y = -100;
  spawnPoint3.position.x = (lever3_y * 35) + 5;
  spawnPoint3.position.z = -((lever3_x * 35) + 5);
  spawnPoint3.material = new StandardMaterial('texture1', scene);
  spawnPoint3.material.diffuseTexture = returnStoneTexture("stone_pyramiddark", scene);

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

  function createUndergroundMaze() {
    let wall = [];
    let meshes = [];
    let units = 5;

    let underground = -100;
    let ground = MeshBuilder.CreateBox("floor", {width: 175, height: 1, depth: 175}, scene);
    ground.position.y = underground + -0.5;
    ground.position.x = 85;
    ground.position.z = -85;
    ground.material = new StandardMaterial('texture1', scene);
    ground.material.diffuseTexture = returnFloorTexture("stone_slabs_tan", scene);
    ground.material.diffuseTexture.uScale = 17.5;
    ground.material.diffuseTexture.vScale = 17.5;
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    ground.checkCollisions = true;

    let ceiling = MeshBuilder.CreateBox("ceiling", {width: 175, height: 1, depth: 175}, scene);
    ceiling.position.y = underground + 15.5;
    ceiling.position.x = 85;
    ceiling.position.z = -85;
    ceiling.material = new StandardMaterial('texture1', scene);
    ceiling.material.diffuseTexture = returnFloorTexture("stone_slabs_tan", scene);
    ceiling.material.diffuseTexture.uScale = 17.5;
    ceiling.material.diffuseTexture.vScale = 17.5;

    for (let i = 0, length = terrain_pieces.length; i < length; i++) {
      for (let j = 0, jlength = terrain_pieces[i].length; j < jlength; j++) {
        for (let k = 0, klength = PiecesData.length; k < klength; k++) {
          if (terrain_pieces[i][j] === PiecesData[k].piece) {
            for (let z = 0, zlength = 7; z < zlength; z++) {
              for (let x = 0, xlength = 7; x < xlength; x++) {
                if (PiecesData[k].data[z][x] !== "_") {
                  if (PiecesData[k].data[z][x] === "X") {
                    wall = MeshBuilder.CreateBox("wall", {width: units, height: 15, depth: units, wrap: true}, scene);
                    wall.position.y = underground + 7.5;
                    wall.position.x = (x * units) + (j * 35);
                    wall.position.z = ((z * units) - (((z * units) * 2) + (i * 35)));
                    wall.material = new StandardMaterial('texture1', scene);
                    wall.material.diffuseTexture = returnWallTexture("stone_blocks_pyramid", scene);
                    wall.material.diffuseTexture.uScale = 1;
                    wall.material.diffuseTexture.vScale = 3;
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

  createUndergroundMaze();

  let pyramid = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 40, height: 25, tessellation: 4}, scene);
  pyramid.position.y = 12.5;
  pyramid.rotation.y = 0.785;
  pyramid.position.z = z;
  pyramid.position.x = x;
  pyramid.material = new StandardMaterial('texture1', scene);
  pyramid.material.diffuseTexture = returnStoneTexture("stone_pyramid", scene);
  pyramid.material.diffuseTexture.uScale = 15;
  pyramid.material.diffuseTexture.vScale = 15;

  let pyramidBarrier = MeshBuilder.CreateBox("box", {width: 29, height: 25, depth: 29}, scene);
  pyramidBarrier.position.y = 12.5;
  pyramidBarrier.position.z = z;
  pyramidBarrier.position.x = x;
  pyramidBarrier.material = new StandardMaterial('texture1', scene);
  pyramidBarrier.material.alpha = 0;
  pyramidBarrier.physicsImpostor = new PhysicsImpostor(pyramidBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pyramidBarrier.checkCollisions = true;
  global_objects.push({id: pyramidBarrier.uniqueId, obstacle13_id: item_id, type: "structure", name: ""});

  let obelisk1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameterBottom: 2, height: 2, tessellation: 4, faceUV: genCylinderFaceUV([2, 2, 4, 1, 0, 0])}, scene);
  obelisk1.position.y = 8;
  obelisk1.rotation.y = 0.785;
  obelisk1.material = new StandardMaterial('texture1', scene);
  obelisk1.material.diffuseTexture = returnStoneTexture("stone_pyramid", scene);

  let obelisk2 = MeshBuilder.CreateBox("box", {width: 1.42, height: 7, depth: 1.42, faceUV: genCubeFaceUV([0.568, 2.8, 0.568, 2.8, 2.8, 0.568, 2.8, 0.568, 0.568, 0.568, 0.568, 0.568])}, scene);
  obelisk2.position.y = 3.5;
  obelisk2.material = new StandardMaterial('texture1', scene);
  obelisk2.material.diffuseTexture = returnStoneTexture("stone_pyramid", scene);

  let obelisk3 = MeshBuilder.CreateBox("box", {width: 3, height: 0.5, depth: 3, faceUV: genCubeFaceUV([1.2, 0.2, 1.2, 0.2, 0.2, 1.2, 0.2, 1.2, 1.2, 1.2, 1.2, 1.2])}, scene);
  obelisk3.position.y = 0.25;
  obelisk3.material = new StandardMaterial('texture1', scene);
  obelisk3.material.diffuseTexture = returnStoneTexture("stone_pyramiddark", scene);

  let obeliskBarrier = MeshBuilder.CreateBox("box", {width: 3, height: 10, depth: 3}, scene);
  obeliskBarrier.position.y = 5;
  obeliskBarrier.material = new StandardMaterial('texture1', scene);
  obeliskBarrier.material.alpha = 0;

  let obelisk = Mesh.MergeMeshes([obelisk1, obelisk2, obelisk3, obeliskBarrier], true, true, undefined, false, true);
  obelisk.position.z = z + 17;
  obelisk.position.x = x + 6;
  obelisk.physicsImpostor = new PhysicsImpostor(obeliskBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  obelisk.checkCollisions = true;

  let pyramidEntrance1 = MeshBuilder.CreateBox("box", {width: 8, height: 8, depth: 8}, scene);
  pyramidEntrance1.position.y = 4;
  pyramidEntrance1.position.z = z + 12;
  pyramidEntrance1.position.x = x;
  pyramidEntrance1.material = new StandardMaterial('texture1', scene);
  pyramidEntrance1.material.diffuseTexture = returnStoneTexture("stone_pyramiddark", scene);
  pyramidEntrance1.material.diffuseTexture.uScale = 5;
  pyramidEntrance1.material.diffuseTexture.vScale = 5;
  pyramidEntrance1.physicsImpostor = new PhysicsImpostor(pyramidEntrance1, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pyramidEntrance1.checkCollisions = true;

  let pyramidEntrance2 = MeshBuilder.CreateBox("box", {width: 1, height: 6.5, depth: 1, faceUV: genCubeFaceUV([0.4, 2.6, 0.4, 2.6, 2.6, 0.4, 2.6, 0.4, 0.4, 0.4, 0.4, 0.4])}, scene);
  pyramidEntrance2.position.y = 3.25;
  pyramidEntrance2.position.z = z + 16;
  pyramidEntrance2.position.x = x + 2.5;
  pyramidEntrance2.material = new StandardMaterial('texture1', scene);
  pyramidEntrance2.material.diffuseTexture = returnStoneTexture("stone_pyramidverydark", scene);
  pyramidEntrance2.material.diffuseTexture.uScale = 3;
  pyramidEntrance2.material.diffuseTexture.vScale = 3;
  pyramidEntrance2.physicsImpostor = new PhysicsImpostor(pyramidEntrance2, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pyramidEntrance2.checkCollisions = true;

  let pyramidEntrance3 = MeshBuilder.CreateBox("box", {width: 1, height: 6.5, depth: 1, faceUV: genCubeFaceUV([0.4, 2.6, 0.4, 2.6, 2.6, 0.4, 2.6, 0.4, 0.4, 0.4, 0.4, 0.4])}, scene);
  pyramidEntrance3.position.y = 3.25;
  pyramidEntrance3.position.z = z + 16;
  pyramidEntrance3.position.x = x - 2.5;
  pyramidEntrance3.material = new StandardMaterial('texture1', scene);
  pyramidEntrance3.material.diffuseTexture = returnStoneTexture("stone_pyramidverydark", scene);
  pyramidEntrance3.material.diffuseTexture.uScale = 3;
  pyramidEntrance3.material.diffuseTexture.vScale = 3;
  pyramidEntrance3.physicsImpostor = new PhysicsImpostor(pyramidEntrance3, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pyramidEntrance3.checkCollisions = true;

  let pyramidEntrance4 = MeshBuilder.CreateBox("box", {width: 7, height: 1, depth: 1, faceUV: genCubeFaceUV([2.8, 0.4, 2.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 2.8, 0.4, 2.8])}, scene);
  pyramidEntrance4.position.y = 7;
  pyramidEntrance4.position.z = z + 16;
  pyramidEntrance4.position.x = x;
  pyramidEntrance4.material = new StandardMaterial('texture1', scene);
  pyramidEntrance4.material.diffuseTexture = returnStoneTexture("stone_pyramidverydark", scene);
  pyramidEntrance4.material.diffuseTexture.uScale = 3;
  pyramidEntrance4.material.diffuseTexture.vScale = 3;

  let pyramidTheEntrance = MeshBuilder.CreateBox("pyramidEntrance", {width: 5, height: 7, depth: 0.25}, scene);
  pyramidTheEntrance.position.y = 3.5;
  pyramidTheEntrance.position.z = z + 16;
  pyramidTheEntrance.position.x = x;
  pyramidTheEntrance.material = new StandardMaterial('texture1', scene);
  pyramidTheEntrance.material.diffuseColor = new Color3(0, 0, 0);
  pyramidTheEntrance.physicsImpostor = new PhysicsImpostor(pyramidTheEntrance, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pyramidTheEntrance.checkCollisions = true;
  global_objects.push({id: pyramidTheEntrance.uniqueId, type: "pyramidEntrance", exit_pos: {x: 15, z: -5, y: -96}});

  let pyramidExit1 = MeshBuilder.CreateBox("box", {width: 1, height: 6.5, depth: 1, faceUV: genCubeFaceUV([0.4, 2.6, 0.4, 2.6, 2.6, 0.4, 2.6, 0.4, 0.4, 0.4, 0.4, 0.4])}, scene);
  pyramidExit1.position.y = -96.75;
  pyramidExit1.position.z = -2.5;
  pyramidExit1.position.x = 17.5;
  pyramidExit1.material = new StandardMaterial('texture1', scene);
  pyramidExit1.material.diffuseTexture = returnStoneTexture("stone_pyramidverydark", scene);
  pyramidExit1.material.diffuseTexture.uScale = 3;
  pyramidExit1.material.diffuseTexture.vScale = 3;
  pyramidExit1.physicsImpostor = new PhysicsImpostor(pyramidExit1, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pyramidExit1.checkCollisions = true;

  let pyramidExit2 = MeshBuilder.CreateBox("box", {width: 1, height: 6.5, depth: 1, faceUV: genCubeFaceUV([0.4, 2.6, 0.4, 2.6, 2.6, 0.4, 2.6, 0.4, 0.4, 0.4, 0.4, 0.4])}, scene);
  pyramidExit2.position.y = -96.75;
  pyramidExit2.position.z = -2.5;
  pyramidExit2.position.x = 12.5;
  pyramidExit2.material = new StandardMaterial('texture1', scene);
  pyramidExit2.material.diffuseTexture = returnStoneTexture("stone_pyramidverydark", scene);
  pyramidExit2.material.diffuseTexture.uScale = 3;
  pyramidExit2.material.diffuseTexture.vScale = 3;
  pyramidExit2.physicsImpostor = new PhysicsImpostor(pyramidExit2, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pyramidExit2.checkCollisions = true;

  let pyramidExit3 = MeshBuilder.CreateBox("box", {width: 7, height: 1, depth: 1, faceUV: genCubeFaceUV([2.8, 0.4, 2.8, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 2.8, 0.4, 2.8])}, scene);
  pyramidExit3.position.y = -93;
  pyramidExit3.position.z = -2.5;
  pyramidExit3.position.x = 15;
  pyramidExit3.material = new StandardMaterial('texture1', scene);
  pyramidExit3.material.diffuseTexture = returnStoneTexture("stone_pyramidverydark", scene);
  pyramidExit3.material.diffuseTexture.uScale = 3;
  pyramidExit3.material.diffuseTexture.vScale = 3;

  let pyramidTheExit = MeshBuilder.CreateBox("pyramidExit", {width: 5, height: 7, depth: 0.25}, scene);
  pyramidTheExit.position.y = -96.5;
  pyramidTheExit.position.z = -2.5;
  pyramidTheExit.position.x = 15;
  pyramidTheExit.material = new StandardMaterial('texture1', scene);
  pyramidTheExit.material.diffuseColor = new Color3(0, 0, 0);
  pyramidTheExit.physicsImpostor = new PhysicsImpostor(pyramidTheExit, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pyramidTheExit.checkCollisions = true;
  global_objects.push({id: pyramidTheExit.uniqueId, type: "pyramidExit", exit_pos: {x: x, z: (z + 18), y: 4}});

  generateMagicPowder(0, global_objects, scene, global_language);
  generateMagicPowder(1, global_objects, scene, global_language);
  generateMagicPowder(2, global_objects, scene, global_language);
}

export {powderPyramid};
