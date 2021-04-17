import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let sphere_colors_base = [
  {color_name: "red", color_code: new Color3(1, 0, 0)},
  {color_name: "orange", color_code: new Color3(1, 0.4, 0)},
  {color_name: "yellow", color_code: new Color3(1, 1, 0)},
  {color_name: "green", color_code: new Color3(0.19, 0.71, 0.12)},
  {color_name: "blue", color_code: new Color3(0.07, 0, 1)},
  {color_name: "purple", color_code: new Color3(0.55, 0, 1)}
];
let sphere_colors = [];
function cloneAndShuffleColors() {
  sphere_colors = cloneDeep(sphere_colors_base);
  sphere_colors = arrayShuffler(sphere_colors);
}
cloneAndShuffleColors();

let pole_colors_base = [
  {color_name: "red", color_code: new Color3(0.47, 0, 0)},
  {color_name: "orange", color_code: new Color3(0.47, 0.19, 0)},
  {color_name: "yellow", color_code: new Color3(0.5, 0.5, 0)},
  {color_name: "green", color_code: new Color3(0.04, 0.31, 0)},
  {color_name: "blue", color_code: new Color3(0.02, 0, 0.31)},
  {color_name: "purple", color_code: new Color3(0.22, 0, 0.4)}
];
let pole_colors = [];
function cloneAndShufflePoleColors() {
  pole_colors = cloneDeep(pole_colors_base);
  pole_colors = arrayShuffler(pole_colors);
}
cloneAndShufflePoleColors();

export {sphere_colors, pole_colors, cloneAndShuffleColors, cloneAndShufflePoleColors};
