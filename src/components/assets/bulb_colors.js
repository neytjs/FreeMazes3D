import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let bulb_colors = [
  new Color3(0.02, 0.45, 0),
  new Color3(0, 0.07, 1),
  new Color3(0.66, 0.01, 0.01),
  new Color3(0.39, 0, 0.55),
  new Color3(0.5, 0.5, 0)
];
let bulb1colors = [];
bulb1colors = cloneDeep(bulb_colors);
let bulb2colors = [];
bulb2colors = cloneDeep(bulb_colors);
let bulb3colors = [];
bulb3colors = cloneDeep(bulb_colors);
let bulb4colors = [];
bulb4colors = cloneDeep(bulb_colors);
let bulb_master_color = [];
bulb_master_color = cloneDeep(bulb_colors);

// now test to make sure that element 0 does not = bulb_master_color
function masterColorTest(colors, master_color) {
  let test_colors = JSON.stringify(colors[0]);
  let test_master_color = JSON.stringify(master_color[0]);
  if (test_colors === test_master_color) {
    let element_zero = colors[0];
    let element_one = colors[1];
    colors[0] = element_one;
    colors[1] = element_zero;
    return colors;
  } else {
    return colors;
  }
}

function cloneAndShuffleMasterColor() {
  bulb_master_color = arrayShuffler(bulb_master_color);
  bulb1colors = arrayShuffler(bulb1colors);
  bulb2colors = arrayShuffler(bulb2colors);
  bulb3colors = arrayShuffler(bulb3colors);
  bulb4colors = arrayShuffler(bulb4colors);
  bulb1colors = masterColorTest(bulb1colors, bulb_master_color);
  bulb2colors = masterColorTest(bulb2colors, bulb_master_color);
  bulb3colors = masterColorTest(bulb3colors, bulb_master_color);
  bulb4colors = masterColorTest(bulb4colors, bulb_master_color);
}

function getBulbMasterColor() {
  return bulb_master_color[0];
}

function getBulb1colors(elm) {
  return bulb1colors[elm];
}

function getBulb2colors(elm) {
  return bulb2colors[elm];
}

function getBulb3colors(elm) {
  return bulb3colors[elm];
}

function getBulb4colors(elm) {
  return bulb4colors[elm];
}

export {bulb_colors, getBulbMasterColor, getBulb1colors, getBulb2colors, getBulb3colors, getBulb4colors, cloneAndShuffleMasterColor};
