import {playSound} from "../assets/playSound.js";

function movingGreenOb4(ob4, scene) {
  if (ob4.movingGreen) {
    if (ob4.green_played === false) {
      ob4.green_played = true;
      playSound("negative", 3000, scene);
    }
    let startPos = scene.getMeshByName("teleportPad");
    let greenBridge = scene.getMeshByName("greenBridge");
    if (greenBridge.position.z < (startPos.position.z + 20)) {
      greenBridge.position.z += 0.25;
    } else {
      ob4.movingGreen = false;
    }
  }
}

export {movingGreenOb4};
