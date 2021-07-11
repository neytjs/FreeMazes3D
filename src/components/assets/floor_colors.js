import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

function floorColors() {
  let floor_colors = [
    new Color3(0.51, 0.44, 0.27),
    new Color3(0.2, 0.2, 0.29),
    new Color3(0.31, 0.11, 0.21),
    new Color3(0.27, 0.25, 0.11),
    new Color3(0.29, 0.29, 0.27),
    new Color3(0.07, 0.21, 0.04),
    new Color3(0.24, 0.04, 0.5)
  ];

  floor_colors = arrayShuffler(floor_colors);

  return floor_colors;
}

export {floorColors};
