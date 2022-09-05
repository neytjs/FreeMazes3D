import {playSound} from "../assets/playSound.js";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {returnLiquidTexture} from "../assets/textures.js";

function insertPowderOb22(hit, solved, ob22, inventory, inventory_tracker, scene) {
  if (solved.solvedP22 === false) {
    let liquid = scene.getMeshByName("liquidOb22");
    let invUpdateAndSound = () => {
      inventory.splice(inventory_tracker.current_item, 1);
      GUI_InventoryDec(inventory, inventory_tracker);
      GUI_InventoryDisplay(inventory, inventory_tracker);
      playSound("cloth_inventory", 3000, scene);
    }
    let setLiquidTexture = () => {
      liquid.material.diffuseTexture = returnLiquidTexture("water", scene);
      liquid.material.diffuseTexture.uScale = 10;
      liquid.material.diffuseTexture.vScale = 10;
    }
    if (hit.pickedMesh.name === "drainOb22a" && inventory[inventory_tracker.current_item].type === "purificationGemPowderOb22" && ob22.drain1 === false) {
      ob22.drain1 = true;
      invUpdateAndSound();
      if (ob22.drain1 === true && ob22.drain2 === true) {
        setLiquidTexture();
      }
    }
    if (hit.pickedMesh.name === "drainOb22b" && inventory[inventory_tracker.current_item].type === "purificationGemPowderOb22" && ob22.drain2 === false) {
      ob22.drain2 = true;
      invUpdateAndSound();
      if (ob22.drain1 === true && ob22.drain2 === true) {
        setLiquidTexture();
      }
    }
  }
}

export {insertPowderOb22};
