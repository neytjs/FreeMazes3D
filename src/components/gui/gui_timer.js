function calcTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = minutes === 0 ? time : Math.floor(time - (minutes * 60));
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return minutes + ":" + seconds;
}

function runTimer(timer) {
  if (timer.running === true) {
    return false;
  }

  function innerFunction() {
    timer.running = true;
    timer.menu = true;
    timer.counter = timer.counter + 1;
    timer.time = calcTime(timer.counter);
    if (timer.menu === true) {
      timer.timeOutFunct = setTimeout(function() {
        innerFunction();
      }, 1000);
    }
  }

  innerFunction();
}

function stopStartTimer(key, timer) {
  if (key === 112 || key === 27) {
    timer.menu = timer.menu ? false : true;
    timer.running = false;
    clearTimeout(timer.timeOutFunct);
    if (timer.menu) {
      runTimer(timer);
    }
  }
}

function displayTime(timer) {
  if (timer.time !== timer.prev_time) {
    let current = timer.time;
    timer.prev_time = current;
    document.getElementById("timer").innerHTML = "Time: " + current;
  }
}

export {runTimer, stopStartTimer, displayTime};
