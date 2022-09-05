import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function openGate(hit, door_objects, inventory, inventory_tracker, scene, global_language) {
  if (hit.pickedMesh.name === "door") {
    for (let i = 0, length = door_objects.length; i < length; i++) {
      if (hit.pickedMesh.uniqueId === door_objects[i].id) {
        let matches = 0;
        let index = 0;
        for (let j = 0, jlength = inventory.length; j < jlength; j++) {
          if (door_objects[i].door === inventory[j].key) {
            matches = matches + 1;
            index = j;
          }
        }
        if (matches > 0) {
          if (index === inventory_tracker.current_item) {
            playSound("DoorClose04", 1500, scene);
            hit.pickedMesh.dispose();
            inventory.splice(index, 1);
            GUI_InventoryDec(inventory, inventory_tracker);
            GUI_InventoryDisplay(inventory, inventory_tracker);
          } else {
            GUI_Warning(global_language.text.global.gate, 1200, scene);
          }
        }
      }
    }
  }
}

export {openGate};
