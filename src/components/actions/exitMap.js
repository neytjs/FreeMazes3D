import {playSound} from "../assets/playSound.js";
import {GUI_Score} from "../gui/gui_score.js";
import {GUI_ShowAchievements} from "../gui/gui_achievements.js";
import {GUI_DisplayAchievements} from "../gui/gui_display_achievements.js";
import {stopStartMusic} from "../gui/gui_music.js";

function exitMap(hit, treasure_stats, secret_data, timer, map_size, scene, camera, menu_gui, score, sound_track, achievements, puzzles, app_data) {
  if (hit && hit.pickedMesh.name === "teleporter_powered_barrier") {
    playSound("anchor_action_ind", 2000, scene);
    stopStartMusic(112, sound_track);
    camera.speed = 0;
    menu_gui.toggle = true;
    let difficulty = "";
    let score_bonus = 0;
    switch (map_size.size) {
      case "small":
        difficulty = "Easy";
        score_bonus = 2000;
      break;
      case "medium":
        difficulty = "Medium";
        score_bonus = 3500;
      break;
      case "large":
        difficulty = "Hard";
        score_bonus = 5000;
      break;
    }

    document.getElementById("results").style.left = 0;
    if (map_size.type === "tl") {
      GUI_Score(score_bonus, score);
      document.getElementById("results_body").innerHTML = "Congratulations, you have earned " + score_bonus + " bonus score points for completing the maze within the time limit.";
    }
    if (map_size.type === "no") {
      document.getElementById("results_body").innerHTML = "Congratulations, you have completed the maze.";
    }
    document.getElementById("difficulty_stats").innerHTML = "<b>Difficulty:</b> " + difficulty;
    if (map_size.type === "tl") {
      document.getElementById("time_stats").innerHTML = "<b>Time remaining:</b> " + timer.time;
    }
    if (map_size.type === "no") {
      document.getElementById("time_stats").innerHTML = "<b>Time:</b> " + timer.time;
    }
    document.getElementById("treasure_stats").innerHTML = "<b>Treasure:</b> " + treasure_stats.treasure_counter + " out of " + treasure_stats.treasure_total + " treasure pieces picked up.";
    document.getElementById("secret_stats").innerHTML = "<b>Secrets:</b> " + secret_data.counter + " out of " + secret_data.total + " secrets discovered.";

    GUI_ShowAchievements(achievements, scene, score, map_size, timer, treasure_stats, secret_data, puzzles, app_data);
    GUI_DisplayAchievements(achievements);
  }
  if (timer.counter < 0 && timer.timesup_warned === false) {
    timer.timesup_warned = true;
    playSound("MS_Realization", 3000, scene);
    stopStartMusic(112, sound_track);
    camera.speed = 0;
    score.total = 0;
    GUI_Score(0, score);
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
    document.getElementById("results_body").innerHTML = "You have failed to complete the maze in the allotted time. No bonus score awarded. Your score will now also be reset to zero.";
    document.getElementById("difficulty_stats").innerHTML = "<b>Difficulty:</b> " + difficulty + " (Time Limit)";
    document.getElementById("time_stats").innerHTML = "<b>Time remaining:</b> 0";
    document.getElementById("treasure_stats").innerHTML = "<b>Treasure:</b> " + treasure_stats.treasure_counter + " out of " + treasure_stats.treasure_total + " treasure pieces picked up.";
    document.getElementById("secret_stats").innerHTML = "<b>Secrets:</b> " + secret_data.counter + " out of " + secret_data.total + " secrets discovered.";
  }
}

export {exitMap};
