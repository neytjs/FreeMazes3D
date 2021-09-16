import {playSound} from "../assets/playSound.js";
import {revivingPlayer, playerRevived} from "../gui/gui_revive.js";
import {movePlayer} from "./movePlayer.js";

function shellsHitPlayerTestOb11(ob11, colMesh, scene, camera, player, start_pos) {
  if (ob11.firing) {
    if (colMesh.name === "shellsOb11") {
      ob11.hit = true;
      let shells = scene.getMeshByName("shellsOb11");
      shells.dispose(true, true);
      shells = null;
      player.health = player.health - 35;
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

export {shellsHitPlayerTestOb11};
