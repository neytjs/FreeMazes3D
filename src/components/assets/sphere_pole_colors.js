import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let sphere_colors_base = [
  {color_name: "red", color_code: new Color3(1, 0, 0)},
  {color_name: "pink", color_code: new Color3(0.99, 0.1, 0.54)},
  {color_name: "teal", color_code: new Color3(0, 0.65, 0.65)},
  {color_name: "green", color_code: new Color3(0.06, 0.64, 0.06)},
  {color_name: "blue", color_code: new Color3(0, 0, 1)},
  {color_name: "yellow", color_code: new Color3(1, 1, 0)}
];
let sphere_colors = [];
function cloneAndShuffleColors() {
  sphere_colors = cloneDeep(sphere_colors_base);
  sphere_colors = arrayShuffler(sphere_colors);
}
cloneAndShuffleColors();

let pole_colors_base = [
  {color_name: "red", texture: "gem_darkred"},
  {color_name: "pink", texture: "gem_hotpink"},
  {color_name: "teal", texture: "gem_teal"},
  {color_name: "green", texture: "gem_darkgreen"},
  {color_name: "blue", texture: "gem_blue"},
  {color_name: "yellow", texture: "gem_yellow"}
];
let pole_colors = [];
function cloneAndShufflePoleColors() {
  pole_colors = cloneDeep(pole_colors_base);
  pole_colors = arrayShuffler(pole_colors);
}
cloneAndShufflePoleColors();

export {sphere_colors, pole_colors, cloneAndShuffleColors, cloneAndShufflePoleColors};
