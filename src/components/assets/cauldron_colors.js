import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';

let master_color_base = ["orange", "teal", "purple"];

let potion_colors_base = [
  { color_name: "red", inv_name: "Red", texture: "acid_red" },
  { color_name: "blue", inv_name: "Blue", texture: "acid_blue" },
  { color_name: "green", inv_name: "Green", texture: "acid_green" },
  { color_name: "yellow", inv_name: "Yellow", texture: "acid_yellow" }
];

let master_color = [];
function cloneAndShuffleMasterColor() {
  master_color = cloneDeep(master_color_base);
  master_color = arrayShuffler(master_color);
}

let potion_colors = [];
function cloneAndShufflePotionColors() {
  potion_colors = cloneDeep(potion_colors_base);
  potion_colors = arrayShuffler(potion_colors);
}

export {master_color, potion_colors, cloneAndShuffleMasterColor, cloneAndShufflePotionColors};
