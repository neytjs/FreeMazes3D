import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, returnLiquidTexture} from "../textures.js";

function generateWateringCan(status, scene, x, z, camera) {
  let pipe = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 1.5, tessellation: 8}, scene);
  pipe.position.y = 2;
  pipe.position.z = 1.25;
  pipe.rotation.x = Math.PI / 3;
  pipe.material = new StandardMaterial('texture1', scene);
  pipe.material.diffuseTexture = returnMetalTexture("metal_huntergreen", scene);

  let nozzle = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 0.2, tessellation: 20}, scene);
  nozzle.position.y = 2.35;
  nozzle.position.z = 1.84;
  nozzle.rotation.x = Math.PI / 3;
  nozzle.material = new StandardMaterial('texture1', scene);
  nozzle.material.diffuseTexture = returnMetalTexture("gold", scene);

  if (status === "holding") {
    let can = Mesh.MergeMeshes([pipe, nozzle], true, true, undefined, false, true);
    can.name = "wateringCan";
    can.position.y = -1000;
    can.rotation.x = 0.25;
  }
  if (status === "pouring") {
    let water = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 7, tessellation: 8}, scene);
    water.position.y = 4.15;
    water.position.z = 4.95;
    water.rotation.x = Math.PI / 3;
    water.material = new StandardMaterial('texture1', scene);
    water.material.diffuseTexture = returnLiquidTexture("water", scene);
    water.material.alpha = 0.5;

    let can = Mesh.MergeMeshes([pipe, nozzle, water], true, true, undefined, false, true);
    can.name = "wateringCanpouring";
    can.position.y = -1000;
    can.rotation.x = 0.5;
  }
  if (status === "item") {
    let tank = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 1.5, tessellation: 8}, scene);
    tank.position.y = 2;
    tank.material = new StandardMaterial('texture1', scene);
    tank.material.diffuseTexture = returnMetalTexture("metal_huntergreen", scene);

    let rim = MeshBuilder.CreateTorus("torus", {diameter: 1.5, thickness: 0.2}, scene);
    rim.position.y = 2.8;
    rim.material = new StandardMaterial('texture1', scene);
    rim.material.diffuseTexture = returnMetalTexture("metal_huntergreen", scene);

    let handle = MeshBuilder.CreateTorus("torus", {diameter: 1.75, thickness: 0.2}, scene);
    handle.position.y = 3;
    handle.rotation.x = Math.PI / 2;
    handle.material = new StandardMaterial('texture1', scene);
    handle.material.diffuseTexture = returnMetalTexture("gold", scene);

    let top = MeshBuilder.CreateCylinder("cylinder", {diameter: 1.5, height: 0.01, tessellation: 20}, scene);
    top.position.y = 2.8;
    top.material = new StandardMaterial('texture1', scene);
    top.material.diffuseColor = new Color3(0, 0, 0);

    let barrier = MeshBuilder.CreateBox("barrier", {width: 2.5, height: 10, depth: 3.3}, scene);
    barrier.position.y = 5;
    barrier.position.z = 0.5;
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.alpha = 0;

    let can = Mesh.MergeMeshes([tank, rim, pipe, nozzle, handle, top, barrier], true, true, undefined, false, true);
    can.position.x = x;
    can.position.z = z;
    can.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    can.checkCollisions = true;
    can.name = "wateringCanitem";
// make it rotate
    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
      scene.registerAfterRender(function () {
      can.rotate(axis, angle, 1);
    });
  }
}

export {generateWateringCan};
