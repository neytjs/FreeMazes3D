import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function collectTreasure(treasure_objects, trasure_stats, colMesh, score, scene, global_language) {
  for (let i = 0, length = treasure_objects.length; i < length; i++) {
    if (colMesh.uniqueId === treasure_objects[i].id) {
      trasure_stats.treasure_counter = trasure_stats.treasure_counter + 1;
      playSound("ring_inventory", 2000, scene);
      GUI_Warning(global_language.text.global.treasure.part1 + trasure_stats.treasure_counter + global_language.text.global.treasure.part2 + trasure_stats.treasure_total + global_language.text.global.treasure.part3, 2000, scene);
      GUI_Score(treasure_objects[i].score, score, global_language);
      colMesh.dispose();
      treasure_objects.splice(i, 1);
      break;
    }
  }
}

export {collectTreasure};
