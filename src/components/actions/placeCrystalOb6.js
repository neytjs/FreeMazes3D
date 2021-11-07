import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";
import {returnCrystalTexture} from "../assets/textures.js";

function placeCrystalOb6(hit_name, obstacle_objects, forcefield_objects, scene, camera, solved, ob6, player, score) {
  if (player.holding !== "" && solved.solvedP6 === false && ob6.just_accessed === false) {
    if (hit_name === "red_Pedestal" || hit_name === "teal_Pedestal" || hit_name === "pink_Pedestal" || hit_name === "green_Pedestal" || hit_name === "blue_Pedestal" || hit_name === "purple_Pedestal" || hit_name === "grey_Pedestal") {
      let pedestal = hit_name.slice(0, hit_name.lastIndexOf('_'));
      let crystal_mesh = scene.getMeshByName(pedestal+"Crystal");
      if (crystal_mesh.material.alpha === 0) {
        for (let i = 0, length = obstacle_objects.length; i < length; i++) {
          if (obstacle_objects[i].name === "pedestalcrystal") {
            let carryingCrystal = scene.getMeshByName("carryingCrystal");
            if (carryingCrystal) {
              carryingCrystal.material.alpha = 0;
              carryingCrystal.renderingGroupId = 0;
              carryingCrystal.parent = null;
              carryingCrystal.position.y = -1000;
            }
            ob6.just_accessed = true;
            camera.speed = 0.7;
            obstacle_objects[i].pedestals[pedestal].color_name = pedestal;
            obstacle_objects[i].pedestals[pedestal].texture = ob6.holding;
            crystal_mesh.material.diffuseTexture = returnCrystalTexture(ob6.holding, scene);
            crystal_mesh.material.alpha = 1;
            ob6.holding = "";
            player.holding = "";
            playSound("load", 2000, scene);
          // finally, perform test to see if they finished the puzzle
            setTimeout(() => {
              let counter = 0;
              for (let color in obstacle_objects[i].pedestals) {
                if (color === obstacle_objects[i].pedestals[color].color_name && color !== "grey") {
                  counter = counter + 1;
                }
              }
              if (counter === 6) {
                solved.solvedP6 = true;
                for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
                  for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
                    if (obstacle_objects[n].obstacle6_id === forcefield_objects[l].forcefield) {
                      let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
                      if (barrier) {
                        carryingCrystal.dispose();
                        playSound("save", 5000, scene);
                        barrier.dispose();
                        GUI_Score(200, score);
                        GUI_Warning("You have removed the barrier!", 1500);
                      }
                    }
                  }
                }
              }
            }, 1150);
            setTimeout(() => {
              ob6.just_accessed = false;
            }, 250);
          }
        }
      }
    }
  }
}

export {placeCrystalOb6};
