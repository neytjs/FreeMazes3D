import {playSound} from "../assets/playSound.js";
import {revivingPlayer, playerRevived} from "../gui/gui_revive.js";
import {movePlayer} from "./movePlayer.js";

function laserHitPlayerTestOb12(ob12, colMesh, scene, camera, player, start_pos) {
  if (ob12.firing) {
    if (colMesh.name === "laserOb12") {
      ob12.hit = true;
      let laser = scene.getMeshByName("laserOb12");
      laser.dispose(true, true);
      laser = null;
      player.health = player.health - 25;
      playSound("aargh2", 1000, scene);
      if (player.health <= 0) {
        revivingPlayer();
        movePlayer(camera, 10000, 10000, 0);
        setTimeout(() => {
          playSound("anchor_action_sum", 3000, scene);
          player.health = 100;
          movePlayer(camera, start_pos.x, start_pos.y, 4);
          playerRevived();
        }, 1000);
      }
    }
  }
}

export {laserHitPlayerTestOb12};
