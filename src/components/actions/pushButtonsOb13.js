import {playSound} from "../assets/playSound.js";
import {GUI_Warning} from "../gui/gui_warning.js";

function pushButtonsOb13(hit, solved, buttons, scene, ob13, global_language) {
  if (solved.solvedP13 === false) {
    if (hit.pickedMesh.name === "button1p13" && ob13.pushButton1p13 === false) {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p13";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button2p13" && ob13.pushButton2p13 === false) {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton2p13";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button3p13" && ob13.pushButton3p13 === false) {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton3p13";
        playSound("mouseclick", 2000, scene);
      }
    }
    if ((hit.pickedMesh.name === "button1p13" && ob13.pushButton1p13 === true) || (hit.pickedMesh.name === "button2p13" && ob13.pushButton2p13 === true) || (hit.pickedMesh.name === "button3p13" && ob13.pushButton3p13 === true)) {
      GUI_Warning(global_language.text.puzzles.ob13.warn1, 1500, scene);
    }
  }
}

export {pushButtonsOb13};
