import {Texture} from "@babylonjs/core/Materials/Textures";

function returnFloorTexture(texture_name, scene) {
  let texture = {};

  switch (texture_name) {
    case "grass":
      texture = new Texture("./textures/floors/grass.png", scene);
    break;
    case "snow":
      texture = new Texture("./textures/floors/snow.png", scene);
    break;
    case "soil":
      texture = new Texture("./textures/floors/soil.png", scene);
    break;
    case "stone_slabs_black":
      texture = new Texture("./textures/floors/stone_slabs_black.png", scene);
    break;
    case "stone_slabs_blue":
      texture = new Texture("./textures/floors/stone_slabs_blue.png", scene);
    break;
    case "stone_slabs_bluepurple":
      texture = new Texture("./textures/floors/stone_slabs_bluepurple.png", scene);
    break;
    case "stone_slabs_bloodred":
      texture = new Texture("./textures/floors/stone_slabs_bloodred.png", scene);
    break;
    case "stone_slabs_brown":
      texture = new Texture("./textures/floors/stone_slabs_brown.png", scene);
    break;
    case "stone_slabs_green":
      texture = new Texture("./textures/floors/stone_slabs_green.png", scene);
    break;
    case "stone_slabs_grey":
      texture = new Texture("./textures/floors/stone_slabs_grey.png", scene);
    break;
    case "stone_slabs_peagreen":
      texture = new Texture("./textures/floors/stone_slabs_peagreen.png", scene);
    break;
    case "stone_slabs_purple":
      texture = new Texture("./textures/floors/stone_slabs_purple.png", scene);
    break;
    case "stone_slabs_red":
      texture = new Texture("./textures/floors/stone_slabs_red.png", scene);
    break;
    case "stone_slabs_tan":
      texture = new Texture("./textures/floors/stone_slabs_tan.png", scene);
    break;
    case "stone_slabs_temple":
      texture = new Texture("./textures/floors/stone_slabs_temple.png", scene);
    break;
    case "stone_slabs_tomb":
      texture = new Texture("./textures/floors/stone_slabs_tomb.png", scene);
    break;
    case "wasteland":
      texture = new Texture("./textures/floors/wasteland.png", scene);
    break;
  }

  return texture;
}

export {returnFloorTexture};
