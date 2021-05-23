import {coinMatch} from "./obstacles/coinMatch.js";
import {bulbMatch} from "./obstacles/bulbMatch.js";
import {sphereAgents} from "./obstacles/sphereAgents.js";
import {moveBridges} from "./obstacles/moveBridges.js";
import {ghostButton} from "./obstacles/ghostButton.js";
import {carryCrystals} from "./obstacles/carryCrystals.js";
import {enterHut} from "./obstacles/enterHut.js";
import {growGarden} from "./obstacles/growGarden.js";

function generateObstacles(object_name, x, z, scene, global_objects, item_id, camera) {
  switch (object_name) {
    case "coin_match":
      coinMatch(x, z, scene, global_objects, item_id, camera);
    break;
    case "bulb_match":
      bulbMatch(x, z, scene, global_objects, item_id, camera);
    break;
    case "sphere_agents":
      sphereAgents(x, z, scene, global_objects, item_id, camera);
    break;
    case "move_bridges":
      moveBridges(x, z, scene, global_objects, item_id, camera);
    break;
    case "ghost_button":
      ghostButton(x, z, scene, global_objects, item_id, camera);
    break;
    case "carry_crystals":
      carryCrystals(x, z, scene, global_objects, item_id, camera);
    break;
    case "enter_hut":
      enterHut(x, z, scene, global_objects, item_id, camera);
    break;
    case "grow_garden":
      growGarden(x, z, scene, global_objects, item_id, camera);
    break;
  }
}

export {generateObstacles};
