import {playSound} from "../assets/playSound.js";
import {revivingPlayer, playerRevived} from "../gui/gui_revive.js";
import {movePlayer} from "./movePlayer.js";

function acidDeathOb10(obstacle_objects, colMesh, camera, scene, ob10, player) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "acid") {
      if (ob10.dying === false) {
        player.health = 0;
        ob10.dying = true;
        playSound("aargh2", 1000, scene);
        revivingPlayer();
        movePlayer(camera, 10000, 10000, 0);
        setTimeout(() => {
          playSound("anchor_action_sum", 3000, scene);
          player.health = 100;
          movePlayer(camera, obstacle_objects.exit_pos.x, obstacle_objects.exit_pos.z, obstacle_objects.exit_pos.y);
          playerRevived();
          ob10.dying = false;
        }, 1000);
      }
    }
  }
}

export {acidDeathOb10};
