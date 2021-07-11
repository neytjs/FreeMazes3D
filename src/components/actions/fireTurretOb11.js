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
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";

function fireTurretOb11(ob11, scene, solved, score, forcefield_objects, obstacle_objects) {
  if (solved.solvedP11 === false && ob11.firing === false) {
    ob11.firing = true;

    let turret = scene.getMeshByName("turretOb11");

    let shell1 = Mesh.CreateSphere("shell", 1, 0.6, scene);
    shell1.position.x = -1;
    shell1.material = new StandardMaterial('texture1', scene);
    shell1.material.diffuseColor = new Color3(1, 0, 0);
    shell1.material.emissiveColor = new Color3(1, 0, 0);
    shell1.material.emissiveColor = new Color3(1, 0, 0);

    let shell2 = Mesh.CreateSphere("shell", 1, 0.6, scene);
    shell2.position.x = 1;
    shell2.material = new StandardMaterial('texture1', scene);
    shell2.material.diffuseColor = new Color3(1, 0, 0);
    shell2.material.emissiveColor = new Color3(1, 0, 0);
    shell2.material.emissiveColor = new Color3(1, 0, 0);

    let shellsBarrier = MeshBuilder.CreateBox("box", {width: 3, height: 1, depth: 1}, scene)
    shellsBarrier.material = new StandardMaterial('texture1', scene);
    shellsBarrier.material.diffuseColor = new Color3(0.47, 0.45, 0.45);
    shellsBarrier.material.alpha = 0;

    let shells = Mesh.MergeMeshes([shell1, shell2, shellsBarrier], true, true, undefined, false, true);
    shells.position.y = 4;
    shells.position.x = turret.position.x;
    shells.position.z = turret.position.z;
    shells.rotation.y = ob11.rotation;
    shells.physicsImpostor = new PhysicsImpostor(shellsBarrier, PhysicsImpostor.CylinderImpostor, { mass: 0, restitution: 0.9 }, scene);
    shells.checkCollisions = true;
    shells.name = "shellsOb11";

    if (Vector3.Distance(turret.position, shells.position) > 3.6) {
      playSound("Rifleprimary2", 1000, scene);
    }

    let forward = new Vector3(0, 0, 1);
    let direction = turret.getDirection(forward);
    direction.normalize();

    let casting = true;
    let starting_distance = [];

    function castRay() {
      let origin = shells.position;

      let length = 80;
      let ray = new Ray(origin, direction, length);

      function predicate(mesh) {
        if (mesh == turret || mesh == shells) {
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

          if (hit.pickedMesh.name === "powerCrystal1Ob11" && ob11.impacted === false && ob11.hit === false) {
            ob11.powerCrystal1 = ob11.powerCrystal1 - 35;
            ob11.impacted = true;
            if (ob11.powerCrystal1 <= 0) {
              setTimeout(() => {
                playSound("8bit_bomb_explosion", 1100, scene);
                hit.pickedMesh.dispose();
              }, 500);
            }
          }
          if (hit.pickedMesh.name === "powerCrystal2Ob11" && ob11.impacted === false && ob11.hit === false) {
            ob11.powerCrystal2 = ob11.powerCrystal2 - 35;
            ob11.impacted = true;
            if (ob11.powerCrystal2 <= 0) {
              setTimeout(() => {
                playSound("8bit_bomb_explosion", 1100, scene);
                hit.pickedMesh.dispose();
              }, 500);
            }
          }
          if (hit.pickedMesh.name === "powerCrystal3Ob11" && ob11.impacted === false && ob11.hit === false) {
            ob11.powerCrystal3 = ob11.powerCrystal3 - 35;
            ob11.impacted = true;
            if (ob11.powerCrystal3 <= 0) {
              setTimeout(() => {
                playSound("8bit_bomb_explosion", 1100, scene);
                hit.pickedMesh.dispose();
              }, 500);
            }
          }
          if (hit.pickedMesh.name === "powerCrystal4Ob11" && ob11.impacted === false && ob11.hit === false) {
            ob11.powerCrystal4 = ob11.powerCrystal4 - 35;
            ob11.impacted = true;
            if (ob11.powerCrystal4 <= 0) {
              setTimeout(() => {
                playSound("8bit_bomb_explosion", 1100, scene);
                hit.pickedMesh.dispose();
              }, 500);
            }
          }
          if (ob11.powerCrystal1 <= 0 && ob11.powerCrystal2 <= 0 && ob11.powerCrystal3 <= 0 && ob11.powerCrystal4 <= 0) {
            let shells = scene.getMeshByName("shellsOb11");
            if (shells) {
              shells.dispose(true, true);
              shells = null;
            }
            solved.solvedP11 = true;
            for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
              for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
                if (obstacle_objects[n].obstacle11_id === forcefield_objects[l].forcefield) {
                  let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
                  if (barrier) {
                    setTimeout(() => {
                      playSound("save", 5000, scene);
                      barrier.dispose();
                      GUI_Score(200, score);
                      GUI_Warning("You have removed the barrier!", 1500);
                    }, 1000);
                  }
                }
              }
            }
          }
          if (shells) {
            shells.dispose(true, true);
            shells = null;
          }
          casting = false;
          ob11.impacted = false;
          ob11.hit = false;
          starting_distance = [];
        }
      }
      if (shells && Vector3.Distance(turret.position, shells.position) > 50) {
        shells.dispose(true, true);
        shells = null;
        starting_distance = [];
      }
    }

    scene.registerBeforeRender(function () {
      if (casting) {
        if (shells) {
          shells.position.addInPlace(direction.scale(0.4));
          castRay();
        }
      }
    });

    setTimeout(() => {
      ob11.firing = false;
    }, 1800);
  }
}

export {fireTurretOb11};
