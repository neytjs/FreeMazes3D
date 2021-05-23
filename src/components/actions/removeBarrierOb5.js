import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function removeBarrierOb5(buttons, solved, obstacle_objects, forcefield_objects, scene, score) {
  if (buttons.pushingButton === "pushButton1p5a") {
    solved.solvedP5 = true;
    for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
      for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
        if (obstacle_objects[n].obstacle5_id === forcefield_objects[l].forcefield) {
          let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
          if (barrier) {
            playSound("save", 5000, scene);
            barrier.dispose();
            GUI_Score(100, score);
            GUI_Warning("You have removed the barrier!", 1500);
          }
        }
      }
    }
  }
}

export {removeBarrierOb5};
