import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb5(colMesh, ob5, scene) {
  if (colMesh.name === "ghostBarrier" && ob5.warned === false) {
    ob5.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning("The ghosts will not allow you to approach any closer.", 2000);
  }
}

export {warnMessageOb5};
