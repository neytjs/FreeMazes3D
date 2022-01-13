import {playSound} from "../assets/playSound.js";

function pushButtonsOb18(hit, solved, buttons, scene) {
  if (solved.solvedP18 === false) {
    if (hit.pickedMesh.name === "button1p18a") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p18a";
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb18};
