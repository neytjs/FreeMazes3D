import {coinMatch} from "./obstacles/coinMatch.js";
import {bulbMatch} from "./obstacles/bulbMatch.js";
import {sphereAgents} from "./obstacles/sphereAgents.js";
import {moveBridges} from "./obstacles/moveBridges.js";
import {ghostButton} from "./obstacles/ghostButton.js";
import {carryCrystals} from "./obstacles/carryCrystals.js";
import {enterHut} from "./obstacles/enterHut.js";
import {growGarden} from "./obstacles/growGarden.js";
import {downPipes} from "./obstacles/downPipes.js";
import {tightRope} from "./obstacles/tightRope.js";
import {dodgeTurret} from "./obstacles/dodgeTurret.js";
import {mobShoots} from "./obstacles/mobShoots.js";
import {powderPyramid} from "./obstacles/powderPyramid.js";
import {hauntedCrypt} from "./obstacles/hauntedCrypt.js";
import {bullsEye} from "./obstacles/bullsEye.js";
import {timedButtons} from "./obstacles/timedButtons.js";

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
    case "down_pipes":
      downPipes(x, z, scene, global_objects, item_id, camera);
    break;
    case "tight_rope":
      tightRope(x, z, scene, global_objects, item_id, camera);
    break;
    case "dodge_turret":
      dodgeTurret(x, z, scene, global_objects, item_id, camera);
    break;
    case "mob_shoots":
      mobShoots(x, z, scene, global_objects, item_id, camera);
    break;
    case "powder_pyramid":
      powderPyramid(x, z, scene, global_objects, item_id, camera);
    break;
    case "haunted_crypt":
      hauntedCrypt(x, z, scene, global_objects, item_id, camera);
    break;
    case "bulls_eye":
      bullsEye(x, z, scene, global_objects, item_id, camera);
    break;
    case "timed_buttons":
      timedButtons(x, z, scene, global_objects, item_id, camera);
    break;
  }
}

export {generateObstacles};
