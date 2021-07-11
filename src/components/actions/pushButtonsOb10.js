import {playSound} from "../assets/playSound.js";

function pushButtonsOb10(hit, solved, buttons, scene) {
  if (solved.solvedP10 === false) {
    if (hit.pickedMesh.name === "button1p10") {   
      buttons.pushingButton = "pushButton1p10";
      playSound("mouseclick", 2000, scene);
    }
  }
}

export {pushButtonsOb10};
