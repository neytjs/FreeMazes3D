import {returnKeyType} from "./returnKeyType.js";
import {GUI_Warning} from "../gui/gui_warning.js";

function doorMessage(colMesh, door_objects, inventory) {
  for (let i = 0, length = door_objects.length; i < length; i++) {
    if (colMesh.uniqueId === door_objects[i].id) {
      let matches = 0;
      let index = 0;
      for (let j = 0, jlength = inventory.length; j < jlength; j++) {
        if (door_objects[i].door === inventory[j].key) {
          matches = matches + 1;
          index = j;
        }
      }
      if (matches === 0) {
        GUI_Warning("A " + returnKeyType(door_objects[i].door) + " key is required to open this door.", 2500);
      }
    }
  }
}

export {doorMessage};
