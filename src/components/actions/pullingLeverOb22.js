import {playSound} from "../assets/playSound.js";

function pullingLeverOb22(scene, ob22, buttons) {
  if (ob22.machine_status === "pulling") {
    let lever = scene.getMeshByName("handleLeverOb22");
    if (lever.position.y > 8.8 && buttons.goingDown === true) {
      lever.position.y -= 0.02;
    } else if (lever.position.y < 8.8 && buttons.goingDown === true) {
      playSound("mouseclick", 2000, scene);
      buttons.goingDown = false;
    } else if (lever.position.y < 10 && buttons.goingDown === false) {
      lever.position.y += 0.02;
    } else {
      buttons.goingDown = true;
      ob22.machine_status = "powered";
    }
  }
}

export {pullingLeverOb22};
