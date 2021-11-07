import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let plate_colors_base = [
  {color_name: "blue", inv_name: "Blue", color_code: new Color3(0, 0, 1), color_texture: "gem_blue", plate_texture: "metal_blue"},
  {color_name: "red", inv_name: "Red", color_code: new Color3(1, 0, 0), color_texture: "gem_red", plate_texture: "metal_red"},
  {color_name: "green", inv_name: "Green", color_code: new Color3(0.06, 0.64, 0.06), color_texture: "gem_green", plate_texture: "metal_green"}
];

let plateColors = [];
function cloneAndShuffleColors() {
  plateColors = cloneDeep(plate_colors_base);
  plateColors = arrayShuffler(plateColors);
}
cloneAndShuffleColors();

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
cloneAndShuffleMapPos();

export {plateColors, mazePos, cloneAndShuffleColors, cloneAndShuffleMapPos};
