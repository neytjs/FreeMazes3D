import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb14(colMesh, ob14, scene, global_language) {
  if (colMesh.name === "ghost1Barrier" && ob14.ghost1Barrier_warned === false) {
    ob14.ghost1Barrier_warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob14.warn, 2000, scene);
  }
  if (colMesh.name === "ghost2Barrier" && ob14.ghost2Barrier_warned === false) {
    ob14.ghost2Barrier_warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob14.warn, 2000, scene);
  }
  if (colMesh.name === "ghost3Barrier" && ob14.ghost3Barrier_warned === false) {
    ob14.ghost3Barrier_warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob14.warn, 2000, scene);
  }
}

export {warnMessageOb14};
