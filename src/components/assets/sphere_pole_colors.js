import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let sphere_colors_base = [
  {color_name: "red", color_code: new Color3(0.61, 0, 0)},
  {color_name: "orange", color_code: new Color3(0.31, 0.13, 0.01)},
  {color_name: "yellow", color_code: new Color3(1, 1, 0)},
  {color_name: "green", color_code: new Color3(0.05, 0.34, 0.01)},
  {color_name: "blue", color_code: new Color3(0, 0.34, 0.61)},
  {color_name: "purple", color_code: new Color3(0.27, 0, 0.49)}
];
let sphere_colors = [];
function cloneAndShuffleColors() {
  sphere_colors = cloneDeep(sphere_colors_base);
  sphere_colors = arrayShuffler(sphere_colors);
}
cloneAndShuffleColors();

let pole_colors_base = [
  {color_name: "red", texture: "gem_darkred"},
  {color_name: "orange", texture: "gem_orange"},
  {color_name: "yellow", texture: "gem_yellow"},
  {color_name: "green", texture: "gem_darkgreen"},
  {color_name: "blue", texture: "gem_blue"},
  {color_name: "purple", texture: "gem_darkpurple"}
];
let pole_colors = [];
function cloneAndShufflePoleColors() {
  pole_colors = cloneDeep(pole_colors_base);
  pole_colors = arrayShuffler(pole_colors);
}
cloneAndShufflePoleColors();

export {sphere_colors, pole_colors, cloneAndShuffleColors, cloneAndShufflePoleColors};
