import {ParticleSystem} from "@babylonjs/core/Particles";
import {Vector3} from "@babylonjs/core/Maths/math";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {playSound} from "../assets/playSound.js";
import {returnCrystalTexture} from "../assets/textures.js";

function pickUpCrystalOb19(hit_name, ob19, solved, scene, camera, player) {
  if (solved.solvedP19 === false && ob19.just_accessed === false && player.holding === "") {
    if (hit_name === "red_deviceOb19" || hit_name === "orange_deviceOb19" || hit_name === "yellow_deviceOb19" || hit_name === "green_deviceOb19" || hit_name === "empty1_deviceOb19" || hit_name === "empty2_deviceOb19" || hit_name === "empty3_deviceOb19" || hit_name === "empty4_deviceOb19") {
      if (ob19[hit_name] !== "") {
        playSound("cloth_inventory", 3000, scene);
        ob19.just_accessed = true;
        let crystal_color = hit_name.slice(0, hit_name.lastIndexOf('_'));
        let crystal_mesh = scene.getMeshByName(crystal_color+"_crystalOb19");
        crystal_mesh.material.alpha = 0;
        ob19.holding = ob19[hit_name];
        if (ob19.holding === crystal_color) {
          playSound("negative", 3000, scene);
          let beam = scene.getMeshByName(ob19.holding+"Beam");
          beam.material.alpha = 0;
        }
        player.holding = ob19[hit_name]+"_CrystalOb19";
        let carryingCrystal = scene.getMeshByName("carryingCrystalOb19");
        carryingCrystal.material.alpha = 1;
        carryingCrystal.material.diffuseTexture = returnCrystalTexture("gem_"+ob19.holding, scene);
        carryingCrystal.renderingGroupId = 1;
        carryingCrystal.parent = camera;
        carryingCrystal.position = new Vector3(-2, -4, 0);
        ob19[hit_name] = "";
        setTimeout(() => {
          ob19.just_accessed = false;
        }, 250);
      }
    }
  }
}

export {pickUpCrystalOb19};
