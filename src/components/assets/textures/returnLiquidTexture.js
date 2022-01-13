import {Texture} from "@babylonjs/core/Materials/Textures";

function returnLiquidTexture(texture_name, scene) {
  let texture = {};

  switch (texture_name) {
    case "acid_blue":
      texture = new Texture("./textures/liquid/acid_blue.png", scene);
    break;
    case "acid_brown":
      texture = new Texture("./textures/liquid/acid_brown.png", scene);
    break;
    case "acid_default":
      texture = new Texture("./textures/liquid/acid_default.png", scene);
    break;
    case "acid_green":
      texture = new Texture("./textures/liquid/acid_green.png", scene);
    break;
    case "acid_orange":
      texture = new Texture("./textures/liquid/acid_orange.png", scene);
    break;
    case "acid_pink":
      texture = new Texture("./textures/liquid/acid_pink.png", scene);
    break;
    case "acid_purple":
      texture = new Texture("./textures/liquid/acid_purple.png", scene);
    break;
    case "acid_red":
      texture = new Texture("./textures/liquid/acid_red.png", scene);
    break;
    case "acid_teal":
      texture = new Texture("./textures/liquid/acid_teal.png", scene);
    break;
    case "acid_yellow":
      texture = new Texture("./textures/liquid/acid_yellow.png", scene);
    break;
    case "acid_yellowgreen":
      texture = new Texture("./textures/liquid/acid_yellowgreen.png", scene);
    break;
    case "water":
      texture = new Texture("./textures/liquid/water.png", scene);
    break;
  }

  return texture;
}

export {returnLiquidTexture};
