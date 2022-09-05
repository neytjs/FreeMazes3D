import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {generateWheel, generateWheelBaseBarrier} from "../objects/generateWheel.js";
import {returnMetalTexture, returnLiquidTexture, genCubeFaceUV,
  genCylinderFaceUV} from "../textures.js";

function runMachine(x, z, scene, global_objects, item_id, camera, global_language) {
  function generateTube(x, z) {
    let pipe = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 9.5, tessellation: 20}, scene);
    pipe.position.y = 5;
    pipe.material = new StandardMaterial('texture1', scene);
    pipe.material.diffuseTexture = returnLiquidTexture("water", scene);
    pipe.material.alpha = 0.7;

    let support1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 20, faceUV: genCylinderFaceUV([1, 1, 4, 0.2, 1, 1])}, scene);
    support1.position.y = 0.25;
    support1.material = new StandardMaterial('texture1', scene);
    support1.material.diffuseTexture = returnMetalTexture("silver", scene);

    let support2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.5, tessellation: 20, faceUV: genCylinderFaceUV([1, 1, 4, 0.2, 1, 1])}, scene);
    support2.position.y = 9.75;
    support2.material = new StandardMaterial('texture1', scene);
    support2.material.diffuseTexture = returnMetalTexture("silver", scene);

    let hole = MeshBuilder.CreateCylinder("cylinder", {diameter: 2, height: 0.1, tessellation: 20}, scene);
    hole.position.y = 0.46;
    hole.material = new StandardMaterial('texture1', scene);
    hole.material.diffuseColor = new Color3(0, 0, 0);

    let barrier = MeshBuilder.CreateBox("box", {width: 4, height: 10, depth: 4}, scene);
    barrier.position.y = 5;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.diffuseColor = new Color3(0.34, 0.34, 0.33);
    barrier.material.alpha = 0;

    let tube = Mesh.MergeMeshes([pipe, support1, support2, hole, barrier], true, true, undefined, false, true);
    tube.position.x = x;
    tube.position.z = z;
    tube.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    tube.checkCollisions = true;
  }

  generateTube((x + 15), (z - 10));
  generateTube((x + 15), z);
  generateTube((x + 15), (z + 10));

  generateTube((x - 15), (z - 10));
  generateTube((x - 15), z);
  generateTube((x - 15), (z + 10));

  generateWheel(scene, (x + 10), (z - 10), "Ob21_wheel1", "copper");
  generateWheel(scene, (x + 10), z, "Ob21_wheel2", "copper");
  generateWheel(scene, (x + 10), (z + 10), "Ob21_wheel3", "copper");

  generateWheel(scene, (x - 10), (z - 10), "Ob21_wheel4", "copper");
  generateWheel(scene, (x - 10), z, "Ob21_wheel5", "copper");
  generateWheel(scene, (x - 10), (z + 10), "Ob21_wheel6", "copper");

  generateWheelBaseBarrier(scene, (x + 10), (z - 10), "base_Ob21_wheel1");
  generateWheelBaseBarrier(scene, (x + 10), z, "base_Ob21_wheel2");
  generateWheelBaseBarrier(scene, (x + 10), (z + 10), "base_Ob21_wheel3");

  generateWheelBaseBarrier(scene, (x - 10), (z - 10), "base_Ob21_wheel4");
  generateWheelBaseBarrier(scene, (x - 10), z, "base_Ob21_wheel5");
  generateWheelBaseBarrier(scene, (x - 10), (z + 10), "base_Ob21_wheel6");

  function generateLiquid(x, z, liquid_name, level) {
    let liquid = MeshBuilder.CreateCylinder("cylinder", {diameter: 2, height: 2, tessellation: 20}, scene);
    liquid.position.y = -0.5;
    liquid.position.x = x;
    liquid.position.z = z;
    liquid.material = new StandardMaterial('texture1', scene);
    liquid.material.diffuseColor = new Color3(1, 0, 0);
    liquid.material.specularColor = new Color3(1, 0, 0);
    liquid.material.emissiveColor = new Color3(1, 0, 0);
    liquid.material.ambientColor = new Color3(1, 0, 0);
    liquid.name = liquid_name;

    if (level === "full") {
      liquid.scaling.y = 10;
    }
  }

  generateLiquid((x + 15), (z - 10), "Ob21_liquid1", "low");
  generateLiquid((x + 15), z, "Ob21_liquid2", "low");
  generateLiquid((x + 15), (z + 10), "Ob21_liquid3", "low");

  generateLiquid((x - 15), (z - 10), "Ob21_liquid4", "low");
  generateLiquid((x - 15), z, "Ob21_liquid5", "low");
  generateLiquid((x - 15), (z + 10), "Ob21_liquid6", "low");

  let machine1 = MeshBuilder.CreateBox("box", {width: 16, height: 5, depth: 4, wrap: true, faceUV: genCubeFaceUV([8, 3.5, 8, 3.5, 2.8, 3.5, 2.8, 3.5, 8, 2.8, 8, 2.8])}, scene);
  machine1.position.y = 2.5;
  machine1.position.x = x - 21;
  machine1.position.z = z + 21;
  machine1.rotation.y = -0.785;
  machine1.material = new StandardMaterial('texture1', scene);
  machine1.material.diffuseTexture = returnMetalTexture("iron_medium", scene);
  machine1.physicsImpostor = new PhysicsImpostor(machine1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  machine1.checkCollisions = true;
  global_objects.push({id: machine1.uniqueId, obstacle21_id: item_id, type: "structure", name: ""});

  let pipe1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 2, tessellation: 12}, scene);
  pipe1.position.y = 5;
  pipe1.position.x = x - 20;
  pipe1.position.z = z + 22;
  pipe1.material = new StandardMaterial('texture1', scene);
  pipe1.material.diffuseTexture = returnMetalTexture("iron", scene);
  pipe1.material.diffuseTexture.uScale = 2;
  pipe1.material.diffuseTexture.vScale = 2;

  let rim1 = MeshBuilder.CreateTorus("torus", {diameter: 1.5, thickness: 0.25});
  rim1.position.y = 6;
  rim1.position.x = x - 20;
  rim1.position.z = z + 22;
  rim1.material = new StandardMaterial('texture1', scene);
  rim1.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
  rim1.material.diffuseTexture.uScale = 2.75;
  rim1.material.diffuseTexture.vScale = 1;

  let top1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.45, height: 0.025, tessellation: 20}, scene);
  top1.position.y = 6.55;
  top1.position.x = x - 20;
  top1.position.z = z + 22;
  top1.material = new StandardMaterial('texture1', scene);
  top1.material.alpha = 0;
  top1.name = "top1_ob21";

  let pipe2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 2, tessellation: 12}, scene);
  pipe2.position.y = 5;
  pipe2.position.x = x - 22;
  pipe2.position.z = z + 20;
  pipe2.material = new StandardMaterial('texture1', scene);
  pipe2.material.diffuseTexture = returnMetalTexture("iron", scene);
  pipe2.material.diffuseTexture.uScale = 2;
  pipe2.material.diffuseTexture.vScale = 2;

  let rim2 = MeshBuilder.CreateTorus("torus", {diameter: 1.5, thickness: 0.25});
  rim2.position.y = 6;
  rim2.position.x = x - 22;
  rim2.position.z = z + 20;
  rim2.material = new StandardMaterial('texture1', scene);
  rim2.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
  rim2.material.diffuseTexture.uScale = 2.75;
  rim2.material.diffuseTexture.vScale = 1;

  let top2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.45, height: 0.025, tessellation: 20}, scene);
  top2.position.y = 6.55;
  top2.position.x = x - 22;
  top2.position.z = z + 20;
  top2.material = new StandardMaterial('texture1', scene);
  top2.material.alpha = 0;
  top2.name = "top2_ob21";

  let machine2 = MeshBuilder.CreateBox("box", {width: 3, height: 5, depth: 2, wrap: true, faceUV: genCubeFaceUV([1.5, 2.5, 1.5, 2.5, 1, 1.5, 1, 1.5, 1.5, 1, 1.5, 1])}, scene);
  machine2.position.y = 2.5;
  machine2.position.x = x;
  machine2.position.z = z + 11.5;
  machine2.material = new StandardMaterial('texture1', scene);
  machine2.material.diffuseTexture = returnMetalTexture("iron_blue", scene);
  machine2.physicsImpostor = new PhysicsImpostor(machine2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  machine2.checkCollisions = true;

  function generateMachineWheelBase(x, z, machine_wheel_base_name) {
    let machine_wheel_base = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 0.25, tessellation: 20, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 0.25, 0.25, 0.25])}, scene);
    machine_wheel_base.position.y = 2.625;
    machine_wheel_base.rotation.x = 1.57;
    machine_wheel_base.material = new StandardMaterial('texture1', scene);
    machine_wheel_base.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

    let barrier =  MeshBuilder.CreateBox("box", {width: 3.5, height: 10, depth: 1.5}, scene);
    barrier.position.y = 5;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.diffuseColor = new Color3(0.29, 0.29, 0.29);
    barrier.material.alpha = 0;

    let machine_wheel_base_barrier = Mesh.MergeMeshes([machine_wheel_base, barrier], true, true, undefined, false, true);
    machine_wheel_base_barrier.position.x = x;
    machine_wheel_base_barrier.position.z = z;
    machine_wheel_base_barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    machine_wheel_base_barrier.checkCollisions = true;
    machine_wheel_base_barrier.name = machine_wheel_base_name;
  }

  generateMachineWheelBase(x, (z + 10.5), "base_Ob21_machine_wheel");

  function generateMachineWheel(x, y, z, wheel_name) {
    let wheel_main = MeshBuilder.CreateTorus("torus", {diameter: 3, thickness: 0.35}, scene);
    wheel_main.rotation.x = 1.57;
    wheel_main.material = new StandardMaterial('texture1', scene);
    wheel_main.material.diffuseTexture = returnMetalTexture("silver", scene);
    wheel_main.material.diffuseTexture.uScale = 4;
    wheel_main.material.diffuseTexture.vScale = 1;

    let wheel_bar1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 3, tessellation: 20, faceUV: genCylinderFaceUV([0.15, 0.15, 1, 1.5, 0.15, 0.15])}, scene);
    wheel_bar1.material = new StandardMaterial('texture1', scene);
    wheel_bar1.material.diffuseTexture = returnMetalTexture("silver", scene);

    let wheel_bar2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 3, tessellation: 20, faceUV: genCylinderFaceUV([0.15, 0.15, 1, 1.5, 0.15, 0.15])}, scene);
    wheel_bar2.rotation.x = 1.57;
    wheel_bar2.rotation.z = 1.57;
    wheel_bar2.material = new StandardMaterial('texture1', scene);
    wheel_bar2.material.diffuseTexture = returnMetalTexture("silver", scene);

    let wheel_support = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 1, tessellation: 20, faceUV: genCylinderFaceUV([0.15, 0.15, 1, 1, 0.15, 0.15])}, scene);
    wheel_support.rotation.x = 1.57;
    wheel_support.position.z = 0.5;
    wheel_support.material = new StandardMaterial('texture1', scene);
    wheel_support.material.diffuseTexture = returnMetalTexture("iron", scene);

    let wheel = Mesh.MergeMeshes([wheel_main, wheel_bar1, wheel_bar2, wheel_support], true, true, undefined, false, true);
    wheel.position.x = x;
    wheel.position.z = z;
    wheel.position.y = y;
    wheel.name = wheel_name;
  }

  generateMachineWheel(x, 2.625, (z + 10), "Ob21_machine_wheel");
}

export {runMachine};
