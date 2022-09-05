import {ParticleSystem} from "@babylonjs/core/Particles";
import {Color3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";
import {returnCrystalTexture} from "../assets/textures.js";

function colorConverter(color) {
  switch (color) {
    case "red":
      return new Color3(1, 0, 0);
    break;
    case "orange":
      return new Color3(0.99, 0.48, 0);
    break;
    case "yellow":
      return new Color3(1, 1, 0);
    break;
    case "green":
      return new Color3(0.24, 0.67, 0.18);
    break;
  }
}

function setCrystalOb19(hit_name, ob19, solved, scene, obstacle_objects, forcefield_objects, score, player, global_language) {
  if (solved.solvedP19 === false && ob19.just_accessed === false && ob19.holding !== "") {
    if (hit_name === "red_deviceOb19" || hit_name === "orange_deviceOb19" || hit_name === "yellow_deviceOb19" || hit_name === "green_deviceOb19" || hit_name === "empty1_deviceOb19" || hit_name === "empty2_deviceOb19" || hit_name === "empty3_deviceOb19" || hit_name === "empty4_deviceOb19") {
      if (ob19[hit_name] === "") {
        let carryingCrystal = scene.getMeshByName("carryingCrystalOb19");
        if (carryingCrystal) {
          carryingCrystal.material.alpha = 0;
          carryingCrystal.renderingGroupId = 0;
          carryingCrystal.parent = null;
          carryingCrystal.position.y = -1000;
        }
        ob19.just_accessed = true;
        let crystal_color = hit_name.slice(0, hit_name.lastIndexOf('_'));
        let crystal_mesh = scene.getMeshByName(crystal_color+"_crystalOb19");
        crystal_mesh.material.diffuseTexture = returnCrystalTexture("gem_"+ob19.holding, scene);
        crystal_mesh.material.alpha = 1;
        ob19[hit_name] = ob19.holding;

        if (ob19.holding === crystal_color) {
          playSound("load", 2000, scene);
          let beam = scene.getMeshByName(ob19.holding+"Beam");
          beam.material.diffuseColor = colorConverter(ob19.holding);
          beam.material.backFaceCulling = false;
          beam.material.alpha = 0.9;
          let beamSound = new Sound(crystal_color+"_crystalOb19"+"Sound", "./sound/Sci-Fi_Drone.mp3", scene, null, { loop: true, autoplay: true, volume: 0.5, maxDistance: 25 });
          beamSound.attachToMesh(crystal_mesh);
          setTimeout(() => {
            if (ob19.red_deviceOb19 === "red" && ob19.orange_deviceOb19 === "orange" && ob19.yellow_deviceOb19 === "yellow" && ob19.green_deviceOb19 === "green") {
              solved.solvedP19 = true;
              for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
                for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
                  if (obstacle_objects[n].obstacle19_id === forcefield_objects[l].forcefield) {
                    let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
                    if (barrier) {
                      playSound("save", 5000, scene);
                      barrier.dispose();
                      GUI_Score(100, score, global_language);
                      GUI_Warning(global_language.text.global.success, 1500, scene);
                    }
                  }
                }
              }
            }
          }, 1150);
        } else {
          playSound("negative", 3000, scene);
        }
        setTimeout(() => {
          ob19.just_accessed = false;
        }, 250);
        ob19.holding = "";
        player.holding = "";
      }
    }
  }
}

export {setCrystalOb19};
