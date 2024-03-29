import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {returnMetalTexture, genCylinderFaceUV} from "../textures.js";

function generateKey(key_type, x, z, scene, global_objects, item_id, special, global_language) {
  let inventory = "";
  let img = "";
  let texture = {};
  switch (key_type) {
    case "copper":
      inventory = global_language.text.items.keys.copper_key;
      img = "copper_key";
      texture = "copper";
    break;
    case "silver":
      inventory = global_language.text.items.keys.silver_key;
      img = "silver_key";
      texture = "silver";
    break;
    case "gold":
      inventory = global_language.text.items.keys.gold_key;
      img = "gold_key";
      texture = "gold";
    break;
  }

  let torus = MeshBuilder.CreateTorus("torus", {});
  torus.position.y = 3.5;
  torus.rotation.x = Math.PI / 2;
  torus.material = new StandardMaterial('texture1', scene);
  torus.material.diffuseTexture = returnMetalTexture(texture, scene);
  torus.material.diffuseTexture.uScale = 1.5;
  torus.material.diffuseTexture.vScale = 1;

  let cylinder = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 2, tessellation: 8, faceUV: genCylinderFaceUV([0, 0, 1, 3, 0, 0])}, scene);
  cylinder.position.y = 3.5;
  cylinder.position.x = 1.5;
  cylinder.rotation.z = Math.PI / 2;
  cylinder.material = new StandardMaterial('texture1', scene);
  cylinder.material.diffuseTexture = returnMetalTexture(texture, scene);

  let cylinder1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 1, tessellation: 8, faceUV: genCylinderFaceUV([0, 0, 1.5, 1, 0, 0])}, scene);
  cylinder1.position.y = 3;
  cylinder1.position.x = 2.25;
  cylinder1.material = new StandardMaterial('texture1', scene);
  cylinder1.material.diffuseTexture = returnMetalTexture(texture, scene);

  let cylinder2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.5, height: 0.75, tessellation: 8, faceUV: genCylinderFaceUV([0, 0, 1.25, 1, 0, 0])}, scene);
  cylinder2.position.y = 3.1;
  cylinder2.position.x = 1.5;
  cylinder2.material = new StandardMaterial('texture1', scene);
  cylinder2.material.diffuseTexture = returnMetalTexture(texture, scene);

  let sphere = MeshBuilder.CreateSphere("sphere", {diameter: 0.5, segments: 8}, scene);
  sphere.position.y = 3.5;
  sphere.position.x = 2.45;
  sphere.material = new StandardMaterial('texture1', scene);
  sphere.material.diffuseTexture = returnMetalTexture(texture, scene);

  let sphere1 = MeshBuilder.CreateSphere("sphere", {diameter: 0.49, segments: 8}, scene);
  sphere1.position.y = 2.75;
  sphere1.position.x = 1.5;
  sphere1.material = new StandardMaterial('texture1', scene);
  sphere1.material.diffuseTexture = returnMetalTexture(texture, scene);

  let sphere2 = MeshBuilder.CreateSphere("sphere", {diameter: 0.49, segments: 8}, scene);
  sphere2.position.y = 2.5;
  sphere2.position.x = 2.25;
  sphere2.material = new StandardMaterial('texture1', scene);
  sphere2.material.diffuseTexture = returnMetalTexture(texture, scene);

  let key_barrier = MeshBuilder.CreateBox("barrier", {width: 5, height: 10, depth: 3}, scene);
  key_barrier.position.y = 5;
  key_barrier.position.x = 1;
  key_barrier.material = new StandardMaterial('texture1', scene);
  key_barrier.material.alpha = 0;

  let key = Mesh.MergeMeshes([torus, cylinder, cylinder1, cylinder2, sphere, sphere1, sphere2, key_barrier], true, true, undefined, false, true);
  key.position.x = x;
  key.position.z = z;
  key.physicsImpostor = new PhysicsImpostor(key_barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  key.checkCollisions = true;
  global_objects.push({id: key.uniqueId, key: item_id, inventory: inventory, img: img});

  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    key.rotate(axis, angle, 1);
  });
}

export {generateKey};
