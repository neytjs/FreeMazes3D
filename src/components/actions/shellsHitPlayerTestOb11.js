import {playSound} from "../assets/playSound.js";

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
        camera.speed = 0;
        setTimeout(() => {
          playSound("anchor_action_sum", 3000, scene);
          player.health = 100;
          camera.speed = 0.7;
          camera.position.x = start_pos.x;
          camera.position.z = start_pos.y;
          camera.position.y = 4;
        }, 1000);
      }
    }
  }
}

export {shellsHitPlayerTestOb11};
