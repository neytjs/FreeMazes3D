import {playSound} from "../assets/playSound.js";

function setBridgeOb4(bridge_name, button_name, ob4, scene) {
  ob4[button_name] = ob4[button_name] ? false : true;
  let bridge = scene.getMeshByName(bridge_name);
  bridge.position.y = ob4[button_name] ? 6 : -1000;
  playSound("negative", 3000, scene);
}

export {setBridgeOb4};
