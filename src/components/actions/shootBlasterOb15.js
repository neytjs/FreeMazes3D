import "@babylonjs/core/Physics/physicsEngineComponent";
import {PhysicsImpostor} from "@babylonjs/core/Physics";
import {DefaultCollisionCoordinator} from "@babylonjs/core/Collisions";
import {Color3, Vector3} from "@babylonjs/core/Maths/math";
import {MeshBuilder} from "@babylonjs/core/Meshes";
import {Mesh} from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial} from "@babylonjs/core/Materials";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {Ray} from "@babylonjs/core/Culling";
import {ParticleSystem} from "@babylonjs/core/Particles";
import {Sound} from "@babylonjs/core/Audio";
import {playSound} from "../assets/playSound.js";
import {returnCrystalTexture} from "../assets/textures.js";

function shootBlasterOb15(scene, camera, player, ob15) {
  if (player.shooting && player.holding === "blasterOb15") {
    playSound("tir", 1000, scene);
    let blast = scene.getMeshByName("blastOb15");
    blast.material.alpha = 1;
    setTimeout(() => {
      blast.material.alpha = 0;
    }, 200);
    let blaster = scene.getMeshByName("blasterOb15");
    let sign = scene.getMeshByName("signOb15");
    let can = scene.getMeshByName("canOb15");
    let t1b = scene.getMeshByName("target1barrier");
    let t2b = scene.getMeshByName("target2barrier");
    let t3b = scene.getMeshByName("target3barrier");
    let t4b = scene.getMeshByName("target4barrier");
    let laser = Mesh.CreateSphere("sphere", 1, 0.2, scene);
    let startPos = camera.position;
    laser.position = new Vector3(startPos.x, startPos.y - 0.5, startPos.z);
    laser.material = new StandardMaterial('texture1', scene);
    laser.material.diffuseColor = new Color3(1, 0, 0);
    laser.material.alpha = 0;

    let forward = new Vector3(0, 0, 1);
    let direction = blaster.getDirection(forward);
    direction.normalize();

    let casting = true;
    let starting_distance = [];

    function castRay() {
      let origin = laser.position;

      let length = 80;
      let ray = new Ray(origin, direction, length);

      function predicate(mesh) {
        if (mesh === laser || mesh === blaster || mesh === can || mesh === sign || mesh === t1b || mesh === t2b || mesh === t3b || mesh === t4b) {
          return false;
        }
        return true;
      }

      let hit = scene.pickWithRay(ray, predicate);
      if (starting_distance.length === 0) {
        starting_distance.push(hit.distance);
      }

      if (hit && hit.distance < 1 && starting_distance[0] > 0) {
        if (hit.pickedMesh) {
        // place impact sound
          let impact = new Sound("impactSound", "./sound/8bit_bomb_explosion.wav", scene, null, { loop: false, autoplay: true, volume: 1.1, spatialSound: true, maxDistance: 70 });
          impact.setPosition(hit.pickedPoint);
        // remove it shortly after
          setTimeout(() => {
            impact.detachFromMesh(hit.pickedMesh);
            impact.dispose(true, true);
            impact = null;
          }, 1000);

          if (camera.position.y >= 6) {
            let bullseye1 = scene.getMeshByName("bullseye1");
            let bullseye2 = scene.getMeshByName("bullseye2");
            let bullseye3 = scene.getMeshByName("bullseye3");
            let bullseye4 = scene.getMeshByName("bullseye4");
            let hitB1 = ray.intersectsMeshes([bullseye1]);
            let hitB2 = ray.intersectsMeshes([bullseye2]);
            let hitB3 = ray.intersectsMeshes([bullseye3]);
            let hitB4 = ray.intersectsMeshes([bullseye4]);

            if (hitB1.length && ob15.bullseye1 === false) {
              let bullseye = scene.getMeshByName("bullseye1");
              bullseye.material.diffuseTexture = returnCrystalTexture("gem_red", scene);
              ob15.bullseye1 = true;
              setTimeout(() => {
                playSound("positive", 2000, scene);
              }, 500);
            }
            if (hitB2.length && ob15.bullseye2 === false) {
              let bullseye = scene.getMeshByName("bullseye2");
              bullseye.material.diffuseTexture = returnCrystalTexture("gem_red", scene);
              ob15.bullseye2 = true;
              setTimeout(() => {
                playSound("positive", 2000, scene);
              }, 500);
            }
            if (hitB3.length && ob15.bullseye3 === false) {
              let bullseye = scene.getMeshByName("bullseye3");
              bullseye.material.diffuseTexture = returnCrystalTexture("gem_red", scene);
              ob15.bullseye3 = true;
              setTimeout(() => {
                playSound("positive", 2000, scene);
              }, 500);
            }
            if (hitB4.length && ob15.bullseye4 === false) {
              let bullseye = scene.getMeshByName("bullseye4");
              bullseye.material.diffuseTexture = returnCrystalTexture("gem_red", scene);
              ob15.bullseye4 = true;
              setTimeout(() => {
                playSound("positive", 2000, scene);
              }, 500);
            }
          }

          let particleSystem = new ParticleSystem("gunSmoke", 2000);
          particleSystem.particleTexture = new Texture("./imgs/circle_light.png");
          particleSystem.emitter = laser;
          particleSystem.addColorGradient(0, new Color3(0.64, 0.3, 0.02));
          particleSystem.manualEmitCount = 50;
          particleSystem.createSphereEmitter(0.7);
          particleSystem.updateSpeed = 0.05;
          particleSystem.minSize = 0.1;
          particleSystem.maxSize = 0.5;
          particleSystem.start();
          setTimeout(() => {
            laser.dispose(true, true);
            laser = null;
            particleSystem.dispose(true, true);
            particleSystem = null;
          }, 750);

          casting = false;
          starting_distance = [];

          if (ob15.bullseye1 && ob15.bullseye2 && ob15.bullseye3 && ob15.bullseye4) {
            ob15.remove = true;
          }
        }
      }
      if (laser && Vector3.Distance(camera.position, laser.position) > length) {
        laser.dispose(true, true);
        laser = null;
        starting_distance = [];
      }
    }
    scene.registerBeforeRender(function () {
      if (casting) {
        if (laser) {
          laser.position.addInPlace(direction.scale(1.25));
          castRay();
        }
      }
    });

    player.shooting = false;
  }
}

export {shootBlasterOb15};
