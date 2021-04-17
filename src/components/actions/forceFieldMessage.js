import {GUI_Warning} from "../gui/gui_warning.js";

function forceFieldMessage(colMesh, forcefield_objects) {
  for (let i = 0, length = forcefield_objects.length; i < length; i++) {
    if (colMesh.uniqueId === forcefield_objects[i].id) {
      GUI_Warning("You must find a way to remove this force field.", 2500);
    }
  }
}

export {forceFieldMessage};
