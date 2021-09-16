import {playSound} from "../assets/playSound.js";

function pushButtonsOb16(hit, solved, buttons, scene, ob16) {
  if (solved.solvedP16 === false) {
    if (hit.pickedMesh.name === "button1p16" && ob16.pushButton1p16 === false) {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton1p16";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button2p16" && ob16.pushButton2p16 === false) {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton2p16";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button3p16" && ob16.pushButton3p16 === false) {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton3p16";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button4p16" && ob16.pushButton4p16 === false) {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton4p16";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "button5p16" && ob16.pushButton5p16 === false) {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButton5p16";
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb16};
