import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb20(colMesh, ob20, scene, solved) {
  if (solved.solvedP20 === false && (colMesh.name === "hintBulb1Ob20" || colMesh.name === "hintBulb2Ob20") && ob20.warned === false) {
    ob20.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning("Hmm, this must mean something...", 2500);
    setTimeout(() => {
      ob20.warned = false;
    }, 2200);
  }
}

export {warnMessageOb20};
