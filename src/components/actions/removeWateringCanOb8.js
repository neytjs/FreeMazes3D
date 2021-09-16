import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function removeWateringCanOb8(colMesh, scene, camera, player) {
  if (colMesh.name === "wateringCanitem" && player.holding === "") {
    playSound("cloth_inventory", 3000, scene);
    let wateringCanItem = scene.getMeshByName(colMesh.name);
    wateringCanItem.position.y = -1000;
    let wateringCanHolding = scene.getMeshByName("wateringCan");
    wateringCanHolding.position = new Vector3(0, -2.1, 0);
    wateringCanHolding.renderingGroupId = 1;
    wateringCanHolding.parent = camera;
    player.holding = "wateringCan";    
  }
}

export {removeWateringCanOb8};
