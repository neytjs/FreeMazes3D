import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {returnCrystalTexture} from '../textures.js';

function generateGem(gem_type, x, z, scene, global_objects, item_id, special) {
  let inventory = "";
  let img = "";
  let texture = "";
  switch (gem_type) {
    case "portal_gem":
      inventory = "Portal Gem";
      img = "portal_gem";
      texture = "gem_pink";
    break;
  }

  let pyramid = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 1, height: 1, tessellation: 4}, scene);
  pyramid.position.y = 4;
  pyramid.material = new StandardMaterial('texture1', scene);
  pyramid.material.diffuseTexture = returnCrystalTexture(texture, scene);

  let pyramid2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 1, height: 1, tessellation: 4}, scene);
  pyramid2.position.y = 3;
  pyramid2.material = new StandardMaterial('texture1', scene);
  pyramid2.material.diffuseTexture = returnCrystalTexture(texture, scene);

  let gem_barrier = MeshBuilder.CreateBox("barrier", {width: 2.5, height: 10, depth: 2.5}, scene);
  gem_barrier.position.y = 5;
  gem_barrier.material = new StandardMaterial('texture1', scene);
  gem_barrier.material.alpha = 0;

  let gem = Mesh.MergeMeshes([pyramid, pyramid2, gem_barrier], true, true, undefined, false, true);
  gem.position.x = x;
  gem.position.z = z;
  gem.physicsImpostor = new PhysicsImpostor(gem_barrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  gem.checkCollisions = true;

  let axis = new Vector3(0, 6, 0);
  let angle = 0.05;
  scene.registerAfterRender(function () {
    gem.rotate(axis, angle, 1);
  });

  global_objects.push({id: gem.uniqueId, inventory: inventory, img: img});
}

export {generateGem};
