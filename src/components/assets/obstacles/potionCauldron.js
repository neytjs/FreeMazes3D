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
import {Sound} from "@babylonjs/core/Audio";
import {generateMagicPotion} from "../objects/generateMagicPotion.js";
import {potion_colors, cloneAndShuffleMasterColor, cloneAndShufflePotionColors} from "../cauldron_colors.js";
import {returnMetalTexture, returnLiquidTexture, returnWoodTexture,
  genCylinderFaceUV, genCubeFaceUV} from "../textures.js";

function potionCauldron(x, z, scene, global_objects, item_id, camera, global_language) {
  cloneAndShuffleMasterColor();
  cloneAndShufflePotionColors(global_language);

  let pot = MeshBuilder.CreateCylinder("cylinder", {diameterTop: 4, diameterBottom: 2.5, height: 2, tessellation: 8, faceUV: genCylinderFaceUV([1.5, 1.5, 5, 1.25, 1.5, 1.5])}, scene);
  pot.position.y = 2;
  pot.position.x = x;
  pot.position.z = z;
  pot.material = new StandardMaterial('texture1', scene);
  pot.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
  global_objects.push({id: pot.uniqueId, obstacle17_id: item_id, type: "structure", name: ""});

  let rim = MeshBuilder.CreateTorus("torus", {diameter: 4, thickness: 0.4}, scene);
  rim.position.y = 3;
  rim.position.x = x;
  rim.position.z = z;
  rim.material = new StandardMaterial('texture1', scene);
  rim.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
  rim.material.diffuseTexture.uScale = 5;
  rim.material.diffuseTexture.vScale = 1;

  let handle = MeshBuilder.CreateTorus("torus", {diameter: 3.6, thickness: 0.1}, scene);
  handle.position.y = 3;
  handle.position.x = x;
  handle.position.z = z;
  handle.rotation.x = 1.57;
  handle.rotation.z = 1.57;
  handle.material = new StandardMaterial('texture1', scene);
  handle.material.diffuseTexture = returnMetalTexture("iron_dark", scene);
  handle.material.diffuseTexture.uScale = 4.5;
  handle.material.diffuseTexture.vScale = 1;

  let support1 = MeshBuilder.CreateBox("box", {width: 0.5, height: 5, depth: 0.5, wrap: true, faceUV: genCubeFaceUV([0.25, 2.5, 0.25, 2.5, 0.25, 2.5, 0.25, 2.5, 0.25, 0.25, 0.25, 0.25])}, scene);
  support1.position.y = 2.5;
  support1.position.x = x - 3;
  support1.position.z = z;
  support1.material = new StandardMaterial('texture1', scene);
  support1.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let support2 = MeshBuilder.CreateBox("box", {width: 0.5, height: 5, depth: 0.5, wrap: true, faceUV: genCubeFaceUV([0.25, 2.5, 0.25, 2.5, 0.25, 2.5, 0.25, 2.5, 0.25, 0.25, 0.25, 0.25])}, scene);
  support2.position.y = 2.5;
  support2.position.x = x + 3;
  support2.position.z = z;
  support2.material = new StandardMaterial('texture1', scene);
  support2.material.diffuseTexture = returnWoodTexture("wood_brown", scene);

  let rod = MeshBuilder.CreateCylinder("cylinder", {diameter: 0.1, height: 7, tessellation: 8, faceUV: genCylinderFaceUV([0.1, 0.1, 0.2, 7, 0.1, 0.1])}, scene);
  rod.position.y = 4.7;
  rod.rotation.z = 1.57;
  rod.position.x = x;
  rod.position.z = z;
  rod.material = new StandardMaterial('texture1', scene);
  rod.material.diffuseTexture = returnMetalTexture("iron_medium", scene);

  let liquid = MeshBuilder.CreateCylinder("cylinder", {diameter: 4, height: 0.1, tessellation: 20}, scene);
  liquid.position.y = 3;
  liquid.position.x = x;
  liquid.position.z = z;
  liquid.material = new StandardMaterial('texture1', scene);
  liquid.material.diffuseTexture = returnLiquidTexture("acid_default", scene);
  liquid.name = "cauldronLiquidOb17";

  let particleSystem = new ParticleSystem("cauldronParticles", 2000);
  particleSystem.particleTexture = new Texture("./imgs/circle_light.png");
  particleSystem.emitter = liquid;
  particleSystem.addColorGradient(0, new Color3(0.67, 0.7, 0.65));
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.5;
  particleSystem.start();

  let cauldronBarrier = MeshBuilder.CreateBox("box", {width: 6, height: 10, depth: 4.5}, scene);
  cauldronBarrier.position.y = 5;
  cauldronBarrier.position.x = x;
  cauldronBarrier.position.z = z;
  cauldronBarrier.material = new StandardMaterial('texture1', scene);
  cauldronBarrier.material.alpha = 0;
  cauldronBarrier.physicsImpostor = new PhysicsImpostor(cauldronBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
  cauldronBarrier.checkCollisions = true;
  cauldronBarrier.name = "cauldronOb17";

  let cauldronLiquidSound = new Sound("cauldronLiquidSound", "./sound/LavaLoop.mp3", scene, null, { loop: true, autoplay: true, volume: 0.50, maxDistance: 50 });
  cauldronLiquidSound.attachToMesh(cauldronBarrier);

  generateMagicPotion((x - 20), (z - 20), potion_colors[0], global_objects, scene, global_language);
  generateMagicPotion((x + 20), (z + 20), potion_colors[1], global_objects, scene, global_language);
  generateMagicPotion((x + 20), (z - 20), potion_colors[2], global_objects, scene, global_language);
  generateMagicPotion((x - 20), (z + 20), potion_colors[3], global_objects, scene, global_language);
}

export {potionCauldron};
