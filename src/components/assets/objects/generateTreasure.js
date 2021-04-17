import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";

function generateTreasure(treasure_type, x, z, scene, global_objects, item_id, special) {
  let ring_color = {};
  let gem_color = {};
  let rand = Math.floor(Math.random() * 2);
  let possible_colors = [];
  let score = 0;
  switch (treasure_type) {
    case "silver":
      ring_color = new Color3(0.73, 0.73, 0.72);
      possible_colors = [
        new Color3(0, 0, 1),
        new Color3(0.55, 0, 1)
      ];
      gem_color = possible_colors[rand];
      score = 75;
    break;
    case "gold":
      ring_color = new Color3(0.87, 0.83, 0.21);
      possible_colors = [
        new Color3(0.19, 0.71, 0.12),
        new Color3(1, 0, 0)
      ];
      gem_color = possible_colors[rand];
      score = 100;
    break;
  }

  let torus = MeshBuilder.CreateTorus("torus", {diameter: 1.25, thickness: 0.25});
  torus.position.y = 3.5;
  torus.rotation.x = Math.PI / 2;
  torus.material = new StandardMaterial('texture1', scene);
  torus.material.diffuseColor = ring_color;

  let pyramid = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 0.4, height: 0.4, tessellation: 4}, scene);
  pyramid.position.y = 4.6;
  pyramid.material = new StandardMaterial('texture1', scene);
  pyramid.material.diffuseColor = gem_color;

  let pyramid2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 0.4, height: 0.4, tessellation: 4}, scene);
  pyramid2.position.y = 4.2;
  pyramid2.material = new StandardMaterial('texture1', scene);
  pyramid2.material.diffuseColor = gem_color;

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
