import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function hintMessageOb2(colMesh, ob2, scene, solved) {
  if (solved.solvedP2 === false && colMesh.name === "hintOb2" && ob2.hinted === false) {
    ob2.hinted = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning("This MUST be a hint...", 1800);
  }
}

export {hintMessageOb2};
