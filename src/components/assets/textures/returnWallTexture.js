import {Texture} from "@babylonjs/core/Materials/Textures";

function returnWallTexture(texture_name, scene) {
  let texture = {};

  switch (texture_name) {
    case "stone_blocks_blue":
      texture = new Texture("./textures/walls/stone_blocks_blue.png", scene);
    break;
    case "stone_blocks_brown":
      texture = new Texture("./textures/walls/stone_blocks_brown.png", scene);
    break;
    case "stone_blocks_green":
      texture = new Texture("./textures/walls/stone_blocks_green.png", scene);
    break;
    case "stone_blocks_grey":
      texture = new Texture("./textures/walls/stone_blocks_grey.png", scene);
    break;
    case "stone_blocks_orange":
      texture = new Texture("./textures/walls/stone_blocks_orange.png", scene);
    break;
    case "stone_blocks_pink":
      texture = new Texture("./textures/walls/stone_blocks_pink.png", scene);
    break;
    case "stone_blocks_purple":
      texture = new Texture("./textures/walls/stone_blocks_purple.png", scene);
    break;
    case "stone_blocks_pyramid":
      texture = new Texture("./textures/walls/stone_blocks_pyramid.png", scene);
    break;
    case "stone_blocks_red":
      texture = new Texture("./textures/walls/stone_blocks_red.png", scene);
    break;
    case "stone_blocks_teal":
      texture = new Texture("./textures/walls/stone_blocks_teal.png", scene);
    break;
    case "stone_blocks_tomb":
      texture = new Texture("./textures/walls/stone_blocks_tomb.png", scene);
    break;
    case "stone_blocks_yellow":
      texture = new Texture("./textures/walls/stone_blocks_yellow.png", scene);
    break;
  }

  return texture;
}

export {returnWallTexture};
