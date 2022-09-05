import {playSound} from "../assets/playSound.js";

function pushButtonsOb22(hit, solved, buttons, scene, ob22) {
  if (solved.solvedP22 === false) {
    if (hit.pickedMesh.name === "button1p22" && ob22.purified === true) {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p22";
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb22};
