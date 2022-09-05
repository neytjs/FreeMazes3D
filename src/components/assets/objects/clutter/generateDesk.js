import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnWoodTexture, genCylinderFaceUV} from "../../textures.js";

function generateDesk(x, z, scene) {
  let leg1 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.25, diameterBottom: 0.25, height: 2, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 4, 0.25, 0.25])}, scene);
  leg1.position.y = 1;
  leg1.position.x = -3.5;
  leg1.position.x = -3.5;
  leg1.material = new StandardMaterial('texture1', scene);
  leg1.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let leg2 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.25, diameterBottom: 0.25, height: 2, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 4, 0.25, 0.25])}, scene);
  leg2.position.y = 1;
  leg2.position.x = -2;
  leg2.position.x = -2;
  leg2.material = new StandardMaterial('texture1', scene);
  leg2.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let leg3 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.25, diameterBottom: 0.25, height: 2, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 4, 0.25, 0.25])}, scene);
  leg3.position.y = 1;
  leg3.position.x = -2;
  leg3.position.z = -1.5;
  leg3.material = new StandardMaterial('texture1', scene);
  leg3.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let leg4 = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0.25, diameterBottom: 0.25, height: 2, tessellation: 12, faceUV: genCylinderFaceUV([0.25, 0.25, 1, 4, 0.25, 0.25])}, scene);
  leg4.position.y = 1;
  leg4.position.x = -3.5;
  leg4.position.z = -1.5;
  leg4.material = new StandardMaterial('texture1', scene);
  leg4.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let seat = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 0.25, tessellation: 20, faceUV: genCylinderFaceUV([1.5, 1.5, 4, 0.25, 1.5, 1.5])}, scene);
  seat.position.y = 2;
  seat.position.x = -2.75;
  seat.position.z = -0.75;
  seat.material = new StandardMaterial('texture1', scene);
  seat.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);

  let barrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 3, height: 4, tessellation: 20}, scene);
  barrier.position.y = 2;
  barrier.position.x = -2.75;
  barrier.position.z = -0.75;
  barrier.material = new StandardMaterial('texture1', scene);
  barrier.material.alpha = 0;

  let desk = Mesh.MergeMeshes([leg1, leg2, leg3, leg4, seat, barrier], true, true, undefined, false, true);
  desk.position.x = x;
  desk.position.z = z;
  desk.physicsImpostor = new PhysicsImpostor(barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  desk.checkCollisions = true;
}

export {generateDesk};
