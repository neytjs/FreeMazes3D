import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb15(colMesh, ob15, scene, solved) {
  if (solved.solvedP15 === false && colMesh.name === "signOb15" && ob15.warned === false) {
    ob15.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning("Make four perfect shots from the platform.", 2500);
  }
}

export {warnMessageOb15};
