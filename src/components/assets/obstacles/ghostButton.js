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
import {generateSpear} from "../objects/generateSpear.js";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {returnMetalTexture, returnCrystalTexture} from "../textures.js";

function ghostButton(x, z, scene, global_objects, item_id, camera) {
// generate the spear
  generateSpear("item", "ghost", scene, x, z);
  generateSpear("holding", "ghost", scene, x, z);
  global_objects.push({id: "", type: "holdable", name: "ghostSpear", puzzle_pos: {x: x, z: z, y: 4}});
// declare and shuffle the textures
  let ghost_textures = [
    "gem_blue",
    "gem_bluepurple",
    "gem_purple"
  ];
  ghost_textures = arrayShuffler(ghost_textures);
  let texture1 = ghost_textures[0];
  let texture2 = ghost_textures[1];
  let texture3 = ghost_textures[2];

  let buttonHolder1 = MeshBuilder.CreateBox("box", {width: 2, height: 3, depth: 2}, scene);
  buttonHolder1.position.y = 1.5;
  buttonHolder1.position.x = x;
  buttonHolder1.position.z = z;
  buttonHolder1.material = new StandardMaterial('texture1', scene);
  buttonHolder1.material.diffuseTexture = returnMetalTexture("iron", scene);
  buttonHolder1.physicsImpostor = new PhysicsImpostor(buttonHolder1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  buttonHolder1.checkCollisions = true;

  let buttonBarrier1 = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  buttonBarrier1.position.y = 5;
  buttonBarrier1.position.x = x;
  buttonBarrier1.position.z = z;
  buttonBarrier1.material = new StandardMaterial('texture1', scene);
  buttonBarrier1.material.alpha = 0;
  buttonBarrier1.name = "button1p5a";
  global_objects.push({id: buttonBarrier1.uniqueId, obstacle5_id: item_id, type: "structure", name: ""}); // just for obstacle5_id

  let pushButton1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.5, tessellation: 8}, scene);
  pushButton1.position.y = 3.25;
  pushButton1.position.x = x;
  pushButton1.position.z = z;
  pushButton1.material = new StandardMaterial('texture1', scene);
  pushButton1.material.diffuseTexture = returnCrystalTexture("gem_darkred", scene);
  pushButton1.name = "pushButton1p5a";

  let ghostBarrier = MeshBuilder.CreateCylinder("ghostBarrier", {diameter: 12, height: 10, tessellation: 8}, scene);
  ghostBarrier.position.y = 5;
  ghostBarrier.position.x = x;
  ghostBarrier.position.z = z;
  ghostBarrier.material = new StandardMaterial('texture1', scene);
  ghostBarrier.material.alpha = 0;
  ghostBarrier.physicsImpostor = new PhysicsImpostor(ghostBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  ghostBarrier.checkCollisions = true;

  let ghostBarrierSound = new Sound("ghostBarrierSound", "./sound/atmoseerie04.wav", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 50 });
  ghostBarrierSound.attachToMesh(ghostBarrier);

  let ghost1Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  ghost1Shard1.position.y = 5;
  ghost1Shard1.material = new StandardMaterial('texture1', scene);
  ghost1Shard1.material.diffuseTexture = returnCrystalTexture(texture1, scene);
  ghost1Shard1.material.diffuseTexture.uScale = 3;
  ghost1Shard1.material.diffuseTexture.vScale = 3;

  let ghost1Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  ghost1Shard2.position.y = 1;
  ghost1Shard2.material = new StandardMaterial('texture1', scene);
  ghost1Shard2.material.diffuseTexture = returnCrystalTexture(texture1, scene);

  let ghostCrystal1Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  ghostCrystal1Barrier.position.y = 5;
  ghostCrystal1Barrier.material = new StandardMaterial('texture1', scene);
  ghostCrystal1Barrier.material.alpha = 0;

  let ghostCrystal1 = Mesh.MergeMeshes([ghost1Shard1, ghost1Shard2, ghostCrystal1Barrier], true, true, undefined, false, true);
  ghostCrystal1.position.x = x - 15;
  ghostCrystal1.position.z = z - 20;
  ghostCrystal1.physicsImpostor = new PhysicsImpostor(ghostCrystal1Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  ghostCrystal1.checkCollisions = true;
  ghostCrystal1.name = "ghost1crystal";

  let ghost2Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  ghost2Shard1.position.y = 5;
  ghost2Shard1.material = new StandardMaterial('texture1', scene);
  ghost2Shard1.material.diffuseTexture = returnCrystalTexture(texture2, scene);
  ghost2Shard1.material.diffuseTexture.uScale = 3;
  ghost2Shard1.material.diffuseTexture.vScale = 3;

  let ghost2Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  ghost2Shard2.position.y = 1;
  ghost2Shard2.material = new StandardMaterial('texture1', scene);
  ghost2Shard2.material.diffuseTexture = returnCrystalTexture(texture2, scene);

  let ghostCrystal2Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  ghostCrystal2Barrier.position.y = 5;
  ghostCrystal2Barrier.material = new StandardMaterial('texture1', scene);
  ghostCrystal2Barrier.material.alpha = 0;

  let ghostCrystal2 = Mesh.MergeMeshes([ghost2Shard1, ghost2Shard2, ghostCrystal2Barrier], true, true, undefined, false, true);
  ghostCrystal2.position.x = x;
  ghostCrystal2.position.z = z - 20;
  ghostCrystal2.physicsImpostor = new PhysicsImpostor(ghostCrystal2Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  ghostCrystal2.checkCollisions = true;
  ghostCrystal2.name = "ghost2crystal";

  let ghost3Shard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  ghost3Shard1.position.y = 5;
  ghost3Shard1.material = new StandardMaterial('texture1', scene);
  ghost3Shard1.material.diffuseTexture = returnCrystalTexture(texture3, scene);
  ghost3Shard1.material.diffuseTexture.uScale = 3;
  ghost3Shard1.material.diffuseTexture.vScale = 3;

  let ghost3Shard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  ghost3Shard2.position.y = 1;
  ghost3Shard2.material = new StandardMaterial('texture1', scene);
  ghost3Shard2.material.diffuseTexture = returnCrystalTexture(texture3, scene);

  let ghostCrystal3Barrier = MeshBuilder.CreateBox("barrier", {width: 3.5, height: 10, depth: 3.5}, scene);
  ghostCrystal3Barrier.position.y = 5;
  ghostCrystal3Barrier.material = new StandardMaterial('texture1', scene);
  ghostCrystal3Barrier.material.alpha = 0;

  let ghostCrystal3 = Mesh.MergeMeshes([ghost3Shard1, ghost3Shard2, ghostCrystal3Barrier], true, true, undefined, false, true);
  ghostCrystal3.position.x = x + 15;
  ghostCrystal3.position.z = z - 20;
  ghostCrystal3.physicsImpostor = new PhysicsImpostor(ghostCrystal3Barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  ghostCrystal3.checkCollisions = true;
  ghostCrystal3.name = "ghost3crystal";

  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    ghostCrystal1.rotate(axis, angle, 1);
    ghostCrystal2.rotate(axis, angle, 1);
    ghostCrystal3.rotate(axis, angle, 1);
  });

  let ghostOrbLarge1 = Mesh.CreateSphere("ghost1", 16, 2, scene);
  ghostOrbLarge1.material = new StandardMaterial('texture1', scene);
  ghostOrbLarge1.material.diffuseTexture = returnCrystalTexture(texture1, scene);
  ghostOrbLarge1.material.alpha = 0.5;

  let ghostOrbBig1 = Mesh.CreateSphere("ghost1", 16, 1.75, scene);
  ghostOrbBig1.material = new StandardMaterial('texture1', scene);
  ghostOrbBig1.material.diffuseTexture = returnCrystalTexture(texture1, scene);
  ghostOrbBig1.material.alpha = 0.5;

  let ghostOrbMedium1 = Mesh.CreateSphere("ghost1", 16, 1.5, scene);
  ghostOrbMedium1.material = new StandardMaterial('texture1', scene);
  ghostOrbMedium1.material.diffuseTexture = returnCrystalTexture(texture1, scene);
  ghostOrbMedium1.material.alpha = 0.5;

  let ghostOrbSmall1 = Mesh.CreateSphere("ghost1", 16, 1.25, scene);
  ghostOrbSmall1.material = new StandardMaterial('texture1', scene);
  ghostOrbSmall1.material.diffuseTexture = returnCrystalTexture(texture1, scene);
  ghostOrbSmall1.material.alpha = 0.5;

  let ghostOrbTiny1 = Mesh.CreateSphere("ghost1", 16, 1, scene);
  ghostOrbTiny1.material = new StandardMaterial('texture1', scene);
  ghostOrbTiny1.material.diffuseTexture = returnCrystalTexture(texture1, scene);
  ghostOrbTiny1.material.alpha = 0.5;

  let ghostOrbLarge2 = Mesh.CreateSphere("ghost2", 16, 2, scene);
  ghostOrbLarge2.material = new StandardMaterial('texture1', scene);
  ghostOrbLarge2.material.diffuseTexture = returnCrystalTexture(texture2, scene);
  ghostOrbLarge2.material.alpha = 0.5;

  let ghostOrbBig2 = Mesh.CreateSphere("ghost2", 16, 1.75, scene);
  ghostOrbBig2.material = new StandardMaterial('texture1', scene);
  ghostOrbBig2.material.diffuseTexture = returnCrystalTexture(texture2, scene);
  ghostOrbBig2.material.alpha = 0.5;

  let ghostOrbMedium2 = Mesh.CreateSphere("ghost2", 16, 1.5, scene);
  ghostOrbMedium2.material = new StandardMaterial('texture1', scene);
  ghostOrbMedium2.material.diffuseTexture = returnCrystalTexture(texture2, scene);
  ghostOrbMedium2.material.alpha = 0.5;

  let ghostOrbSmall2 = Mesh.CreateSphere("ghost2", 16, 1.25, scene);
  ghostOrbSmall2.material = new StandardMaterial('texture1', scene);
  ghostOrbSmall2.material.diffuseTexture = returnCrystalTexture(texture2, scene);
  ghostOrbSmall2.material.alpha = 0.5;

  let ghostOrbTiny2 = Mesh.CreateSphere("ghost2", 16, 1, scene);
  ghostOrbTiny2.material = new StandardMaterial('texture1', scene);
  ghostOrbTiny2.material.diffuseTexture = returnCrystalTexture(texture2, scene);
  ghostOrbTiny2.material.alpha = 0.5;

  let ghostOrbLarge3 = Mesh.CreateSphere("ghost3", 16, 2, scene);
  ghostOrbLarge3.material = new StandardMaterial('texture1', scene);
  ghostOrbLarge3.material.diffuseTexture = returnCrystalTexture(texture3, scene);
  ghostOrbLarge3.material.alpha = 0.5;

  let ghostOrbBig3 = Mesh.CreateSphere("ghost3", 16, 1.75, scene);
  ghostOrbBig3.material = new StandardMaterial('texture1', scene);
  ghostOrbBig3.material.diffuseTexture = returnCrystalTexture(texture3, scene);
  ghostOrbBig3.material.alpha = 0.5;

  let ghostOrbMedium3 = Mesh.CreateSphere("ghost3", 16, 1.5, scene);
  ghostOrbMedium3.material = new StandardMaterial('texture1', scene);
  ghostOrbMedium3.material.diffuseTexture = returnCrystalTexture(texture3, scene);
  ghostOrbMedium3.material.alpha = 0.5;

  let ghostOrbSmall3 = Mesh.CreateSphere("ghost3", 16, 1.25, scene);
  ghostOrbSmall3.material = new StandardMaterial('texture1', scene);
  ghostOrbSmall3.material.diffuseTexture = returnCrystalTexture(texture3, scene);
  ghostOrbSmall3.material.alpha = 0.5;

  let ghostOrbTiny3 = Mesh.CreateSphere("ghost3", 16, 1, scene);
  ghostOrbTiny3.material = new StandardMaterial('texture1', scene);
  ghostOrbTiny3.material.diffuseTexture = returnCrystalTexture(texture3, scene);
  ghostOrbTiny3.material.alpha = 0.5;

  let radius = 5;

  let g1pi1 = Math.PI;
  let g1pi2 = Math.PI - 0.37;
  let g1pi3 = Math.PI - 0.68;
  let g1pi4 = Math.PI - 0.94;
  let g1pi5 = Math.PI - 1.15;
  let g1height = 3;

  let g2pi1 = Math.PI;
  let g2pi2 = Math.PI + 0.37;
  let g2pi3 = Math.PI + 0.68;
  let g2pi4 = Math.PI + 0.94;
  let g2pi5 = Math.PI + 1.15;
  let g2height = 6;

  let g3pi1 = Math.PI;
  let g3pi2 = Math.PI - 0.37;
  let g3pi3 = Math.PI - 0.68;
  let g3pi4 = Math.PI - 0.94;
  let g3pi5 = Math.PI - 1.15;
  let g3height = 9;

  scene.registerBeforeRender(function() {
    ghostOrbLarge1.position = new Vector3((radius * Math.sin(g1pi1) + x), g1height, (radius * Math.cos(g1pi1) + z));
    ghostOrbBig1.position = new Vector3((radius * Math.sin(g1pi2) + x), g1height, (radius * Math.cos(g1pi2) + z));
    ghostOrbMedium1.position = new Vector3((radius * Math.sin(g1pi3) + x), g1height, (radius * Math.cos(g1pi3) + z));
    ghostOrbSmall1.position = new Vector3((radius * Math.sin(g1pi4) + x), g1height, (radius * Math.cos(g1pi4) + z));
    ghostOrbTiny1.position = new Vector3((radius * Math.sin(g1pi5) + x), g1height, (radius * Math.cos(g1pi5) + z));
    g1pi1 = g1pi1 + 0.02;
    g1pi2 = g1pi2 + 0.02;
    g1pi3 = g1pi3 + 0.02;
    g1pi4 = g1pi4 + 0.02;
    g1pi5 = g1pi5 + 0.02;
    ghostOrbLarge2.position = new Vector3((radius * Math.sin(g2pi1) + x), g2height, (radius * Math.cos(g2pi1) + z));
    ghostOrbBig2.position = new Vector3((radius * Math.sin(g2pi2) + x), g2height, (radius * Math.cos(g2pi2) + z));
    ghostOrbMedium2.position = new Vector3((radius * Math.sin(g2pi3) + x), g2height, (radius * Math.cos(g2pi3) + z));
    ghostOrbSmall2.position = new Vector3((radius * Math.sin(g2pi4) + x), g2height, (radius * Math.cos(g2pi4) + z));
    ghostOrbTiny2.position = new Vector3((radius * Math.sin(g2pi5) + x), g2height, (radius * Math.cos(g2pi5) + z));
    g2pi1 = g2pi1 - 0.025;
    g2pi2 = g2pi2 - 0.025;
    g2pi3 = g2pi3 - 0.025;
    g2pi4 = g2pi4 - 0.025;
    g2pi5 = g2pi5 - 0.025;
    ghostOrbLarge3.position = new Vector3((radius * Math.sin(g3pi1) + x), g3height, (radius * Math.cos(g3pi1) + z));
    ghostOrbBig3.position = new Vector3((radius * Math.sin(g3pi2) + x), g3height, (radius * Math.cos(g3pi2) + z));
    ghostOrbMedium3.position = new Vector3((radius * Math.sin(g3pi3) + x), g3height, (radius * Math.cos(g3pi3) + z));
    ghostOrbSmall3.position = new Vector3((radius * Math.sin(g3pi4) + x), g3height, (radius * Math.cos(g3pi4) + z));
    ghostOrbTiny3.position = new Vector3((radius * Math.sin(g3pi5) + x), g3height, (radius * Math.cos(g3pi5) + z));
    g3pi1 = g3pi1 + 0.03;
    g3pi2 = g3pi2 + 0.03;
    g3pi3 = g3pi3 + 0.03;
    g3pi4 = g3pi4 + 0.03;
    g3pi5 = g3pi5 + 0.03;
  });
}

export {ghostButton};
