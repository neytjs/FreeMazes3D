import {GUI_Warning} from "../gui/gui_warning.js";

function portalMessage(portal_objects, inventory, colMesh, scene, global_language) {
  if (colMesh.name === "teleporter_unpowered_barrier" || colMesh.name === "teleporter_unpowered") {
    for (let i = 0, length = portal_objects.length; i < length; i++) {
      let matches = 0;
      let index = 0;
      for (let j = 0, jlength = inventory.length; j < jlength; j++) {
        if (inventory[j].gem) {
          matches = matches + 1;
          index = j;
        }
      }
      if (matches === 0) {
        GUI_Warning(global_language.text.global.portal.find, 2000, scene);
      }
    }
  }
}

export {portalMessage};
