import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function collectTreasure(treasure_objects, trasure_stats, colMesh, score, scene) {
  for (let i = 0, length = treasure_objects.length; i < length; i++) {
    if (colMesh.uniqueId === treasure_objects[i].id) {
      trasure_stats.treasure_counter = trasure_stats.treasure_counter + 1;
      playSound("ring_inventory", 2000, scene);
      GUI_Warning("You have found " + trasure_stats.treasure_counter + " out of " + trasure_stats.treasure_total + " pieces of treasure.", 2000);
      GUI_Score(treasure_objects[i].score, score);
      colMesh.dispose();
      treasure_objects.splice(i, 1);
      break;
    }
  }
}

export {collectTreasure};
