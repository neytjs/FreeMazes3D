import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryEnd} from "../gui/gui_inventory_end.js";
import {playSound} from "../assets/playSound.js";

function pickUpBallOb9(hit_name, ob9, solved, inventory, inventory_tracker, scene) {
  if (solved.solvedP9 === false && ob9.just_accessed === false) {
    if ((hit_name === "pipe1exit" && ob9.pipe1exit === true && ob9.pipe1rolling === false) || (hit_name === "pipe2exit" && ob9.pipe2exit === true && ob9.pipe2rolling === false) || (hit_name === "pipe3exit" && ob9.pipe3exit === true && ob9.pipe3rolling === false) || (hit_name === "pipe4exit" && ob9.pipe4exit === true && ob9.pipe4rolling === false)) {
      ob9.just_accessed = true;
      ob9[hit_name] = false;
      ob9["pipe"+hit_name[4]+"entrance"] = false;
      ob9["plate" + hit_name[4]] = false;
      let hidden = "hiddenBall" + hit_name[4];
      let hiddenBall = scene.getMeshByName(hidden);
      hiddenBall.position.y = 6.5;
      if (ob9["particle"+hit_name[4]]) {
        ob9["particle"+hit_name[4]].dispose();
        ob9["particle"+hit_name[4]] = false;
      }
      playSound("cloth_inventory", 3000, scene);
      inventory.push(ob9[hidden]);
      GUI_InventoryEnd(inventory, inventory_tracker);
      GUI_InventoryDisplay(inventory, inventory_tracker);
      ob9[hidden] = {};
      setTimeout(() => {
        ob9.just_accessed = false;
      }, 250);
    }
  }
}

export {pickUpBallOb9};
