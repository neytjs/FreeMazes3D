import {getBulbMasterColor, getBulb1colors, getBulb2colors, getBulb3colors, getBulb4colors} from "../assets/bulb_colors.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function changeBulbColorOb2(solved, buttons, ob2, obstacle_objects, forcefield_objects, scene, score) {
  if (buttons.pushingButton === "pushButton1" || buttons.pushingButton === "pushButton2" || buttons.pushingButton === "pushButton3" || buttons.pushingButton === "pushButton4") {
    playSound("misc_menu_4", 2000, scene);
    ob2.bulb = scene.getMeshByName(ob2.bulb);
    ob2.bulb.material.emissiveColor = ob2.bulb_color;
    let bulb_master_color = JSON.stringify(getBulbMasterColor());
    let bulb1colors = JSON.stringify(getBulb1colors(ob2.b1counter));
    let bulb2colors = JSON.stringify(getBulb2colors(ob2.b2counter));
    let bulb3colors = JSON.stringify(getBulb3colors(ob2.b3counter));
    let bulb4colors = JSON.stringify(getBulb4colors(ob2.b4counter));
  // test for solving puzzle
    if (bulb_master_color === bulb1colors && bulb_master_color === bulb2colors && bulb_master_color === bulb3colors && bulb_master_color === bulb4colors) {
      solved.solvedP2 = true;
      for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
        for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
          if (obstacle_objects[n].obstacle2_id === forcefield_objects[l].forcefield) {
            let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
            if (barrier) {
              playSound("save", 5000, scene);
              barrier.dispose();
              GUI_Score(200, score);
              GUI_Warning("You have removed the barrier!", 1500);
            }
          }
        }
      }
    }
  }
}

export {changeBulbColorOb2};
