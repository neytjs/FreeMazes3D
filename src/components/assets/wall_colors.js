import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

function wallColors() {
  let wall_colors = [
    new Color3(0.63, 0.61, 0.58),
    new Color3(0.38, 0.6, 0.45),
    new Color3(1, 0.67, 0.31),
    new Color3(0.49, 0.4, 0.56),
    new Color3(0.76, 0.5, 0.5),
    new Color3(0.98, 0.87, 0.4),
    new Color3(0.51, 0.67, 0.96)
  ];

  wall_colors = arrayShuffler(wall_colors);

  return wall_colors;
}

export {wallColors};
