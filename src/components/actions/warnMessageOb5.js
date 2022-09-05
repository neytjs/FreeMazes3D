import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb5(colMesh, ob5, scene, global_language) {
  if (colMesh.name === "ghostBarrier" && ob5.warned === false) {
    ob5.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob5.warn, 2000, scene);
  }
}

export {warnMessageOb5};
