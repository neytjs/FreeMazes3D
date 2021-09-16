function calcTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = minutes === 0 ? time : Math.floor(time - (minutes * 60));
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return minutes + ":" + seconds;
}

function setTimer(timer, map_size) {
  if (timer.setTimer === false) {
    timer.setTimer = true;
    let time = 0;
    if (map_size.type === "tl") {
      switch (map_size.size) {
        case "small":
          time = 300;
          timer.counter = time;
          timer.max_time = time;
        break;
        case "medium":
          time = 600;
          timer.counter = time;
          timer.max_time = time;
        break;
        case "large":
          time = 900;
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
