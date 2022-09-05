import {playSound} from "../assets/playSound.js";
import {GUI_Warning} from "../gui/gui_warning.js";

function pullMachineLeverOb22(hit, scene, ob22, global_language) {
  if (hit.pickedMesh.name === "handleLeverBarrierOb22" && ob22.machine_status === "") {
    if (ob22.fueled_machine === false) {
      GUI_Warning(global_language.text.puzzles.ob22.warn3, 2500, scene);
    } else if (ob22.fueled_machine === true) {
      if (ob22.gemmed_machine === false) {
        GUI_Warning(global_language.text.puzzles.ob22.warn4, 3000, scene);
      } else if (ob22.gemmed_machine === true) {
        playSound("mouseclick", 2000, scene);
        ob22.machine_status = "pulling";
      }
    }
  }
}

export {pullMachineLeverOb22};
