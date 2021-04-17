import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function discoverSecret(hit, secret_walls, secret_data, secret_moving, current_secret, score, scene) {
  if (hit.pickedMesh.name.length > 5) {
    let name = hit.pickedMesh.name.substring(0, 6);
    if (name === "secret") {
      for (let i = 0, length = secret_walls.length; i < length; i ++) {
        if (hit.pickedMesh.uniqueId === secret_walls[i].id) {
          secret_data.counter = secret_data.counter + 1;
          GUI_Score(50, score);
          playSound("negative_2", 2000, scene);
          GUI_Warning("You have found a secret area (" + secret_data.counter + " of " + secret_data.total + ")!", 1800);
          secret_moving.motion = true;
          current_secret.secret = secret_walls[i];
          secret_walls.splice(i, 1);
          break;
        }
      }
    }
  }
}

export {discoverSecret};
