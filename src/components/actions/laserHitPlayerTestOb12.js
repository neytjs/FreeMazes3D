import {playSound} from "../assets/playSound.js";

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

export {laserHitPlayerTestOb12};
