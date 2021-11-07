import {Texture} from "@babylonjs/core/Materials/Textures";

function returnLiquidTexture(texture_name, scene) {
  let texture = {};

  switch (texture_name) {
    case "acid_green":
      texture = new Texture("./textures/liquid/acid_green.png", scene);
    break;
    case "acid_orange":
      texture = new Texture("./textures/liquid/acid_orange.png", scene);
    break;
    case "acid_pink":
      texture = new Texture("./textures/liquid/acid_pink.png", scene);
    break;
    case "acid_red":
      texture = new Texture("./textures/liquid/acid_red.png", scene);
    break;
    case "water":
      texture = new Texture("./textures/liquid/water.png", scene);
    break;
  }

  return texture;
}

export {returnLiquidTexture};
