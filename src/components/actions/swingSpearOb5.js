import {Vector3, Matrix} from "@babylonjs/core/Maths/math";
import {Ray} from "@babylonjs/core/Culling";
import {playSound} from "../assets/playSound.js";
import {destroyCrystalOb5} from "./destroyCrystalOb5.js";

function swingSpearOb5(ob5, scene, camera, solved, player) {
  if (player.swing_spear === true && ob5.holding === true) {
    let spear = scene.getMeshByName("ghostSpear");
    let start_pos = spear.position.z;
    if (ob5.swing_sound_counter === 0) {
      playSound("swish_2", 1100, scene);
    }
    ob5.swing_sound_counter = ob5.swing_sound_counter + 1;
  // this is when they are swinging the spear foward
    if (spear.position.z < 13 && player.spear_forward === true) {
      spear.position.z += 0.5;
    } else {
      player.spear_forward = false;
    // setting the direction
      let direction = {};

      let invView = new Matrix();
      camera.getViewMatrix().invertToRef(invView);
      direction = Vector3.TransformNormal(new Vector3(-0.15, 0.1, 1), invView);
      direction.normalize();

      let castRay = () => {
        let origin = camera.position;
        if (Object.keys(ob5.starting_position).length === 0) {
          ob5.starting_position = camera.position;
        }
        let length = 6;
        let ray = new Ray(origin, direction, length);

        let hit = scene.pickWithRay(ray);

        if (ob5.starting_distance.length === 0) {
          ob5.starting_distance.push(hit.distance);
        }
        if (hit) {
          if (hit.pickedMesh && hit.pickedMesh.name !== "ghostBarrier" && hit.pickedMesh && hit.pickedMesh.name !== "hutBarrier" && hit.pickedMesh.name !== "ghostSpear" && hit.pickedMesh.name !== "ray") {
          // so hit sound only plays once
            if (ob5.hit_sound_counter === 0) {
              playSound("swish_4", 1100, scene);
            }
          // increment it
            if (ob5.hit_sound_counter === 0) { // this stops the player from destroying more than one mesh at a swing
              ob5.hit_sound_counter = ob5.hit_sound_counter + 1;
              if (hit.pickedMesh.name.substring(6) === "crystal") {
                ob5[hit.pickedMesh.name.substring(0, 6) + "_crystal_hp"] = ob5[hit.pickedMesh.name.substring(0, 6) + "_crystal_hp"] - 35;
              // if hp below 0, destroy the crystal and ghost
                if (ob5[hit.pickedMesh.name.substring(0, 6) + "_crystal_hp"] < 0) {
                  destroyCrystalOb5(hit, solved, ob5, scene, player);
                }
              }
            }
          }
        }
      }

      castRay();
    }
  // this is when they are swinging (retracting) the staff back to its start position (8)
    if (spear.position.z > 8 && player.spear_forward === false) {
      spear.position.z -= 0.5;
    // if it is back at the start position, then reset swingStaff and player.spear_forward to default values.
      if (spear.position.z === 8) {
        player.swing_spear = false;
        player.spear_forward = true;
        ob5.swing_sound_counter = 0;
        ob5.hit_sound_counter = 0;
      }
    }
  }
}

export {swingSpearOb5};
