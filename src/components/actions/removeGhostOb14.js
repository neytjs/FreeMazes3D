import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function removeGhostOb14(hit_name, ob14, scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score) {
  let ghost = scene.getMeshByName(hit_name.substring(0, 6));
  ghost.dispose();
  ob14.ghost_part_counter = ob14.ghost_part_counter + 1;
  if (ob14.ghost_part_counter < 5) {
    removeGhostOb14(hit_name, ob14, scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score);
  } else {
    inventory.splice(inventory_tracker.current_item, 1);
    GUI_InventoryDec(inventory, inventory_tracker);
    GUI_InventoryDisplay(inventory, inventory_tracker);
    ob14.ghost_part_counter = 0;
    playSound("ghost", 4500, scene);
    GUI_Warning("You have calmed a restless spirit.", 2500);
    let ghostBarrier = scene.getMeshByName(hit_name.substring(0, 6) + "Barrier");
    if (ghostBarrier) {
      let gBSound = scene.getSoundByName(hit_name.substring(0, 6) + "BarrierSound");
      gBSound.detachFromMesh(ghostBarrier);
      gBSound.dispose(true, true);
      gBSound = null;
      ghostBarrier.dispose();
      ob14.pouring = true;
      if (ob14.ghost1Barrier === true && ob14.ghost2Barrier === true && ob14.ghost3Barrier === true) {
        solved.solvedP14 = true;
        for (let i = 0, length = obstacle_objects.length; i < length; i++) {
          for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
            if (obstacle_objects[i].obstacle14_id === forcefield_objects[l].forcefield) {
              let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
            // make sure that the barrier still exists to prevent crash
              if (barrier) {
                setTimeout(() => {
                  playSound("save", 5000, scene);
                  barrier.dispose();
                  GUI_Score(100, score);
                  GUI_Warning("You have removed the barrier!", 1500);
                }, 2500);
              }
            }
          }
        }
      }
    }
  }
}

export {removeGhostOb14};
