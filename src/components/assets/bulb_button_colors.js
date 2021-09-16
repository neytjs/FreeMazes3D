import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let puzzle_colors_base = [
  {color_name: "blue", color_code: new Color3(0, 0, 1)},
  {color_name: "red", color_code: new Color3(1, 0, 0)},
  {color_name: "green", color_code: new Color3(0.06, 0.64, 0.06)},
  {color_name: "yellow", color_code: new Color3(1, 1, 0)}
];

let button_colors_base = [
  {color_name: "blue", button_code: new Color3(0, 0, 1), holder_code: new Color3(0.02, 0.02, 0.33)},
  {color_name: "red", button_code: new Color3(1, 0, 0), holder_code: new Color3(0.31, 0.02, 0.02)},
  {color_name: "green", button_code: new Color3(0.06, 0.64, 0.06), holder_code: new Color3(0.02, 0.24, 0.02)},
  {color_name: "yellow", button_code: new Color3(1, 1, 0), holder_code: new Color3(0.41, 0.41, 0)}
];

let puzzleColors = [];
function cloneAndShufflePuzzleColors() {
  puzzleColors = cloneDeep(puzzle_colors_base);
  puzzleColors = arrayShuffler(puzzleColors);
}

let buttonColors = [];
function buttonColorOrganizer(puzzleColors) {
  let colors = [];
  let colors1 = [];
  let colors2 = [];
  let counter = 0;
  for (let i = 0, length = puzzleColors.length; i < length; i++) {
    for (let j = 0, jlength = button_colors_base.length; j < jlength; j++) {
      if (puzzleColors[i].color_name === button_colors_base[j].color_name) {
        counter = counter + 1;
        if (counter < 3) {
          colors1.push(button_colors_base[j]);
        } else {
          colors2.push(button_colors_base[j]);
        }
      }
    }
  }
  let rand1 = Math.floor(Math.random() * 2);
  if (rand1 === 0) {
    colors1.reverse();
  }
  let rand2 = Math.floor(Math.random() * 2);
  if (rand2 === 0) {
    colors2.reverse();
  }
  colors = colors1.concat(colors2);
  let rand3 = Math.floor(Math.random() * 2);
  if (rand3 === 0) {
    colors.reverse();
  }

  buttonColors = colors;
}

export {puzzleColors, buttonColors, cloneAndShufflePuzzleColors, buttonColorOrganizer};
