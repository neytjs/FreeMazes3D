import {playSound} from "../assets/playSound.js";
import {removeBeamOb7} from "./removeBeamOb7.js";

function destroyCrystalOb7(hit, solved, ob7, scene, player) {
  if (solved.solvedP7 === false) {
    if (hit.pickedMesh.name === "power1crystal" || hit.pickedMesh.name === "power2crystal" || hit.pickedMesh.name === "power3crystal") {
      let crystal = scene.getMeshByName(hit.pickedMesh.name);
    // make sure that the barrier still exists to prevent crash
      if (crystal) {
        crystal.dispose();
        playSound("8bit_bomb_explosion", 1100, scene);
        ob7.warned = true;
        setTimeout(() => {
          removeBeamOb7(hit.pickedMesh.name, ob7, scene, player);
        }, 1000);
      }
    }
  }
}

export {destroyCrystalOb7};
