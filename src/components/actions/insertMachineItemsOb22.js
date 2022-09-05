import {playSound} from "../assets/playSound.js";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {GUI_Warning} from "../gui/gui_warning.js";

function insertMachineItemsOb22(hit, scene, solved, ob22, inventory, inventory_tracker, global_language) {
  if (hit.pickedMesh.name === "slotBarrierOb22") {
    if (inventory[inventory_tracker.current_item].type !== "fuelTankOb22" && inventory[inventory_tracker.current_item].type !== "purificationGemOb22" && ob22.fueled_machine === false && ob22.gemmed_machine === false) {
      GUI_Warning(global_language.text.puzzles.ob22.warn1, 3000, scene);
    } else {
      if (ob22.fueled_machine === false) {
        if (inventory[inventory_tracker.current_item].type !== "fuelTankOb22") {
          GUI_Warning(global_language.text.puzzles.ob22.warn2, 3000, scene);
        } else {
          playSound("cloth_inventory", 3000, scene);
          ob22.fueled_machine = true;
          inventory.splice(inventory_tracker.current_item, 1);
          GUI_InventoryDec(inventory, inventory_tracker);
          GUI_InventoryDisplay(inventory, inventory_tracker);
        }
      } else if (ob22.fueled_machine === true) {
        if (ob22.gemmed_machine === false && inventory[inventory_tracker.current_item].type === "purificationGemOb22") {
          playSound("cloth_inventory", 3000, scene);
          ob22.gemmed_machine = true;
          inventory.splice(inventory_tracker.current_item, 1);
          GUI_InventoryDec(inventory, inventory_tracker);
          GUI_InventoryDisplay(inventory, inventory_tracker);
        }
      }
    }
  }
}

export {insertMachineItemsOb22};
