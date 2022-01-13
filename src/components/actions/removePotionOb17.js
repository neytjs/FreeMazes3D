import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryEnd} from "../gui/gui_inventory_end.js";
import {playSound} from "../assets/playSound.js";

function removePotionOb17(obstacle_objects, inventory, inventory_tracker, colMesh, scene) {
  if (colMesh.name === "red_potionOb17" || colMesh.name === "blue_potionOb17" || colMesh.name === "green_potionOb17" || colMesh.name === "yellow_potionOb17") {
    playSound("cloth_inventory", 3000, scene);
    let potion = scene.getMeshByName(colMesh.name);
    potion.position.y = -1000;
    inventory.push(obstacle_objects);
    GUI_InventoryEnd(inventory, inventory_tracker);
    GUI_InventoryDisplay(inventory, inventory_tracker);
  }
}

export {removePotionOb17};
