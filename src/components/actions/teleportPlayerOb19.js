import {Vector3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";
import {GUI_Warning} from "../gui/gui_warning.js";
import {playSound} from "../assets/playSound.js";
import {movePlayer} from "./movePlayer.js";

function teleportPlayerOb19(obstacle_objects, colMesh, camera, scene, player, ob19, pressedKeys, global_language) {
  if (colMesh.uniqueId === obstacle_objects.id) {
    if (obstacle_objects.type === "teleporter19") {
      if (ob19.holding === "") {
        playSound("anchor_action_ind", 3000, scene);
        movePlayer(camera, obstacle_objects.exit_pos.x, obstacle_objects.exit_pos.z, obstacle_objects.exit_pos.y);
        camera.inertia = 0;
        player.grounded = false;
        if (camera.position.y < -150) {
          let exitTeleporter = scene.getMeshByName("exitTeleporterOb19");
          camera.setTarget(exitTeleporter.position);
          camera.applyGravity = false;
          if (player.walking_sound) {
            player.walking_sound.dispose(true, true);
            player.walking_sound = null;
            player.already_walking = false;
          }
        } else {
          let teleporter = scene.getMeshByName("teleporterOb19");
          camera.setTarget(teleporter.position);
          camera.rotation.y = 3.14;
          camera.applyGravity = true;
          player.grounded = true;
          if (player.already_walking === false && (pressedKeys.w === true || pressedKeys.s === true || pressedKeys.a === true || pressedKeys.d === true)) {
            player.already_walking = true;
            player.walking_sound = new Sound("Sound", "./sound/sfx_footsteps.wav", scene, null, { loop: true, autoplay: true });
          }
        }
        setTimeout(() => {
          camera.inertia = 0.9;
        }, 100);
      } else {
        if (ob19.portal_warned === false) {
          ob19.portal_warned = true;
          playSound("MS_Realization", 3000, scene);
          GUI_Warning(global_language.text.puzzles.ob19.warn, 2500, scene);
          setTimeout(() => {
            ob19.portal_warned = false;
          }, 3000);
        }
      }
    }
  }
}

export {teleportPlayerOb19};
