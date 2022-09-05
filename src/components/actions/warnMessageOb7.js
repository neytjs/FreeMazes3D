import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb7(colMesh, ob7, scene, global_language) {
  if (colMesh.name === "hutBarrier" && ob7.warned === false) {
    ob7.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob7.warn, 2000, scene);
  }
}

export {warnMessageOb7};
