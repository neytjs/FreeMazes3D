import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let plate_colors_base = [
  {color_name: "blue", inv_name: "", color_code: new Color3(0, 0, 1), color_texture: "gem_blue", plate_texture: "metal_blue"},
  {color_name: "red", inv_name: "", color_code: new Color3(1, 0, 0), color_texture: "gem_red", plate_texture: "metal_red"},
  {color_name: "green", inv_name: "", color_code: new Color3(0.06, 0.64, 0.06), color_texture: "gem_green", plate_texture: "metal_green"}
];

let plateColors = [];
function cloneAndShuffleColors(global_language) {
  plate_colors_base[0].inv_name = global_language.text.items.puzzles.plates.blue;
  plate_colors_base[1].inv_name = global_language.text.items.puzzles.plates.red;
  plate_colors_base[2].inv_name = global_language.text.items.puzzles.plates.green;
  plateColors = cloneDeep(plate_colors_base);
  plateColors = arrayShuffler(plateColors);
}

let maze_pos_base = [
  {lever1_x: 4, lever1_y: 3, lever2_x: 1, lever2_y: 4, lever3_x: 3, lever3_y: 0, final_x: 2, final_y: 2},
  {lever1_x: 4, lever1_y: 2, lever2_x: 0, lever2_y: 4, lever3_x: 2, lever3_y: 0, final_x: 1, final_y: 2},
  {lever1_x: 4, lever1_y: 1, lever2_x: 2, lever2_y: 4, lever3_x: 2, lever3_y: 1, final_x: 0, final_y: 2},
  {lever1_x: 1, lever1_y: 1, lever2_x: 3, lever2_y: 4, lever3_x: 4, lever3_y: 0, final_x: 3, final_y: 2}
];
let mazePos = [];
function cloneAndShuffleMapPos() {
  mazePos = cloneDeep(maze_pos_base);
  mazePos = arrayShuffler(mazePos);
}

export {plateColors, mazePos, cloneAndShuffleColors, cloneAndShuffleMapPos};
