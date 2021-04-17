import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";

function generateDoor(door_type, x, z, scene, global_objects, item_id, special) {
  let color = {};
  let barrier_door = {};
  switch (door_type) {
    case "force_field":
      color = new Color3(0.98, 0.18, 0.18);
    break;
    case "dungeon_gate":
      color = new Color3(0.23, 0.19, 0.05);
    break;
  }

  var box = MeshBuilder.CreateBox("box", {width: 0.1, height: 9.9, depth: 1}, scene);
  box.position.y = 2;
  box.rotation.z = Math.PI / 2;
  box.rotation.x = Math.PI / 2;

   var box1 = MeshBuilder.CreateBox("box", {width: 0.1, height: 9.9, depth: 1}, scene);
  box1.position.y = 8;
  box1.rotation.z = Math.PI / 2;
  box1.rotation.x = Math.PI / 2;

  var cylinder = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8}, scene);
  cylinder.position.y = 5;
  cylinder.position.x = -4;

  var cylinder1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8}, scene);
  cylinder1.position.y = 5;
  cylinder1.position.x = -3;

  var cylinder2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8}, scene);
  cylinder2.position.y = 5;
  cylinder2.position.x = -2;

  var cylinder3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8}, scene);
  cylinder3.position.y = 5;
  cylinder3.position.x = -1;

  var cylinder4 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8}, scene);
  cylinder4.position.y = 5;
  cylinder4.position.x = 0;

  var cylinder5 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8}, scene);
  cylinder5.position.y = 5;
  cylinder5.position.x = 1;

  var cylinder6 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8}, scene);
  cylinder6.position.y = 5;
  cylinder6.position.x = 2;

  var cylinder7 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8}, scene);
  cylinder7.position.y = 5;
  cylinder7.position.x = 3;

  var cylinder8 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 10, tessellation: 8}, scene);
  cylinder8.position.y = 5;
  cylinder8.position.x = 4;

  let door = Mesh.MergeMeshes([box, box1, cylinder, cylinder1, cylinder2, cylinder3, cylinder4, cylinder5, cylinder6, cylinder7, cylinder8], true, true, undefined, false, true);
  door.material = new StandardMaterial('texture1', scene);
  door.material.diffuseColor = color;
  if (door_type === "force_field") {
    door.material.alpha = 0;
  }

  var barrier = MeshBuilder.CreateBox("barrier", {width: 10, height: 10, depth: 2}, scene);
  barrier.position.y = 5;
  if (door_type === "force_field") {
    barrier.material = new StandardMaterial('texture1', scene);
    barrier.material.diffuseColor = color;
    barrier.material.alpha = 0.6;
  } else {
    var invisibleBarrierMat = new StandardMaterial('texture1', scene);
    invisibleBarrierMat.alpha = 0;
    barrier.material = invisibleBarrierMat;
  }
  barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  barrier.checkCollisions = true;

  barrier_door = Mesh.MergeMeshes([barrier, door], true, true, undefined, false, true);
  barrier_door.position.y = 0;
  barrier_door.position.x = x;
  barrier_door.position.z = z;

  if (special === "right" || special === "left") {
    barrier_door.rotation.y = Math.PI / 2;
  }

  if (door_type === "force_field") {
    global_objects.push({id: barrier_door.uniqueId, forcefield: item_id});
    barrier_door.name = "barrier" + item_id;
  } else {
    barrier_door.name = "door";
    global_objects.push({id: barrier_door.uniqueId, door: item_id});
  }
}

export {generateDoor};
