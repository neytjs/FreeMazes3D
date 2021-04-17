import {returnKeyType} from "./returnKeyType.js";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryEnd} from "../gui/gui_inventory_end.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function collectKey(colMesh, key_objects, inventory, inventory_tracker, scene) {
  for (let i = 0, length = key_objects.length; i < length; i++) {
    if (colMesh.uniqueId === key_objects[i].id) {
      playSound("cloth_inventory", 3000, scene);
      inventory.push({key: key_objects[i].key, inventory: key_objects[i].inventory, img: key_objects[i].img});
      colMesh.dispose();
      GUI_Warning("You have found a " + returnKeyType(key_objects[i].key) + " key.", 2000);
      GUI_InventoryEnd(inventory, inventory_tracker);
      GUI_InventoryDisplay(inventory, inventory_tracker);
    }
  }
}

export {collectKey};
