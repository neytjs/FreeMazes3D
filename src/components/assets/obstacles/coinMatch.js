import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {arrayShuffler} from "../../utilities/shuffler.js";
import {returnMetalTexture} from "../textures.js";

function coinMatch(x, z, scene, global_objects, item_id, camera) {
  let pos_array = [-15, 0, 15];
  pos_array = arrayShuffler(pos_array);
  let c_pedestal = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 3, diameter: 5, height: 3, tessellation: 8}, scene);
  c_pedestal.position.y = 1.5;
  c_pedestal.position.x = x + pos_array[0];
  c_pedestal.position.z = z;
  c_pedestal.material = new StandardMaterial('texture1', scene);
  c_pedestal.material.diffuseTexture = returnMetalTexture("copper", scene);
  c_pedestal.physicsImpostor = new PhysicsImpostor(c_pedestal, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  c_pedestal.checkCollisions = true;

  let cp_barrier = MeshBuilder.CreateBox("barrier", {width: 5, height: 10, depth: 5}, scene);
  cp_barrier.position.y = 5;
  cp_barrier.position.x = x + pos_array[0];
  cp_barrier.position.z = z;
  cp_barrier.material = new StandardMaterial('texture1', scene);
  cp_barrier.material.alpha = 0;
  cp_barrier.physicsImpostor = new PhysicsImpostor(cp_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  cp_barrier.checkCollisions = true;

  var copper_pedestal = Mesh.MergeMeshes([c_pedestal, cp_barrier], true, true, undefined, false, true);
  copper_pedestal.name = "copper_pedestal";

  let c_invisible_coin = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.1, tessellation: 20}, scene);
  c_invisible_coin.position.y = 3.7;
  c_invisible_coin.position.x = x + pos_array[0];
  c_invisible_coin.position.z = z;
  c_invisible_coin.rotation.z = Math.PI / 2;
  c_invisible_coin.material = new StandardMaterial('texture1', scene);
  c_invisible_coin.material.diffuseTexture = returnMetalTexture("copper", scene);
  c_invisible_coin.material.alpha = 0;
  c_invisible_coin.name = "c_invisible_coin";

  global_objects.push({id: copper_pedestal.uniqueId, obstacle_id: item_id, type: "structure", name: "copper_pedestal", solved: false});

  let s_pedestal = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 3, diameter: 5, height: 3, tessellation: 8}, scene);
  s_pedestal.position.y = 1.5;
  s_pedestal.position.x = x + pos_array[1];
  s_pedestal.position.z = z;
  s_pedestal.material = new StandardMaterial('texture1', scene);
  s_pedestal.material.diffuseTexture = returnMetalTexture("silver", scene);
  s_pedestal.physicsImpostor = new PhysicsImpostor(s_pedestal, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  s_pedestal.checkCollisions = true;

  let sp_barrier = MeshBuilder.CreateBox("barrier", {width: 5, height: 10, depth: 5}, scene);
  sp_barrier.position.y = 5;
  sp_barrier.position.x = x + pos_array[1];
  sp_barrier.position.z = z;
  sp_barrier.material = new StandardMaterial('texture1', scene);
  sp_barrier.material.alpha = 0;
  sp_barrier.physicsImpostor = new PhysicsImpostor(sp_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  sp_barrier.checkCollisions = true;

  var silver_pedestal = Mesh.MergeMeshes([s_pedestal, sp_barrier], true, true, undefined, false, true);
  silver_pedestal.name = "silver_pedestal";

  let s_invisible_coin = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.1, tessellation: 20}, scene);
  s_invisible_coin.position.y = 3.7;
  s_invisible_coin.position.x = x + pos_array[1];
  s_invisible_coin.position.z = z;
  s_invisible_coin.rotation.z = Math.PI / 2;
  s_invisible_coin.material = new StandardMaterial('texture1', scene);
  s_invisible_coin.material.diffuseTexture = returnMetalTexture("silver", scene);
  s_invisible_coin.material.alpha = 0;
  s_invisible_coin.name = "s_invisible_coin";

  global_objects.push({id: silver_pedestal.uniqueId, obstacle_id: item_id, type: "structure", name: "silver_pedestal", solved: false});

  let g_pedestal = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 3, diameter: 5, height: 3, tessellation: 8}, scene);
  g_pedestal.position.y = 1.5;
  g_pedestal.position.x = x + pos_array[2];
  g_pedestal.position.z = z;
  g_pedestal.material = new StandardMaterial('texture1', scene);
  g_pedestal.material.diffuseTexture = returnMetalTexture("gold", scene);
  g_pedestal.physicsImpostor = new PhysicsImpostor(g_pedestal, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  g_pedestal.checkCollisions = true;

  let gp_barrier = MeshBuilder.CreateBox("barrier", {width: 5, height: 10, depth: 5}, scene);
  gp_barrier.position.y = 5;
  gp_barrier.position.x = x + pos_array[2];
  gp_barrier.position.z = z;
  gp_barrier.material = new StandardMaterial('texture1', scene);
  gp_barrier.material.alpha = 0;
  gp_barrier.physicsImpostor = new PhysicsImpostor(gp_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  gp_barrier.checkCollisions = true;

  var gold_pedestal = Mesh.MergeMeshes([g_pedestal, gp_barrier], true, true, undefined, false, true);
  gold_pedestal.name = "gold_pedestal";

  let g_invisible_coin = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.1, tessellation: 20}, scene);
  g_invisible_coin.position.y = 3.7;
  g_invisible_coin.position.x = x + pos_array[2];
  g_invisible_coin.position.z = z;
  g_invisible_coin.rotation.z = Math.PI / 2;
  g_invisible_coin.material = new StandardMaterial('texture1', scene);
  g_invisible_coin.material.diffuseTexture = returnMetalTexture("gold", scene);
  g_invisible_coin.material.alpha = 0;
  g_invisible_coin.name = "g_invisible_coin";

  global_objects.push({id: gold_pedestal.uniqueId, obstacle_id: item_id, type: "structure", name: "gold_pedestal", solved: false});

// re-shuffle for coins
  pos_array = arrayShuffler(pos_array);
  let c_coin = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.1, tessellation: 20}, scene);
  c_coin.position.y = 3.5;
  c_coin.rotation.z = Math.PI / 2;
  c_coin.material = new StandardMaterial('texture1', scene);
  c_coin.material.diffuseTexture = returnMetalTexture("copper", scene);

  let cc_barrier = MeshBuilder.CreateBox("barrier", {width: 2, height: 10, depth: 2}, scene);
  cc_barrier.position.y = 5;
  cc_barrier.material = new StandardMaterial('texture1', scene);
  cc_barrier.material.alpha = 0;

  var copper_coin = Mesh.MergeMeshes([c_coin, cc_barrier], true, true, undefined, false, true);
  copper_coin.position.x = x + pos_array[0];
  copper_coin.position.z = z + 15;
  copper_coin.physicsImpostor = new PhysicsImpostor(cc_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  copper_coin.checkCollisions = true;

  global_objects.push({id: copper_coin.uniqueId, obstacle_id: item_id, type: "puzzle_piece", name: "copper_coin", inventory: "Copper Coin", img: "copper_coin"});

  let s_coin = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.1, tessellation: 20}, scene);
  s_coin.position.y = 3.5;
  s_coin.rotation.z = Math.PI / 2;
  s_coin.material = new StandardMaterial('texture1', scene);
  s_coin.material.diffuseTexture = returnMetalTexture("silver", scene);

  let sc_barrier = MeshBuilder.CreateBox("barrier", {width: 2, height: 10, depth: 2}, scene);
  sc_barrier.position.y = 5;
  sc_barrier.material = new StandardMaterial('texture1', scene);
  sc_barrier.material.alpha = 0;

  var silver_coin = Mesh.MergeMeshes([s_coin, sc_barrier], true, true, undefined, false, true);
  silver_coin.position.x = x + pos_array[1];
  silver_coin.position.z = z + 15;
  silver_coin.physicsImpostor = new PhysicsImpostor(sc_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  silver_coin.checkCollisions = true;

  global_objects.push({id: silver_coin.uniqueId, obstacle_id: item_id, type: "puzzle_piece", name: "silver_coin", inventory: "Silver Coin", img: "silver_coin"});

  let g_coin = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 0.1, tessellation: 20}, scene);
  g_coin.position.y = 3.5;
  g_coin.rotation.z = Math.PI / 2;
  g_coin.material = new StandardMaterial('texture1', scene);
  g_coin.material.diffuseTexture = returnMetalTexture("gold", scene);

  let gc_barrier = MeshBuilder.CreateBox("barrier", {width: 2, height: 10, depth: 2}, scene);
  gc_barrier.position.y = 5;
  gc_barrier.material = new StandardMaterial('texture1', scene);
  gc_barrier.material.alpha = 0;

  var gold_coin = Mesh.MergeMeshes([g_coin, gc_barrier], true, true, undefined, false, true);
  gold_coin.position.y = 0;
  gold_coin.position.x = x + pos_array[2];
  gold_coin.position.z = z + 15;
  gold_coin.physicsImpostor = new PhysicsImpostor(gc_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  gold_coin.checkCollisions = true;

  global_objects.push({id: gold_coin.uniqueId, obstacle_id: item_id, type: "puzzle_piece", name: "gold_coin", inventory: "Gold Coin", img: "gold_coin"});

  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    copper_coin.rotate(axis, angle, 1);
    silver_coin.rotate(axis, angle, 1);
    gold_coin.rotate(axis, angle, 1);
    c_invisible_coin.rotate(axis, angle, 1);
    s_invisible_coin.rotate(axis, angle, 1);
    g_invisible_coin.rotate(axis, angle, 1);
  });
}

export {coinMatch};
