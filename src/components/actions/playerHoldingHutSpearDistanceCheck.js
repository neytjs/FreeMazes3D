import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function playerHoldingHutSpearDistanceCheck(obstacle_objects, player, camera, scene, solved) {
  if (player.holding !== "") {
    let distance = 50;
    if (player.holding === "hutSpear") {
      if (Vector3.Distance(new Vector3(player.puzzle_pos["hutSpear"].x, player.puzzle_pos["hutSpear"].y, player.puzzle_pos["hutSpear"].z), camera.position) > distance) {
        player.holding = "";
        player.swing_spear = false;
        player.spear_forward = true;
        playSound("cloth_inventory", 3000, scene);
        let spear = scene.getMeshByName("hutSpear");
        spear.renderingGroupId = 0;
        spear.parent = null;
        spear.position.y = -1000;
        if (solved.solvedP5 === false) {
          let spearItem = scene.getMeshByName("hutSpearitem");
          spearItem.position.y = 0;
        }
      }
    }
  }
}

export {playerHoldingHutSpearDistanceCheck};
