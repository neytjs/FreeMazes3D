import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function removeBarrierOb17(solved, scene, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score) {
  solved.solvedP17 = true;
  let red_potion = scene.getMeshByName("red_potionOb17");
  red_potion.position.y = -1000;
  let blue_potion = scene.getMeshByName("blue_potionOb17");
  blue_potion.position.y = -1000;
  let green_potion = scene.getMeshByName("green_potionOb17");
  green_potion.position.y = -1000;
  let yellow_potion = scene.getMeshByName("yellow_potionOb17");
  yellow_potion.position.y = -1000;

  let counter = 0;
  function removeIfPresent() {
    for (let i = 0, length = inventory.length; i < length; i++) {
      if (inventory[i].hasOwnProperty("name") && (inventory[i].name === "red_potion" || inventory[i].name === "blue_potion" || inventory[i].name === "green_potion" || inventory[i].name === "yellow_potion")) {
        inventory.splice(i, 1);
        counter = counter + 1;
        GUI_InventoryDec(inventory, inventory_tracker);
        GUI_InventoryDisplay(inventory, inventory_tracker);
        break;
      }
    }
    if (counter > 0) {
      counter = 0;
      removeIfPresent();
    }
  }
  removeIfPresent();
  inventory_tracker.current_item = 1;

  for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
    for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
      if (obstacle_objects[n].obstacle17_id === forcefield_objects[l].forcefield) {
        let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
        if (barrier) {
          setTimeout(() => {
            playSound("save", 5000, scene);
            barrier.dispose();
            GUI_Score(100, score);
            GUI_Warning("You have removed the barrier!", 1500);
          }, 1500);
        }
      }
    }
  }
}

export {removeBarrierOb17};
