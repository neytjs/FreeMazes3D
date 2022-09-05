import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {returnMetalTexture, returnWoodTexture, returnLiquidTexture,
  genCylinderFaceUV} from "../textures.js";

function generateBucket(scene, x, z, y, global_objects, obj_type, obj_name, global_language) {
  let bucket_texture = {};
  switch (obj_name) {
    case "holy_water":
      bucket_texture = "wood_darkbrown";
    break;
    case "water_pail":
      bucket_texture = "iron";
    break;
  }

  let waterBucket = MeshBuilder.CreateCylinder("cylinder", {diameter: 1, height: 1, tessellation: 20}, scene);
  waterBucket.position.y = 3;
  waterBucket.material = new StandardMaterial('texture1', scene);
  if (obj_name === "holy_water") {
    waterBucket.material.diffuseTexture = returnWoodTexture(bucket_texture, scene);
  }
  if (obj_name === "water_pail") {
    waterBucket.material.diffuseTexture = returnMetalTexture(bucket_texture, scene);
  }

  let waterBucketRim = MeshBuilder.CreateTorus("torus", {diameter: 1, thickness: 0.1});
  waterBucketRim.position.y = 3.5;
  waterBucketRim.material = new StandardMaterial('texture1', scene);
  if (obj_name === "holy_water") {
    waterBucketRim.material.diffuseTexture = returnWoodTexture(bucket_texture, scene);
  }
  if (obj_name === "water_pail") {
    waterBucketRim.material.diffuseTexture = returnMetalTexture(bucket_texture, scene);
  }
  waterBucketRim.material.diffuseTexture.uScale = 1.5;
  waterBucketRim.material.diffuseTexture.vScale = 1;

  let waterBucketTop = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.95, height: 0.025, tessellation: 20}, scene);
  waterBucketTop.position.y = 3.5;
  waterBucketTop.material = new StandardMaterial('texture1', scene);
  waterBucketTop.material.diffuseTexture = returnLiquidTexture("water", scene);

  let waterBucketBarrier = MeshBuilder.CreateBox("box", {width: 2, height: 10, depth: 2}, scene);
  waterBucketBarrier.position.y = 5;
  waterBucketBarrier.material = new StandardMaterial('texture1', scene);
  waterBucketBarrier.material.alpha = 0;

  let bucket = Mesh.MergeMeshes([waterBucket, waterBucketRim, waterBucketTop, waterBucketBarrier], true, true, undefined, false, true);
  bucket.position.x = x;
  bucket.position.z = z;
  bucket.position.y = y;
  bucket.physicsImpostor = new PhysicsImpostor(waterBucketBarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  bucket.checkCollisions = true;
  global_objects.push({id: bucket.uniqueId, type: obj_type, name: obj_name, inventory: global_language, img: obj_name});

  let axis = new Vector3(0, 6, 0);
  let angle = 0.03;
  scene.registerAfterRender(function () {
    bucket.rotate(axis, angle, 1);
  });
}

export {generateBucket};
