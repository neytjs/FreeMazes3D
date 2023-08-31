import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let x = 0;
let z = 0;

function setXZ(set_x, set_z) {
  x = set_x;
  z = set_z;
}

const masterColorsBase = [
  ["red", "red", "green"],
  ["red", "red", "blue"],
  ["green", "red", "red"],
  ["blue", "red", "red"],
  ["red", "green", "red"],
  ["red", "blue", "red"],
  ["green", "green", "red"],
  ["green", "green", "blue"],
  ["red", "green", "green"],
  ["blue", "green", "green"],
  ["green", "red", "green"],
  ["green", "blue", "green"],
  ["blue", "blue", "red"],
  ["blue", "blue", "green"],
  ["red", "blue", "blue"],
  ["green", "blue", "blue"],
  ["blue", "red", "blue"],
  ["blue", "green", "blue"],
  ["blue", "green", "red"],
  ["blue", "red", "green"],
  ["green", "blue", "red"],
  ["green", "red", "blue"],
  ["red", "green", "blue"],
  ["red", "blue", "green"]
];

let masterColors = [];

function shuffleMasterColors() {
  masterColors = cloneDeep(masterColorsBase);
  masterColors = arrayShuffler(masterColors);
  masterColors = masterColors[0];
}

export {setXZ, shuffleMasterColors, masterColors, x, z};
