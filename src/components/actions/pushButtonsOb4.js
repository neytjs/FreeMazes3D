import {playSound} from "../assets/playSound.js";

function pushButtonsOb4(hit, solved, buttons, scene) {
  if (solved.solvedP4 === false) {
    if (hit.pickedMesh.name === "buttonOb4Central") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4Central";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4Top1") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4Top1";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4Top2") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4Top2";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4Top3") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4Top3";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4Top4") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4Top4";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4Top5") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4Top5";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4Top6") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4Top6";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4Top7") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4Top7";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4Top8") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4Top8";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4TopMini1") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4TopMini1";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4TopMini2") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4TopMini2";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4TopMini3") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4TopMini3";
        playSound("mouseclick", 2000, scene);
      }
    }
    if (hit.pickedMesh.name === "buttonOb4TopMini4") {
      if (buttons.running === false) {
        buttons.running = true;
        buttons.pushingButton = "pushButtonOb4TopMini4";
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb4};
