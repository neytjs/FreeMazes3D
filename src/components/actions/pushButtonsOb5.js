import {playSound} from "../assets/playSound.js";

function pushButtonsOb5(hit, solved, buttons, scene) {
  if (solved.solvedP5 === false) {
    if (hit.pickedMesh.name === "button1p5a") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p5a";
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb5};
