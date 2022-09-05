import {playSound} from "../assets/playSound.js";
import {masterBridges} from "../assets/bridge_data.js";
import {setBridgeOb4} from "./setBridgeOb4.js";
import {removeButtonBarrierOb4} from "./removeButtonBarrierOb4.js";

function handleButtonPressOb4(buttons, ob4, scene) {
  if (buttons.pushingButton === "pushButtonOb4Top1") {
    if (masterBridges.conditional1.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4Top1", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional1.bridge, "pushButtonOb4Top1", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4Top2") {
    if (masterBridges.conditional2.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4Top2", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional2.bridge, "pushButtonOb4Top2", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4Top3") {
    if (masterBridges.conditional3.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4Top3", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional3.bridge, "pushButtonOb4Top3", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4Top4") {
    if (masterBridges.conditional4.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4Top4", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional4.bridge, "pushButtonOb4Top4", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4Top5") {
    if (masterBridges.conditional5.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4Top5", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional5.bridge, "pushButtonOb4Top5", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4Top6") {
    if (masterBridges.conditional6.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4Top6", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional6.bridge, "pushButtonOb4Top6", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4Top7") {
    if (masterBridges.conditional7.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4Top7", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional7.bridge, "pushButtonOb4Top7", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4Top8") {
    if (masterBridges.conditional8.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4Top8", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional8.bridge, "pushButtonOb4Top8", ob4, scene);
    }
  }

  if (buttons.pushingButton === "pushButtonOb4TopMini1") {
    if (masterBridges.conditional9.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4TopMini1", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional9.bridge, "pushButtonOb4TopMini1", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4TopMini2") {
    if (masterBridges.conditional10.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4TopMini2", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional10.bridge, "pushButtonOb4TopMini2", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4TopMini3") {
    if (masterBridges.conditional11.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4TopMini3", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional11.bridge, "pushButtonOb4TopMini3", ob4, scene);
    }
  }
  if (buttons.pushingButton === "pushButtonOb4TopMini4") {
    if (masterBridges.conditional12.final) {
      removeButtonBarrierOb4(buttons, "pushButtonOb4TopMini4", scene, ob4);
    } else {
      setBridgeOb4(masterBridges.conditional12.bridge, "pushButtonOb4TopMini4", ob4, scene);
    }
  }
}

export {handleButtonPressOb4};
