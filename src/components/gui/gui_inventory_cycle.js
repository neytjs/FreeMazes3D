import {GUI_InventoryDisplay} from "./gui_inventory_display.js";
import {GUI_InventoryInc} from "./gui_inventory_inc.js";
import {GUI_InventoryDec} from "./gui_inventory_dec.js";

function GUI_InventoryCycle(inventory, inventory_tracker, direction) {
  if (direction === "left" && (inventory.length > 1)) {
    GUI_InventoryDec(inventory, inventory_tracker);
    GUI_InventoryDisplay(inventory, inventory_tracker);
  }
  if (direction === "right" && (inventory.length > 1)) {
    GUI_InventoryInc(inventory, inventory_tracker);
    GUI_InventoryDisplay(inventory, inventory_tracker);
  }
}

export {GUI_InventoryCycle};
