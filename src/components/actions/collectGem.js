import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryEnd} from "../gui/gui_inventory_end.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function collectGem(gem_objects, inventory, inventory_tracker, colMesh, scene) {
  for (let i = 0, length = gem_objects.length; i < length; i++) {
    if (colMesh.uniqueId === gem_objects[i].id) {
      playSound("cloth_inventory", 3000, scene);
      inventory.push({gem: "portal_gem", inventory: gem_objects[i].inventory, img: gem_objects[i].img});
      colMesh.dispose();
      GUI_Warning("You have found a gem that can power the exit portal.", 2000);
      GUI_InventoryEnd(inventory, inventory_tracker);
      GUI_InventoryDisplay(inventory, inventory_tracker);
    }
  }
}

export {collectGem};
