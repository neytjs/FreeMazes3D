import {StandardMaterial, DynamicTexture} from "@babylonjs/core/Materials";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";
import {GUI_Warning} from "../gui/gui_warning.js";
import {GUI_Score} from "../gui/gui_score.js";
import {playSound} from "../assets/playSound.js";
import {masterCoins} from "../assets/coins_data.js";

function handleLeverOb1(solved, scene, ob1, obstacle_objects, forcefield_objects, inventory, inventory_tracker, score, global_language) {
  if (solved.solvedP1 === false && ob1.machine_status === "handle" && ob1.plane_counter < 3) {
    ob1.machine_status = "insert";

    let DTWidth = 3 * 60;
    let DTHeight = 3 * 60;

    let text = "";

    if (ob1.coin_name === masterCoins[ob1.plane_counter]) {
      text = 7;
      ob1.numbers.push(text);
    } else {
      let nums = [0, 1, 2, 3, 4, 5, 6, 8, 9];
      let rand = Math.floor(Math.random() * 9);
      ob1.numbers.push(nums[rand]);
      text = nums[rand];
    }

    ob1.plane_counter = ob1.plane_counter + 1;

    let plane = scene.getMeshByName("plane_" + ob1.plane_counter + "_Ob1");

    let font_type = "Arial";

    let dynamicTexture = new DynamicTexture("DynamicTexture", {width: DTWidth, height: DTHeight}, scene);

    let ctx = dynamicTexture.getContext();
    let size = 14;
    ctx.font = size + "px " + font_type;
    let textWidth = ctx.measureText(text).width * 2;

    let ratio = textWidth / size;

    let font_size = Math.floor(DTWidth / (ratio * 1));
    let font = font_size + "px " + font_type;

    dynamicTexture.drawText(text, null, null, font, "#000000", "transparent", true);

    let mat = new StandardMaterial("mat", scene);
    mat.diffuseTexture = dynamicTexture;
    mat.diffuseTexture.hasAlpha = true;
    plane.material = mat;
    playSound("misc_menu_4", 2000, scene);

    let counter = 0;
    function removeIfPresent() {
      for (let i = 0, length = inventory.length; i < length; i++) {
        if (inventory[i].hasOwnProperty("type") && inventory[i].type === "Ob1_coin") {
          inventory.splice(i, 1);
          counter = counter + 1;
          GUI_InventoryDec(inventory, inventory_tracker);
          GUI_InventoryDisplay(inventory, inventory_tracker);
          break;
        }
      }
      if (counter > 0) {
        counter = 0;
        removeIfPresent();
      }
    }
    function positionCoins(y_pos) {
      let c1_coin = scene.getMeshByName("copper_1_Ob1");
      c1_coin.position.y = y_pos;
      let c2_coin = scene.getMeshByName("copper_2_Ob1");
      c2_coin.position.y = y_pos;
      let s1_coin = scene.getMeshByName("silver_1_Ob1");
      s1_coin.position.y = y_pos;
      let s2_coin = scene.getMeshByName("silver_2_Ob1");
      s2_coin.position.y = y_pos;
      let g1_coin = scene.getMeshByName("gold_1_Ob1");
      g1_coin.position.y = y_pos;
      let g2_coin = scene.getMeshByName("gold_2_Ob1");
      g2_coin.position.y = y_pos;
    }
    if (ob1.plane_counter === 3 && ob1.numbers[0] === 7 && ob1.numbers[1] === 7 && ob1.numbers[2] === 7) {
      solved.solvedP1 = true;
    // reset coins
      positionCoins(-1000);
    // reset inventory
      removeIfPresent();
      inventory_tracker.current_item = 1;

      for (let l = 0, llength = forcefield_objects.length; l < llength; l++) {
        for (let n = 0, nlength = obstacle_objects.length; n < nlength; n++) {
          if (obstacle_objects[n].obstacle1_id === forcefield_objects[l].forcefield) {
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
    } else if (ob1.plane_counter === 3 && ob1.plane0_num !== 7 && ob1.plane1_num !== 7 && ob1.plane2_num !== 7) {
      playSound("negative", 3000, scene);
      GUI_Warning(global_language.text.global.fail, 1800, scene);
      setTimeout(() => {
      // reset inventory
        removeIfPresent();
        inventory_tracker.current_item = 1;
      // reset coins
        positionCoins(0);

      // reset planes
        let dynamicTexture = new DynamicTexture("DynamicTexture", {width: DTWidth, height: DTHeight}, scene);
        dynamicTexture.drawText("", null, null, font, "#000000", "transparent", true);
        let plane1 = scene.getMeshByName("plane_1_Ob1");
        let plane2 = scene.getMeshByName("plane_2_Ob1");
        let plane3 = scene.getMeshByName("plane_3_Ob1");
        let mat = new StandardMaterial("mat", scene);
        mat.diffuseTexture = dynamicTexture;
        mat.diffuseTexture.hasAlpha = true;
        plane1.material = mat;
        plane2.material = mat;
        plane3.material = mat;

      // reset ob1 properties
        ob1.numbers = [];
        ob1.plane_counter = 0;
      }, 2000);
    }
  }
}

export {handleLeverOb1};
