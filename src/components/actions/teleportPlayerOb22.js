import {Vector3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";
import {playSound} from "../assets/playSound.js";
import {movePlayer} from "./movePlayer.js";

function teleportPlayerOb22(obstacle_objects, colMesh, camera, scene, player) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "teleporter22") {
      playSound("anchor_action_ind", 3000, scene);
      movePlayer(camera, obstacle_objects.exit_pos.x, obstacle_objects.exit_pos.z, obstacle_objects.exit_pos.y);
      camera.inertia = 0;
      if (camera.position.x > 800) {
        let teleporter = scene.getMeshByName("teleporterOb22b");
        camera.setTarget(teleporter.position);
        camera.rotation.y = 1.57;
      } else {
        let teleporter = scene.getMeshByName("teleporterOb22a");
        camera.setTarget(teleporter.position);
        camera.rotation.y = 1.57;
        player.softLanded = true;
      }
      setTimeout(() => {
        camera.inertia = 0.9;
      }, 100);
    }
  }
}

export {teleportPlayerOb22};
