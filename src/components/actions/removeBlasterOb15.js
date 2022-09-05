import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function removeBlasterOb15(colMesh, scene, camera, player) {
  if (colMesh.name === "blasterOb15item" && player.holding === "") {
    playSound("cloth_inventory", 3000, scene);
    let blasterItem = scene.getMeshByName(colMesh.name);
    blasterItem.position.y = -1000;
    let blasterHolding = scene.getMeshByName("blasterOb15");
    blasterHolding.position = new Vector3(0, -5, 4.5);
    blasterHolding.renderingGroupId = 1;
    blasterHolding.parent = camera;
    player.holding = "blasterOb15";
  }
}

export {removeBlasterOb15};
