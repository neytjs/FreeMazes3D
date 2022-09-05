import {Sound} from "@babylonjs/core/Audio";
import {Vector3} from "@babylonjs/core/Maths/math";
import {poweredMachineOb24} from "./poweredMachineOb24.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function rotateWheelOb24(scene, solved, ob24, camera, obstacle_objects, forcefield_objects, score, global_language) {
  if (solved.solvedP24 === false && ob24.rotating === true) {
    const rate = 0.08;

    function rotatingSoundOn() {
      if (ob24.rotating_sound === false) {
        ob24.rotating_sound = true;
        let rotatingSound = new Sound("rotatingSound", "./sound/spinning.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 60 });
        rotatingSound.attachToMesh(wheel);
      }
    }

    function rotatingSoundOff() {
      ob24.rotating_sound = false;
      let rSound = scene.getSoundByName("rotatingSound");
      rSound.detachFromMesh(wheel);
      rSound.dispose(true, true);
      rSound = null;
    }
    let wheel = scene.getMeshByName(ob24.wheel_name);
    if (ob24.wheel_name === "Ob24_wheel1" || ob24.wheel_name === "Ob24_wheel2" || ob24.wheel_name === "Ob24_wheel3" || ob24.wheel_name === "Ob24_wheel4" || ob24.wheel_name === "Ob24_bigwheel") {
      if (wheel.rotation.y > -6.28) {
        rotatingSoundOn();
        if (ob24.wheel_name === "Ob24_bigwheel") {
          camera.setTarget(new Vector3(wheel.position.x, wheel.position.y + 12, wheel.position.z));
        } else {
          camera.setTarget(new Vector3(wheel.position.x, wheel.position.y + 2, wheel.position.z));
        }
        camera.detachControl(true);
        wheel.rotation.y = wheel.rotation.y - rate;
      } else {
        rotatingSoundOff();
        camera.attachControl(true);
        ob24.rotating = false;
        wheel.rotation.y = 0;
        if (ob24.wheel_name === "Ob24_bigwheel") {
          solved.solvedP24 = true;
          for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
            for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
              if (obstacle_objects[n].obstacle24_id === forcefield_objects[l].forcefield) {
                let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
                if (barrier) {
                  playSound("save", 5000, scene);
                  barrier.dispose();
                  GUI_Score(200, score, global_language);
                  GUI_Warning(global_language.text.global.success, 1500, scene);
                }
              }
            }
          }
        } else {
          poweredMachineOb24(scene, solved, ob24);
        }
      }
    }
  }
}

export {rotateWheelOb24};
