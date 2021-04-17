import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function exitMap(hit, resetGlobals, reStart, scene) {
  if (hit.pickedMesh.name === "teleporter_powered_barrier") {
    playSound("anchor_action_ind", 2000, scene);
    GUI_Warning("Exiting the map.", 2000);
    setTimeout(() => {
      resetGlobals();
      reStart();
    }, 1000);
    document.getElementById("menu").style.left = 0;
  }
}

export {exitMap};
