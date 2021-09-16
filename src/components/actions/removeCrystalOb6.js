import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function removeCrystalOb6(hit_name, obstacle_objects, scene, camera, solved, ob6, player) {
  if (player.holding === "" && solved.solvedP6 === false && ob6.just_accessed === false) {
    if (hit_name === "red_Pedestal" || hit_name === "teal_Pedestal" || hit_name === "pink_Pedestal" || hit_name === "green_Pedestal" || hit_name === "blue_Pedestal" || hit_name === "purple_Pedestal" || hit_name === "grey_Pedestal") {
      let pedestal = hit_name.slice(0, hit_name.lastIndexOf('_'));
      for (let i = 0, length = obstacle_objects.length; i < length; i++) {
        if (obstacle_objects[i].name === "pedestalcrystal" && obstacle_objects[i].pedestals[pedestal].color_name !== "empty") {
          playSound("cloth_inventory", 3000, scene);
          ob6.just_accessed = true;
          camera.speed = 0.25;
          obstacle_objects[i].pedestals[pedestal].color_name = "empty";
          player.holding = pedestal;
          ob6.holding = obstacle_objects[i].pedestals[pedestal].color_code;
          let crystal = scene.getMeshByName(pedestal+"Crystal");
          crystal.material.alpha = 0;
          let carryingCrystal = scene.getMeshByName("carryingCrystal");
          carryingCrystal.material.alpha = 1;
          carryingCrystal.material.diffuseColor = ob6.holding;
          carryingCrystal.renderingGroupId = 1;
          carryingCrystal.parent = camera;
          carryingCrystal.position = new Vector3(-2, -4, 0);
          setTimeout(() => {
            ob6.just_accessed = false;
          }, 250);
          break;
        }
      }
    }
  }
}

export {removeCrystalOb6};
