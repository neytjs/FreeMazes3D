import {playSound} from "../assets/playSound.js";

function fillWateringCanOb23(scene, solved, hit_name, ob23, player) {
  if (hit_name === "waterWellHedgeMaze" && player.holding === "wateringCanHedgeMaze" && solved.solvedP23 === false) {   
    playSound("bubble_01", 1500, scene);
    ob23.water = 1;
  }
}
export {fillWateringCanOb23};
