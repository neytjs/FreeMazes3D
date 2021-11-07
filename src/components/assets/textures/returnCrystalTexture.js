import {Texture} from "@babylonjs/core/Materials/Textures";

function returnCrystalTexture(texture_name, scene) {
  let texture = {};

  switch (texture_name) {
    case "gem_black":
      texture = new Texture("./textures/crystals/gem_black.png", scene);
    break;
    case "gem_blue":
      texture = new Texture("./textures/crystals/gem_blue.png", scene);
    break;
    case "gem_bluepurple":
      texture = new Texture("./textures/crystals/gem_bluepurple.png", scene);
    break;
    case "gem_darkgreen":
      texture = new Texture("./textures/crystals/gem_darkgreen.png", scene);
    break;
    case "gem_darkpurple":
      texture = new Texture("./textures/crystals/gem_darkpurple.png", scene);
    break;
    case "gem_darkred":
      texture = new Texture("./textures/crystals/gem_darkred.png", scene);
    break;
    case "gem_green":
      texture = new Texture("./textures/crystals/gem_green.png", scene);
    break;
    case "gem_hotpink":
      texture = new Texture("./textures/crystals/gem_hotpink.png", scene);
    break;
    case "gem_orange":
      texture = new Texture("./textures/crystals/gem_orange.png", scene);
    break;
    case "gem_pink":
      texture = new Texture("./textures/crystals/gem_pink.png", scene);
    break;
    case "gem_purple":
      texture = new Texture("./textures/crystals/gem_purple.png", scene);
    break;
    case "gem_red":
      texture = new Texture("./textures/crystals/gem_red.png", scene);
    break;
    case "gem_skyblue":
      texture = new Texture("./textures/crystals/gem_skyblue.png", scene);
    break;
    case "gem_teal":
      texture = new Texture("./textures/crystals/gem_teal.png", scene);
    break;
    case "gem_white":
      texture = new Texture("./textures/crystals/gem_white.png", scene);
    break;
    case "gem_verydarkpurple":
      texture = new Texture("./textures/crystals/gem_verydarkpurple.png", scene);
    break;
    case "gem_yellow":
      texture = new Texture("./textures/crystals/gem_yellow.png", scene);
    break;
  }

  return texture;
}

export {returnCrystalTexture};
