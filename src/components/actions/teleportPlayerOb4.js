import {playSound} from "../assets/playSound.js";

function teleportPlayerOb4(obstacle_objects, colMesh, camera, scene) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "teleporter") {
      playSound("anchor_action_ind", 3000, scene);
      camera.position.x = obstacle_objects.exit_pos.x;
      camera.position.z = obstacle_objects.exit_pos.z;
      camera.position.y = obstacle_objects.exit_pos.y;
    }
  }
}

export {teleportPlayerOb4};
