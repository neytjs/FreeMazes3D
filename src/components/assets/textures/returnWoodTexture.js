import {Texture} from "@babylonjs/core/Materials/Textures";

function returnWoodTexture(texture_name, scene) {
  let texture = {};

  switch (texture_name) {
    case "wood_brown":
      texture = new Texture("./textures/wood/wood_brown.png", scene);
    break;
    case "wood_darkbrown":
      texture = new Texture("./textures/wood/wood_darkbrown.png", scene);
    break;
    case "wood_lightbrown":
      texture = new Texture("./textures/wood/wood_lightbrown.png", scene);
    break;
  }

  return texture;
}

export {returnWoodTexture};
