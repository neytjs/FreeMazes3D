import {puzzleColors} from "../assets/bulb_button_colors.js";
import {setBallColorOb20} from "./setBallColorOb20.js";

function handleButtonPressOb20(buttons, ob20, scene, obstacle_objects) {
  if (buttons.pushingButton === "pushButton1p20") {
    setBallColorOb20("pushButton1p20", ob20, scene, obstacle_objects);
  }
  if (buttons.pushingButton === "pushButton2p20") {
    setBallColorOb20("pushButton2p20", ob20, scene, obstacle_objects);
  }
  if (buttons.pushingButton === "pushButton3p20") {
    setBallColorOb20("pushButton3p20", ob20, scene, obstacle_objects);
  }
}

export {handleButtonPressOb20};
