import {bulb_colors, getBulb1colors, getBulb2colors, getBulb3colors, getBulb4colors} from "../assets/bulb_colors.js";
import {playSound} from "../assets/playSound.js";

function pushButtonsOb2(hit, solved, buttons, ob2, scene) {
  if (hit.pickedMesh.name === "button1" || hit.pickedMesh.name === "button2" || hit.pickedMesh.name === "button3" || hit.pickedMesh.name === "button4") {
    if (solved.solvedP2 === false) {
      if (ob2.running === false) {
        ob2.running = true;
        switch (hit.pickedMesh.name) {
          case "button1":
            ob2.b1counter = ob2.b1counter < bulb_colors.length - 1 ? ob2.b1counter + 1 : 0;
            ob2.bulb_color = getBulb1colors(ob2.b1counter);
            ob2.bulb = "bulb1";
            buttons.pushingButton = "pushButton1";
          break;
          case "button2":
            ob2.b2counter = ob2.b2counter < bulb_colors.length - 1 ? ob2.b2counter + 1 : 0;
            ob2.bulb_color = getBulb2colors(ob2.b2counter);
            ob2.bulb = "bulb2";
            buttons.pushingButton = "pushButton2";
          break;
          case "button3":
            ob2.b3counter = ob2.b3counter < bulb_colors.length - 1 ? ob2.b3counter + 1 : 0;
            ob2.bulb_color = getBulb3colors(ob2.b3counter);
            ob2.bulb = "bulb3";
            buttons.pushingButton = "pushButton3";
          break;
          case "button4":
            ob2.b4counter = ob2.b4counter < bulb_colors.length - 1 ? ob2.b4counter + 1 : 0;
            ob2.bulb_color = getBulb4colors(ob2.b4counter);
            ob2.bulb = "bulb4";
            buttons.pushingButton = "pushButton4";
          break;
        }
        playSound("mouseclick", 2000, scene);
      }
    }
  }
}

export {pushButtonsOb2};
