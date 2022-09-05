import {generateKey} from "./objects/generateKey.js";
import {generateGate} from "./objects/generateGate.js";
import {generateForceField} from "./objects/generateForceField.js";
import {generatePortal} from "./objects/generatePortal.js";
import {generateGem} from "./objects/generateGem.js";
import {generateTreasure} from "./objects/generateTreasure.js";

function generateObjects(object_name, x, z, scene, global_objects, item_id, special, global_language) {
  switch (object_name) {
    case "copper_key":
      generateKey("copper", x, z, scene, global_objects, item_id, special, global_language);
    break;
    case "silver_key":
      generateKey("silver", x, z, scene, global_objects, item_id, special, global_language);
    break;
    case "gold_key":
      generateKey("gold", x, z, scene, global_objects, item_id, special, global_language);
    break;
    case "force_field":
      generateForceField(x, z, scene, global_objects, item_id, special);
    break;
    case "gate":
      generateGate(x, z, scene, global_objects, item_id, special);
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
      generateGem("portal_gem", x, z, scene, global_objects, item_id, special, global_language);
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
