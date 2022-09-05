import {playSound} from "../assets/playSound.js";

function setBulbColorOb16(button_name, ob16, scene, obstacle_objects) {
  for (let i = 0, length = obstacle_objects.length; i < length; i++) {
    if (obstacle_objects[i].button_name === button_name && ob16.pushButton1p16 === true) {
      playSound("misc_menu_4", 2000, scene);
      ob16.bulb_counter = ob16.bulb_counter + 1;
      ob16["puzz_bulb" + ob16.bulb_counter] = obstacle_objects[i].color_name;
      let bulb = scene.getMeshByName("bulb" + ob16.bulb_counter + "Ob16");
      bulb.material.diffuseColor = obstacle_objects[i].color_code;
      bulb.material.specularColor = obstacle_objects[i].color_code;
      bulb.material.emissiveColor = obstacle_objects[i].color_code;
      bulb.material.ambientColor = obstacle_objects[i].color_code;
      break;
    }
  }
}

export {setBulbColorOb16};
