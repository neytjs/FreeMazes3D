function setGUILanguage(global_language) {
// loading
  document.getElementById("loading_text").innerHTML = global_language.text.menu.loading_text; 
// title
  for (let i = 0, length = document.getElementsByClassName("game_title").length; i < length; i++) {
    document.getElementsByClassName("game_title")[i].innerHTML = global_language.text.menu.title;
  }
// version
  for (let i = 0, length = document.getElementsByClassName("version").length; i < length; i++) {
    document.getElementsByClassName("version")[i].innerHTML = global_language.text.menu.version;
  }
// back
  for (let i = 0, length = document.getElementsByClassName("back_text").length; i < length; i++) {
    document.getElementsByClassName("back_text")[i].innerHTML = global_language.text.menu.back_text;
  }
// main
  document.getElementById("new_game").innerHTML = global_language.text.menu.main.new_game;
  document.getElementById("controls").innerHTML = global_language.text.menu.main.controls;
  document.getElementById("high_scores").innerHTML = global_language.text.menu.main.high_scores;
  document.getElementById("achievements").innerHTML = global_language.text.menu.main.achievements;
  document.getElementById("credits").innerHTML = global_language.text.menu.main.credits;
  document.getElementById("exit_game").innerHTML = global_language.text.menu.main.exit_game;
// difficulty
  document.getElementById("easy").innerHTML = global_language.text.menu.difficulty.easy;
  document.getElementById("medium").innerHTML = global_language.text.menu.difficulty.medium;
  document.getElementById("hard").innerHTML = global_language.text.menu.difficulty.hard;
  document.getElementById("easy_tl").innerHTML = global_language.text.menu.difficulty.easy_tl;
  document.getElementById("medium_tl").innerHTML = global_language.text.menu.difficulty.medium_tl;
  document.getElementById("hard_tl").innerHTML = global_language.text.menu.difficulty.hard_tl;
// ingame
  document.getElementById("menu_button").innerHTML = global_language.text.menu.ingame.menu_button;
  document.getElementById("score").innerHTML = global_language.text.menu.ingame.score;
  document.getElementById("timer").innerHTML = global_language.text.menu.ingame.timer;
  document.getElementById("inventory_text").innerHTML = global_language.text.menu.ingame.inventory_text;
// controls
  document.getElementById("controls_title").innerHTML = global_language.text.menu.controls.controls_title;
  document.getElementById("kc_notice").innerHTML = global_language.text.menu.controls.notice;
  document.getElementById("keys_esc").innerHTML = global_language.text.menu.controls.keys_esc;
  document.getElementById("kc_key").innerHTML = global_language.text.menu.controls.key_titles.kc_key;
  document.getElementById("kc_action").innerHTML = global_language.text.menu.controls.key_titles.kc_action;
  document.getElementById("kc_movement").innerHTML = global_language.text.menu.controls.key_descriptions.kc_movement;
  document.getElementById("kc_activate").innerHTML = global_language.text.menu.controls.key_descriptions.kc_activate;
  document.getElementById("kc_use").innerHTML = global_language.text.menu.controls.key_descriptions.kc_use;
  document.getElementById("kc_toggleleft").innerHTML = global_language.text.menu.controls.key_descriptions.kc_toggleleft;
  document.getElementById("kc_toggleright").innerHTML = global_language.text.menu.controls.key_descriptions.kc_toggleright;
  document.getElementById("kc_fps").innerHTML = global_language.text.menu.controls.key_descriptions.kc_fps;
  document.getElementById("kc_esc").innerHTML = global_language.text.menu.controls.key_descriptions.kc_esc;
// credits
  document.getElementById("credits_title").innerHTML = global_language.text.menu.credits.credits_title;
  document.getElementById("credits_text").innerHTML = global_language.text.menu.credits.credits_text;
// achievements
  document.getElementById("achievements_title").innerHTML = global_language.text.menu.achievements.achievements_title;
// scores
  document.getElementById("scores_title").innerHTML = global_language.text.menu.scores.scores_title;
// warn
  document.getElementById("okay").innerHTML = global_language.text.menu.warn.okay;
  document.getElementById("cancel").innerHTML = global_language.text.menu.warn.cancel;
// exit
  document.getElementById("return").innerHTML = global_language.text.menu.exit.return;
  document.getElementById("results_title").innerHTML = global_language.text.menu.exit.results_title;
// reviving
  document.getElementById("reviving_text").innerHTML = global_language.text.menu.reviving_text;
}

export {setGUILanguage};
