import {GUI_Warning} from "../gui/gui_warning.js";

function forceFieldMessage(colMesh, forcefield_objects, scene, global_language) {
  for (let i = 0, length = forcefield_objects.length; i < length; i++) {
    if (colMesh.uniqueId === forcefield_objects[i].id) {
      GUI_Warning(global_language.text.global.forcefield, 2500, scene);
    }
  }
}

export {forceFieldMessage};
