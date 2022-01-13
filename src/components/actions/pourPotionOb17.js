import {ParticleSystem} from "@babylonjs/core/Particles";
import {Color3} from "@babylonjs/core/Maths/math";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {playSound} from "../assets/playSound.js";
import {master_color} from "../assets/cauldron_colors.js";
import {resetPuzzleOb17} from "./resetPuzzleOb17.js";
import {removeBarrierOb17} from "./removeBarrierOb17.js";
import {returnLiquidTexture} from "../assets/textures.js";

function pourPotionOb17(hit, scene, camera, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score, ob17, player) {
  if (solved.solvedP17 === false && player.health >= 0) {
    if (hit.pickedMesh.name === "cauldronOb17") {
      let inv_item = inventory[inventory_tracker.current_item];
      if (inv_item.name === "red_potion" || inv_item.name === "blue_potion" || inv_item.name === "green_potion" || inv_item.name === "yellow_potion") {
        playSound("bubble_01", 1500, scene);
        function pickNewLiquidColor() {
          if (ob17.liquid_color === "") {
            ob17.liquid_color = inv_item.color_name;
          } else if (ob17.liquid_color === "red" && inv_item.color_name === "blue" || ob17.liquid_color === "blue" && inv_item.color_name === "red") {
            ob17.liquid_color = "purple";
          } else if (ob17.liquid_color === "red" && inv_item.color_name === "green" || ob17.liquid_color === "green" && inv_item.color_name === "red") {
            ob17.liquid_color = "brown";
          } else if (ob17.liquid_color === "red" && inv_item.color_name === "yellow" || ob17.liquid_color === "yellow" && inv_item.color_name === "red") {
            ob17.liquid_color = "orange";
          } else if (ob17.liquid_color === "green" && inv_item.color_name === "blue" || ob17.liquid_color === "blue" && inv_item.color_name === "green") {
            ob17.liquid_color = "teal";
          } else if (ob17.liquid_color === "green" && inv_item.color_name === "yellow" || ob17.liquid_color === "yellow" && inv_item.color_name === "green") {
            ob17.liquid_color = "yellow_green";
          } else if (ob17.liquid_color === "blue" && inv_item.color_name === "yellow" || ob17.liquid_color === "yellow" && inv_item.color_name === "blue") {
            ob17.liquid_color = "green";
          } else if (ob17.liquid_color === "green" && inv_item.color_name === "green") {
            ob17.liquid_color = "green";
          } else {
            ob17.liquid_color = "brown";
          }
        }
        pickNewLiquidColor();
        function assignNewLiquidColor() {
          let liquid = scene.getMeshByName("cauldronLiquidOb17");
          let col3 = {};
          let liquid_texture = "";
          switch (ob17.liquid_color) {
            case "red":
              col3 = new Color3(1, 0, 0);
              liquid_texture = "acid_red";
            break;
            case "green":
              col3 = new Color3(0, 1, 0);
              liquid_texture = "acid_green";
            break;
            case "blue":
              col3 = new Color3(0, 0, 1);
              liquid_texture = "acid_blue";
            break;
            case "yellow":
              col3 = new Color3(1, 1, 0);
              liquid_texture = "acid_yellow";
            break;
            case "yellow_green":
              col3 = new Color3(0.7, 1, 0);
              liquid_texture = "acid_yellowgreen";
            break;
            case "orange":
              col3 = new Color3(1, 0.5, 0);
              liquid_texture = "acid_orange";
            break;
            case "purple":
              col3 = new Color3(0.6, 0, 1);
              liquid_texture = "acid_purple";
            break;
            case "teal":
              col3 = new Color3(0, 1, 0.5);
              liquid_texture = "acid_teal";
            break;
            case "brown":
              col3 = new Color3(0.56, 0.31, 0.1);
              liquid_texture = "acid_brown";
            break;
          }
          liquid.material.diffuseTexture = returnLiquidTexture(liquid_texture, scene);
          let particleSystem = scene.getParticleSystemByID("cauldronParticles");
          particleSystem.removeColorGradient(0);
          particleSystem.addColorGradient(0, col3);
        }
        assignNewLiquidColor();
        inventory.splice(inventory_tracker.current_item, 1);
        GUI_InventoryDec(inventory, inventory_tracker);
        GUI_InventoryDisplay(inventory, inventory_tracker);
      // if they failed... punish them and reset the puzzle.
        if (ob17.liquid_color === "brown") {
          resetPuzzleOb17(scene, camera, inventory, inventory_tracker, ob17, player)
        }
      // if they solved puzzle
        if (ob17.liquid_color === master_color[0]) {
          removeBarrierOb17(solved, scene, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score);
        }
      }
    }
  }
}

export {pourPotionOb17};
