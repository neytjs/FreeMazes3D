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
import {Sound} from "@babylonjs/core/Audio";
import {playSound} from "../assets/playSound.js";
import {getAgentPosition} from "../assets/mob_crowd.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";

function fireMobOb12(ob12, scene, solved, camera, score, forcefield_objects, obstacle_objects, global_language) {
  let mob_pos = getAgentPosition();
  if (Vector3.Distance(mob_pos, camera.position) < 20) {
    if (ob12.firing === false) {
      ob12.firing = true;

      let mob = scene.getMeshByName("agentMob");

      let laser1 = Mesh.CreateSphere("shell", 1, 0.4, scene);
      laser1.material = new StandardMaterial('texture1', scene);
      laser1.material.diffuseColor = new Color3(0, 0.64, 1);
      laser1.material.specularColor = new Color3(0, 0.64, 1);
      laser1.material.emissiveColor = new Color3(0, 0.64, 1);
      laser1.material.ambientColor = new Color3(0, 0.64, 1);

      let laserBarrier = MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 1}, scene);
      laserBarrier.material = new StandardMaterial('texture1', scene);
      laserBarrier.material.diffuseColor = new Color3(0.47, 0.45, 0.45);
      laserBarrier.material.alpha = 0;

      let laser = Mesh.MergeMeshes([laser1, laserBarrier], true, true, undefined, false, true);
      laser.position.y = 4.25;
      laser.position.x = mob_pos.x;
      laser.position.z = mob_pos.z;
      laser.rotation.y = ob12.rotation;
      laser.physicsImpostor = new PhysicsImpostor(laserBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
      laser.checkCollisions = true;
      laser.name = "laserOb12";

      if (Vector3.Distance(mob_pos, laser.position) > 1) {
        playSound("tir", 1000, scene);
      }

      let forward = new Vector3(0, 0, 1);
      let direction = mob.getDirection(forward);
      direction.normalize();

      let casting = true;
      let starting_distance = [];

      function castRay() {
        let origin = laser.position;

        let length = 80;
        let ray = new Ray(origin, direction, length);

        function predicate(mesh) {
          if (mesh == mob || mesh == laser) {
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

            if (hit.pickedMesh.name === "powerCrystal1Ob12" && ob12.impacted === false && ob12.hit === false) {
              ob12.powerCrystal1 = ob12.powerCrystal1 - 25;
              ob12.impacted = true;
              if (ob12.powerCrystal1 <= 0) {
                setTimeout(() => {
                  playSound("8bit_bomb_explosion", 1100, scene);
                  hit.pickedMesh.dispose();
                }, 500);
              }
            }
            if (hit.pickedMesh.name === "powerCrystal2Ob12" && ob12.impacted === false && ob12.hit === false) {
              ob12.powerCrystal2 = ob12.powerCrystal2 - 25;
              ob12.impacted = true;
              if (ob12.powerCrystal2 <= 0) {
                setTimeout(() => {
                  playSound("8bit_bomb_explosion", 1100, scene);
                  hit.pickedMesh.dispose();
                }, 500);
              }
            }
            if (hit.pickedMesh.name === "powerCrystal3Ob12" && ob12.impacted === false && ob12.hit === false) {
              ob12.powerCrystal3 = ob12.powerCrystal3 - 25;
              ob12.impacted = true;
              if (ob12.powerCrystal3 <= 0) {
                setTimeout(() => {
                  playSound("8bit_bomb_explosion", 1100, scene);
                  hit.pickedMesh.dispose();
                }, 500);
              }
            }
            if (hit.pickedMesh.name === "powerCrystal4Ob12" && ob12.impacted === false && ob12.hit === false) {
              ob12.powerCrystal4 = ob12.powerCrystal4 - 25;
              ob12.impacted = true;
              if (ob12.powerCrystal4 <= 0) {
                setTimeout(() => {
                  playSound("8bit_bomb_explosion", 1100, scene);
                  hit.pickedMesh.dispose();
                }, 500);
              }
            }
            if (ob12.powerCrystal1 <= 0 && ob12.powerCrystal2 <= 0 && ob12.powerCrystal3 <= 0 && ob12.powerCrystal4 <= 0) {
              let laser = scene.getMeshByName("laserOb12");
              if (laser) {
                laser.dispose(true, true);
                laser = null;
              }
              solved.solvedP12 = true;
              for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
                for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
                  if (obstacle_objects[n].obstacle12_id === forcefield_objects[l].forcefield) {
                    let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
                    if (barrier) {
                      setTimeout(() => {
                        playSound("save", 5000, scene);
                        barrier.dispose();
                        GUI_Score(200, score, global_language);
                        GUI_Warning(global_language.text.global.success, 1500, scene);
                      }, 1000);
                    }
                  }
                }
              }
            }
            if (laser) {
              laser.dispose(true, true);
              laser = null;
            }
            casting = false;
            ob12.impacted = false;
            ob12.hit = false;
            starting_distance = [];
          }
        }
        if (laser && Vector3.Distance(mob_pos, laser.position) > 50) {
          laser.dispose(true, true);
          laser = null;
          starting_distance = [];
        }
      }

      scene.registerBeforeRender(function () {
        if (casting) {
          if (laser) {
            laser.position.addInPlace(direction.scale(0.4));
            castRay();
          }
        }
      });

      setTimeout(() => {
        ob12.firing = false;
      }, 1800);
    }
  }
}

export {fireMobOb12};
