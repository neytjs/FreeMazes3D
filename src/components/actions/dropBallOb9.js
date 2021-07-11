import {Color3} from "@babylonjs/core/Maths/math";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {playSound} from "../assets/playSound.js";

function dropBallOb9(hit_name, ob9, solved, inventory, inventory_tracker, scene) {
  if (solved.solvedP9 === false && inventory[inventory_tracker.current_item].hasOwnProperty("type")) {
    if (hit_name === "pipe1entrance" || hit_name === "pipe2entrance" || hit_name === "pipe3entrance" || hit_name === "pipe4entrance") {
      if (ob9[hit_name] === false && inventory[inventory_tracker.current_item].type === "ball_Ob9") {
        playSound("Falling_Rock", 5500, scene);
        ob9[hit_name] = true;
        ob9["pipe"+hit_name[4]+"exit"] = true;
        ob9["pipe"+hit_name[4]+"rolling"] = true;
        let hidden = "hiddenBall" + hit_name[4];
        ob9[hidden] = inventory[inventory_tracker.current_item];
        inventory.splice(inventory_tracker.current_item, 1);
        GUI_InventoryDec(inventory, inventory_tracker);
        GUI_InventoryDisplay(inventory, inventory_tracker);
        let hiddenBall = scene.getMeshByName(hidden);
        hiddenBall.material.diffuseColor = new Color3(ob9[hidden].color_code.r, ob9[hidden].color_code.g, ob9[hidden].color_code.b);
        setTimeout(() => {
          ob9[hidden+"falling"] = true;
        }, 3200);
      } else if (ob9[hit_name] === true && inventory[inventory_tracker.current_item].type === "ball_Ob9") {
        GUI_Warning("A mysterious force stops you.", 1500);
      }
    }
  }
}

export {dropBallOb9};
