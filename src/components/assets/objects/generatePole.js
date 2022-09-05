import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, genCylinderFaceUV} from "../textures.js";

function generatePole(x, y, z, bulb_name, bulb_color, scene) {
  let pole = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.25, height: 4, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 1, 4, 0.1, 0.1])}, scene);
  pole.position.y = y + 2;
  pole.position.x = x;
  pole.position.z = z;
  pole.material = new StandardMaterial('texture1', scene);
  pole.material.diffuseTexture = returnMetalTexture("iron_dark", scene);

  let bulb = Mesh.CreateSphere("sphere", 8, 1, scene);
  bulb.position.y = y + 4;
  bulb.position.x = x;
  bulb.position.z = z;
  bulb.material = new StandardMaterial('texture1', scene);
  bulb.material.diffuseColor = bulb_color;
  bulb.material.specularColor = bulb_color;
  bulb.material.emissiveColor = bulb_color;
  bulb.material.ambientColor = bulb_color;
  bulb.name = bulb_name;
}

export {generatePole};
