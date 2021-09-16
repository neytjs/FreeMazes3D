import {GUI_Warn} from "../gui/gui_warn.js";
import {GUI_InventoryCycle} from "../gui/gui_inventory_cycle.js";
import {GUI_Score} from "../gui/gui_score.js";
import {stopStartTimer} from "../gui/gui_timer.js";
import {stopStartMusic} from "../gui/gui_music.js";
import {playSound} from "../assets/playSound.js";

function keyUp(menu_gui, map_size, inventory, inventory_tracker, saveScoreAndClose, scene, resetGlobals, reStart, timer, score, maze, sound_track) {
  let key = event.keyCode;
  let menu = document.getElementById("menu");
  let menu_left = parseInt(window.getComputedStyle(menu).left);
  let difficulty = document.getElementById("difficulty");
  let difficulty_left = parseInt(window.getComputedStyle(difficulty).left);
  let key_controls = document.getElementById("key_controls");
  let key_controls_left = parseInt(window.getComputedStyle(key_controls).left);
  let scores = document.getElementById("scores");
  let scores_left = parseInt(window.getComputedStyle(scores).left);
  let achievements = document.getElementById("achieves");
  let achievements_left = parseInt(window.getComputedStyle(achievements).left);
  let credits = document.getElementById("credits_list");
  let credits_left = parseInt(window.getComputedStyle(credits).left);
  let warn = document.getElementById("warn");
  let warn_left = parseInt(window.getComputedStyle(warn).left);
  let fps = document.getElementById("fps");
  let fps_right = parseInt(window.getComputedStyle(fps).right);
  let results = document.getElementById("results");
  let results_left = parseInt(window.getComputedStyle(results).left);

// E
  if (key === 69) {
    this.pressE = true;
  }
// F
  if (key === 70) {
    if (menu_left === -10000 && fps_right === 10) {
      document.getElementById("fps").style.right = -10000;
    }
    if (menu_left === -10000 && fps_right === -10000) {
      document.getElementById("fps").style.right = 10;
    }
  }
  if (inventory.length > 2) {
  // [
    if (key === 219) {
      GUI_InventoryCycle(inventory, inventory_tracker, "left");
      playSound("cloth_inventory", 3000, scene);
    }
  // ]
    if (key === 221) {
      GUI_InventoryCycle(inventory, inventory_tracker, "right");
      playSound("cloth_inventory", 3000, scene);
    }
  }
// F1 / ESC
  if (maze.loaded && ((key === 112 || key === 27) && warn_left < 0)) {
    if (this.state.start) {
      if (menu_left === 0 || difficulty_left === 0 || key_controls_left === 0 || scores_left === 0 || achievements_left === 0 || credits_left === 0) {
        if (menu_left === 0) {
          document.getElementById("menu").style.left = -10000;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#FF0000";
          menu_gui.counter = 0;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#00FF00";
          menu_gui.toggle = false;
        }
        if (difficulty_left === 0) {
          document.getElementById("difficulty").style.left = -10000;
          document.getElementById(menu_gui.difficulty_options[menu_gui.difficulty_counter]).style.color = "#FF0000";
          menu_gui.difficulty_counter = 0;
          document.getElementById(menu_gui.difficulty_options[menu_gui.difficulty_counter]).style.color = "#00FF00";
          menu_gui.toggle = false;
        }
        if (key_controls_left === 0) {
          document.getElementById("key_controls").style.left = -10000;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#FF0000";
          menu_gui.counter = 0;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#00FF00";
          menu_gui.toggle = false;
        }
        if (scores_left === 0) {
          document.getElementById("scores").style.left = -10000;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#FF0000";
          menu_gui.counter = 0;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#00FF00";
          menu_gui.toggle = false;
        }
        if (achievements_left === 0) {
          document.getElementById("achieves").style.left = -10000;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#FF0000";
          menu_gui.counter = 0;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#00FF00";
          menu_gui.toggle = false;
        }
        if (credits_left === 0) {
          document.getElementById("credits_list").style.left = -10000;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#FF0000";
          menu_gui.counter = 0;
          document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#00FF00";
          menu_gui.toggle = false;
        }
      } else {
        document.getElementById("menu").style.left = 0;
        menu_gui.toggle = true;
      }
      stopStartTimer(key, timer, map_size);
      stopStartMusic(key, sound_track);
    }
  }
  if ((key === 112 || key === 27) && results_left === 0) {
    resetGlobals();
    reStart();
    document.getElementById("results").style.left = -10000;
    document.getElementById("menu").style.left = 0;
    menu_gui.toggle = false;
  }

// arrow up
  if (key === 38) {
    if (warn_left < 0) {
      if (menu_left === 0) {
        playSound("misc_menu_3", 2000, scene);
        document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#FF0000";
        menu_gui.counter = menu_gui.counter > 0 ? menu_gui.counter - 1 : 0;
        document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#00FF00";
      }
      if (difficulty_left === 0) {
        playSound("misc_menu_3", 2000, scene);
        document.getElementById(menu_gui.difficulty_options[menu_gui.difficulty_counter]).style.color = "#FF0000";
        menu_gui.difficulty_counter = menu_gui.difficulty_counter > 0 ? menu_gui.difficulty_counter - 1 : 0;
        document.getElementById(menu_gui.difficulty_options[menu_gui.difficulty_counter]).style.color = "#00FF00";
      }
    }
  }
// arrow down
  if (key === 40) {
    if (warn_left < 0) {
      if (menu_left === 0) {
        playSound("misc_menu_3", 2000, scene);
        document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#FF0000";
        menu_gui.counter = menu_gui.counter < (menu_gui.options.length - 1) ? menu_gui.counter + 1 : (menu_gui.options.length - 1);
        document.getElementById(menu_gui.options[menu_gui.counter]).style.color = "#00FF00";
      }
      if (difficulty_left === 0) {
        playSound("misc_menu_3", 2000, scene);
        document.getElementById(menu_gui.difficulty_options[menu_gui.difficulty_counter]).style.color = "#FF0000";
        menu_gui.difficulty_counter = menu_gui.difficulty_counter < (menu_gui.difficulty_options.length - 1) ? menu_gui.difficulty_counter + 1 : (menu_gui.difficulty_options.length - 1);
        document.getElementById(menu_gui.difficulty_options[menu_gui.difficulty_counter]).style.color = "#00FF00";
      }
    }
  }
// arrow right
  if (key === 39) {
    if (warn_left > 0) {
      playSound("misc_menu_3", 2000, scene);
      document.getElementById(menu_gui.warn_options[menu_gui.warn_counter]).style.background = "#FF0000";
      menu_gui.warn_counter = menu_gui.warn_counter > 0 ? menu_gui.warn_counter - 1 : 0;
      document.getElementById(menu_gui.warn_options[menu_gui.warn_counter]).style.background = "#00FF00";
    }
  }
// arrow left
  if (key === 37) {
    if (warn_left > 0) {
      playSound("misc_menu_3", 2000, scene);
      document.getElementById(menu_gui.warn_options[menu_gui.warn_counter]).style.background = "#FF0000";
      menu_gui.warn_counter = menu_gui.warn_counter < (menu_gui.warn_options.length - 1) ? menu_gui.warn_counter + 1 : (menu_gui.warn_options.length - 1);
      document.getElementById(menu_gui.warn_options[menu_gui.warn_counter]).style.background = "#00FF00";
    }
  }
// space/enter
  if (key === 32 || key === 13) {
  // for retracting the key_controls
    if (key_controls_left === 0 && menu_left === -10000) {
      playSound("misc_menu_3", 2000, scene);
      document.getElementById("key_controls").style.left = -10000;
      document.getElementById("menu").style.left = 0;
      menu_gui.toggle = true;
    }
  // for retracting the scores
    if (scores_left === 0 && menu_left === -10000) {
      playSound("misc_menu_3", 2000, scene);
      document.getElementById("scores").style.left = -10000;
      document.getElementById("menu").style.left = 0;
      menu_gui.toggle = true;
    }
  // for retracting the achievements
    if (achievements_left === 0 && menu_left === -10000) {
      playSound("misc_menu_3", 2000, scene);
      document.getElementById("achieves").style.left = -10000;
      document.getElementById("menu").style.left = 0;
      menu_gui.toggle = true;
    }
  // for retracting the credits
    if (credits_left === 0 && menu_left === -10000) {
      playSound("misc_menu_3", 2000, scene);
      document.getElementById("credits_list").style.left = -10000;
      document.getElementById("menu").style.left = 0;
      menu_gui.toggle = true;
    }
  // for new game to view difficulty
    if (menu_gui.options[menu_gui.counter] === "new_game") {
      if (menu_left === 0 && difficulty_left === -10000) {
        playSound("misc_menu_3", 2000, scene);
        document.getElementById("difficulty").style.left = 0;
        document.getElementById("menu").style.left = -10000;
        menu_gui.toggle = true;
      }
    }

  // for handling game starts
    let handleGameStart = (difficulty_setting) => {
      let startNewGame = () => {
        switch (difficulty_setting) {
          case "easy":
            map_size.size = "small";
            map_size.type = "no";
          break;
          case "medium":
            map_size.size = "medium";
            map_size.type = "no";
          break;
          case "hard":
            map_size.size = "large";
            map_size.type = "no";
          break;
          case "easy_tl":
            map_size.size = "small";
            map_size.type = "tl";
          break;
          case "medium_tl":
            map_size.size = "medium";
            map_size.type = "tl";
          break;
          case "hard_tl":
            map_size.size = "large";
            map_size.type = "tl";
          break;
        }
        document.getElementById("difficulty").style.left = -10000;
        document.getElementById("loading").style.left = 0;
        setTimeout(()=> {
          this.setState({ start: true }, ()=> {
            this.launchGame();
          });
        }, 300);
      }
      if (this.state.start === false) {
        resetGlobals();
        startNewGame();
      } else {
        if (menu_gui.press_counter === 0) {
          GUI_Warn("Warning, starting a new game will result in losing all progress in the current maze and will reset your score to zero.");
        }
        menu_gui.press_counter = menu_gui.press_counter + 1;
      // if they click okay...
        if (menu_gui.press_counter === 2 && menu_gui.warn_options[menu_gui.warn_counter] === "okay") {
          document.getElementById("okay").style.background = "#FF0000";
          document.getElementById("cancel").style.background = "#00FF00";
          menu_gui.press_counter = 0;
          menu_gui.warn_counter = 0;
          document.getElementById("warn").style.left = -10000;
          document.getElementById("loading").style.left = 0;
          document.getElementById(menu_gui.difficulty_options[menu_gui.difficulty_counter]).style.color = "#FF0000";
          document.getElementById("easy").style.color = "#00FF00";
          menu_gui.difficulty_counter = 0;
          score.total = 0;
          GUI_Score(0, score);
          this.resetGlobals();
          startNewGame();
        }
      // if they click cancel...
        if (menu_gui.press_counter === 2 && menu_gui.warn_options[menu_gui.warn_counter] === "cancel") {
          menu_gui.press_counter = 0;
          document.getElementById("warn").style.left = -10000;
        }
      }
    }

    if (difficulty_left === 0 && menu_left === -10000) {
    // for going back from difficulty to main menu
      if (menu_gui.difficulty_options[menu_gui.difficulty_counter] === "back") {
        document.getElementById("menu").style.left = 0;
        document.getElementById("difficulty").style.left = -10000;
      }

    // for selecting easy difficulty setting
      if (menu_gui.difficulty_options[menu_gui.difficulty_counter] === "easy") {
        handleGameStart(menu_gui.difficulty_options[menu_gui.difficulty_counter]);
      }

    // for selecting medium difficulty setting
      if (menu_gui.difficulty_options[menu_gui.difficulty_counter] === "medium") {
        handleGameStart(menu_gui.difficulty_options[menu_gui.difficulty_counter]);
      }

    // for selecting hard difficulty setting
      if (menu_gui.difficulty_options[menu_gui.difficulty_counter] === "hard") {
        handleGameStart(menu_gui.difficulty_options[menu_gui.difficulty_counter]);
      }

    // for selecting easy (time limit) difficulty setting
      if (menu_gui.difficulty_options[menu_gui.difficulty_counter] === "easy_tl") {
        handleGameStart(menu_gui.difficulty_options[menu_gui.difficulty_counter]);
      }

    // for selecting medium (time limit) difficulty setting
      if (menu_gui.difficulty_options[menu_gui.difficulty_counter] === "medium_tl") {
        handleGameStart(menu_gui.difficulty_options[menu_gui.difficulty_counter]);
      }

    // for selecting hard (time limit) difficulty setting
      if (menu_gui.difficulty_options[menu_gui.difficulty_counter] === "hard_tl") {
        handleGameStart(menu_gui.difficulty_options[menu_gui.difficulty_counter]);
      }
      if (this.state.start === false || menu_gui.difficulty_options[menu_gui.difficulty_counter] === "back") {
        document.getElementById(menu_gui.difficulty_options[menu_gui.difficulty_counter]).style.color = "#FF0000";
        document.getElementById("easy").style.color = "#00FF00";
        menu_gui.difficulty_counter = 0;
      }
    }

  // for viewing controls
    if (menu_gui.options[menu_gui.counter] === "controls") {
      if (menu_left === 0 && key_controls_left === -10000) {
        document.getElementById("key_controls").style.left = 0;
        document.getElementById("menu").style.left = -10000;
      }
    }
  // for viewing high scores
    if (menu_gui.options[menu_gui.counter] === "high_scores") {
      if (menu_left === 0 && scores_left === -10000) {
        document.getElementById("scores").style.left = 0;
        document.getElementById("menu").style.left = -10000;
      }
    }
  // for viewing achievements
    if (menu_gui.options[menu_gui.counter] === "achievements") {
      if (menu_left === 0 && achievements_left === -10000) {
        document.getElementById("achieves").style.left = 0;
        document.getElementById("menu").style.left = -10000;
      }
    }
  // for viewing credits
    if (menu_gui.options[menu_gui.counter] === "credits") {
      if (menu_left === 0 && credits_left === -10000) {
        document.getElementById("credits_list").style.left = 0;
        document.getElementById("menu").style.left = -10000;
      }
    }
// for exiting game
    if (menu_gui.options[menu_gui.counter] === "exit_game") {
      if (menu_left === 0) {
        if (this.state.start) {
          if (menu_gui.press_counter === 0) {
            GUI_Warn("Warning, exiting will result in losing all progress in the current maze and will reset your score to zero.");
          }
          menu_gui.press_counter = menu_gui.press_counter + 1;
        // if they click okay...
          if (menu_gui.press_counter === 2 && menu_gui.warn_options[menu_gui.warn_counter] === "okay") {
            score.total = 0;
            saveScoreAndClose();
          }
        // if they click cancel...
          if (menu_gui.press_counter === 2 && menu_gui.warn_options[menu_gui.warn_counter] === "cancel") {
            menu_gui.press_counter = 0;
            document.getElementById("warn").style.left = -10000;
          }
        } else {
          saveScoreAndClose();
        }
      }
    }
  }
// FOR TESTING ONLY... (g)
  if (key === 71) {
    this.camera.applyGravity = true;
  }
}

export {keyUp};
