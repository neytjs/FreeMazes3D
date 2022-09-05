import {Vector3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";
import {playSound} from "../assets/playSound.js";
import {movePlayer} from "./movePlayer.js";

function teleportPlayerOb23(obstacle_objects, colMesh, camera, scene, ob23, player, solved) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "teleporter23") {
      playSound("anchor_action_ind", 3000, scene);
      movePlayer(camera, obstacle_objects.exit_pos.x, obstacle_objects.exit_pos.z, obstacle_objects.exit_pos.y);
      camera.inertia = 0;
      if (camera.position.y > 900) {
        camera.setTarget(new Vector3(15, 1004, -15));
      } else {
        let teleporter = scene.getMeshByName("teleporterOb23a");
        camera.setTarget(teleporter.position);
        camera.rotation.y = 1.57;
        if (player.holding === "wateringCanHedgeMaze") {
          player.holding = "";
          playSound("cloth_inventory", 3000, scene);
          ob23.water = 0;
          ob23.pouring = false;
          if (ob23.pouring_sound) {
            ob23.pouring_sound.dispose(true, true);
            ob23.pouring_sound = null;
          }
          let wateringCan = scene.getMeshByName("wateringCanHedgeMaze");
          if (wateringCan) {
            wateringCan.renderingGroupId = 0;
            wateringCan.parent = null;
            wateringCan.position.y = -1000;
            let wateringCanPouring = scene.getMeshByName("wateringCanHedgeMazepouring");
            wateringCanPouring.renderingGroupId = 0;
            wateringCanPouring.parent = null;
            wateringCanPouring.position.y = -1000;
            if (solved.solvedP23 === false) {
              let wateringCanItem = scene.getMeshByName("wateringCanHedgeMazeitem");
              wateringCanItem.position.y = 1000;
            }
          }
        }
      }
      setTimeout(() => {
        camera.inertia = 0.9;
      }, 100);
    }
  }
}

export {teleportPlayerOb23};
