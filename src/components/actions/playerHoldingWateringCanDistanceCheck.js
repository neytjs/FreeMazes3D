import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";

function playerHoldingWateringCanDistanceCheck(obstacle_objects, player, camera, scene, solved, ob8) {
  if (player.holding !== "") {
    let distance = 50;
    if (player.holding === "wateringCan") {
      if (Vector3.Distance(new Vector3(player.puzzle_pos["wateringCan"].x, player.puzzle_pos["wateringCan"].y, player.puzzle_pos["wateringCan"].z), camera.position) > distance) {
        player.holding = "";
        playSound("cloth_inventory", 3000, scene);
        ob8.water = 0;
        ob8.pouring = false;
        if (ob8.pouring_sound) {
          ob8.pouring_sound.dispose(true, true);
          ob8.pouring_sound = null;
        }
        let wateringCan = scene.getMeshByName("wateringCan");
        wateringCan.renderingGroupId = 0;
        wateringCan.parent = null;
        wateringCan.position.y = -1000;
        let wateringCanPouring = scene.getMeshByName("wateringCanpouring");
        wateringCanPouring.renderingGroupId = 0;
        wateringCanPouring.parent = null;
        wateringCanPouring.position.y = -1000;
        if (solved.solvedP8 === false) {
          let wateringCanItem = scene.getMeshByName("wateringCanitem");
          wateringCanItem.position.y = 0;
        }
      }
    }
  }
}

export {playerHoldingWateringCanDistanceCheck};
