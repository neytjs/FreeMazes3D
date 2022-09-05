import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb1(colMesh, ob1, scene, solved, global_language) {
  if (solved.solvedP1 === false && colMesh.name === "signOb1" && ob1.warned === false) {
    ob1.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob1.warn, 2500, scene);
    setTimeout(() => {
      ob1.warned = false;
    }, 4000);
  }
}

export {warnMessageOb1};
