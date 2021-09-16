import {playSound} from "../assets/playSound.js";
import {movePlayer} from "./movePlayer.js";

function teleportPlayerOb4(obstacle_objects, colMesh, camera, scene) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "teleporter") {
      playSound("anchor_action_ind", 3000, scene);
      movePlayer(camera, obstacle_objects.exit_pos.x, obstacle_objects.exit_pos.z, obstacle_objects.exit_pos.y);
    }
  }
}

export {teleportPlayerOb4};
