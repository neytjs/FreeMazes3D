import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function removeSpearOb5(colMesh, ob5, scene, camera, player) {
  if (colMesh.name === "ghostSpearitem" && player.holding === "") {
    playSound("cloth_inventory", 3000, scene);
    let spearItem = scene.getMeshByName(colMesh.name);
    spearItem.position.y = -1000;
    let spearHolding = scene.getMeshByName("ghostSpear");
    spearHolding.renderingGroupId = 1;
    spearHolding.parent = camera;
    spearHolding.position = new Vector3(0, -6, 8);
    player.holding = "ghostSpear";    
  }
}

export {removeSpearOb5};
