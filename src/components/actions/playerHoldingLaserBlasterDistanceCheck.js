import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function playerHoldingLaserBlasterDistanceCheck(player, camera, scene, solved) {
  if (player.holding !== "") {
    let distance = 40;
    if (player.holding === "blasterOb24") {
      if (Vector3.Distance(new Vector3(player.puzzle_pos["blasterOb24"].x, player.puzzle_pos["blasterOb24"].y, player.puzzle_pos["blasterOb24"].z), camera.position) > distance) {
        player.holding = "";
        playSound("cloth_inventory", 3000, scene);
        let blaster = scene.getMeshByName("blasterOb24");
        blaster.renderingGroupId = 0;
        blaster.parent = null;
        blaster.position.y = -1000;
        if (solved.solvedP24 === false) {
          let blasterItem = scene.getMeshByName("blasterOb24item");
          blasterItem.position.y = 2025;
        }
      }
    }
  }
}

export {playerHoldingLaserBlasterDistanceCheck};
