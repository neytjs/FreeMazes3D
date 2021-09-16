import {playSound} from "../assets/playSound.js";
import {plateColors, mazePos} from "../assets/pyramid_data.js";
import {GUI_Warning} from "../gui/gui_warning.js";

function handleButtonPressOb13(buttons, ob13, obstacle_objects, scene) {
  if (buttons.pushingButton === "pushButton1p13") {
    ob13.pushButton1p13 = true;
    ob13.buttons_remaining = ob13.buttons_remaining - 1;
    playSound("misc_menu_4", 2000, scene);
    let powder = scene.getMeshByName(plateColors[0].color_name + "_powderOb13");
    powder.position.y = -100;
    powder.position.x = (mazePos[0].lever1_y * 35) + 5;
    powder.position.z = -((mazePos[0].lever1_x * 35) + 5);
  }
  if (buttons.pushingButton === "pushButton2p13") {
    ob13.pushButton2p13 = true;
    ob13.buttons_remaining = ob13.buttons_remaining - 1;
    playSound("misc_menu_4", 2000, scene);
    let powder = scene.getMeshByName(plateColors[1].color_name + "_powderOb13");
    powder.position.y = -100;
    powder.position.x = (mazePos[0].lever2_y * 35) + 5;
    powder.position.z = -((mazePos[0].lever2_x * 35) + 5);
  }
  if (buttons.pushingButton === "pushButton3p13") {
    ob13.pushButton3p13 = true;
    ob13.buttons_remaining = ob13.buttons_remaining - 1;
    playSound("misc_menu_4", 2000, scene);
    let powder = scene.getMeshByName(plateColors[2].color_name + "_powderOb13");
    powder.position.y = -100;
    powder.position.x = (mazePos[0].lever3_y * 35) + 5;
    powder.position.z = -((mazePos[0].lever3_x * 35) + 5);
  }
  if (buttons.pushingButton === "pushButton1p13" || buttons.pushingButton === "pushButton2p13" || buttons.pushingButton === "pushButton3p13") {
    switch (ob13.buttons_remaining) {
      case 2:
        GUI_Warning("Two buttons remaining.", 1500);
      break;
      case 1:
        GUI_Warning("One button remaining.", 1500);
      break;
      case 0:
        GUI_Warning("You have clicked all the buttons.", 1500);
      break;
    }
  }
}

export {handleButtonPressOb13};
