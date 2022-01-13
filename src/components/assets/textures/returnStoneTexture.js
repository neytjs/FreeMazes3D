import {Texture} from "@babylonjs/core/Materials/Textures";

function returnStoneTexture(texture_name, scene) {
  let texture = {};

  switch (texture_name) {
    case "stone":
      texture = new Texture("./textures/stone/stone.png", scene);
    break;
    case "stone_dark":
      texture = new Texture("./textures/stone/stone_dark.png", scene);
    break;
    case "stone_green":
      texture = new Texture("./textures/stone/stone_green.png", scene);
    break;
    case "stone_medium":
      texture = new Texture("./textures/stone/stone_medium.png", scene);
    break;
    case "stone_pink":
      texture = new Texture("./textures/stone/stone_pink.png", scene);
    break;
    case "stone_purple":
      texture = new Texture("./textures/stone/stone_purple.png", scene);
    break;
    case "stone_pyramid":
      texture = new Texture("./textures/stone/stone_pyramid.png", scene);
    break;
    case "stone_pyramiddark":
      texture = new Texture("./textures/stone/stone_pyramiddark.png", scene);
    break;
    case "stone_pyramidverydark":
      texture = new Texture("./textures/stone/stone_pyramidverydark.png", scene);
    break;
    case "stone_teal":
      texture = new Texture("./textures/stone/stone_teal.png", scene);
    break;
    case "stone_tealdark":
      texture = new Texture("./textures/stone/stone_tealdark.png", scene);
    break;
    case "stone_tomb":
      texture = new Texture("./textures/stone/stone_tomb.png", scene);
    break;
    case "stone_verydark":
      texture = new Texture("./textures/stone/stone_verydark.png", scene);
    break;
  }

  return texture;
}

export {returnStoneTexture};
