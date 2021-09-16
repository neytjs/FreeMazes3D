import {playSound} from "../assets/playSound.js";

function pushButtonsOb3(hit, solved, buttons, scene) {
  if (solved.solvedP3 === false) {
    if (hit.pickedMesh.name === "button1p3") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p3";
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb3};
