import {Color3} from "@babylonjs/core/Maths/math";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {playSound} from "../assets/playSound.js";
import {returnCrystalTexture} from "../assets/textures.js";

function setBallOb9(hit_name, ob9, solved, inventory, inventory_tracker, scene) {
  if (solved.solvedP9 === false && inventory[inventory_tracker.current_item].hasOwnProperty("type") && ob9.just_accessed === false) {
    if ((hit_name === "pipe1exit" && ob9.pipe1exit === false) || (hit_name === "pipe2exit" && ob9.pipe2exit === false) || (hit_name === "pipe3exit" && ob9.pipe3exit === false) || (hit_name === "pipe4exit" && ob9.pipe4exit === false)) {
      ob9.just_accessed = true;
      ob9[hit_name] = true;
      ob9["pipe"+hit_name[4]+"entrance"] = true;
      ob9["plate" + hit_name[4]] = false;
      let hidden = "hiddenBall" + hit_name[4];
      ob9[hidden] = inventory[inventory_tracker.current_item];
      let hiddenBall = scene.getMeshByName(hidden);
      hiddenBall.material.diffuseTexture = returnCrystalTexture(ob9[hidden].texture, scene);
      hiddenBall.position.y = 2.5;
      inventory.splice(inventory_tracker.current_item, 1);
      GUI_InventoryDec(inventory, inventory_tracker);
      GUI_InventoryDisplay(inventory, inventory_tracker);
      playSound("negative", 3000, scene);
      setTimeout(() => {
        ob9.just_accessed = false;
      }, 250);
    }
  }
}

export {setBallOb9};
