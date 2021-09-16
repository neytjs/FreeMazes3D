import {playSound} from "../assets/playSound.js";

function pushButtonsOb7(hit, solved, buttons, scene) {
  if (solved.solvedP7 === false) {
    if (hit.pickedMesh.name === "button1p7a") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p7a";
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb7};
