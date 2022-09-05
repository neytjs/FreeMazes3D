import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';

let master_color_base = ["orange", "teal", "purple"];

let potion_colors_base = [
  { color_name: "red", inv_name: "", texture: "acid_red" },
  { color_name: "blue", inv_name: "", texture: "acid_blue" },
  { color_name: "green", inv_name: "", texture: "acid_green" },
  { color_name: "yellow", inv_name: "", texture: "acid_yellow" }
];

let master_color = [];
function cloneAndShuffleMasterColor() {
  master_color = cloneDeep(master_color_base);
  master_color = arrayShuffler(master_color);
}

let potion_colors = [];
function cloneAndShufflePotionColors(global_language) {
  potion_colors_base[0].inv_name = global_language.text.items.puzzles.potions.red;
  potion_colors_base[1].inv_name = global_language.text.items.puzzles.potions.blue;
  potion_colors_base[2].inv_name = global_language.text.items.puzzles.potions.green;
  potion_colors_base[3].inv_name = global_language.text.items.puzzles.potions.yellow;
  potion_colors = cloneDeep(potion_colors_base);
  potion_colors = arrayShuffler(potion_colors);
}

export {master_color, potion_colors, cloneAndShuffleMasterColor, cloneAndShufflePotionColors};
