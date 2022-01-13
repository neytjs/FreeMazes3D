import {Color3} from "@babylonjs/core/Maths/math";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {playSound} from "../assets/playSound.js";
import {sound_machines_colors} from "../assets/sound_machines_colors.js";

function activateSoundMachineOb18(hit, solved, ob18, scene) {
  if (solved.solvedP18 === false) {
    function solveCheck() {
      if (ob18.sounds.length >= 6) {
        function bulbCheckLightSoundEffect(callback) {
          setTimeout(() => {
            if (ob18.sounds[0] === "smachine_six") {
              playSound("six", 1000, scene);
              let light1 = scene.getMeshByName("bulb1Ob18");
              light1.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              setTimeout(() => {
                light1.material.emissiveColor = sound_machines_colors[5];
                if (ob18.sounds[1] === "smachine_five") {
                  playSound("five", 1000, scene);
                  let light2 = scene.getMeshByName("bulb2Ob18");
                  light2.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
                  setTimeout(() => {
                    light2.material.emissiveColor = sound_machines_colors[4];
                    if (ob18.sounds[2] === "smachine_four") {
                      playSound("four", 1000, scene);
                      let light3 = scene.getMeshByName("bulb3Ob18");
                      light3.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
                      setTimeout(() => {
                        light3.material.emissiveColor = sound_machines_colors[3];
                        if (ob18.sounds[3] === "smachine_three") {
                          playSound("three", 1000, scene);
                          let light4 = scene.getMeshByName("bulb4Ob18");
                          light4.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
                          setTimeout(() => {
                            light4.material.emissiveColor = sound_machines_colors[2];
                            if (ob18.sounds[4] === "smachine_two") {
                              playSound("two", 1000, scene);
                              let light5 = scene.getMeshByName("bulb5Ob18");
                              light5.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
                              setTimeout(() => {
                                light5.material.emissiveColor = sound_machines_colors[1];
                                if (ob18.sounds[5] === "smachine_one") {
                                  playSound("one", 1000, scene);
                                  let light6 = scene.getMeshByName("bulb6Ob18");
                                  light6.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
                                  setTimeout(() => {
                                    light6.material.emissiveColor = sound_machines_colors[0];
                                    callback();
                                  }, 1000);
                                } else {
                                  callback();
                                }
                              }, 1000);
                            } else {
                              callback();
                            }
                          }, 1000);
                        } else {
                          callback();
                        }
                      }, 1000);
                    } else {
                      callback();
                    }
                  }, 1000);
                } else {
                  callback();
                }
              }, 1000);
            } else {
              callback();
            }
          }, 1000);
        }
        if (ob18.sounds[0] === "smachine_six" && ob18.sounds[1] === "smachine_five" && ob18.sounds[2] === "smachine_four" && ob18.sounds[3] === "smachine_three" && ob18.sounds[4] === "smachine_two" && ob18.sounds[5] === "smachine_one") {
          bulbCheckLightSoundEffect(() => {
            setTimeout(() => {
              playSound("8bit_bomb_explosion", 3000, scene);
              let crystal = scene.getMeshByName("crystalShardsOb18");
              crystal.dispose();
              let crystalBarrier = scene.getMeshByName("crystalOb18");
              crystalBarrier.dispose();
              ob18.sounds = [];
            }, 1800);
          });
        } else {
          bulbCheckLightSoundEffect(() => {
            setTimeout(() => {
              ob18.light_counter = 0;
              ob18.sounds = [];
              ob18.smachine_one = false;
              ob18.smachine_two = false;
              ob18.smachine_three = false;
              ob18.smachine_four = false;
              ob18.smachine_five = false;
              ob18.smachine_six = false;
              playSound("negative", 3000, scene);
              GUI_Warning("You have failed. Try again.", 2500);
              let machine_light1 = scene.getMeshByName("smachine_one_bulb");
              machine_light1.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let machine_light2 = scene.getMeshByName("smachine_two_bulb");
              machine_light2.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let machine_light3 = scene.getMeshByName("smachine_three_bulb");
              machine_light3.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let machine_light4 = scene.getMeshByName("smachine_four_bulb");
              machine_light4.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let machine_light5 = scene.getMeshByName("smachine_five_bulb");
              machine_light5.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let machine_light6 = scene.getMeshByName("smachine_six_bulb");
              machine_light6.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let light1 = scene.getMeshByName("bulb1Ob18");
              light1.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let light2 = scene.getMeshByName("bulb2Ob18");
              light2.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let light3 = scene.getMeshByName("bulb3Ob18");
              light3.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let light4 = scene.getMeshByName("bulb4Ob18");
              light4.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let light5 = scene.getMeshByName("bulb5Ob18");
              light5.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
              let light6 = scene.getMeshByName("bulb6Ob18");
              light6.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
            }, 1800);
          });
        }
      }
    }
    function lightLight(light_num, sm_num, mach_color) {
      if (light_num <= 6) {
        let light_name = "";
        switch (light_num) {
          case 1:
            light_name = "bulb1Ob18";
          break;
          case 2:
            light_name = "bulb2Ob18";
          break;
          case 3:
            light_name = "bulb3Ob18";
          break;
          case 4:
            light_name = "bulb4Ob18";
          break;
          case 5:
            light_name = "bulb5Ob18";
          break;
          case 6:
            light_name = "bulb6Ob18";
          break;
        }

        let machine_light = scene.getMeshByName(sm_num+"_bulb");
        machine_light.material.emissiveColor = mach_color;
        let light = scene.getMeshByName(light_name);
        light.material.emissiveColor = mach_color;
        ob18.sounds.push(sm_num);
      }
      solveCheck();
    }

    if (hit.pickedMesh.name === "smachine_one" && ob18.smachine_one === false) {
      ob18.light_counter = ob18.light_counter + 1;
      ob18.smachine_one = true;
      playSound("one", 2000, scene);
      lightLight(ob18.light_counter, "smachine_one", sound_machines_colors[0]);
    }
    if (hit.pickedMesh.name === "smachine_two" && ob18.smachine_two === false) {
      ob18.light_counter = ob18.light_counter + 1;
      ob18.smachine_two = true;
      playSound("two", 2000, scene);
      lightLight(ob18.light_counter, "smachine_two", sound_machines_colors[1]);
    }
    if (hit.pickedMesh.name === "smachine_three" && ob18.smachine_three === false) {
      ob18.light_counter = ob18.light_counter + 1;
      ob18.smachine_three = true;
      playSound("three", 2000, scene);
      lightLight(ob18.light_counter, "smachine_three", sound_machines_colors[2]);
    }
    if (hit.pickedMesh.name === "smachine_four" && ob18.smachine_four === false) {
      ob18.light_counter = ob18.light_counter + 1;
      ob18.smachine_four = true;
      playSound("four", 2000, scene);
      lightLight(ob18.light_counter, "smachine_four", sound_machines_colors[3]);
    }
    if (hit.pickedMesh.name === "smachine_five" && ob18.smachine_five === false) {
      ob18.light_counter = ob18.light_counter + 1;
      ob18.smachine_five = true;
      playSound("five", 2000, scene);
      lightLight(ob18.light_counter, "smachine_five", sound_machines_colors[4]);
    }
    if (hit.pickedMesh.name === "smachine_six" && ob18.smachine_six === false) {
      ob18.light_counter = ob18.light_counter + 1;
      ob18.smachine_six = true;
      playSound("six", 2000, scene);
      lightLight(ob18.light_counter, "smachine_six", sound_machines_colors[5]);
    }
  }
}

export {activateSoundMachineOb18};
