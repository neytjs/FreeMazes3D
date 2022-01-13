import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";
import {returnCrystalTexture} from "../assets/textures.js";

function removeCrystalOb19(hit_name, scene, camera, solved, ob19, player) {
  if (player.holding === "" && solved.solvedP19 === false) {
    if (hit_name === "red_CrystalOb19" || hit_name === "orange_CrystalOb19" || hit_name === "yellow_CrystalOb19" || hit_name === "green_CrystalOb19") {
      let color = hit_name.slice(0, hit_name.lastIndexOf('_'));
      ob19.holding = color;
      player.holding = hit_name;
      let crystal = scene.getMeshByName(hit_name);
      crystal.dispose();
      playSound("cloth_inventory", 3000, scene);
      let carryingCrystal = scene.getMeshByName("carryingCrystalOb19");
      carryingCrystal.material.alpha = 1;
      carryingCrystal.material.diffuseTexture = returnCrystalTexture("gem_"+ob19.holding, scene);
      carryingCrystal.renderingGroupId = 1;
      carryingCrystal.parent = camera;
      carryingCrystal.position = new Vector3(-2, -4, 0);
    }
  }
}

export {removeCrystalOb19};
