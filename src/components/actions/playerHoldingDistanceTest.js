import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function playerHoldingDistanceTest(obstacle_objects, player) {
  for (let i = 0, length = obstacle_objects.length; i < length; i++) {
    if (obstacle_objects[i].type === "holdable") {
      player.puzzle_pos[obstacle_objects[i].name] = obstacle_objects[i].puzzle_pos;
    }
  }
}

export {playerHoldingDistanceTest};
