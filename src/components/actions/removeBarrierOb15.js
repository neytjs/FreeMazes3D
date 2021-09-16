import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function removeBarrierOb15(ob15, solved, obstacle_objects, forcefield_objects, scene, score, player) {
  if (ob15.remove) {
    ob15.remove = false;
    solved.solvedP15 = true;
    player.holding = "";
    let blast = scene.getMeshByName("blastOb15");
    let blaster = scene.getMeshByName("blasterOb15");
    let blasterItem = scene.getMeshByName("blasterOb15item");
    for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
      for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
        if (obstacle_objects[n].obstacle15_id === forcefield_objects[l].forcefield) {
          let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
          if (barrier) {
            setTimeout(() => {
              playSound("save", 5000, scene);
              barrier.dispose();
              blast.dispose();
              blaster.dispose();
              blasterItem.dispose();
              GUI_Score(100, score);
              GUI_Warning("You have removed the barrier!", 1500);
            }, 1500);
          }
        }
      }
    }
  }
}

export {removeBarrierOb15};
