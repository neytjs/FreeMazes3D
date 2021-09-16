import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb14(colMesh, ob14, scene) {
  if (colMesh.name === "ghost1Barrier" && ob14.ghost1Barrier_warned === false) {
    ob14.ghost1Barrier_warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning("A ghost haunts this sarcophagus.", 2000);
  }
  if (colMesh.name === "ghost2Barrier" && ob14.ghost2Barrier_warned === false) {
    ob14.ghost2Barrier_warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning("A ghost haunts this sarcophagus.", 2000);
  }
  if (colMesh.name === "ghost3Barrier" && ob14.ghost3Barrier_warned === false) {
    ob14.ghost3Barrier_warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning("A ghost haunts this sarcophagus.", 2000);
  }
}

export {warnMessageOb14};
