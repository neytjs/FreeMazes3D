import {playSound} from "../assets/playSound.js";

function removeButtonBarrierOb4(buttons, button_name, scene, ob4) {
  if (buttons.pushingButton === button_name && ob4.removed === false) {
    ob4.removed = true;
    let buttonBarrier = scene.getMeshByName("centralPlatformBarrierOb4");
    buttonBarrier.dispose();
    playSound("positive", 2000, scene);
  }
}

export {removeButtonBarrierOb4};
