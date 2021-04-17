import {generateKey} from "./objects/generateKey.js";
import {generateDoor} from "./objects/generateDoor.js";
import {generatePortal} from "./objects/generatePortal.js";
import {generateGem} from "./objects/generateGem.js";
import {generateTreasure} from "./objects/generateTreasure.js";

function generateObjects(object_name, x, z, scene, global_objects, item_id, special) {
  switch (object_name) {
    case "copper_key":
      generateKey("copper", x, z, scene, global_objects, item_id, special);
    break;
    case "silver_key":
      generateKey("silver", x, z, scene, global_objects, item_id, special);
    break;
    case "gold_key":
      generateKey("gold", x, z, scene, global_objects, item_id, special);
    break;
    case "force_field":
      generateDoor("force_field", x, z, scene, global_objects, item_id, special);
    break;
    case "gate":
      generateDoor("dungeon_gate", x, z, scene, global_objects, item_id, special);
    break;
    case "start":
      generatePortal("start_portal", x, z, scene, global_objects, item_id, special);
    break;
    case "exit_unpowered":
      generatePortal("exit_portal_unpowered", x, z, scene, global_objects, item_id, special);
    break;
    case "exit_powered":
      generatePortal("exit_portal_powered", x, z, scene, global_objects, item_id, special);
    break;
    case "portal_gem":
      generateGem("portal_gem", x, z, scene, global_objects, item_id, special);
    break;
    case "silver_ring":
      generateTreasure("silver", x, z, scene, global_objects, item_id, special);
    break;
    case "gold_ring":
      generateTreasure("gold", x, z, scene, global_objects, item_id, special);
    break;
  }
}

export {generateObjects};
