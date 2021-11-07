import {Texture} from "@babylonjs/core/Materials/Textures";

function returnMetalTexture(texture_name, scene) {
  let texture = {};

  switch (texture_name) {
    case "copper":
      texture = new Texture("./textures/metals/copper.png", scene);
    break;
    case "gold":
      texture = new Texture("./textures/metals/gold.png", scene);
    break;
    case "iron":
      texture = new Texture("./textures/metals/iron.png", scene);
    break;
    case "iron_blue":
      texture = new Texture("./textures/metals/iron_blue.png", scene);
    break;
    case "iron_dark":
      texture = new Texture("./textures/metals/iron_dark.png", scene);
    break;
    case "iron_medium":
      texture = new Texture("./textures/metals/iron_medium.png", scene);
    break;
    case "iron_rusty":
      texture = new Texture("./textures/metals/iron_rusty.png", scene);
    break;
    case "iron_rustydark":
      texture = new Texture("./textures/metals/iron_rustydark.png", scene);
    break;
    case "iron_tan":
      texture = new Texture("./textures/metals/iron_tan.png", scene);
    break;
    case "metal_blue":
      texture = new Texture("./textures/metals/metal_blue.png", scene);
    break;
    case "metal_green":
      texture = new Texture("./textures/metals/metal_green.png", scene);
    break;
    case "metal_huntergreen":
      texture = new Texture("./textures/metals/metal_huntergreen.png", scene);
    break;
    case "metal_red":
      texture = new Texture("./textures/metals/metal_red.png", scene);
    break;
    case "metal_yellow":
      texture = new Texture("./textures/metals/metal_yellow.png", scene);
    break;
    case "silver":
      texture = new Texture("./textures/metals/silver.png", scene);
    break;
  }

  return texture;
}

export {returnMetalTexture};
