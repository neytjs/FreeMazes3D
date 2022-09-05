import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function warnMessageOb15(colMesh, ob15, scene, solved, camera, global_language) {
  if (solved.solvedP15 === false && colMesh.name === "signOb15" && ob15.warned === false && camera.position.y < 4.05) {
    ob15.warned = true;
    playSound("MS_Realization", 3000, scene);
    GUI_Warning(global_language.text.puzzles.ob15.warn, 2500, scene);
    setTimeout(() => {
      ob15.warned = false;
    }, 4000);
  }
}

export {warnMessageOb15};
