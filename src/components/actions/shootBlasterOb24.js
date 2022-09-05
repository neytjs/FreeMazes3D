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

function shootBlasterOb24(scene, camera, player, ob24) {
  if (player.shooting && player.holding === "blasterOb24") {
    playSound("tir", 1000, scene);
    let blast = scene.getMeshByName("blastOb24");
    blast.material.alpha = 1;
    setTimeout(() => {
      blast.material.alpha = 0;
    }, 200);
    let blaster = scene.getMeshByName("blasterOb24");
    let laser = Mesh.CreateSphere("sphere", 1, 0.2, scene);
    let warningSoundSourceOb24 = scene.getMeshByName("warningSoundSourceOb24");
    let startPos = camera.position;
    laser.position = new Vector3(startPos.x, startPos.y - 0.5, startPos.z);
    laser.material = new StandardMaterial('texture1', scene);
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
        if (mesh === laser || mesh === blaster || mesh === warningSoundSourceOb24) {
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

          let bigButtonOb24_a = scene.getMeshByName("bigButtonOb24_a");
          let bigButtonOb24_b = scene.getMeshByName("bigButtonOb24_b");
          let hitYellow = ray.intersectsMeshes([bigButtonOb24_a]);
          let hitRed = ray.intersectsMeshes([bigButtonOb24_b]);

          if (hitYellow.length || hitRed.length) {
            let testBulbStatus = () => {
              const max = ob24.max_lava;
              let resetValues = () => {
                ob24.current_lava = max;
                ob24.liquid_status = "raising";
                ob24.raise_doors = true;
                ob24.alarm = true;
                ob24.bulb_colors = [];
                ob24.hit_counter = 0;
              }
              if (ob24.bulb_colors[0] === "red") {
                resetValues();
              }
              if (ob24.bulb_colors.length > 2) {
                if (ob24.bulb_colors[0] === "yellow" && ob24.bulb_colors[1] === "yellow" && ob24.bulb_colors[2] === "yellow") {
                  resetValues();
                }
              }
              if (ob24.bulb_colors.length === 4) {
                if ((ob24.bulb_colors[1] === "red" && ob24.bulb_colors[2] === "red") || (ob24.bulb_colors[2] === "red" && ob24.bulb_colors[3] === "red") || (ob24.bulb_colors[1] === "red" && ob24.bulb_colors[3] === "red")) {
                  resetValues();
                }
              }
            }

            if (hitYellow.length && ob24.hit_counter < 4 && ob24.adjusting_liquid_level === false && ob24.alarm === false) {
              let bigButtonOb24_aGlow = scene.getMeshByName("bigButtonOb24_aGlow");
              bigButtonOb24_aGlow.position.y = 2027.5;
              ob24.hit_counter += 1;
              ob24.liquid_status = "lowering";
              ob24.adjusting_liquid_level = true;
              ob24.current_lava -= 9;
              ob24.bulb_colors.push("yellow");
              playSound("mouseclick", 2000, scene);
              let bulb = scene.getMeshByName("bulbOb24_" + ob24.hit_counter);
              bulb.material.diffuseColor = new Color3(1, 1, 0);
              bulb.material.specularColor = new Color3(1, 1, 0);
              bulb.material.emissiveColor = new Color3(1, 1, 0);
              bulb.material.ambientColor = new Color3(1, 1, 0);
              testBulbStatus();
            }

            if (hitRed.length && ob24.hit_counter < 4 && ob24.adjusting_liquid_level === false && ob24.alarm === false) {
              let bigButtonOb24_bGlow = scene.getMeshByName("bigButtonOb24_bGlow");
              bigButtonOb24_bGlow.position.y = 2027.5;
              ob24.hit_counter += 1;
              ob24.liquid_status = "raising";
              ob24.adjusting_liquid_level = true;
              ob24.current_lava += 6;
              ob24.bulb_colors.push("red");
              playSound("mouseclick", 2000, scene);
              let bulb = scene.getMeshByName("bulbOb24_" + ob24.hit_counter);
              bulb.material.diffuseColor = new Color3(1, 0, 0);
              bulb.material.specularColor = new Color3(1, 0, 0);
              bulb.material.emissiveColor = new Color3(1, 0, 0);
              bulb.material.ambientColor = new Color3(1, 0, 0);
              testBulbStatus();
            }
          }

          let particleSystem = new ParticleSystem("gunSmoke", 2000);
          particleSystem.particleTexture = new Texture("./imgs/circle_light.png");
          particleSystem.emitter = laser;
          particleSystem.addColorGradient(0, new Color3(0.45, 0.64, 0.02));
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

export {shootBlasterOb24};
