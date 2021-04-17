import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function placeCoinOb1(hit, scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score) {
  if (solved.solvedP1 < 3) {
    if (hit.pickedMesh.name === "copper_pedestal" || hit.pickedMesh.name === "silver_pedestal" || hit.pickedMesh.name === "gold_pedestal") {
      let matches = 0;
      if (inventory[inventory_tracker.current_item].name === "copper_coin" && hit.pickedMesh.name === "copper_pedestal") {
        matches = matches + 1;
        let invis_coin = scene.getMeshByName("c_invisible_coin");
        invis_coin.material.alpha = 1;
      }
      if (inventory[inventory_tracker.current_item].name === "silver_coin" && hit.pickedMesh.name === "silver_pedestal") {
        matches = matches + 1;
        let invis_coin = scene.getMeshByName("s_invisible_coin");
        invis_coin.material.alpha = 1;
      }
      if (inventory[inventory_tracker.current_item].name === "gold_coin" && hit.pickedMesh.name === "gold_pedestal") {
        matches = matches + 1;
        let invis_coin = scene.getMeshByName("g_invisible_coin");
        invis_coin.material.alpha = 1;
      }

      if (matches > 0) {
        playSound("sell_buy_item", 5000, scene);
        inventory.splice(inventory_tracker.current_item, 1);
        solved.solvedP1 = solved.solvedP1 + 1;
        GUI_InventoryDec(inventory, inventory_tracker);
        GUI_InventoryDisplay(inventory, inventory_tracker);
      // now test to see if they have solved the puzzle
        if (solved.solvedP1 === 3) {
          for (let i = 0, length = obstacle_objects.length; i < length; i++) {
            if (obstacle_objects[i].name === hit.pickedMesh.name) {
              for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
                if (obstacle_objects[i].obstacle_id === forcefield_objects[l].forcefield) {
                  let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
                // make sure that the barrier still exists to prevent crash
                  if (barrier) {
                    playSound("save", 5000, scene);
                    barrier.dispose();
                    GUI_Score(100, score);
                    GUI_Warning("You have removed the barrier!", 1500);
                  }
                }
              }
            }
          }
        }
      } else {
        if (inventory.length > 1) {
          GUI_Warning("That does not go here.", 1500);
        }
      }
    }
  }
}

export {placeCoinOb1};
