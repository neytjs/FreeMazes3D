import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

function skyColors() {
  let sky_colors = [
    new Color3(0, 0, 0),
    new Color3(0.28, 0.81, 0.97),
    new Color3(0.82, 0.85, 0.86)
  ];

  sky_colors = arrayShuffler(sky_colors);

  return sky_colors;
}

export {skyColors};
