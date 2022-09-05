import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryEnd} from "../gui/gui_inventory_end.js";
import {playSound} from "../assets/playSound.js";

function removeItemOb22(obstacle_objects, inventory, inventory_tracker, colMesh, scene) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "fuelTankOb22" || obstacle_objects.type === "purificationGemOb22" || obstacle_objects.type === "purificationGemPowderOb22") {
      playSound("cloth_inventory", 3000, scene);
      inventory.push(obstacle_objects);
      let item = scene.getMeshByName(colMesh.name);
      item.position.y = -1000;
      GUI_InventoryEnd(inventory, inventory_tracker);
      GUI_InventoryDisplay(inventory, inventory_tracker);
    }
  }
}

export {removeItemOb22};
