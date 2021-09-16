import {movePlayer} from "./movePlayer.js";

function climbStepOb15(obstacle_objects, colMesh, camera, scene) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "step" && camera.position.y < 4.05) {
      movePlayer(camera, camera.position.x, obstacle_objects.exit_pos.z, obstacle_objects.exit_pos.y);
    }
  }
}

export {climbStepOb15};
