import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function playerHoldingGhostSpearDistanceCheck(player, camera, scene, solved) {
  if (player.holding !== "") {
    let distance = 50;
    if (player.holding === "ghostSpear") {
      if (Vector3.Distance(new Vector3(player.puzzle_pos["ghostSpear"].x, player.puzzle_pos["ghostSpear"].y, player.puzzle_pos["ghostSpear"].z), camera.position) > distance) {
        player.holding = "";
        player.swing_spear = false;
        player.spear_forward = true;
        playSound("cloth_inventory", 3000, scene);
        let spear = scene.getMeshByName("ghostSpear");
        spear.renderingGroupId = 0;
        spear.parent = null;
        spear.position.y = -1000;
        if (solved.solvedP5 === false) {
          let spearItem = scene.getMeshByName("ghostSpearitem");
          spearItem.position.y = 0;
        }
      }
    }
  }
}

export {playerHoldingGhostSpearDistanceCheck};
