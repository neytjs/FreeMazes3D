import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {Sound} from "@babylonjs/core/Audio";
import {map, length, width, pieces, createEmptyMap, createMap, setMapSize} from "../../generators/maze_generator.js";
import {PiecesData} from "../pieces_data.js";
import {arrayShuffler} from "../../utilities/shuffler.js";

function hauntedCrypt(x, z, scene, global_objects, item_id, camera) {
  setMapSize("small")
  createEmptyMap(length, width);
  createMap();

// set the starting piece to a room.
  let mazePos = [
    {lever1_x: 3, lever1_y: 0, lever2_x: 0, lever2_y: 3, final_x: 2, final_y: 3},
    {lever1_x: 2, lever1_y: 0, lever2_x: 0, lever2_y: 2, final_x: 3, final_y: 2}
  ];
  mazePos = arrayShuffler(mazePos);
  let start_x = 0;
  let start_y = 0;
  let lever1_x = mazePos[0].lever1_x;
  let lever1_y = mazePos[0].lever1_y;
  let lever2_x = mazePos[0].lever2_x;
  let lever2_y = mazePos[0].lever2_y;
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
  // final room
    if (pieces[j].entries.top === map[final_x][final_y].entries.top && pieces[j].entries.right === map[final_x][final_y].entries.right && pieces[j].entries.bottom === map[final_x][final_y].entries.bottom && pieces[j].entries.left === map[final_x][final_y].entries.left && pieces[j].type === "room") {
      map[final_x][final_y] = pieces[j];
    }
  }

  function generateBucket(x, z) {
    let waterBucket = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 1, tessellation: 20}, scene);
    waterBucket.position.y = 3;
    waterBucket.material = new StandardMaterial('texture1', scene);
    waterBucket.material.diffuseColor = new Color3(0.39, 0.32, 0.18);

    var waterBucketRim = MeshBuilder.CreateTorus("torus", {diameter: 1, thickness: 0.1});
    waterBucketRim.position.y = 3.5;
    waterBucketRim.material = new StandardMaterial('texture1', scene);
    waterBucketRim.material.diffuseColor = new Color3(0.23, 0.19, 0.09);

    let waterBucketTop = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.95, height: 0.025, tessellation: 20}, scene);
    waterBucketTop.position.y = 3.5;
    waterBucketTop.material = new StandardMaterial('texture1', scene);
    waterBucketTop.material.diffuseColor = new Color3(0.12, 0.45, 0.77);

    let waterBucketBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
    waterBucketBarrier.position.y = 5;
    waterBucketBarrier.material = new StandardMaterial('texture1', scene);
    waterBucketBarrier.material.diffuseColor = new Color3(0.34, 0.32, 0.32);
    waterBucketBarrier.material.alpha = 0;

    let bucket = Mesh.MergeMeshes([waterBucket, waterBucketRim, waterBucketTop, waterBucketBarrier], true, true, undefined, false, true);
    bucket.position.x = x;
    bucket.position.z = z;
    bucket.position.y = -50;
    bucket.physicsImpostor = new PhysicsImpostor(waterBucketBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    bucket.checkCollisions = true;
    bucket.name = "HolyWater";
    global_objects.push({id: bucket.uniqueId, type: "water_Ob14", name: "holy_water", inventory: ("Holy Water"), img: "holy_water"});

    let axis = new Vector3(0, 6, 0);
    let angle = 0.03;
    scene.registerAfterRender(function () {
      bucket.rotate(axis, angle, 1);
    });
  }
  generateBucket((start_y * 35) + 5, -((start_x * 35) + 5));
  generateBucket((start_y * 35) + 5, -((start_x * 35) + 15));
  generateBucket((start_y * 35) + 5, -((start_x * 35) + 25));

  function generateSarcophagus(x, z, num) {
    let sarcophagus1 = MeshBuilder.CreateBox("box", {width: 4, height: 3, depth: 8}, scene);
    sarcophagus1.position.y = 1.5;
    sarcophagus1.material = new StandardMaterial('texture1', scene);
    sarcophagus1.material.diffuseColor = new Color3(0.79, 0.71, 0.69);

    let sarcophagus2 = MeshBuilder.CreateBox("box", {width: 4.5, height: 1, depth: 8.5}, scene);
    sarcophagus2.position.y = 2.7;
    sarcophagus2.material = new StandardMaterial('texture1', scene);
    sarcophagus2.material.diffuseColor = new Color3(0.72, 0.67, 0.62);

    let sarcophagus = Mesh.MergeMeshes([sarcophagus1, sarcophagus2], true, true, undefined, false, true);
    sarcophagus.position.x = x;
    sarcophagus.position.z = z;
    sarcophagus.position.y = -50;
    sarcophagus.physicsImpostor = new PhysicsImpostor(sarcophagus2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    sarcophagus.checkCollisions = true;

    let ghostBarrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 13, height: 10, tessellation: 8}, scene);
    ghostBarrier.position.y = -45;
    ghostBarrier.position.x = x;
    ghostBarrier.position.z = z;
    ghostBarrier.material = new StandardMaterial('texture1', scene);
    ghostBarrier.material.alpha = 0;
    ghostBarrier.physicsImpostor = new PhysicsImpostor(ghostBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    ghostBarrier.checkCollisions = true;
    ghostBarrier.name = "ghost" + num + "Barrier";

    let name = "ghost" + num + "BarrierSound";
    let ghostBarrierSound = new Sound(name, "./sound/atmoseerie04.wav", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 50 });
    ghostBarrierSound.attachToMesh(ghostBarrier);
  }
  let x1 = (lever1_y * 35) + 15;
  let z1 = -((lever1_x * 35) + 15);
  let x2 = (lever2_y * 35) + 15;
  let z2 = -((lever2_x * 35) + 15);
  let x3 = (final_y * 35) + 15;
  let z3 = -((final_x * 35) + 15);
  generateSarcophagus(x1, z1, 1);
  generateSarcophagus(x2, z2, 2);
  generateSarcophagus(x3, z3, 3);

// declare and shuffle the colors
  let ghost_colors = [
    new Color3(0.74, 0.88, 0.77),
    new Color3(0.83, 0.76, 0.8),
    new Color3(0.74, 0.72, 0.92)
  ];
  ghost_colors = arrayShuffler(ghost_colors);
  let color1 = ghost_colors[0];
  let color2 = ghost_colors[1];
  let color3 = ghost_colors[2];

  let ghostOrbLarge1 = Mesh.CreateSphere("ghost1", 16, 2, scene);
  ghostOrbLarge1.material = new StandardMaterial('texture1', scene);
  ghostOrbLarge1.material.diffuseColor = color1;
  ghostOrbLarge1.material.alpha = 0.5;

  let ghostOrbBig1 = Mesh.CreateSphere("ghost1", 16, 1.75, scene);
  ghostOrbBig1.material = new StandardMaterial('texture1', scene);
  ghostOrbBig1.material.diffuseColor = color1;
  ghostOrbBig1.material.alpha = 0.5;

  let ghostOrbMedium1 = Mesh.CreateSphere("ghost1", 16, 1.5, scene);
  ghostOrbMedium1.material = new StandardMaterial('texture1', scene);
  ghostOrbMedium1.material.diffuseColor = color1;
  ghostOrbMedium1.material.alpha = 0.5;

  let ghostOrbSmall1 = Mesh.CreateSphere("ghost1", 16, 1.25, scene);
  ghostOrbSmall1.material = new StandardMaterial('texture1', scene);
  ghostOrbSmall1.material.diffuseColor = color1;
  ghostOrbSmall1.material.alpha = 0.5;

  let ghostOrbTiny1 = Mesh.CreateSphere("ghost1", 16, 1, scene);
  ghostOrbTiny1.material = new StandardMaterial('texture1', scene);
  ghostOrbTiny1.material.diffuseColor = color1;
  ghostOrbTiny1.material.alpha = 0.5;

  let ghostOrbLarge2 = Mesh.CreateSphere("ghost2", 16, 2, scene);
  ghostOrbLarge2.material = new StandardMaterial('texture1', scene);
  ghostOrbLarge2.material.diffuseColor = color2;
  ghostOrbLarge2.material.alpha = 0.5;

  let ghostOrbBig2 = Mesh.CreateSphere("ghost2", 16, 1.75, scene);
  ghostOrbBig2.material = new StandardMaterial('texture1', scene);
  ghostOrbBig2.material.diffuseColor = color2;
  ghostOrbBig2.material.alpha = 0.5;

  let ghostOrbMedium2 = Mesh.CreateSphere("ghost2", 16, 1.5, scene);
  ghostOrbMedium2.material = new StandardMaterial('texture1', scene);
  ghostOrbMedium2.material.diffuseColor = color2;
  ghostOrbMedium2.material.alpha = 0.5;

  let ghostOrbSmall2 = Mesh.CreateSphere("ghost2", 16, 1.25, scene);
  ghostOrbSmall2.material = new StandardMaterial('texture1', scene);
  ghostOrbSmall2.material.diffuseColor = color2;
  ghostOrbSmall2.material.alpha = 0.5;

  let ghostOrbTiny2 = Mesh.CreateSphere("ghost2", 16, 1, scene);
  ghostOrbTiny2.material = new StandardMaterial('texture1', scene);
  ghostOrbTiny2.material.diffuseColor = color2;
  ghostOrbTiny2.material.alpha = 0.5;

  let ghostOrbLarge3 = Mesh.CreateSphere("ghost3", 16, 2, scene);
  ghostOrbLarge3.material = new StandardMaterial('texture1', scene);
  ghostOrbLarge3.material.diffuseColor = color3;
  ghostOrbLarge3.material.alpha = 0.5;

  let ghostOrbBig3 = Mesh.CreateSphere("ghost3", 16, 1.75, scene);
  ghostOrbBig3.material = new StandardMaterial('texture1', scene);
  ghostOrbBig3.material.diffuseColor = color3;
  ghostOrbBig3.material.alpha = 0.5;

  let ghostOrbMedium3 = Mesh.CreateSphere("ghost3", 16, 1.5, scene);
  ghostOrbMedium3.material = new StandardMaterial('texture1', scene);
  ghostOrbMedium3.material.diffuseColor = color3;
  ghostOrbMedium3.material.alpha = 0.5;

  let ghostOrbSmall3 = Mesh.CreateSphere("ghost3", 16, 1.25, scene);
  ghostOrbSmall3.material = new StandardMaterial('texture1', scene);
  ghostOrbSmall3.material.diffuseColor = color3;
  ghostOrbSmall3.material.alpha = 0.5;

  let ghostOrbTiny3 = Mesh.CreateSphere("ghost3", 16, 1, scene);
  ghostOrbTiny3.material = new StandardMaterial('texture1', scene);
  ghostOrbTiny3.material.diffuseColor = color3;
  ghostOrbTiny3.material.alpha = 0.5;

  let radius = 5;

  let g1pi1 = Math.PI;
  let g1pi2 = Math.PI - 0.37;
  let g1pi3 = Math.PI - 0.68;
  let g1pi4 = Math.PI - 0.94;
  let g1pi5 = Math.PI - 1.15;
  let g1height = -45;

  let g2pi1 = Math.PI;
  let g2pi2 = Math.PI + 0.37;
  let g2pi3 = Math.PI + 0.68;
  let g2pi4 = Math.PI + 0.94;
  let g2pi5 = Math.PI + 1.15;
  let g2height = -45;

  let g3pi1 = Math.PI;
  let g3pi2 = Math.PI - 0.37;
  let g3pi3 = Math.PI - 0.68;
  let g3pi4 = Math.PI - 0.94;
  let g3pi5 = Math.PI - 1.15;
  let g3height = -45;

  scene.registerBeforeRender(function() {
    ghostOrbLarge1.position = new Vector3((radius * Math.sin(g1pi1) + x1), g1height, (radius * Math.cos(g1pi1) + z1));
    ghostOrbBig1.position = new Vector3((radius * Math.sin(g1pi2) + x1), g1height, (radius * Math.cos(g1pi2) + z1));
    ghostOrbMedium1.position = new Vector3((radius * Math.sin(g1pi3) + x1), g1height, (radius * Math.cos(g1pi3) + z1));
    ghostOrbSmall1.position = new Vector3((radius * Math.sin(g1pi4) + x1), g1height, (radius * Math.cos(g1pi4) + z1));
    ghostOrbTiny1.position = new Vector3((radius * Math.sin(g1pi5) + x1), g1height, (radius * Math.cos(g1pi5) + z1));
    g1pi1 = g1pi1 + 0.025;
    g1pi2 = g1pi2 + 0.025;
    g1pi3 = g1pi3 + 0.025;
    g1pi4 = g1pi4 + 0.025;
    g1pi5 = g1pi5 + 0.025;
    ghostOrbLarge2.position = new Vector3((radius * Math.sin(g2pi1) + x2), g2height, (radius * Math.cos(g2pi1) + z2));
    ghostOrbBig2.position = new Vector3((radius * Math.sin(g2pi2) + x2), g2height, (radius * Math.cos(g2pi2) + z2));
    ghostOrbMedium2.position = new Vector3((radius * Math.sin(g2pi3) + x2), g2height, (radius * Math.cos(g2pi3) + z2));
    ghostOrbSmall2.position = new Vector3((radius * Math.sin(g2pi4) + x2), g2height, (radius * Math.cos(g2pi4) + z2));
    ghostOrbTiny2.position = new Vector3((radius * Math.sin(g2pi5) + x2), g2height, (radius * Math.cos(g2pi5) + z2));
    g2pi1 = g2pi1 - 0.025;
    g2pi2 = g2pi2 - 0.025;
    g2pi3 = g2pi3 - 0.025;
    g2pi4 = g2pi4 - 0.025;
    g2pi5 = g2pi5 - 0.025;
    ghostOrbLarge3.position = new Vector3((radius * Math.sin(g3pi1) + x3), g3height, (radius * Math.cos(g3pi1) + z3));
    ghostOrbBig3.position = new Vector3((radius * Math.sin(g3pi2) + x3), g3height, (radius * Math.cos(g3pi2) + z3));
    ghostOrbMedium3.position = new Vector3((radius * Math.sin(g3pi3) + x3), g3height, (radius * Math.cos(g3pi3) + z3));
    ghostOrbSmall3.position = new Vector3((radius * Math.sin(g3pi4) + x3), g3height, (radius * Math.cos(g3pi4) + z3));
    ghostOrbTiny3.position = new Vector3((radius * Math.sin(g3pi5) + x3), g3height, (radius * Math.cos(g3pi5) + z3));
    g3pi1 = g3pi1 + 0.025;
    g3pi2 = g3pi2 + 0.025;
    g3pi3 = g3pi3 + 0.025;
    g3pi4 = g3pi4 + 0.025;
    g3pi5 = g3pi5 + 0.025;
  });

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

    let underground = -50;
    let ground = MeshBuilder.CreateBox("floor", {width: 140, height: 1, depth: 140}, scene);
    ground.position.y = underground + -0.5;
    ground.position.x = 67.5;
    ground.position.z = -67.5;
    ground.material = new StandardMaterial('texture1', scene);
    ground.material.diffuseColor = new Color3(0.33, 0.39, 0.34);
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    ground.checkCollisions = true;

    let ceiling = MeshBuilder.CreateBox("ceiling", {width: 140, height: 1, depth: 140}, scene);
    ceiling.position.y = underground + 15.5;
    ceiling.position.x = 67.5;
    ceiling.position.z = -67.5;
    ceiling.material = new StandardMaterial('texture1', scene);
    ceiling.material.diffuseColor = new Color3(0.92, 0.92, 0.92);

    for (let i = 0, length = terrain_pieces.length; i < length; i++) {
      for (let j = 0, jlength = terrain_pieces[i].length; j < jlength; j++) {
        for (let k = 0, klength = PiecesData.length; k < klength; k++) {
          if (terrain_pieces[i][j] === PiecesData[k].piece) {
            for (let z = 0, zlength = 7; z < zlength; z++) {
              for (let x = 0, xlength = 7; x < xlength; x++) {
                if (PiecesData[k].data[z][x] !== "_") {
                  if (PiecesData[k].data[z][x] === "X") {
                    wall = MeshBuilder.CreateBox("wall", {width: units, height: 15, depth: units}, scene);
                    wall.position.y = underground + 7.5;
                    wall.position.x = (x * units) + (j * 35);
                    wall.position.z = ((z * units) - (((z * units) * 2) + (i * 35)));
                    wall.material = new StandardMaterial('texture1', scene);
                    wall.material.diffuseColor = new Color3(0.69, 0.69, 0.68);
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

  let crypt = MeshBuilder.CreateBox("box", {width: 20, height: 10, depth: 12}, scene);
  crypt.position.y = 5;
  crypt.position.z = z;
  crypt.position.x = x;
  crypt.material = new StandardMaterial('texture1', scene);
  crypt.material.diffuseColor = new Color3(0.66, 0.66, 0.66);
  crypt.physicsImpostor = new PhysicsImpostor(crypt, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  crypt.checkCollisions = true;
  global_objects.push({id: crypt.uniqueId, obstacle14_id: item_id, type: "structure", name: ""});

  let cryptRoof = MeshBuilder.CreateBox("box", {width: 22, height: 1, depth: 18}, scene);
  cryptRoof.position.y = 10;
  cryptRoof.position.z = z + 2;
  cryptRoof.position.x = x;
  cryptRoof.material = new StandardMaterial('texture1', scene);
  cryptRoof.material.diffuseColor = new Color3(0.45, 0.45, 0.45);

  let pillar1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 2.5, height: 10, tessellation: 20}, scene);
  pillar1.position.y = 5;
  pillar1.position.z = z + 8.5;
  pillar1.position.x = x + 7;
  pillar1.material = new StandardMaterial('texture1', scene);
  pillar1.material.diffuseColor = new Color3(0.79, 0.78, 0.75);

  let pillar1top = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.5, height: 1, tessellation: 20}, scene);
  pillar1top.position.y = 9;
  pillar1top.position.z = z + 8.5;
  pillar1top.position.x = x + 7;
  pillar1top.material = new StandardMaterial('texture1', scene);
  pillar1top.material.diffuseColor = new Color3(0.74, 0.88, 0.77);

  let pillar1bottom = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.5, height: 1, tessellation: 20}, scene);
  pillar1bottom.position.y = 0.5;
  pillar1bottom.position.z = z + 8.5;
  pillar1bottom.position.x = x + 7;
  pillar1bottom.material = new StandardMaterial('texture1', scene);
  pillar1bottom.material.diffuseColor = new Color3(0.74, 0.88, 0.77);

  let pillar1Barrier = MeshBuilder.CreateBox("box", {width: 5, height: 10, depth: 5}, scene);
  pillar1Barrier.position.y = 4.5;
  pillar1Barrier.position.z = z + 8.5;
  pillar1Barrier.position.x = x + 7;
  pillar1Barrier.material = new StandardMaterial('texture1', scene);
  pillar1Barrier.material.alpha = 0;
  pillar1Barrier.physicsImpostor = new PhysicsImpostor(pillar1Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pillar1Barrier.checkCollisions = true;

  let pillar2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 2.5, height: 10, tessellation: 20}, scene);
  pillar2.position.y = 5;
  pillar2.position.z = z + 8.5;
  pillar2.position.x = x - 7;
  pillar2.material = new StandardMaterial('texture1', scene);
  pillar2.material.diffuseColor = new Color3(0.79, 0.78, 0.75);

  let pillar2top = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.5, height: 1, tessellation: 20}, scene);
  pillar2top.position.y = 9;
  pillar2top.position.z = z + 8.5;
  pillar2top.position.x = x - 7;
  pillar2top.material = new StandardMaterial('texture1', scene);
  pillar2top.material.diffuseColor = new Color3(0.74, 0.88, 0.77);

  let pillar2bottom = MeshBuilder.CreateCylinder("cylinder", {diameter: 3.5, height: 1, tessellation: 20}, scene);
  pillar2bottom.position.y = 0.5;
  pillar2bottom.position.z = z + 8.5;
  pillar2bottom.position.x = x - 7;
  pillar2bottom.material = new StandardMaterial('texture1', scene);
  pillar2bottom.material.diffuseColor = new Color3(0.74, 0.88, 0.77);

  let pillar2Barrier = MeshBuilder.CreateBox("box", {width: 5, height: 10, depth: 5}, scene);
  pillar2Barrier.position.y = 4.5;
  pillar2Barrier.position.z = z + 8.5;
  pillar2Barrier.position.x = x - 7;
  pillar2Barrier.material = new StandardMaterial('texture1', scene);
  pillar2Barrier.material.alpha = 0;
  pillar2Barrier.physicsImpostor = new PhysicsImpostor(pillar2Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  pillar2Barrier.checkCollisions = true;

  let cryptEntrance2 = MeshBuilder.CreateBox("box", {width: 1, height: 7, depth: 1}, scene);
  cryptEntrance2.position.y = 3.5;
  cryptEntrance2.position.z = z + 6;
  cryptEntrance2.position.x = x + 2.5;
  cryptEntrance2.material = new StandardMaterial('texture1', scene);
  cryptEntrance2.material.diffuseColor = new Color3(0.48, 0.45, 0.34);
  cryptEntrance2.physicsImpostor = new PhysicsImpostor(cryptEntrance2, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  cryptEntrance2.checkCollisions = true;

  let cryptEntrance3 = MeshBuilder.CreateBox("box", {width: 1, height: 7, depth: 1}, scene);
  cryptEntrance3.position.y = 3.5;
  cryptEntrance3.position.z = z + 6;
  cryptEntrance3.position.x = x - 2.5;
  cryptEntrance3.material = new StandardMaterial('texture1', scene);
  cryptEntrance3.material.diffuseColor = new Color3(0.48, 0.45, 0.34);
  cryptEntrance3.physicsImpostor = new PhysicsImpostor(cryptEntrance3, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  cryptEntrance3.checkCollisions = true;

  let cryptEntrance4 = MeshBuilder.CreateBox("box", {width: 7, height: 1, depth: 1}, scene);
  cryptEntrance4.position.y = 7;
  cryptEntrance4.position.z = z + 6;
  cryptEntrance4.position.x = x;
  cryptEntrance4.material = new StandardMaterial('texture1', scene);
  cryptEntrance4.material.diffuseColor = new Color3(0.48, 0.45, 0.34);

  let cryptTheEntrance = MeshBuilder.CreateBox("cryptEntrance", {width: 5, height: 7, depth: 0.25}, scene);
  cryptTheEntrance.position.y = 3.5;
  cryptTheEntrance.position.z = z + 6;
  cryptTheEntrance.position.x = x;
  cryptTheEntrance.material = new StandardMaterial('texture1', scene);
  cryptTheEntrance.material.diffuseColor = new Color3(0, 0, 0);
  cryptTheEntrance.physicsImpostor = new PhysicsImpostor(cryptTheEntrance, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  cryptTheEntrance.checkCollisions = true;
  global_objects.push({id: cryptTheEntrance.uniqueId, type: "cryptEntrance", exit_pos: {x: 15, z: -5, y: -46}});

  let cryptExit1 = MeshBuilder.CreateBox("box", {width: 1, height: 7, depth: 1}, scene);
  cryptExit1.position.y = -46.5;
  cryptExit1.position.z = -2.5;
  cryptExit1.position.x = 17.5;
  cryptExit1.material = new StandardMaterial('texture1', scene);
  cryptExit1.material.diffuseColor = new Color3(0.48, 0.45, 0.34);
  cryptExit1.physicsImpostor = new PhysicsImpostor(cryptExit1, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  cryptExit1.checkCollisions = true;

  let cryptExit2 = MeshBuilder.CreateBox("box", {width: 1, height: 7, depth: 1}, scene);
  cryptExit2.position.y = -46.5;
  cryptExit2.position.z = -2.5;
  cryptExit2.position.x = 12.5;
  cryptExit2.material = new StandardMaterial('texture1', scene);
  cryptExit2.material.diffuseColor = new Color3(0.48, 0.45, 0.34);
  cryptExit2.physicsImpostor = new PhysicsImpostor(cryptExit2, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  cryptExit2.checkCollisions = true;

  let cryptExit3 = MeshBuilder.CreateBox("box", {width: 7, height: 1, depth: 1}, scene);
  cryptExit3.position.y = -43;
  cryptExit3.position.z = -2.5;
  cryptExit3.position.x = 15;
  cryptExit3.material = new StandardMaterial('texture1', scene);
  cryptExit3.material.diffuseColor = new Color3(0.48, 0.45, 0.34);

  let cryptTheExit = MeshBuilder.CreateBox("cryptExit", {width: 5, height: 7, depth: 0.25}, scene);
  cryptTheExit.position.y = -46.5;
  cryptTheExit.position.z = -2.5;
  cryptTheExit.position.x = 15;
  cryptTheExit.material = new StandardMaterial('texture1', scene);
  cryptTheExit.material.diffuseColor = new Color3(0, 0, 0);
  cryptTheExit.physicsImpostor = new PhysicsImpostor(cryptTheExit, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  cryptTheExit.checkCollisions = true;
  global_objects.push({id: cryptTheExit.uniqueId, type: "cryptExit", exit_pos: {x: x, z: (z + 8), y: 4}});
}

export {hauntedCrypt};
