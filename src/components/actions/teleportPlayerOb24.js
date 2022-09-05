import {Vector3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";
import {playSound} from "../assets/playSound.js";
import {movePlayer} from "./movePlayer.js";

function teleportPlayerOb24(obstacle_objects, colMesh, camera, scene) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "teleporter24") {
      playSound("anchor_action_ind", 3000, scene);
      movePlayer(camera, obstacle_objects.exit_pos.x, obstacle_objects.exit_pos.z, obstacle_objects.exit_pos.y);
      camera.inertia = 0;
      if (camera.position.y > 1900) {
        camera.setTarget(new Vector3(15, 2004, -15));
      } else {
        let teleporter = scene.getMeshByName("teleporterOb24a");
        camera.setTarget(teleporter.position);
        camera.rotation.y = 1.57;
      }
      setTimeout(() => {
        camera.inertia = 0.9;
      }, 100);
    }
  }
}

export {teleportPlayerOb24};
