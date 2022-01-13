import {playSound} from "../assets/playSound.js";

function pushButtonsOb20(hit, solved, buttons, scene, ob20) {
  if (solved.solvedP20 === false && ob20.rollingBall === false) {
    if (hit.pickedMesh.name === "button1p20") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p20";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button2p20") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton2p20";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button3p20") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton3p20";
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb20};
