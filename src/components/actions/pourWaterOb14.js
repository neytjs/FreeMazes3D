import {playSound} from "../assets/playSound.js";
import {removeGhostOb14} from "./removeGhostOb14.js";

function pourWaterOb14(hit, scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score, ob14) {
  if (solved.solvedP14 === false) {
    if (hit.pickedMesh.name === "ghost1Barrier" || hit.pickedMesh.name === "ghost2Barrier" || hit.pickedMesh.name === "ghost3Barrier") {
      if (inventory[inventory_tracker.current_item].name === "holy_water" && hit.pickedMesh.name === "ghost1Barrier") {
        if (ob14.pouring) {
          playSound("bubble_01", 1000, scene);
          ob14.pouring = false;
          setTimeout(() => {
            ob14.ghost1Barrier = true;
            removeGhostOb14(hit.pickedMesh.name, ob14, scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score);
          }, 800);
        }
      }
      if (inventory[inventory_tracker.current_item].name === "holy_water" && hit.pickedMesh.name === "ghost2Barrier") {
        if (ob14.pouring) {
          playSound("bubble_01", 1000, scene);
          ob14.pouring = false;
          setTimeout(() => {
            ob14.ghost2Barrier = true;
            removeGhostOb14(hit.pickedMesh.name, ob14, scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score);
          }, 800);
        }
      }
      if (inventory[inventory_tracker.current_item].name === "holy_water" && hit.pickedMesh.name === "ghost3Barrier") {
        if (ob14.pouring) {
          playSound("bubble_01", 1000, scene);
          ob14.pouring = false;
          setTimeout(() => {
            ob14.ghost3Barrier = true;
            removeGhostOb14(hit.pickedMesh.name, ob14, scene, solved, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score);
          }, 800);
        }
      }
    }
  }
}

export {pourWaterOb14};
