import {ParticleSystem} from "@babylonjs/core/Particles";
import {Texture} from "@babylonjs/core/Materials/Textures";
import {Color3} from "@babylonjs/core/Maths/math";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function placePowderOb13(hit, scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score, ob13, global_language) {
  if (solved.solvedP13 === false) {
    if (hit.pickedMesh.name === "greenPlate" || hit.pickedMesh.name === "redPlate" || hit.pickedMesh.name === "bluePlate") {
      let matches = 0;
      if (inventory[inventory_tracker.current_item].name === "green_powder" && hit.pickedMesh.name === "greenPlate") {
        matches = matches + 1;
        ob13.green_plate = true;
        let hidden = scene.getMeshByName("greenHiddenOb13");
        let hiddenPowder = scene.getMeshByName("greenHiddenPowderOb13");
        hiddenPowder.material.alpha = 1;
        const particleSystem = new ParticleSystem("powderParticles", 2000);
        particleSystem.particleTexture = new Texture("./imgs/circle_light.png");
        particleSystem.emitter = hidden;
        particleSystem.addColorGradient(0, new Color3(inventory[inventory_tracker.current_item].color_code.r, inventory[inventory_tracker.current_item].color_code.g, inventory[inventory_tracker.current_item].color_code.b));
        particleSystem.start();
      }
      if (inventory[inventory_tracker.current_item].name === "red_powder" && hit.pickedMesh.name === "redPlate") {
        matches = matches + 1;
        ob13.red_plate = true;
        let hidden = scene.getMeshByName("redHiddenOb13");
        let hiddenPowder = scene.getMeshByName("redHiddenPowderOb13");
        hiddenPowder.material.alpha = 1;
        const particleSystem = new ParticleSystem("powderParticles", 2000);
        particleSystem.particleTexture = new Texture("./imgs/circle_light.png");
        particleSystem.emitter = hidden;
        particleSystem.addColorGradient(0, new Color3(inventory[inventory_tracker.current_item].color_code.r, inventory[inventory_tracker.current_item].color_code.g, inventory[inventory_tracker.current_item].color_code.b));
        particleSystem.start();
      }
      if (inventory[inventory_tracker.current_item].name === "blue_powder" && hit.pickedMesh.name === "bluePlate") {
        matches = matches + 1;
        ob13.blue_plate = true;
        let hidden = scene.getMeshByName("blueHiddenOb13");
        let hiddenPowder = scene.getMeshByName("blueHiddenPowderOb13");
        hiddenPowder.material.alpha = 1;
        const particleSystem = new ParticleSystem("powderParticles", 2000);
        particleSystem.particleTexture = new Texture("./imgs/circle_light.png");
        particleSystem.emitter = hidden;
        particleSystem.addColorGradient(0, new Color3(inventory[inventory_tracker.current_item].color_code.r, inventory[inventory_tracker.current_item].color_code.g, inventory[inventory_tracker.current_item].color_code.b));
        particleSystem.start();
      }

      if (matches > 0) {
        playSound("positive", 2000, scene);
        inventory.splice(inventory_tracker.current_item, 1);
        GUI_InventoryDec(inventory, inventory_tracker);
        GUI_InventoryDisplay(inventory, inventory_tracker);
      // now test to see if they have solved the puzzle
        if (ob13.green_plate === true && ob13.red_plate === true && ob13.blue_plate === true) {
          solved.solvedP13 = true;
          for (let i = 0, length = obstacle_objects.length; i < length; i++) {
            for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
              if (obstacle_objects[i].obstacle13_id === forcefield_objects[l].forcefield) {
                let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
              // make sure that the barrier still exists to prevent crash
                if (barrier) {
                  setTimeout(() => {
                    playSound("save", 5000, scene);
                    barrier.dispose();
                    GUI_Score(200, score, global_language);
                    GUI_Warning(global_language.text.global.success, 1500, scene);
                  }, 1500);
                }
              }
            }
          }
        }
      } else {
        if (inventory.length > 1) {
          GUI_Warning(global_language.text.puzzles.ob13.warn2, 1500, scene);
        }
      }
    }
  }
}

export {placePowderOb13};
