import {crowdCleanUp, agent_object} from "../assets/sphere_pole_crowd.js";
import {sphere_colors} from "../assets/sphere_pole_colors.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";

function agentCollisionsOb3(solved, ob3, obstacle_objects, forcefield_objects, scene, score, global_language) {
  if (agent_object.color) {
    let sphere = scene.getMeshByName("agentSphere");
    let pole = scene.getMeshByName(agent_object.color + "Pole");
    if (sphere.intersectsMesh(pole, false)) {
      playSound("positive", 2000, scene);
      let bulb = scene.getMeshByName(agent_object.color + "Bulb");
      bulb.material.alpha = 1;
    // now splice this color out of sphere_colors
      for (let i = 0, length = sphere_colors.length; i < length; i++) {
        if (sphere_colors[i].color_name === agent_object.color) {
          sphere_colors.splice(i, 1);
          ob3.just_spliced = true;
          break;
        }
      }
    // if sphere_colors = 0, remove forcefield
      if (sphere_colors.length === 0) {
        solved.solvedP3 = true;
        for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
          for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
            if (obstacle_objects[n].obstacle3_id === forcefield_objects[l].forcefield) {
              let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
              if (barrier) {
                setTimeout(() => {
                  playSound("save", 5000, scene);
                  barrier.dispose();
                  GUI_Score(100, score, global_language);
                  GUI_Warning(global_language.text.global.success, 1500, scene);
                }, 1500);
              }
            }
          }
        }
      }
    // finally, run the crowd clean up
      crowdCleanUp(sphere);
    }
  }
}

export {agentCollisionsOb3};
