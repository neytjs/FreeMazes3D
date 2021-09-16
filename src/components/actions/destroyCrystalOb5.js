import {playSound} from "../assets/playSound.js";
import {removeGhostOb5} from "./removeGhostOb5.js";

function destroyCrystalOb5(hit, solved, ob5, scene, player) {
  if (solved.solvedP5 === false) {
    if (hit.pickedMesh.name === "ghost1crystal" || hit.pickedMesh.name === "ghost2crystal" || hit.pickedMesh.name === "ghost3crystal") {
      let crystal = scene.getMeshByName(hit.pickedMesh.name);
    // make sure that the barrier still exists to prevent crash
      if (crystal) {
        crystal.dispose();
        playSound("8bit_bomb_explosion", 1100, scene);
        ob5.warned = true;
        setTimeout(() => {
          removeGhostOb5(hit.pickedMesh.name, ob5, scene, player);
        }, 1000);
      }
    }
  }
}

export {destroyCrystalOb5};
