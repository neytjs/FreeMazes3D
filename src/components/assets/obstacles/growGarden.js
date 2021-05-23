import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {generateWateringCan} from "../objects/generateWateringCan.js";
import {arrayShuffler} from "../../utilities/shuffler.js";

function growGarden(x, z, scene, global_objects, item_id, camera) {
  let pineTreeColors = [
    { trunk: new Color3(0.3, 0.18, 0.11), needles: new Color3(0.04, 0.39, 0.05) },
    { trunk: new Color3(0.45, 0.39, 0.31), needles: new Color3(0.18, 0.49, 0.49) }
  ];
  pineTreeColors = arrayShuffler(pineTreeColors);

  let fruitTreeColors = [
    { trunk: new Color3(0.39, 0.31, 0.13), leaves: new Color3(0.15, 0.75, 0.23), fruit: new Color3(1, 0, 0) },
    { trunk: new Color3(0.54, 0.44, 0.21), leaves: new Color3(0.06, 0.43, 0.14), fruit: new Color3(1, 0.4, 0) },
    { trunk: new Color3(0.67, 0.66, 0.63), leaves: new Color3(0.11, 0.57, 0.09), fruit: new Color3(1, 1, 0) }
  ];
  fruitTreeColors = arrayShuffler(fruitTreeColors);

  let cactusColors = [
    new Color3(0.41, 0.62, 0.35),
    new Color3(0.54, 0.77, 0.47)
  ];
  cactusColors = arrayShuffler(cactusColors);

  let flowerColors = [
    { stem: new Color3(0.26, 0.77, 0.11), petals: new Color3(0.8, 0, 1) },
    { stem: new Color3(0.06, 0.43, 0.14), petals: new Color3(0.78, 0.08, 0.08) },
    { stem: new Color3(0.41, 0.71, 0.32), petals: new Color3(1, 1, 0) }
  ]
  flowerColors = arrayShuffler(flowerColors);

  generateWateringCan("item", scene, x, (z + 10), camera);

  let fence1 = MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 10}, scene);
  fence1.position.y = 0.5;
  fence1.position.x = x - 15;
  fence1.position.z = z + 20;
  fence1.material = new StandardMaterial('texture1', scene);
  fence1.material.diffuseColor = new Color3(0.37, 0.25, 0.09);
  global_objects.push({id: fence1.uniqueId, obstacle8_id: item_id, type: "puzzle_piece", name: ""});

  let fence2 = MeshBuilder.CreateBox("box", {width: 10.5, height: 1, depth: 1}, scene);
  fence2.position.y = 0.5;
  fence2.position.x = x - 19.75;
  fence2.position.z = z + 15;
  fence2.material = new StandardMaterial('texture1', scene);
  fence2.material.diffuseColor = new Color3(0.37, 0.25, 0.09);

  let fence3 = MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 10}, scene);
  fence3.position.y = 0.5;
  fence3.position.x = x + 15;
  fence3.position.z = z - 20;
  fence3.material = new StandardMaterial('texture1', scene);
  fence3.material.diffuseColor = new Color3(0.37, 0.25, 0.09);

  let fence4 = MeshBuilder.CreateBox("box", {width: 10.5, height: 1, depth: 1}, scene);
  fence4.position.y = 0.5;
  fence4.position.x = x + 19.75;
  fence4.position.z = z - 15;
  fence4.material = new StandardMaterial('texture1', scene);
  fence4.material.diffuseColor = new Color3(0.37, 0.25, 0.09);

  let fence5 = MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 10}, scene);
  fence5.position.y = 0.5;
  fence5.position.x = x - 15;
  fence5.position.z = z - 20;
  fence5.material = new StandardMaterial('texture1', scene);
  fence5.material.diffuseColor = new Color3(0.37, 0.25, 0.09);

  let fence6 = MeshBuilder.CreateBox("box", {width: 10.5, height: 1, depth: 1}, scene);
  fence6.position.y = 0.5;
  fence6.position.x = x - 19.75;
  fence6.position.z = z - 15;
  fence6.material = new StandardMaterial('texture1', scene);
  fence6.material.diffuseColor = new Color3(0.37, 0.25, 0.09);

  let fence7 = MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 10}, scene);
  fence7.position.y = 0.5;
  fence7.position.x = x + 15;
  fence7.position.z = z + 20;
  fence7.material = new StandardMaterial('texture1', scene);
  fence7.material.diffuseColor = new Color3(0.37, 0.25, 0.09);

  let fence8 = MeshBuilder.CreateBox("box", {width: 10.5, height: 1, depth: 1}, scene);
  fence8.position.y = 0.5;
  fence8.position.x = x + 19.75;
  fence8.position.z = z + 15;
  fence8.material = new StandardMaterial('texture1', scene);
  fence8.material.diffuseColor = new Color3(0.37, 0.25, 0.09);

  let ground1 = MeshBuilder.CreateBox("box", {width: 10, height: 0.25, depth: 10}, scene);
  ground1.position.y = 0.5;
  ground1.position.x = x - 20;
  ground1.position.z = z + 20;
  ground1.material = new StandardMaterial('texture1', scene);
  ground1.material.diffuseColor = new Color3(0.26, 0.17, 0.05);

  let ground2 = MeshBuilder.CreateBox("box", {width: 10, height: 0.25, depth: 10}, scene);
  ground2.position.y = 0.5;
  ground2.position.x = x + 20;
  ground2.position.z = z - 20;
  ground2.material = new StandardMaterial('texture1', scene);
  ground2.material.diffuseColor = new Color3(0.26, 0.17, 0.05);

  let ground3 = MeshBuilder.CreateBox("box", {width: 10, height: 0.25, depth: 10}, scene);
  ground3.position.y = 0.5;
  ground3.position.x = x - 20;
  ground3.position.z = z - 20;
  ground3.material = new StandardMaterial('texture1', scene);
  ground3.material.diffuseColor = new Color3(0.26, 0.17, 0.05);

  let ground4 = MeshBuilder.CreateBox("box", {width: 10, height: 0.25, depth: 10}, scene);
  ground4.position.y = 0.5;
  ground4.position.x = x + 20;
  ground4.position.z = z + 20;
  ground4.material = new StandardMaterial('texture1', scene);
  ground4.material.diffuseColor = new Color3(0.26, 0.17, 0.05);

  let barrier1 = MeshBuilder.CreateBox("barrier1_Ob8", {width: 10, height: 10, depth: 10}, scene);
  barrier1.position.y = 5;
  barrier1.position.x = x - 20;
  barrier1.position.z = z + 20;
  barrier1.material = new StandardMaterial('texture1', scene);
  barrier1.material.diffuseColor = new Color3(0.26, 0.17, 0.05);
  barrier1.material.alpha = 0;
  barrier1.physicsImpostor = new PhysicsImpostor(barrier1, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  barrier1.checkCollisions = true;

  let barrier2 = MeshBuilder.CreateBox("barrier2_Ob8", {width: 10, height: 10, depth: 10}, scene);
  barrier2.position.y = 5;
  barrier2.position.x = x + 20;
  barrier2.position.z = z - 20;
  barrier2.material = new StandardMaterial('texture1', scene);
  barrier2.material.diffuseColor = new Color3(0.26, 0.17, 0.05);
  barrier2.material.alpha = 0;
  barrier2.physicsImpostor = new PhysicsImpostor(barrier2, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  barrier2.checkCollisions = true;

  let barrier3 = MeshBuilder.CreateBox("barrier3_Ob8", {width: 10, height: 10, depth: 10}, scene);
  barrier3.position.y = 5;
  barrier3.position.x = x - 20;
  barrier3.position.z = z - 20;
  barrier3.material = new StandardMaterial('texture1', scene);
  barrier3.material.diffuseColor = new Color3(0.26, 0.17, 0.05);
  barrier3.material.alpha = 0;
  barrier3.physicsImpostor = new PhysicsImpostor(barrier3, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  barrier3.checkCollisions = true;

  let barrier4 = MeshBuilder.CreateBox("barrier4_Ob8", {width: 10, height: 10, depth: 10}, scene);
  barrier4.position.y = 5;
  barrier4.position.x = x + 20;
  barrier4.position.z = z + 20;
  barrier4.material = new StandardMaterial('texture1', scene);
  barrier4.material.diffuseColor = new Color3(0.26, 0.17, 0.05);
  barrier4.material.alpha = 0;
  barrier4.physicsImpostor = new PhysicsImpostor(barrier4, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  barrier4.checkCollisions = true;

  let pineTrunk = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 4, tessellation: 8}, scene);
  pineTrunk.position.y = 2;
  pineTrunk.material = new StandardMaterial('texture1', scene);
  pineTrunk.material.diffuseColor = pineTreeColors[0].trunk;

  let pineNeedles = MeshBuilder.CreateCylinder("cone", {diameterTop: 0, diameter: 3.5, height: 4.5, tessellation: 8}, scene);
  pineNeedles.position.y = 4;
  pineNeedles.material = new StandardMaterial('texture1', scene);
  pineNeedles.material.diffuseColor = pineTreeColors[0].needles;

  let pineTree = Mesh.MergeMeshes([pineTrunk, pineNeedles], true, true, undefined, false, true);
  pineTree.position.x = x - 20;
  pineTree.position.z = z + 20;
  pineTree.name = "pineTree";

  let fruitTrunk = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.4, diameterBottom: 0.6, height: 4, tessellation: 12}, scene);
  fruitTrunk.position.y = 2;
  fruitTrunk.material = new StandardMaterial('texture1', scene);
  fruitTrunk.material.diffuseColor = fruitTreeColors[0].trunk;

  let fruitLeaves = Mesh.CreateSphere("sphere", 8, 4, scene);
  fruitLeaves.position.y = 3.5;
  fruitLeaves.material = new StandardMaterial('texture1', scene);
  fruitLeaves.material.diffuseColor = fruitTreeColors[0].leaves;

  let fruitTree = Mesh.MergeMeshes([fruitTrunk, fruitLeaves], true, true, undefined, false, true);
  fruitTree.position.x = x + 20;
  fruitTree.position.z = z - 20;
  fruitTree.name = "fruitTree";

  let fruit1 = Mesh.CreateSphere("sphere", 8, 0.8, scene);
  fruit1.position.y = 4;
  fruit1.position.z = 2.1;

  let fruit2 = Mesh.CreateSphere("sphere", 8, 0.8, scene);
  fruit2.position.y = 4.5;
  fruit2.position.z = 1.1;
  fruit2.position.x = -2;

  let fruit3 = Mesh.CreateSphere("sphere", 8, 0.8, scene);
  fruit3.position.y = 4;
  fruit3.position.z = -0.9;
  fruit3.position.x = -1.8;

  let fruit4 = Mesh.CreateSphere("sphere", 8, 0.8, scene);
  fruit4.position.y = 6.5;
  fruit4.position.z = -0.9;
  fruit4.position.x = -2.5;

  let fruit5 = Mesh.CreateSphere("sphere", 8, 0.8, scene);
  fruit5.position.y = 5.5;
  fruit5.position.z = 2;
  fruit5.position.x = 1.7;

  let fruit6 = Mesh.CreateSphere("sphere", 8, 0.8, scene);
  fruit6.position.y = 7;
  fruit6.position.z = 2.6;
  fruit6.position.x = -0.3;

  let fruit7 = Mesh.CreateSphere("sphere", 8, 0.8, scene);
  fruit7.position.y = 7;
  fruit7.position.z = 1.6;
  fruit7.position.x = -2.3;

  let fruitTreeHidden = Mesh.MergeMeshes([fruit1, fruit2, fruit3, fruit4, fruit5, fruit6, fruit7], true, true, undefined, false, true);
  fruitTreeHidden.position.x = x + 20;
  fruitTreeHidden.position.z = z - 20;
  fruitTreeHidden.material = new StandardMaterial('texture1', scene);
  fruitTreeHidden.material.diffuseColor = fruitTreeColors[0].fruit;
  fruitTreeHidden.name = "fruitTreeHidden";
  fruitTreeHidden.material.alpha = 0;

  let cactusTrunk = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 4, tessellation: 8}, scene);
  cactusTrunk.position.y = 2.5;

  let cactusLeftArm = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 1.5, tessellation: 8}, scene);
  cactusLeftArm.position.y = 3.75;
  cactusLeftArm.position.x = 1;

  let cactusRightArm = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 1, tessellation: 8}, scene);
  cactusRightArm.position.y = 3;
  cactusRightArm.position.x = -1;

  let cactusLeftConnector = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 1, tessellation: 8}, scene);
  cactusLeftConnector.position.y = 3;
  cactusLeftConnector.position.x = 0.5;
  cactusLeftConnector.rotation.z = Math.PI / 2;

  let cactusRightConnector = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 1, tessellation: 8}, scene);
  cactusRightConnector.position.y = 2.5;
  cactusRightConnector.position.x = -0.5;
  cactusRightConnector.rotation.z = Math.PI / 2;

  let cactusEnd1 = Mesh.CreateSphere("sphere", 8, 0.5, scene);
  cactusEnd1.position.y = 3;
  cactusEnd1.position.x = 1;

  let cactusEnd2 = Mesh.CreateSphere("sphere", 8, 0.5, scene);
  cactusEnd2.position.y = 2.5;
  cactusEnd2.position.x = -1;

  let cactusEnd3 = Mesh.CreateSphere("sphere", 8, 0.5, scene);
  cactusEnd3.position.y = 4.5;

  let cactusEnd4 = Mesh.CreateSphere("sphere", 8, 0.5, scene);
  cactusEnd4.position.y = 4.5;
  cactusEnd4.position.x = 1;

  let cactusEnd5 = Mesh.CreateSphere("sphere", 8, 0.5, scene);
  cactusEnd5.position.y = 3.5;
  cactusEnd5.position.x = -1;

  let cactus = Mesh.MergeMeshes([cactusTrunk, cactusLeftArm, cactusRightArm, cactusLeftConnector, cactusRightConnector, cactusEnd1, cactusEnd2, cactusEnd3, cactusEnd4, cactusEnd5], true, true, undefined, false, true);
  cactus.position.x = x - 20;
  cactus.position.z = z - 20;
  cactus.rotation.y = 0.785;
  cactus.material = new StandardMaterial('texture1', scene);
  cactus.material.diffuseColor = cactusColors[0];
  cactus.name = "cactus";

  let flowerStalk = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.25, height: 3, tessellation: 8}, scene);
  flowerStalk.position.y = 1.5;

  let flowerTop1 = MeshBuilder.CreateCylinder("blade", {diameterTop: 0, diameter: 0.5, height: 0.5, tessellation: 4}, scene);
  flowerTop1.position.y = 3.25;

  let flowerTop2 = MeshBuilder.CreateCylinder("blade", {diameterBottom: 0, diameter: 0.5, height: 0.5, tessellation: 4}, scene);
  flowerTop2.position.y = 2.75;

  let flowerStem1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 0.3, tessellation: 8}, scene);
  flowerStem1.position.y = 2.25;
  flowerStem1.position.x = 0.25;
  flowerStem1.rotation.z = Math.PI / 2;

  let flowerStem2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 0.3, tessellation: 8}, scene);
  flowerStem2.position.y = 2.25;
  flowerStem2.position.x = -0.25;
  flowerStem2.rotation.z = Math.PI / 2;

  let flowerStem3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 0.3, tessellation: 8}, scene);
  flowerStem3.position.y = 1.5;
  flowerStem3.position.x = 0.25;
  flowerStem3.rotation.z = Math.PI / 2;

  let flowerStem4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 0.3, tessellation: 8}, scene);
  flowerStem4.position.y = 1.5;
  flowerStem4.position.x = -0.25;
  flowerStem4.rotation.z = Math.PI / 2;

  let flowerLeaf1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 0.1, tessellation: 20}, scene);
  flowerLeaf1.position.y = 2.25;
  flowerLeaf1.position.x = 0.55;
  flowerLeaf1.rotation.z = Math.PI / 2;
  flowerLeaf1.rotation.y = Math.PI / 2;

  let flowerLeaf2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 0.1, tessellation: 20}, scene);
  flowerLeaf2.position.y = 2.25;
  flowerLeaf2.position.x = -0.55;
  flowerLeaf2.rotation.z = Math.PI / 2;
  flowerLeaf2.rotation.y = Math.PI / 2;

  let flowerLeaf3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 0.1, tessellation: 20}, scene);
  flowerLeaf3.position.y = 1.5;
  flowerLeaf3.position.x = 0.55;
  flowerLeaf3.rotation.z = Math.PI / 2;
  flowerLeaf3.rotation.y = Math.PI / 2;

  let flowerLeaf4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 0.1, tessellation: 20}, scene);
  flowerLeaf4.position.y = 1.5;
  flowerLeaf4.position.x = -0.55;
  flowerLeaf4.rotation.z = Math.PI / 2;
  flowerLeaf4.rotation.y = Math.PI / 2;

  let flower = Mesh.MergeMeshes([flowerStalk, flowerTop1, flowerTop2, flowerStem1, flowerStem2, flowerStem3, flowerStem4, flowerLeaf1, flowerLeaf2, flowerLeaf3, flowerLeaf4], true, true, undefined, false, true);
  flower.position.x = x + 20;
  flower.position.z = z + 20;
  flower.rotation.y = 0.785;
  flower.material = new StandardMaterial('texture1', scene);
  flower.material.diffuseColor = flowerColors[0].stem;
  flower.name = "flower";

  let seeds = Mesh.CreateSphere("sphere", 8, 1.5, scene);
  seeds.position.y = 3;

  let petal1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 0.1, tessellation: 20}, scene);
  petal1.position.y = 3;
  petal1.position.x = 1.25;
  petal1.position.z = -0.3;
  petal1.rotation.z = Math.PI / 2;
  petal1.rotation.y = Math.PI / 2;

  let petal2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 0.1, tessellation: 20}, scene);
  petal2.position.y = 3;
  petal2.position.x = -1.25;
  petal2.position.z = -0.3;
  petal2.rotation.z = Math.PI / 2;
  petal2.rotation.y = Math.PI / 2;

  let petal3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 0.1, tessellation: 20}, scene);
  petal3.position.y = 4.25;
  petal3.position.z = -0.3;
  petal3.rotation.z = Math.PI / 2;
  petal3.rotation.y = Math.PI / 2;

  let petal4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 0.1, tessellation: 20}, scene);
  petal4.position.y = 1.75;
  petal4.position.z = -0.3;
  petal4.rotation.z = Math.PI / 2;
  petal4.rotation.y = Math.PI / 2;

  let flowerHidden = Mesh.MergeMeshes([seeds, petal1, petal2, petal3, petal4], true, true, undefined, false, true);
  flowerHidden.position.y = 3;
  flowerHidden.position.x = x + 20;
  flowerHidden.position.z = z + 20;
  flowerHidden.rotation.y = 0.785;
  flowerHidden.material = new StandardMaterial('texture1', scene);
  flowerHidden.material.diffuseColor = flowerColors[0].petals;
  flowerHidden.material.alpha = 0;
  flowerHidden.name = "flowerHidden";

  let stones = MeshBuilder.CreateCylinder("cylinder", {diameter: 5, height: 2.5, tessellation: 12}, scene);
  stones.position.y = 1.25;
  stones.material = new StandardMaterial('texture1', scene);
  stones.material.diffuseColor = new Color3(0.35, 0.35, 0.35);

  let rim = MeshBuilder.CreateTorus("torus", {diameter: 5, thickness: 0.6}, scene);
  rim.position.y = 2.7;
  rim.material = new StandardMaterial('texture1', scene);
  rim.material.diffuseColor = new Color3(0.35, 0.35, 0.35);

  let hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 5, height: 0.01, tessellation: 20}, scene);
  hole.position.y = 2.7;
  hole.material = new StandardMaterial('texture1', scene);
  hole.material.diffuseColor = new Color3(0.12, 0.45, 0.77);

  let support1 = MeshBuilder.CreateBox("box", {width: 0.25, height: 4, depth: 0.25}, scene);
  support1.position.y = 4.75;
  support1.position.x = 2.5;
  support1.material = new StandardMaterial('texture1', scene);
  support1.material.diffuseColor = new Color3(0.37, 0.25, 0.09);

  let support2 = MeshBuilder.CreateBox("box", {width: 0.25, height: 4, depth: 0.25}, scene);
  support2.position.y = 4.75;
  support2.position.x = -2.5;
  support2.material = new StandardMaterial('texture1', scene);
  support2.material.diffuseColor = new Color3(0.37, 0.25, 0.09);

  let roof1 = MeshBuilder.CreateBox("box", {width: 7, height: 0.25, depth: 3}, scene);
  roof1.position.y = 6.2;
  roof1.position.z = 1.25;
  roof1.rotation.x = 0.5;
  roof1.material = new StandardMaterial('texture1', scene);
  roof1.material.diffuseColor = new Color3(0.45, 0.39, 0.31);

  let roof2 = MeshBuilder.CreateBox("box", {width: 7, height: 0.25, depth: 3}, scene);
  roof2.position.y = 6.2;
  roof2.position.z = -1.25;
  roof2.rotation.x = -0.5;
  roof2.material = new StandardMaterial('texture1', scene);
  roof2.material.diffuseColor = new Color3(0.45, 0.39, 0.31);

  let roller = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 4.75, tessellation: 8}, scene);
  roller.position.y = 5;
  roller.rotation.z = Math.PI / 2;
  roller.material = new StandardMaterial('texture1', scene);
  roller.material.diffuseColor = new Color3(0.25, 0.19, 0.11);

  let rod = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 5.75, tessellation: 8}, scene);
  rod.position.y = 5;
  rod.rotation.z = Math.PI / 2;
  rod.material = new StandardMaterial('texture1', scene);
  rod.material.diffuseColor = new Color3(0, 0, 0);

  let crank = MeshBuilder.CreateBox("box", {width: 0.1, height: 1, depth: 0.25}, scene);
  crank.position.y = 4.75;
  crank.position.x = 2.75;
  crank.material = new StandardMaterial('texture1', scene);
  crank.material.diffuseColor = new Color3(0.25, 0.19, 0.11);

  let handle = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 0.6, tessellation: 8}, scene);
  handle.position.y = 4.5;
  handle.position.x = 3.1;
  handle.rotation.z = Math.PI / 2;
  handle.material = new StandardMaterial('texture1', scene);
  handle.material.diffuseColor = new Color3(0.25, 0.19, 0.11);

  let rope1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 1, tessellation: 8}, scene);
  rope1.position.y = 5;
  rope1.rotation.z = Math.PI / 2;
  rope1.material = new StandardMaterial('texture1', scene);
  rope1.material.diffuseColor = new Color3(0.54, 0.53, 0.36);

  let rope2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.2, height: 4, tessellation: 8}, scene);
  rope2.position.y = 3;
  rope2.material = new StandardMaterial('texture1', scene);
  rope2.material.diffuseColor = new Color3(0.54, 0.53, 0.36);

  let wellBarrier = MeshBuilder.CreateBox("barrier4_Ob8", {width: 7, height: 10, depth: 7}, scene);
  wellBarrier.position.y = 5;
  wellBarrier.material = new StandardMaterial('texture1', scene);
  wellBarrier.material.diffuseColor = new Color3(0.26, 0.17, 0.05);
  wellBarrier.material.alpha = 0;

  let well = Mesh.MergeMeshes([stones, rim, hole, support1, support2, roof1, roof2, roller, rod, crank, handle, rope1, rope2, wellBarrier], true, true, undefined, false, true);
  well.position.x = x;
  well.position.z = z;
  well.physicsImpostor = new PhysicsImpostor(wellBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  well.checkCollisions = true;
  well.name = "waterWell";
}

export {growGarden};
