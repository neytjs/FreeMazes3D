import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function removeWateringCanOb23(colMesh, scene, camera, player) {
  if (colMesh.name === "wateringCanHedgeMazeitem" && player.holding === "") {
    playSound("cloth_inventory", 3000, scene);
    let wateringCanItem = scene.getMeshByName(colMesh.name);
    wateringCanItem.position.y = -1000;
    let wateringCanHolding = scene.getMeshByName("wateringCanHedgeMaze");
    wateringCanHolding.position = new Vector3(0, -2.1, 0);
    wateringCanHolding.renderingGroupId = 1;
    wateringCanHolding.parent = camera;
    player.holding = "wateringCanHedgeMaze";
  }
}

export {removeWateringCanOb23};
