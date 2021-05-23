import {playSound} from "../assets/playSound.js";
import {generateSpear} from "../assets/objects/generateSpear.js";

function removeSpearOb5(colMesh, ob5, scene, camera, player) {
  if (colMesh.name === "ghostSpear" && player.holding === "") {
    player.holding = "ghostSpear";
    playSound("cloth_inventory", 3000, scene);
    let spear = scene.getMeshByName(colMesh.name);
    spear.dispose();
    generateSpear("holding", "ghost", scene, 0, 0, camera);
    ob5.holding = true;
  }
}

export {removeSpearOb5};
