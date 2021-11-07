import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import cloneDeep from 'lodash.clonedeep';
import {generateSpear} from "../objects/generateSpear.js";
import {distinguishTwoArrays} from "../../utilities/distinguishTwoArrays.js";
import {degrees} from "../../utilities/math.js";
import {generateCarryingCrystal} from "../objects/generateCarryingCrystal.js";
import {returnMetalTexture, returnCrystalTexture} from "../textures.js";

function carryCrystals(x, z, scene, global_objects, item_id, camera) {
  let global_pedestalcrystal_data = {};

  let colors_base = [
    {color_name: "red", texture: "gem_darkred"},
    {color_name: "teal", texture: "gem_teal"},
    {color_name: "pink", texture: "gem_hotpink"},
    {color_name: "green", texture: "gem_darkgreen"},
    {color_name: "blue", texture: "gem_skyblue"},
    {color_name: "purple", texture: "gem_verydarkpurple"}
  ];

  generateCarryingCrystal(scene, camera);

  let two_arrays = distinguishTwoArrays(colors_base, "color_name");
  let pedestal_colors = two_arrays.first_clone_and_shuffle;
  let crystal_colors = two_arrays.new_final_array;

  for (let i = 0, length = degrees.length; i < length; i++) {
    let pedestal = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 3, diameter: 5, height: 3, tessellation: 8}, scene);
    pedestal.position.y = 1.5;
    pedestal.position.x = (17.5 * Math.cos(degrees[i])) + x;
    pedestal.position.z = (17.5 * Math.sin(degrees[i])) + z;
    pedestal.material = new StandardMaterial('texture1', scene);
    pedestal.material.diffuseTexture = returnCrystalTexture(pedestal_colors[i].texture, scene);

    let barrier = MeshBuilder.CreateBox("barrier", {width: 5, height: 10, depth: 5}, scene);
    barrier.position.y = 5;
    barrier.position.x = (17.5 * Math.cos(degrees[i])) + x;
    barrier.position.z = (17.5 * Math.sin(degrees[i])) + z;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.alpha = 0;

    let full_pedestal = Mesh.MergeMeshes([pedestal, barrier], true, true, undefined, false, true);
    full_pedestal.name = pedestal_colors[i].color_name + "_Pedestal";
    full_pedestal.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    full_pedestal.checkCollisions = true;

    let colorfulShard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
    colorfulShard1.position.y = 8;

    let colorfulShard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
    colorfulShard2.position.y = 4;

    let colorfulCrystal = Mesh.MergeMeshes([colorfulShard1, colorfulShard2], true, true, undefined, false, true);
    colorfulCrystal.position.x = (17.5 * Math.cos(degrees[i])) + x;
    colorfulCrystal.position.z = (17.5 * Math.sin(degrees[i])) + z;
    colorfulCrystal.material = new StandardMaterial('texture1', scene);
    colorfulCrystal.material.diffuseTexture = returnCrystalTexture(crystal_colors[i].texture, scene);
    colorfulCrystal.name = pedestal_colors[i].color_name + "Crystal";

    global_pedestalcrystal_data[pedestal_colors[i].color_name] = {
      color_name: crystal_colors[i].color_name,
      texture: crystal_colors[i].texture
    };

  // make it rotate
    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
      colorfulCrystal.rotate(axis, angle, 1);
    });
  }

  let bench = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 3, diameter: 5, height: 3, tessellation: 8}, scene);
  bench.position.y = 1.5;
  bench.material = new StandardMaterial('texture1', scene);
  bench.material.diffuseTexture = returnMetalTexture("iron_rusty", scene);

  let benchBarrier = MeshBuilder.CreateBox("barrier", {width: 5, height: 10, depth: 5}, scene);
  benchBarrier.position.y = 5;
  benchBarrier.material = new StandardMaterial('texture1', scene);
  benchBarrier.material.alpha = 0;

  let workBench = Mesh.MergeMeshes([bench, benchBarrier], true, true, undefined, false, true);
  workBench.position.x = x;
  workBench.position.z = z;
  workBench.name = "grey_Pedestal";
  workBench.physicsImpostor = new PhysicsImpostor(benchBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  workBench.checkCollisions = true;

  let workBenchShard1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 3, height: 6, tessellation: 4}, scene);
  workBenchShard1.position.y = 8;

  let workBenchShard2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 3, height: 2, tessellation: 4}, scene);
  workBenchShard2.position.y = 4;

  let workBenchCrystal = Mesh.MergeMeshes([workBenchShard1, workBenchShard2], true, true, undefined, false, true);
  workBenchCrystal.position.x = x;
  workBenchCrystal.position.z = z;
  workBenchCrystal.material = new StandardMaterial('texture1', scene);
  workBenchCrystal.material.alpha = 0;
  workBenchCrystal.name = "greyCrystal";

  global_pedestalcrystal_data["grey"] = {
    color_name: "empty",
    texture: "gem_teal"
  };

// make it rotate
  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    workBenchCrystal.rotate(axis, angle, 1);
  });

  global_objects.push({
    id: benchBarrier.uniqueId,
    obstacle6_id: item_id,
    type: "structure",
    name: "pedestalcrystal",
    solved: false,
    pedestals: global_pedestalcrystal_data
  });
}

export {carryCrystals};
