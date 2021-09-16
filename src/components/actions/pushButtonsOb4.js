import {playSound} from "../assets/playSound.js";

function pushButtonsOb4(hit, solved, buttons, scene) {
  if (solved.solvedP4 === false) {
    if (hit.pickedMesh.name === "button1p4a") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p4a";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button1p4b") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p4b";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button1p4c") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p4c";
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb4};
