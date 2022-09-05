import {Color3, Vector3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";
import {x, z, masterColors} from "../assets/rolling_data.js";

function rollingBallOb20(ob20, scene, solved, score, obstacle_objects, forcefield_objects, global_language) {
  if (solved.solvedP20 === false && ob20.rollingBall === true) {
  // for first ball
    if (ob20.ball_phase === "ball1") {
      let ball1 = scene.getMeshByName("ball1Ob20");
      if (ob20.playing_sound === false) {
        ob20.playing_sound = true;
        let rollingSound1 = new Sound("rollingSound1", "./sound/qubodup-bowling_roll.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 50 });
        rollingSound1.attachToMesh(ball1);
      }

      if (ball1.position.y > -2) {
        ball1.position.y = ball1.position.y - ob20.rate1;
      } else {
        ob20.ball_phase = "ball2";
        let rSound = scene.getSoundByName("rollingSound1");
        rSound.detachFromMesh(ball1);
        rSound.dispose(true, true);
        rSound = null;
        ob20.playing_sound = false;
      }
    }

  // for second ball
    if (ob20.ball_phase === "ball2") {
      let ball2 = scene.getMeshByName("ball2Ob20");
      if (ob20.playing_sound === false) {
        ob20.playing_sound = true;
        let rollingSound2 = new Sound("rollingSound2", "./sound/qubodup-bowling_roll.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 50 });
        rollingSound2.attachToMesh(ball2);
      }

      if (ob20.b2pi1 > -0.25) {
        ball2.position = new Vector3((ob20.radius1 * Math.cos(ob20.b2pi1) + x), (ob20.radius1 * Math.sin(ob20.b2pi1)), (z + 10));
        ob20.b2pi1 = ob20.b2pi1 - ob20.rate2;
      } else {
        ob20.ball_phase = "ball3";
        let rSound = scene.getSoundByName("rollingSound2");
        rSound.detachFromMesh(ball2);
        rSound.dispose(true, true);
        rSound = null;
        ob20.playing_sound = false;
      }
    }

  // for third ball
    if (ob20.ball_phase === "ball3") {
      let ball3 = scene.getMeshByName("ball3Ob20");
      if (ob20.playing_sound === false) {
        ob20.playing_sound = true;
        let rollingSound3 = new Sound("rollingSound3", "./sound/qubodup-bowling_roll.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 50 });
        rollingSound3.attachToMesh(ball3);
      }

      if (ob20.b3pi1 < 10) {
        ball3.position = new Vector3((ob20.radius1 * Math.cos(ob20.b3pi1) + x), (ob20.radius1 * Math.sin(ob20.b3pi1)), (z - 10));
        ob20.b3pi1 = ob20.b3pi1 + ob20.rate2;
      } else {
        ob20.ball_phase = "ball4";
        let rSound = scene.getSoundByName("rollingSound3");
        rSound.detachFromMesh(ball3);
        rSound.dispose(true, true);
        rSound = null;
        ob20.playing_sound = false;
      }
    }

  // for forth ball
    if (ob20.ball_phase === "ball4") {
      let ball4 = scene.getMeshByName("ball4Ob20");
      if (ob20.playing_sound === false) {
        ob20.playing_sound = true;
        let rollingSound4 = new Sound("rollingSound4", "./sound/qubodup-bowling_roll.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 50 });
        rollingSound4.attachToMesh(ball4);
      }

      if (ob20.b4pi1 < 8.5) {
        ball4.position = new Vector3((x - 20), (ob20.radius2 * Math.cos(ob20.b4pi1) + 2.5), (ob20.radius2 * Math.sin(ob20.b4pi1) + (z - 25)));
        ob20.b4pi1 = ob20.b4pi1 + ob20.rate2;
      } else {
        let ball1 = scene.getMeshByName("ball1Ob20");
        ball1.position.y = 9;
        ob20.b2pi1 = Math.PI + 0.5;
        ob20.b3pi1 = Math.PI + 2.5;
        ob20.b4pi1 = Math.PI + 2.5;
        ob20.radius1 = 10;
        ob20.radius2 = 5;
        ob20.rollingBall = false;
        ob20.playing_sound = false;
        let rSound = scene.getSoundByName("rollingSound4");
        rSound.detachFromMesh(ball4);
        rSound.dispose(true, true);
        rSound = null;
        ob20.ball_phase = "ball1";
        ob20.bulb_counter = ob20.bulb_counter + 1;
        if (ob20.bulb_counter < 4) {
          playSound("8bit_bomb_explosion", 1100, scene);
          setTimeout(() => {
            playSound("misc_menu_4", 2000, scene);
            let bulb = scene.getMeshByName("bulb" + ob20.bulb_counter + "Ob20");
            bulb.material.diffuseColor = ob20.bulb_color;
            bulb.material.specularColor = ob20.bulb_color;
            bulb.material.emissiveColor = ob20.bulb_color;
            bulb.material.ambientColor = ob20.bulb_color;
            setTimeout(() => {
              if (ob20.bulb_counter === 3) {
                if (ob20.bulb_colors[0] === masterColors[0] && ob20.bulb_colors[1] === masterColors[1] && ob20.bulb_colors[2] === masterColors[2]) {
                  solved.solvedP20 = true;
                  for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
                    for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
                      if (obstacle_objects[n].obstacle20_id === forcefield_objects[l].forcefield) {
                        let barrier = scene.getMeshByName("barrier" + forcefield_objects[l].forcefield);
                        if (barrier) {
                          setTimeout(() => {
                            playSound("save", 5000, scene);
                            barrier.dispose();
                            GUI_Score(200, score, global_language);
                            GUI_Warning(global_language.text.global.success, 1500, scene);
                          }, 1500);
                        }
                      }
                    }
                  }
                } else {
                // fail condition
                  playSound("negative", 3000, scene);
                  GUI_Warning(global_language.text.global.fail, 2500, scene);
                  ob20.bulb_counter = 0;
                  ob20.bulb_colors = [];
                  let bulb1 = scene.getMeshByName("bulb1Ob20");
                  let bulb2 = scene.getMeshByName("bulb2Ob20");
                  let bulb3 = scene.getMeshByName("bulb3Ob20");
                  bulb1.material.diffuseColor = new Color3(0.55, 0.48, 0.48);
                  bulb1.material.specularColor = new Color3(0.55, 0.48, 0.48);
                  bulb1.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
                  bulb1.material.ambientColor = new Color3(0.55, 0.48, 0.48);

                  bulb2.material.diffuseColor = new Color3(0.55, 0.48, 0.48);
                  bulb2.material.specularColor = new Color3(0.55, 0.48, 0.48);
                  bulb2.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
                  bulb2.material.ambientColor = new Color3(0.55, 0.48, 0.48);
                                    
                  bulb3.material.diffuseColor = new Color3(0.55, 0.48, 0.48);
                  bulb3.material.specularColor = new Color3(0.55, 0.48, 0.48);
                  bulb3.material.emissiveColor = new Color3(0.55, 0.48, 0.48);
                  bulb3.material.ambientColor = new Color3(0.55, 0.48, 0.48);
                }
              }
            }, 1200);
          }, 500);
        }
      }
    }
  }
}

export {rollingBallOb20};
