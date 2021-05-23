import {playSound} from "../assets/playSound.js";
import {generateSpear} from "../assets/objects/generateSpear.js";

function removeSpearOb7(colMesh, ob7, scene, camera, player) {
  if (colMesh.name === "hutSpear" && player.holding === "") {
    player.holding = "hutSpear";
    playSound("cloth_inventory", 3000, scene);
    let spear = scene.getMeshByName(colMesh.name);
    spear.dispose();
    generateSpear("holding", "hut", scene, 0, 0, camera);
    ob7.holding = true;
  }
}

export {removeSpearOb7};
