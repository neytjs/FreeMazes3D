import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryEnd} from "../gui/gui_inventory_end.js";
import {playSound} from "../assets/playSound.js";

function removePowderOb13(obstacle_objects, inventory, inventory_tracker, colMesh, scene) {
  if (obstacle_objects.type === "powder_Ob13") {
    playSound("cloth_inventory", 3000, scene);
    inventory.push(obstacle_objects);
    colMesh.dispose();
    GUI_InventoryEnd(inventory, inventory_tracker);
    GUI_InventoryDisplay(inventory, inventory_tracker);
  }
}

export {removePowderOb13};
