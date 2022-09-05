import {returnKeyType} from "./returnKeyType.js";
import {GUI_Warning} from "../gui/gui_warning.js";

function doorMessage(colMesh, door_objects, inventory, scene, global_language) {
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
        GUI_Warning(global_language.text.global.door.part1 + returnKeyType(door_objects[i].door, global_language) + global_language.text.global.door.part2, 2500, scene);
      }
    }
  }
}

export {doorMessage};
