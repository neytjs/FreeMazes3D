import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Color4, Vector3, Vector4, Matrix, Space} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {ParticleSystem} from "@babylonjs/core/Particles";
import {returnStoneTexture, returnCrystalTexture, returnWoodTexture} from "../textures.js";

function generatePortal(portal_type, x, z, scene, global_objects, item_id, special) {
  let exit, powered;
  let portal_pieces = [];
  switch (portal_type) {
    case "start_portal":
      exit = false;
      powered = false;
    break;
    case "exit_portal_unpowered":
      exit = true;
      powered = false;
    break;
    case "exit_portal_powered":
      exit = true;
      powered = true;
    break;
  }

  let top = MeshBuilder.CreateCylinder("cylinder", {diameter: 7, height: 0.75, tessellation: 8}, scene);
  top.position.y = 7;
  top.material = new StandardMaterial('texture1', scene);
  top.material.diffuseTexture = returnWoodTexture("wood_darkbrown", scene);
  portal_pieces.push(top);

  let bottom = MeshBuilder.CreateCylinder("cylinder", {diameter: 7, height: 0.5, tessellation: 8}, scene);
  bottom.position.y = 0.25;
  bottom.material = new StandardMaterial('texture1', scene);
  bottom.material.diffuseTexture = returnStoneTexture("stone_dark", scene);
  portal_pieces.push(bottom);

  let column = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 7, tessellation: 8}, scene);
  column.position.y = 3.5;
  column.position.x = 2;
  column.position.z = 2;
  column.material = new StandardMaterial('texture1', scene);
  column.material.diffuseTexture = returnWoodTexture("wood_brown", scene);
  column.material.diffuseTexture.uScale = 2;
  column.material.diffuseTexture.vScale = 2;
  portal_pieces.push(column);

  let cbarrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 7, tessellation: 8}, scene);
  cbarrier.position.y = 3.5;
  cbarrier.position.x = x + 2;
  cbarrier.position.z = z + 2;
  cbarrier.material = new StandardMaterial('texture1', scene);
  cbarrier.physicsImpostor = new PhysicsImpostor(cbarrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  cbarrier.checkCollisions = true;

  let column1 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 7, tessellation: 8}, scene);
  column1.position.y = 3.5;
  column1.position.x = -2;
  column1.position.z = -2;
  column1.material = new StandardMaterial('texture1', scene);
  column1.material.diffuseTexture = returnWoodTexture("wood_brown", scene);
  column1.material.diffuseTexture.uScale = 2;
  column1.material.diffuseTexture.vScale = 2;
  portal_pieces.push(column1);

  let c1barrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 7, tessellation: 8}, scene);
  c1barrier.position.y = 3.5;
  c1barrier.position.x = x - 2;
  c1barrier.position.z = z - 2;
  c1barrier.material = new StandardMaterial('texture1', scene);
  c1barrier.physicsImpostor = new PhysicsImpostor(c1barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  c1barrier.checkCollisions = true;

  let column2 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 7, tessellation: 8}, scene);
  column2.position.y = 3.5;
  column2.position.x = -2;
  column2.position.z = 2;
  column2.material = new StandardMaterial('texture1', scene);
  column2.material.diffuseTexture = returnWoodTexture("wood_brown", scene);
  column2.material.diffuseTexture.uScale = 2;
  column2.material.diffuseTexture.vScale = 2;
  portal_pieces.push(column2);

  let c2barrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 7, tessellation: 8}, scene);
  c2barrier.position.y = 3.5;
  c2barrier.position.x = x - 2;
  c2barrier.position.z = z + 2;
  c2barrier.material = new StandardMaterial('texture1', scene);
  c2barrier.physicsImpostor = new PhysicsImpostor(c2barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  c2barrier.checkCollisions = true;

  let column3 = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.75, height: 7, tessellation: 8}, scene);
  column3.position.y = 3.5;
  column3.position.x = 2;
  column3.position.z = -2;
  column3.material = new StandardMaterial('texture1', scene);
  column3.material.diffuseTexture = returnWoodTexture("wood_brown", scene);
  column3.material.diffuseTexture.uScale = 2;
  column3.material.diffuseTexture.vScale = 2;
  portal_pieces.push(column3);

  let c3barrier = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.3, height: 7, tessellation: 8}, scene);
  c3barrier.position.y = 3.5;
  c3barrier.position.x = x + 2;
  c3barrier.position.z = z - 2;
  c3barrier.material = new StandardMaterial('texture1', scene);
  c3barrier.physicsImpostor = new PhysicsImpostor(c3barrier, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  c3barrier.checkCollisions = true;

  let teleporter = {};
  if (exit) {
    teleporter = MeshBuilder.CreateCylinder("cylinder", {diameter: 5, height: 6.5, tessellation: 8}, scene);
    teleporter.position.y = 3.25;
    teleporter.position.x = x;
    teleporter.position.z = z;
    let teleporterMat = new StandardMaterial('texture1', scene);
    teleporterMat.alpha = 0;
    teleporter.material = teleporterMat;
    teleporter.physicsImpostor = new PhysicsImpostor(teleporter, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    teleporter.checkCollisions = true;
  }

  let portal = Mesh.MergeMeshes(portal_pieces, true, true, undefined, false, true);
  portal.position.y = 0;
  portal.position.x = x;
  portal.position.z = z;

  if (exit === true && powered === false) {
    teleporter.name = "teleporter_unpowered_barrier";
    portal.name = "teleporter_unpowered";
  }

  if (exit === true && powered === true) {
    teleporter.name = "teleporter_powered_barrier";
    portal.name = "teleporter_powered";
    portal.position.y = -1000;
    teleporter.position.y = -1000;
    var particleSystem = new ParticleSystem("particles", 3000, scene);

    particleSystem.particleTexture = new Texture("./imgs/circle.png", scene);

    let pyramid = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0, diameter: 1, height: 1, tessellation: 4}, scene);
    pyramid.position.y = 4;

    let pyramid2 = MeshBuilder.CreateCylinder("cylinder", {diameterBottom: 0, diameter: 1, height: 1, tessellation: 4}, scene);
    pyramid2.position.y = 3;

    let gem = Mesh.MergeMeshes([pyramid, pyramid2], true, true, undefined, false, true);
    gem.position.y = -1000;
    gem.position.x = x;
    gem.position.z = z;
    gem.material = new StandardMaterial('texture1', scene);
    gem.material.diffuseTexture = returnCrystalTexture("gem_pink", scene);
    gem.name = "exitGem";

    let axis = new Vector3(0, 6, 0);
    let angle = 0.05;
    scene.registerAfterRender(function () {
      gem.rotate(axis, angle, 1);
    });

    let sphere = Mesh.CreateSphere("sphere", 8, 0.01, scene);
    sphere.position.y = -1000;
    sphere.position.x = x;
    sphere.position.z = z;
    sphere.name = "exitSphere";

    particleSystem.emitter = sphere;

    particleSystem.addColorGradient(0, new Color4(0.01, 0.04, 0.45));
    particleSystem.addColorGradient(1, new Color4(0.33, 0.04, 0.33));

    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    particleSystem.emitRate = 3000;

    particleSystem.createSphereEmitter(2);

    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;

    particleSystem.start();
  }

  if (exit) {
    global_objects.push({id: portal.uniqueId});
  }
}

export {generatePortal};
