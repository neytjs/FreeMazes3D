import {playSound} from "../assets/playSound.js";

let queue = [];
let set = new Set();
let running = false;

function GUI_Warning(text, time, scene) {
  if (set.has(text) === false) {
    set.add(text);
    queue.push({text: text, time: time});
    let runQueue = () => {
      if (running === true) {
        return false;
      }

      let innerFunction = () => {
        running = true;
        playSound("unlink", 1500, scene);
        document.getElementById("warning").style.left = 0;
        document.getElementById("warning").innerHTML = queue[0].text;

        setTimeout(() => {
          set.delete(queue[0].text);
          queue.splice(0, 1);
          playSound("unlink", 1500, scene);
          document.getElementById("warning").style.left = -10000;

          if (queue.length > 0) {
            setTimeout(() => {
              innerFunction();
            }, 500);
          } else {
            running = false;
          }
        }, queue[0].time);
      }
      innerFunction();
    }
    runQueue();
  }
}

export {GUI_Warning};
