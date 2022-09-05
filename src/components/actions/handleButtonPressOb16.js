import {puzzleColors} from "../assets/bulb_button_colors.js";
import {setBulbColorOb16} from "./setBulbColorOb16.js";
import {startTimerOb16} from "./startTimerOb16.js";

function handleButtonPressOb16(buttons, ob16, scene, obstacle_objects, forcefield_objects, score, solved, global_language) {
  if (buttons.pushingButton === "pushButton1p16") {
    ob16.pushButton1p16 = true;
    ob16.pushButton2p16 = false;
    ob16.pushButton3p16 = false;
    ob16.pushButton4p16 = false;
    ob16.pushButton5p16 = false;
    ob16.hint_bulb1 = puzzleColors[0].color_name;
    ob16.hint_bulb2 = puzzleColors[1].color_name;
    ob16.hint_bulb3 = puzzleColors[2].color_name;
    ob16.hint_bulb4 = puzzleColors[3].color_name;
    startTimerOb16(ob16, scene, obstacle_objects, forcefield_objects, score, solved, global_language);
  }
  if (buttons.pushingButton === "pushButton2p16") {
    ob16.pushButton2p16 = true;
    setBulbColorOb16("pushButton2p16", ob16, scene, obstacle_objects);
  }
  if (buttons.pushingButton === "pushButton3p16") {
    ob16.pushButton3p16 = true;
    setBulbColorOb16("pushButton3p16", ob16, scene, obstacle_objects);
  }
  if (buttons.pushingButton === "pushButton4p16") {
    ob16.pushButton4p16 = true;
    setBulbColorOb16("pushButton4p16", ob16, scene, obstacle_objects);
  }
  if (buttons.pushingButton === "pushButton5p16") {
    ob16.pushButton5p16 = true;
    setBulbColorOb16("pushButton5p16", ob16, scene, obstacle_objects);
  }
}

export {handleButtonPressOb16};
