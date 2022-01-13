import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, returnLiquidTexture} from "../textures.js";

function generateForceField(x, z, scene, global_objects, item_id, special) {
  let cylinder1 = MeshBuilder.CreateBox("box", {width: 0.5, height: 10, depth: 0.5, wrap: true}, scene);
  cylinder1.position.y = 5;
  cylinder1.position.x = -4.75;

  let cylinder2 = MeshBuilder.CreateBox("box", {width: 0.5, height: 10, depth: 0.5, wrap: true}, scene);
  cylinder2.position.y = 5;
  cylinder2.position.x = 4.75;

  let door = Mesh.MergeMeshes([cylinder1, cylinder2], true, true, undefined, false, true);
  door.material = new StandardMaterial('texture1', scene);
  door.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let barrier = MeshBuilder.CreateBox("forcefield", {width: 9, height: 10, depth: 0.5}, scene);
  barrier.position.y = 5;
  barrier.material = new StandardMaterial('texture1', scene);
  barrier.material.diffuseTexture = returnLiquidTexture("acid_red", scene);
  barrier.material.alpha = 0.9;
  barrier.material.alphaMode = 1;
  barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  barrier.checkCollisions = true;

  let barrier_door = Mesh.MergeMeshes([barrier, door], true, true, undefined, false, true);
  barrier_door.position.y = 0;
  barrier_door.position.x = x;
  barrier_door.position.z = z;

  if (special === "right" || special === "left") {
    barrier_door.rotation.y = Math.PI / 2;
  }

  global_objects.push({id: barrier_door.uniqueId, forcefield: item_id});
  barrier_door.name = "barrier" + item_id;
}

export {generateForceField};
