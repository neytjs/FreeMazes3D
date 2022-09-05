import {playSound} from "../assets/playSound.js";
import {movePlayer} from "./movePlayer.js";

function teleportPlayerOb4(obstacle_objects, colMesh, camera, scene, player) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "teleporter4") {
      player.softLanded = false;
      playSound("anchor_action_ind", 3000, scene);
      movePlayer(camera, obstacle_objects.exit_pos.x, obstacle_objects.exit_pos.z, obstacle_objects.exit_pos.y);
      camera.inertia = 0;
      setTimeout(() => {
        camera.inertia = 0.9;
      }, 100);
    }
  }
}

export {teleportPlayerOb4};
