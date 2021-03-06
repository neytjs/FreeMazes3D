import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";

function powerPortal(hit, portal_objects, inventory, inventory_tracker, exit_pos, scene) {
  if (hit.pickedMesh.name === "teleporter_unpowered_barrier") {
    let matches = 0;
    let index = 0;
    for (let j = 0, jlength = inventory.length; j < jlength; j++) {
      if (inventory[j].gem) {
        matches = matches + 1;
        index = j;
      }
    }
    if (matches > 0) {
      if (index === inventory_tracker.current_item) {
        playSound("anchor_action_sum", 2000, scene);
        let portal = scene.getMeshByName("teleporter_unpowered");
        portal.dispose();
        inventory.splice(index, 1);
        GUI_InventoryDec(inventory, inventory_tracker);
        GUI_InventoryDisplay(inventory, inventory_tracker);
        hit.pickedMesh.dispose();
        let exit_powered = scene.getMeshByName("teleporter_powered");
        exit_powered.position.y = 0;
        let teleporter = scene.getMeshByName("teleporter_powered_barrier");
        teleporter.position.y = 3.25;
        let exitGem = scene.getMeshByName("exitGem");
        exitGem.position.y = 0;
        let exitSphere = scene.getMeshByName("exitSphere");
        exitSphere.position.y = 3.5;
        GUI_Warning("You have powered the exit portal! Press again to exit.", 2000);
      } else {
        GUI_Warning("You must select the portal gem.", 1200);
      }
    } else {
      GUI_Warning("You must find a special gem to power this portal.", 2000);
    }
  }
}

export {powerPortal};
