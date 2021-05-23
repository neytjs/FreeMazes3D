import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb7(colMesh, ob7, scene) {
  if (colMesh.name === "hutBarrier" && ob7.warned === false) {
    ob7.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning("Three bright beams of light block your path.", 2000);
  }
}

export {warnMessageOb7};
