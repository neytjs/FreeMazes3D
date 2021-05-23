import {playSound} from "../assets/playSound.js";

function fillWateringCanOb8(scene, solved, hit_name, ob8, player) {
  if (hit_name === "waterWell" && player.holding === "wateringCan" && solved.solvedP8 === false) {
    playSound("bubble_01", 1500, scene);
    ob8.water = 1;
  }
}

export {fillWateringCanOb8};
