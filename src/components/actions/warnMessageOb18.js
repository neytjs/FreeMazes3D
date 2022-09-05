import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb18(colMesh, ob18, scene, solved, global_language) {
  if (solved.solvedP18 === false && colMesh.name === "crystalOb18" && ob18.warned === false) {
    ob18.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob18.warn, 2500, scene);
  }
}

export {warnMessageOb18};
