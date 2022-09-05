import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function hintMessageOb2(colMesh, ob2, scene, solved, global_language) {
  if (solved.solvedP2 === false && (colMesh.name === "hint1Ob2" || colMesh.name === "hint2Ob2") && ob2.hinted === false) {
    ob2.hinted = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob2.hint, 1800, scene);
    setTimeout(() => {
      ob2.hinted = false;
    }, 2500);
  }
}

export {hintMessageOb2};
