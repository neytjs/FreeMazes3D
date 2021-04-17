import {playSound} from "../assets/playSound.js";

function pushButtonsOb4(hit, solved, buttons, scene) {
  if (solved.solvedP4 === false) {
    if (hit.pickedMesh.name === "button1p4a") {
      buttons.pushingButton = "pushButton1p4a";
      playSound("mouseclick", 2000, scene);
    }
    if (hit.pickedMesh.name === "button1p4b") {
      buttons.pushingButton = "pushButton1p4b";
      playSound("mouseclick", 2000, scene);
    }
    if (hit.pickedMesh.name === "button1p4c") {
      buttons.pushingButton = "pushButton1p4c";
      playSound("mouseclick", 2000, scene);
    }
  }
}

export {pushButtonsOb4};
