import {playSound} from "../assets/playSound.js";

function climbLadder(obstacle_objects, colMesh, camera, scene, player) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "ladder" && camera.position.y < 5) {
      playSound("swish_2", 1000, scene);
      camera.position.x = obstacle_objects.exit_pos.x;
      camera.position.z = obstacle_objects.exit_pos.z;
      camera.position.y = obstacle_objects.exit_pos.y;
      player.landed = false;
      player.softLanded = false;
    }
  }
}

export {climbLadder};
