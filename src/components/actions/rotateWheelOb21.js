import {Sound} from "@babylonjs/core/Audio";
import {Vector3} from "@babylonjs/core/Maths/math";

function rotateWheelOb21(scene, ob21, camera) {
  if (ob21.rotating === true) {
    let wheel = scene.getMeshByName(ob21.wheel_name);
    const rate = 0.08;
    const max = 100;

    function rotatingSoundOn() {
      if (ob21.rotating_sound === false) {
        ob21.rotating_sound = true;
        let rotatingSound = new Sound("rotatingSound", "./sound/spinning.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 60 });
        rotatingSound.attachToMesh(wheel);
      }
    }

    function rotatingSoundOff() {
      ob21.rotating_sound = false;
      let rSound = scene.getSoundByName("rotatingSound");
      rSound.detachFromMesh(wheel);
      rSound.dispose(true, true);
      rSound = null;
    }

    if (ob21.wheel_name === "Ob21_machine_wheel" && ob21.running === false) {
      rotatingSoundOn();
      camera.setTarget(new Vector3(wheel.position.x, wheel.position.y, wheel.position.z));
      if (wheel.rotation.z > -6.28) {
        camera.detachControl(true);
        wheel.rotation.z = wheel.rotation.z - rate;
      } else {
        rotatingSoundOff();
        camera.attachControl(true);
        ob21.rotating = false;
        wheel.rotation.z = 0;
        ob21.powered = true;
      }
    }
    if ((ob21.wheel_name === "Ob21_wheel1" && ob21.liquid1.level < max) || (ob21.wheel_name === "Ob21_wheel2" && ob21.liquid2.level < max) || (ob21.wheel_name === "Ob21_wheel3" && ob21.liquid3.level < max) || (ob21.wheel_name === "Ob21_wheel4" && ob21.liquid4.level < max) || (ob21.wheel_name === "Ob21_wheel5" && ob21.liquid5.level < max) || (ob21.wheel_name === "Ob21_wheel6" && ob21.liquid6.level < max)) {
      rotatingSoundOn();
      camera.setTarget(new Vector3(wheel.position.x, wheel.position.y + 2, wheel.position.z));
      if (wheel.rotation.y > -6.28) {
        camera.detachControl(true);
        wheel.rotation.y = wheel.rotation.y - rate;
      } else {
        rotatingSoundOff();
        camera.attachControl(true);
        ob21.rotating = false;
        ob21.rotating_sound = false;
        wheel.rotation.y = 0;
        let liquid_num = ob21.wheel_name.slice(-1);
        ob21["liquid" + liquid_num].emptying = false;
        ob21["liquid" + liquid_num].filling = true;
      }
    }
  }
}

export {rotateWheelOb21};
