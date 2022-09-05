import {Sound} from "@babylonjs/core/Audio";
import {Vector3} from "@babylonjs/core/Maths/math";

function rotateWheelOb22(scene, solved, ob22, camera)  {
  if (solved.solvedP22 === false && ob22.rotating === true && ob22.adjusting_liquid_level === false) {
    const rate = 0.08;

    function rotatingSoundOn() {
      if (ob22.rotating_sound === false) {
        ob22.rotating_sound = true;
        let rotatingSound = new Sound("rotatingSound", "./sound/spinning.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 60 });
        rotatingSound.attachToMesh(wheel);
      }
    }

    function rotatingSoundOff() {
      ob22.rotating_sound = false;
      let rSound = scene.getSoundByName("rotatingSound");
      rSound.detachFromMesh(wheel);
      rSound.dispose(true, true);
      rSound = null;
    }

    let wheel = scene.getMeshByName(ob22.wheel_name);
    if (ob22.wheel_name === "Ob22_wheel1") {
      rotatingSoundOn();
      camera.setTarget(new Vector3(wheel.position.x, wheel.position.y + 12, wheel.position.z));
      if (wheel.rotation.y > -6.28) {
        camera.detachControl(true);
        wheel.rotation.y = wheel.rotation.y - rate;
      } else {
        rotatingSoundOff();
        camera.attachControl(true);
        ob22.rotating = false;
        wheel.rotation.y = 0;
        ob22.adjusting_liquid_level = true;
        ob22.liquid_draining = (ob22.liquid_draining === false) ? true : false;
      }
    }
  }
}

export {rotateWheelOb22};
