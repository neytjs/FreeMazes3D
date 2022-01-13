import {playSound} from "../assets/playSound.js";
import {returnCrystalTexture} from "../assets/textures.js";

function setBallColorOb20(button_name, ob20, scene, obstacle_objects) {
  for (let i = 0, length = obstacle_objects.length; i < length; i++) {
    if (obstacle_objects[i].button_name === button_name) {
      ob20.bulb_color = obstacle_objects[i].color_code;
      ob20.bulb_colors.push(obstacle_objects[i].color_name);
      let ball1 = scene.getMeshByName("ball1Ob20");
      let ball2 = scene.getMeshByName("ball2Ob20");
      let ball3 = scene.getMeshByName("ball3Ob20");
      let ball4 = scene.getMeshByName("ball4Ob20");
      ball1.material.diffuseTexture = returnCrystalTexture(obstacle_objects[i].button_texture, scene);
      ball2.material.diffuseTexture = returnCrystalTexture(obstacle_objects[i].button_texture, scene);
      ball3.material.diffuseTexture = returnCrystalTexture(obstacle_objects[i].button_texture, scene);
      ball4.material.diffuseTexture = returnCrystalTexture(obstacle_objects[i].button_texture, scene);
      ob20.rollingBall = true;
      break;
    }
  }
}

export {setBallColorOb20};
