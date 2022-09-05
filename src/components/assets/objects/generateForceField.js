import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, returnLiquidTexture, genCubeFaceUV} from "../textures.js";

function generateForceField(x, z, scene, global_objects, item_id, special) {
  let frame1 = MeshBuilder.CreateBox("box", {width: 0.5, height: 10, depth: 0.5, wrap: true, faceUV: genCubeFaceUV([0.25, 5, 0.25, 5, 0.25, 5, 0.25, 5, 0.25, 0.25, 0.25, 0.25])}, scene);
  frame1.position.y = 5;
  frame1.position.x = -4.75;

  let frame2 = MeshBuilder.CreateBox("box", {width: 0.5, height: 10, depth: 0.5, wrap: true, faceUV: genCubeFaceUV([0.25, 5, 0.25, 5, 0.25, 5, 0.25, 5, 0.25, 0.25, 0.25, 0.25])}, scene);
  frame2.position.y = 5;
  frame2.position.x = 4.75;

  let door = Mesh.MergeMeshes([frame1, frame2], true, true, undefined, false, true);
  door.position.x = x;
  door.position.z = z;
  door.material = new StandardMaterial('texture1', scene);
  door.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let barrier = MeshBuilder.CreateBox("forcefield", {width: 9, height: 10, depth: 0.5}, scene);
  barrier.position.y = 5;
  barrier.position.x = x;
  barrier.position.z = z;
  barrier.material = new StandardMaterial('texture1', scene);
  barrier.material.diffuseTexture = returnLiquidTexture("acid_red", scene);
  barrier.material.alpha = 0.95;
  barrier.material.alphaMode = 1;

  if (special === "right" || special === "left") {  
    barrier.rotation.y = Math.PI / 2;
    door.rotation.y = Math.PI / 2;
  }

  barrier.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  barrier.checkCollisions = true;

  global_objects.push({id: barrier.uniqueId, forcefield: item_id});
  barrier.name = "barrier" + item_id;
}

export {generateForceField};
