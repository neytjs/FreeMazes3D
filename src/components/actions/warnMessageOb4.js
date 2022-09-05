import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb4(colMesh, ob4, scene, solved, global_language) {
  if (solved.solvedP4 === false && colMesh.name === "centralPlatformBarrierOb4" && ob4.warned === false) {
    ob4.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob4.warn, 4000, scene);
  }
}

export {warnMessageOb4};
