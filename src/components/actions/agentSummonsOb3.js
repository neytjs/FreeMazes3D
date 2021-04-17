import {crowdCleanUp, generateSphere} from "../assets/sphere_pole_crowd.js";
import {playSound} from "../assets/playSound.js";

function agentSummonsOb3(buttons, ob3, scene) {
  if (buttons.pushingButton === "pushButton1p3") {
    let sphere = scene.getMeshByName("agentSphere");
    if (sphere) {
      crowdCleanUp(sphere);
    }

    generateSphere(scene, ob3.just_spliced);
    playSound("load", 5000, scene);
    ob3.just_spliced = false;
  }
}

export {agentSummonsOb3};
