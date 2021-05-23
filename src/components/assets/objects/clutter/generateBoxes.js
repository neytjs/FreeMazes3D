import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";

function generateBoxes(x, z, scene) {
  let box1 = MeshBuilder.CreateBox("box", {width: 3, height: 2, depth: 2}, scene);
  box1.position.y = 1;
  box1.position.x = 2;
  box1.rotation.y = Math.PI / 1.5;

  let box2 = MeshBuilder.CreateBox("box", {width: 2, height: 1, depth: 2}, scene);
  box2.position.y = 0.5;
  box2.position.x = -3;
  box2.rotation.y = Math.PI / 3;

  let box3 = MeshBuilder.CreateBox("box", {width: 2, height: 1, depth: 2}, scene);
  box3.position.y = 0.5;
  box3.position.x = -1;
  box3.position.z = -3;

  let boxes = Mesh.MergeMeshes([box1, box2, box3], true, true, undefined, false, true);
  boxes.position.x = x;
  boxes.position.z = z;
  boxes.material = new StandardMaterial('texture1', scene);
  boxes.material.diffuseColor = new Color3(0.23, 0.19, 0.05);
}

export {generateBoxes};
