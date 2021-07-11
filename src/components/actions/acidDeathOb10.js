import {playSound} from "../assets/playSound.js";

function acidDeathOb10(obstacle_objects, colMesh, camera, scene, ob10, player) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "acid") {
      if (ob10.dying === false) {
        ob10.dying = true;
        playSound("aargh2", 1000, scene);
        camera.speed = 0;
        setTimeout(() => {
          playSound("anchor_action_sum", 3000, scene);
          player.health = 100;
          camera.speed = 0.7;
          camera.position.x = obstacle_objects.exit_pos.x;
          camera.position.z = obstacle_objects.exit_pos.z;
          camera.position.y = obstacle_objects.exit_pos.y;
          ob10.dying = false;
        }, 500);
      }
    }
  }
}

export {acidDeathOb10};
