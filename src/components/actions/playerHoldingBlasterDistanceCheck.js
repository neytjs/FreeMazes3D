import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function playerHoldingBlasterDistanceCheck(player, camera, scene, solved) {
  if (player.holding !== "") {
    let distance = 50;
    if (player.holding === "blasterOb15") {
      if (Vector3.Distance(new Vector3(player.puzzle_pos["blasterOb15"].x, player.puzzle_pos["blasterOb15"].y, player.puzzle_pos["blasterOb15"].z), camera.position) > distance) {
        player.holding = "";
        playSound("cloth_inventory", 3000, scene);
        let blaster = scene.getMeshByName("blasterOb15");
        blaster.renderingGroupId = 0;
        blaster.parent = null;
        blaster.position.y = -1000;
        if (solved.solvedP15 === false) {
          let blasterItem = scene.getMeshByName("blasterOb15item");
          blasterItem.position.y = 2;
        }
      }
    }
  }
}

export {playerHoldingBlasterDistanceCheck};
