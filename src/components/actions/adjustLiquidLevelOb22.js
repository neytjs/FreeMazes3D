import {Vector3} from "@babylonjs/core/Maths/math";
import {Sound} from "@babylonjs/core/Audio";
import {playSound} from "../assets/playSound.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {returnFloorTexture, returnTreeTexture} from "../assets/textures.js";

function adjustLiquidLevelOb22(ob22, scene, global_language) {
  if (ob22.adjusting_liquid_level === true) {
    const down_val = -4;
    const up_val = 4.5;
    let liquid = scene.getMeshByName("liquidOb22");
    if (ob22.playing_sound === false) {
      ob22.playing_sound = true;
      let liquidSound = new Sound("liquidSoundOb22", "./sound/AcidBubble.mp3", scene, null, { loop: true, autoplay: true, volume: 1, maxDistance: 200 });
      liquidSound.attachToMesh(liquid);
    }
    let soundOnOff = () => {
      let lSound = scene.getSoundByName("liquidSoundOb22");
      if (lSound) {
        lSound.detachFromMesh(liquid);
        lSound.dispose(true, true);
        lSound = null;
        ob22.playing_sound = false;
      }
    }

  // lower
    if (liquid.position.y > down_val && ob22.liquid_draining === true && ob22.adjusting_liquid_level === true) {
      liquid.position.y -= 0.02;
    } else if (liquid.position.y <= down_val && ob22.liquid_draining === true && ob22.adjusting_liquid_level === true) {
      ob22.adjusting_liquid_level = false;
      soundOnOff();
    }
  // raise
    if (liquid.position.y < up_val && ob22.liquid_draining === false && ob22.adjusting_liquid_level === true) {
      liquid.position.y += 0.02;
    } else if (liquid.position.y >= up_val && ob22.liquid_draining === false && ob22.adjusting_liquid_level === true) {
      ob22.adjusting_liquid_level = false;
      soundOnOff();
      if (ob22.drain1 === true && ob22.drain2 === true) {
        let groveTrunksOb22at1specialEffect1 = scene.getMeshByName("groveTrunksOb22a" + "t1" + "SpecialEffect1");
        let groveTrunksOb22at1specialEffect2 = scene.getMeshByName("groveTrunksOb22a" + "t1" + "SpecialEffect2");
        let groveTrunksOb22at2specialEffect1 = scene.getMeshByName("groveTrunksOb22a" + "t2" + "SpecialEffect1");
        let groveTrunksOb22at2specialEffect2 = scene.getMeshByName("groveTrunksOb22a" + "t2" + "SpecialEffect2");
        let groveTrunksOb22at3specialEffect1 = scene.getMeshByName("groveTrunksOb22a" + "t3" + "SpecialEffect1");
        let groveTrunksOb22at3specialEffect2 = scene.getMeshByName("groveTrunksOb22a" + "t3" + "SpecialEffect2");

        let groveTrunksOb22bt1specialEffect1 = scene.getMeshByName("groveTrunksOb22b" + "t1" + "SpecialEffect1");
        let groveTrunksOb22bt1specialEffect2 = scene.getMeshByName("groveTrunksOb22b" + "t1" + "SpecialEffect2");
        let groveTrunksOb22bt2specialEffect1 = scene.getMeshByName("groveTrunksOb22b" + "t2" + "SpecialEffect1");
        let groveTrunksOb22bt2specialEffect2 = scene.getMeshByName("groveTrunksOb22b" + "t2" + "SpecialEffect2");
        let groveTrunksOb22bt3specialEffect1 = scene.getMeshByName("groveTrunksOb22b" + "t3" + "SpecialEffect1");
        let groveTrunksOb22bt3specialEffect2 = scene.getMeshByName("groveTrunksOb22b" + "t3" + "SpecialEffect2");

        let x1 = -35;
        let z1 = 1000;
        let x2 = -35;
        let z2 = 1035;
        let x3 = -35;
        let z3 = 965;
        let x4 = 35;
        let z4 = 1000;
        let x5 = 35;
        let z5 = 1035;
        let x6 = 35;
        let z6 = 965;
        let y1 = 0;
        let radius = 30;
        let at1s1pi1 = Math.PI;
        let at1s1height = 3;
        let at1s2pi2 = Math.PI;
        let at1s2height = 8;
        let at2s1pi1 = Math.PI;
        let at2s1height = 3;
        let at2s2pi2 = Math.PI;
        let at2s2height = 8;
        let at3s1pi1 = Math.PI;
        let at3s1height = 3;
        let at3s2pi2 = Math.PI;
        let at3s2height = 8;
        let bt1s1pi1 = Math.PI;
        let bt1s1height = 3;
        let bt1s2pi2 = Math.PI;
        let bt1s2height = 8;
        let bt2s1pi1 = Math.PI;
        let bt2s1height = 3;
        let bt2s2pi2 = Math.PI;
        let bt2s2height = 8;
        let bt3s1pi1 = Math.PI;
        let bt3s1height = 3;
        let bt3s2pi2 = Math.PI;
        let bt3s2height = 8;

        scene.registerBeforeRender(function() {
          groveTrunksOb22at1specialEffect1.position = new Vector3((radius * Math.sin(at1s1pi1) + x1), at1s1height, (radius * Math.cos(at1s1pi1) + z1));
          at1s1pi1 = at1s1pi1 + 0.02;
          at1s1height = at1s1height + 0.07;

          groveTrunksOb22at1specialEffect2.position = new Vector3((radius * Math.sin(at1s2pi2) + x1), at1s2height, (radius * Math.cos(at1s2pi2) + z1));
          at1s2pi2 = at1s2pi2 - 0.025;
          at1s2height = at1s2height + 0.075;

          groveTrunksOb22at2specialEffect1.position = new Vector3((radius * Math.sin(at2s1pi1) + x2), at2s1height, (radius * Math.cos(at2s1pi1) + z2));
          at2s1pi1 = at2s1pi1 + 0.035;
          at2s1height = at2s1height + 0.085;

          groveTrunksOb22at2specialEffect2.position = new Vector3((radius * Math.sin(at2s2pi2) + x2), at2s2height, (radius * Math.cos(at2s2pi2) + z2));
          at2s2pi2 = at2s2pi2 - 0.03;
          at2s2height = at2s2height + 0.08;

          groveTrunksOb22at3specialEffect1.position = new Vector3((radius * Math.sin(at3s1pi1) + x3), at3s1height, (radius * Math.cos(at3s1pi1) + z3));
          at3s1pi1 = at3s1pi1 + 0.025;
          at3s1height = at3s1height + 0.075;

          groveTrunksOb22at3specialEffect2.position = new Vector3((radius * Math.sin(at3s2pi2) + x3), at3s2height, (radius * Math.cos(at3s2pi2) + z3));
          at3s2pi2 = at3s2pi2 - 0.035;
          at3s2height = at3s2height + 0.085;

          groveTrunksOb22bt1specialEffect1.position = new Vector3((radius * Math.sin(bt1s1pi1) + x4), bt1s1height, (radius * Math.cos(bt1s1pi1) + z4));
          bt1s1pi1 = bt1s1pi1 + 0.02;
          bt1s1height = bt1s1height + 0.07;

          groveTrunksOb22bt1specialEffect2.position = new Vector3((radius * Math.sin(bt1s2pi2) + x4), bt1s2height, (radius * Math.cos(bt1s2pi2) + z4));
          bt1s2pi2 = bt1s2pi2 - 0.035;
          bt1s2height = bt1s2height + 0.085;

          groveTrunksOb22bt2specialEffect1.position = new Vector3((radius * Math.sin(bt2s1pi1) + x5), bt2s1height, (radius * Math.cos(bt2s1pi1) + z5));
          bt2s1pi1 = bt2s1pi1 + 0.03;
          bt2s1height = bt2s1height + 0.08;

          groveTrunksOb22bt2specialEffect2.position = new Vector3((radius * Math.sin(bt2s2pi2) + x5), bt2s2height, (radius * Math.cos(bt2s2pi2) + z5));
          bt2s2pi2 = bt2s2pi2 - 0.02;
          bt2s2height = bt2s2height + 0.07;

          groveTrunksOb22bt3specialEffect1.position = new Vector3((radius * Math.sin(bt3s1pi1) + x6), bt3s1height, (radius * Math.cos(bt3s1pi1) + z6));
          bt3s1pi1 = bt3s1pi1 + 0.035;
          bt3s1height = bt3s1height + 0.085;

          groveTrunksOb22bt3specialEffect2.position = new Vector3((radius * Math.sin(bt3s2pi2) + x6), bt3s2height, (radius * Math.cos(bt3s2pi2) + z6));
          bt3s2pi2 = bt3s2pi2 - 0.02;
          bt3s2height = bt3s2height + 0.075;

          if (at1s1height > 85 & at1s2height > 85) {
            groveTrunksOb22at1specialEffect1.dispose();
            groveTrunksOb22at1specialEffect2.dispose();
            groveTrunksOb22at2specialEffect1.dispose();
            groveTrunksOb22at2specialEffect2.dispose();
            groveTrunksOb22at3specialEffect1.dispose();
            groveTrunksOb22at3specialEffect2.dispose();
            groveTrunksOb22bt1specialEffect1.dispose();
            groveTrunksOb22bt1specialEffect2.dispose();
            groveTrunksOb22bt2specialEffect1.dispose();
            groveTrunksOb22bt2specialEffect2.dispose();
            groveTrunksOb22bt3specialEffect1.dispose();
            groveTrunksOb22bt3specialEffect2.dispose();
          }
        });

        playSound("positive", 2000, scene);
        GUI_Warning(global_language.text.puzzles.ob22.alert, 2500, scene);
        let groveTrunksOb22a = scene.getMeshByName("groveTrunksOb22a");
        groveTrunksOb22a.material.diffuseTexture = returnTreeTexture("bark_pine_big", scene);
        groveTrunksOb22a.material.diffuseTexture.uScale = 6;
        groveTrunksOb22a.material.diffuseTexture.vScale = 6;
        let groveTrunksOb22b = scene.getMeshByName("groveTrunksOb22b");
        groveTrunksOb22b.material.diffuseTexture = returnTreeTexture("bark_pine_big", scene);
        groveTrunksOb22b.material.diffuseTexture.uScale = 6;
        groveTrunksOb22b.material.diffuseTexture.vScale = 6;
        let groveNeedlesOb22a = scene.getMeshByName("groveNeedlesOb22a");
        groveNeedlesOb22a.material.diffuseTexture = returnTreeTexture("needles_pine", scene);
        groveNeedlesOb22a.material.diffuseTexture.uScale = 15;
        groveNeedlesOb22a.material.diffuseTexture.vScale = 15;
        let groveNeedlesOb22b = scene.getMeshByName("groveNeedlesOb22b");
        groveNeedlesOb22b.material.diffuseTexture = returnTreeTexture("needles_pine", scene);
        groveNeedlesOb22b.material.diffuseTexture.uScale = 15;
        groveNeedlesOb22b.material.diffuseTexture.vScale = 15;
        let groveDirtOb22a = scene.getMeshByName("groveDirtOb22a");
        groveDirtOb22a.material.diffuseTexture = returnFloorTexture("soil", scene);
        groveDirtOb22a.material.diffuseTexture.uScale = 10;
        groveDirtOb22a.material.diffuseTexture.vScale = 1.95;
        let groveDirtOb22b = scene.getMeshByName("groveDirtOb22b");
        groveDirtOb22b.material.diffuseTexture = returnFloorTexture("soil", scene);
        groveDirtOb22b.material.diffuseTexture.uScale = 10;
        groveDirtOb22b.material.diffuseTexture.vScale = 1.95;
        let finalButtonBarrierOb22 = scene.getMeshByName("finalButtonBarrierOb22");
        finalButtonBarrierOb22.dispose();
        let finalButtonBarrierVisibleOb22 = scene.getMeshByName("finalButtonBarrierVisibleOb22");
        finalButtonBarrierVisibleOb22.dispose();
        ob22.purified = true;
      }
    }
  }
}

export {adjustLiquidLevelOb22};
