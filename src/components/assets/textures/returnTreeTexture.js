import {Texture} from "@babylonjs/core/Materials/Textures";

function returnTreeTexture(texture_name, scene) {
  let texture = {};

  switch (texture_name) {
    case "bark":
      texture = new Texture("./textures/trees/bark.png", scene);
    break;
    case "bark_alpine":
      texture = new Texture("./textures/trees/bark_alpine.png", scene);
    break;
    case "bark_wasteland":
      texture = new Texture("./textures/trees/bark_wasteland.png", scene);
    break;
    case "bark_wavy":
      texture = new Texture("./textures/trees/bark_wavy.png", scene);
    break;
    case "bark_wide":
      texture = new Texture("./textures/trees/bark_wide.png", scene);
    break;
    case "bark_winter":
      texture = new Texture("./textures/trees/bark_winter.png", scene);
    break;
    case "cactus":
      texture = new Texture("./textures/trees/cactus.png", scene);
    break;
    case "leaves":
      texture = new Texture("./textures/trees/leaves.png", scene);
    break;
    case "leaves_dark":
      texture = new Texture("./textures/trees/leaves_dark.png", scene);
    break;
    case "needles_alpine":
      texture = new Texture("./textures/trees/needles_alpine.png", scene);
    break;
    case "needles_winter":
      texture = new Texture("./textures/trees/needles_winter.png", scene);
    break;
    case "needles_wasteland":
      texture = new Texture("./textures/trees/needles_wasteland.png", scene);
    break;
  }

  return texture;
}

export {returnTreeTexture};
