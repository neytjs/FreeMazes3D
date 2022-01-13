import {Vector3} from "@babylonjs/core/Maths/math";
import {playSound} from "../assets/playSound.js";
import {movePlayer} from "./movePlayer.js";

function teleportPlayerOb18(obstacle_objects, colMesh, camera, scene, ob18) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "teleporter18" && ob18.sounds.length < 6) {
      playSound("anchor_action_ind", 3000, scene);
      movePlayer(camera, obstacle_objects.exit_pos.x, obstacle_objects.exit_pos.z, obstacle_objects.exit_pos.y);
      camera.inertia = 0;
      if (camera.position.z > 900) {
        camera.setTarget(new Vector3(1020, 4, 1000));
      } else {
        let teleporter = scene.getMeshByName("teleporterOb18");
        camera.setTarget(teleporter.position);
        camera.rotation.y = 3.14;
      }
      setTimeout(() => {
        camera.inertia = 0.9;
      }, 100);
    }
  }
}

export {teleportPlayerOb18};
