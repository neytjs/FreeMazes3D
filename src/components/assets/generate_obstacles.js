import {coinMatch} from "./obstacles/coinMatch.js";
import {bulbMatch} from "./obstacles/bulbMatch.js";
import {sphereAgents} from "./obstacles/sphereAgents.js";
import {moveBridges} from "./obstacles/moveBridges.js";

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
  }
}

export {generateObstacles};
