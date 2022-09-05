import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb20(colMesh, ob20, scene, solved, global_language) {
  if (solved.solvedP20 === false && (colMesh.name === "hintBulb1Ob20" || colMesh.name === "hintBulb2Ob20") && ob20.warned === false) {
    ob20.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob20.hint, 2500, scene);
    setTimeout(() => {
      ob20.warned = false;
    }, 2200);
  }
}

export {warnMessageOb20};
