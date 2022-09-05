import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnWoodTexture, genCubeFaceUV} from "../textures.js";

function generateSign(x, z, name, scene) {
  let sign1 = MeshBuilder.CreateBox("box", {width: 2, height: 2, depth: 0.25, faceUV: genCubeFaceUV([1, 1, 1, 1, 1, 0.125, 1, 0.125, 0.125, 1, 0.125, 1])}, scene);
  sign1.position.y = 4;
  sign1.material = new StandardMaterial('texture1', scene);
  sign1.material.diffuseTexture = returnWoodTexture("wood_lightbrown", scene);

  let sign2 = MeshBuilder.CreateBox("box", {width: 0.25, height: 4, depth: 0.25, faceUV: genCubeFaceUV([0.125, 2, 0.125, 2, 2, 0.125, 2, 0.125, 0.125, 0.125, 0.125, 0.125])}, scene);
  sign2.position.y = 1;
  sign2.material = new StandardMaterial('texture1', scene);
  sign2.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let signBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 5, depth: 2}, scene);
  signBarrier.position.y = 2.5;
  signBarrier.material = new StandardMaterial('texture1', scene);
  signBarrier.material.alpha = 0;

  let sign = Mesh.MergeMeshes([sign1, sign2, signBarrier], true, true, undefined, false, true);
  sign.position.x = x;
  sign.position.z = z;
  sign.rotation.y = -0.785;
  sign.physicsImpostor = new PhysicsImpostor(signBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  sign.checkCollisions = true;
  sign.name = name;
}

export {generateSign};
