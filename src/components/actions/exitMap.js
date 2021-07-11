import {playSound} from "../assets/playSound.js";

function exitMap(hit, treasure_stats, secret_data, timer, map_size, scene, camera, menu_gui) {
  if (hit.pickedMesh.name === "teleporter_powered_barrier") {
    playSound("anchor_action_ind", 2000, scene);
    camera.speed = 0;
    menu_gui.toggle = true;
    let difficulty = "";
    switch (map_size.size) {
      case "small":
        difficulty = "Easy";
      break;
      case "medium":
        difficulty = "Medium";
      break;
      case "large":
        difficulty = "Hard";
      break;
    }
    document.getElementById("results").style.left = 0;
    document.getElementById("difficulty_stats").innerHTML = "<b>Difficulty:</b> " + difficulty;
    document.getElementById("time_stats").innerHTML = "<b>Time:</b> " + timer.time;
    document.getElementById("treasure_stats").innerHTML = "<b>Treasure:</b> " + treasure_stats.treasure_counter + " out of " + treasure_stats.treasure_total + " treasure pieces picked up.";
    document.getElementById("secret_stats").innerHTML = "<b>Secrets:</b> " + secret_data.counter + " out of " + secret_data.total + " secrets discovered.";
  }
}

export {exitMap};
