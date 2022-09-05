import {playSound} from "../assets/playSound.js";
import {GUI_Score} from "../gui/gui_score.js";
import {GUI_ShowAchievements} from "../gui/gui_achievements.js";
import {GUI_DisplayAchievements} from "../gui/gui_display_achievements.js";
import {stopStartMusic} from "../gui/gui_music.js";
import {setGUIBackground} from "../gui/gui_background.js";

function exitMap(hit, treasure_stats, secret_data, timer, map_size, scene, camera, menu_gui, score, sound_track, global_language, achievements, puzzles, app_data) {
  if (hit && hit.pickedMesh.name === "teleporter_powered_barrier") {
    playSound("anchor_action_ind", 2000, scene);
    setGUIBackground(false);
    stopStartMusic(112, sound_track, scene);
    camera.speed = 0;
    menu_gui.toggle = true;
    let difficulty = "";
    let score_bonus = 0;
    switch (map_size.size) {
      case "small":
        difficulty = global_language.text.menu.exit.difficulty.easy;
        score_bonus = 2000;
      break;
      case "medium":
        difficulty = global_language.text.menu.exit.difficulty.medium;
        score_bonus = 3500;
      break;
      case "large":
        difficulty = global_language.text.menu.exit.difficulty.hard;
        score_bonus = 5000;
      break;
    }

    document.getElementById("results").style.left = 0;
    if (map_size.type === "tl") {
      GUI_Score(score_bonus, score, global_language);
      document.getElementById("results_body").innerHTML = global_language.text.menu.exit.success.time_limit.part1 + score_bonus + global_language.text.menu.exit.success.time_limit.part2;
    }
    if (map_size.type === "no") {
      document.getElementById("results_body").innerHTML = global_language.text.menu.exit.success.normal;
    }
    document.getElementById("difficulty_stats").innerHTML = global_language.text.menu.exit.main.difficulty.part1 + difficulty;
    if (map_size.type === "tl") {
      document.getElementById("time_stats").innerHTML = global_language.text.menu.exit.main.time_remaining + timer.time;
    }
    if (map_size.type === "no") {
      document.getElementById("time_stats").innerHTML = global_language.text.menu.exit.main.time + timer.time;
    }
    document.getElementById("treasure_stats").innerHTML = global_language.text.menu.exit.main.treasure.part1 + treasure_stats.treasure_counter + global_language.text.menu.exit.main.treasure.part2 + treasure_stats.treasure_total + global_language.text.menu.exit.main.treasure.part3;
    document.getElementById("secret_stats").innerHTML = global_language.text.menu.exit.main.secret.part1 + secret_data.counter + global_language.text.menu.exit.main.secret.part2 + secret_data.total + global_language.text.menu.exit.main.secret.part3;

    GUI_ShowAchievements(achievements, scene, score, map_size, timer, treasure_stats, secret_data, puzzles, app_data, global_language);
    GUI_DisplayAchievements(achievements, global_language);
  }
  if (timer.counter < 0 && timer.timesup_warned === false) {
    timer.timesup_warned = true;
    playSound("MS_Realization", 3000, scene);
    setGUIBackground(false);
    stopStartMusic(112, sound_track, scene);
    camera.speed = 0;
    score.total = 0;
    GUI_Score(0, score, global_language);
    menu_gui.toggle = true;
    let difficulty = "";
    switch (map_size.size) {
      case "small":
        difficulty = global_language.text.menu.exit.difficulty.easy;
      break;
      case "medium":
        difficulty = global_language.text.menu.exit.difficulty.medium;
      break;
      case "large":
        difficulty = global_language.text.menu.exit.difficulty.hard;
      break;
    }
    document.getElementById("results").style.left = 0;
    document.getElementById("results_body").innerHTML = global_language.text.menu.exit.fail;
    document.getElementById("difficulty_stats").innerHTML = global_language.text.menu.exit.main.difficulty.part1 + difficulty + global_language.text.menu.exit.main.difficulty.part2;
    document.getElementById("time_stats").innerHTML = global_language.text.menu.exit.main.time_remaining + 0;
    document.getElementById("treasure_stats").innerHTML = global_language.text.menu.exit.main.treasure.part1 + treasure_stats.treasure_counter + global_language.text.menu.exit.main.treasure.part2 + treasure_stats.treasure_total + global_language.text.menu.exit.main.treasure.part3;
    document.getElementById("secret_stats").innerHTML = global_language.text.menu.exit.main.secret.part1 + secret_data.counter + global_language.text.menu.exit.main.secret.part2 + secret_data.total + global_language.text.menu.exit.main.secret.part3;
  }
}

export {exitMap};
