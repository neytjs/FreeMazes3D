import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {playSound} from "../assets/playSound.js";

function pourWaterOb24(hit, scene, solved, inventory, inventory_tracker, ob24, global_language) {
  if (solved.solvedP24 === false) {
    if (hit.pickedMesh.name === "base_Ob24_bigwheel") {
      if (inventory[inventory_tracker.current_item].name === "water_pail" && hit.pickedMesh.name === "base_Ob24_bigwheel") {
        if (ob24.pouring) {
          playSound("bubble_01", 1000, scene);
          inventory.splice(inventory_tracker.current_item, 1);
          GUI_InventoryDec(inventory, inventory_tracker);
          GUI_InventoryDisplay(inventory, inventory_tracker);
          ob24.pouring = false;
          ob24.big_wheel_hot = false;
          setTimeout(() => {
            GUI_Warning(global_language.text.puzzles.ob24.alert, 2500, scene);
          }, 800);
        }
      }
    }
  }
}

export {pourWaterOb24};
