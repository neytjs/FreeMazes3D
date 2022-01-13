import {Color3} from "@babylonjs/core/Maths/math";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {playSound} from "../assets/playSound.js";
import {revivingPlayer, playerRevived} from "../gui/gui_revive.js";
import {movePlayer} from "./movePlayer.js";
import {returnLiquidTexture} from "../assets/textures.js";

function resetPuzzleOb17(scene, camera, inventory, inventory_tracker, ob17, player) {
  player.health = -100;
  playSound("8bit_bomb_explosion", 1100, scene);
  setTimeout(() => {
    playSound("aargh2", 1000, scene);
    revivingPlayer();
    movePlayer(camera, 10000, 10000, 0);

    let red_potion = scene.getMeshByName("red_potionOb17");
    red_potion.position.y = 0;
    let blue_potion = scene.getMeshByName("blue_potionOb17");
    blue_potion.position.y = 0;
    let green_potion = scene.getMeshByName("green_potionOb17");
    green_potion.position.y = 0;
    let yellow_potion = scene.getMeshByName("yellow_potionOb17");
    yellow_potion.position.y = 0;
    let liquid = scene.getMeshByName("cauldronLiquidOb17");

    ob17.liquid_color = "";
    liquid.material.diffuseTexture = returnLiquidTexture("acid_default", scene);
    let particleSystem = scene.getParticleSystemByID("cauldronParticles");
    particleSystem.removeColorGradient(0);
    particleSystem.addColorGradient(0, new Color3(0.67, 0.7, 0.65));

    let counter = 0;
    function removeIfPresent() {
      for (let i = 0, length = inventory.length; i < length; i++) {
        if (inventory[i].hasOwnProperty("name") && (inventory[i].name === "red_potion" || inventory[i].name === "blue_potion" || inventory[i].name === "green_potion" || inventory[i].name === "yellow_potion")) {
          inventory.splice(i, 1);
          counter = counter + 1;
          GUI_InventoryDec(inventory, inventory_tracker);
          GUI_InventoryDisplay(inventory, inventory_tracker);
          break;
        }
      }
      if (counter > 0) {
        counter = 0;
        removeIfPresent();
      }
    }
    removeIfPresent();
    inventory_tracker.current_item = 1;

    setTimeout(() => {
      playSound("anchor_action_sum", 3000, scene);
      let cauldron = scene.getMeshByName("cauldronOb17");
      player.health = 100;
      movePlayer(camera, cauldron.position.x, (cauldron.position.z - 6), 4);
      camera.setTarget(cauldron.position);
      camera.rotation.x = 0.2;
      playerRevived();
    }, 1000);
  }, 800);
}

export {resetPuzzleOb17};
