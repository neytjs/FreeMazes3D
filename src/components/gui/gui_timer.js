function calcTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = minutes === 0 ? time : Math.floor(time - (minutes * 60));
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return minutes + ":" + seconds;
}

function setTimer(timer, map_size, puzzles) {
  if (timer.setTimer === false) {
    timer.setTimer = true;

    let puzzle_counter = 0;
    let total_puzzle_time = 0;
    function getPuzzleTimes() {
      const puzzle = {
        coin_match: 60,
        bulb_match: 120,
        sphere_agents: 120,
        move_bridges: 60,
        ghost_button: 60,
        carry_crystals: 120,
        enter_hut: 60,
        grow_garden: 120,
        down_pipes: 60,
        tight_rope: 120,
        dodge_turret: 60,
        mob_shoots: 60,
        powder_pyramid: 120,
        haunted_crypt: 120,
        bulls_eye: 60,
        timed_buttons: 60,
        potion_cauldron: 60,
        crystal_temple: 180,
        crystal_shards: 60,
        rolling_pipes: 180
      };
      total_puzzle_time = puzzle[puzzles[puzzle_counter]] + total_puzzle_time;
      puzzle_counter = puzzle_counter + 1;

      if (puzzle_counter < puzzles.length) {
        getPuzzleTimes();
      }
    }
    getPuzzleTimes();

    let time = total_puzzle_time;
    if (map_size.type === "tl") {
      switch (map_size.size) {
        case "small":
          time = time + 180;
          timer.counter = time;
          timer.max_time = time;
        break;
        case "medium":
          time = time + 300;
          timer.counter = time;
          timer.max_time = time;
        break;
        case "large":
          time = time + 600;
          timer.counter = time;
          timer.max_time = time;
        break;
      }
    }
    document.getElementById("timer").innerHTML = "Time: " + calcTime(timer.counter);
  }
}

function runTimer(timer, map_size) {
  if (timer.running === true) {
    return false;
  }

  function innerFunction() {
    timer.running = true;
    timer.menu = true;
    if (map_size.type === "no") {
      timer.counter = timer.counter + 1;
    }
    if (map_size.type === "tl") {
      timer.counter = timer.counter - 1;
    }
    timer.time = calcTime(timer.counter);
    if (timer.menu === true) {
      timer.timeOutFunct = setTimeout(function() {
        innerFunction();
      }, 1000);
    }
  }

  innerFunction();
}

function stopStartTimer(key, timer, map_size) {
  if (key === 112 || key === 27) {
    timer.menu = timer.menu ? false : true;
    timer.running = false;
    clearTimeout(timer.timeOutFunct);
    if (timer.menu) {
      runTimer(timer, map_size);
    }
  }
}

function displayTime(timer) {
  if (timer.time !== timer.prev_time) {
    if (timer.counter >= 0) {
      let current = timer.time;
      timer.prev_time = current;
      document.getElementById("timer").innerHTML = "Time: " + current;
    }
  }
}

export {setTimer, runTimer, stopStartTimer, displayTime};
