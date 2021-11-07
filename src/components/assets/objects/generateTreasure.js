import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {returnMetalTexture, returnCrystalTexture} from "../textures.js";

function generateTreasure(treasure_type, x, z, scene, global_objects, item_id, special) {
  let ring_texture = "";
  let gem_texture = "";
  let rand = Math.floor(Math.random() * 2);
  let possible_textures = [];
  let score = 0;
  switch (treasure_type) {
    case "silver":
      ring_texture = "silver";
      possible_textures = [
        "gem_blue",
        "gem_darkpurple"
      ];
      gem_texture = possible_textures[rand];
      score = 75;
    break;
    case "gold":
      ring_texture = "gold";
      possible_textures = [
        "gem_darkgreen",
        "gem_darkred"
      ];
      gem_texture = possible_textures[rand];
      score = 100;
    break;
  }

  let torus = MeshBuilder.CreateTorus("torus", {diameter: 1.25, thickness: 0.25});
  torus.position.y = 3.5;
  torus.rotation.x = Math.PI / 2;
  torus.material = new StandardMaterial('texture1', scene);
  torus.material.diffuseTexture = returnMetalTexture(ring_texture, scene);

  let pyramid = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 0.4, height: 0.4, tessellation: 4}, scene);
  pyramid.position.y = 4.6;
  pyramid.material = new StandardMaterial('texture1', scene);
  pyramid.material.diffuseTexture = returnCrystalTexture(gem_texture, scene);

  let pyramid2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 0.4, height: 0.4, tessellation: 4}, scene);
  pyramid2.position.y = 4.2;
  pyramid2.material = new StandardMaterial('texture1', scene);
  pyramid2.material.diffuseTexture = returnCrystalTexture(gem_texture, scene);

  let treasure_barrier = MeshBuilder.CreateBox("barrier", {width: 2.5, height: 10, depth: 2.5}, scene);
  treasure_barrier.position.y = 5;
  treasure_barrier.material = new StandardMaterial('texture1', scene);
  treasure_barrier.material.alpha = 0;

  let treasure = Mesh.MergeMeshes([torus, pyramid, pyramid2, treasure_barrier], true, true, undefined, false, true);
  treasure.position.x = x;
  treasure.position.z = z;
  treasure.physicsImpostor = new PhysicsImpostor(treasure_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  treasure.checkCollisions = true;

  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    treasure.rotate(axis, angle, 1);
  });

  global_objects.push({id: treasure.uniqueId, score: score});
}

export {generateTreasure};
