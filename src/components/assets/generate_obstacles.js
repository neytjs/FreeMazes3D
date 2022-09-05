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
import {potionCauldron} from "./obstacles/potionCauldron.js";
import {crystalTemple} from "./obstacles/crystalTemple.js";
import {crystalShards} from "./obstacles/crystalShards.js";
import {rollingPipes} from "./obstacles/rollingPipes.js";
import {runMachine} from "./obstacles/runMachine.js";
import {purifyGarden} from "./obstacles/purifyGarden.js";
import {purifyMaze} from "./obstacles/purifyMaze.js";
import {lavaRoom} from "./obstacles/lavaRoom.js";

function generateObstacles(object_name, x, z, scene, global_objects, item_id, camera, global_language) {
  switch (object_name) {
    case "coin_match":
      coinMatch(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "bulb_match":
      bulbMatch(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "sphere_agents":
      sphereAgents(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "move_bridges":
      moveBridges(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "ghost_button":
      ghostButton(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "carry_crystals":
      carryCrystals(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "enter_hut":
      enterHut(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "grow_garden":
      growGarden(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "down_pipes":
      downPipes(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "tight_rope":
      tightRope(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "dodge_turret":
      dodgeTurret(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "mob_shoots":
      mobShoots(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "powder_pyramid":
      powderPyramid(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "haunted_crypt":
      hauntedCrypt(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "bulls_eye":
      bullsEye(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "timed_buttons":
      timedButtons(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "potion_cauldron":
      potionCauldron(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "crystal_temple":
      crystalTemple(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "crystal_shards":
      crystalShards(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "rolling_pipes":
      rollingPipes(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "run_machine":
      runMachine(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "purify_garden":
      purifyGarden(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "purify_maze":
      purifyMaze(x, z, scene, global_objects, item_id, camera, global_language);
    break;
    case "lava_room":
      lavaRoom(x, z, scene, global_objects, item_id, camera, global_language);
    break;
  }
}

export {generateObstacles};
