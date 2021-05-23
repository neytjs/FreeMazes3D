import {playSound} from "../assets/playSound.js";
import {generateWateringCan} from "../assets/objects/generateWateringCan.js";

function removeWateringCanOb8(colMesh, scene, camera, player) {
  if (colMesh.name === "wateringCan") {
    player.holding = "wateringCan";
    let wateringCan = scene.getMeshByName(colMesh.name);
    playSound("cloth_inventory", 3000, scene);
    wateringCan.dispose();
    generateWateringCan("holding", scene, 0, 0, camera);
  }
}

export {removeWateringCanOb8};
