import {playSound} from "../assets/playSound.js";

function movingBlueOb4(ob4, scene) {
  if (ob4.movingBlue) {
    if (ob4.blue_played === false) {
      ob4.blue_played = true;
      playSound("negative", 3000, scene);
    }
    let startPos = scene.getMeshByName("teleportPad");
    let blueBridge = scene.getMeshByName("blueBridge");
    if (blueBridge.position.x > (startPos.position.x - 20)) {
      blueBridge.position.x -= 0.25;
    } else {
      ob4.movingBlue = false;
    }
  }
}

export {movingBlueOb4};
