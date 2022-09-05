import {playSound} from "../assets/playSound.js";

function pullingLeverOb1(scene, ob1, buttons) {
  if (ob1.machine_status === "pulling") {
    let lever = scene.getMeshByName("slotLeverOb1");
    if (lever.position.y > -1.2 && buttons.goingDown === true) {
      lever.position.y -= 0.05;
    } else if (lever.position.y < -1.2 && buttons.goingDown === true) {
      playSound("mouseclick", 2000, scene);
      buttons.goingDown = false;
    } else if (lever.position.y < 0 && buttons.goingDown === false) {
      lever.position.y += 0.05;
    } else {
      buttons.goingDown = true;
      ob1.machine_status = "handle";
    }
  }
}

export {pullingLeverOb1};
