import cloneDeep from 'lodash.clonedeep';
import {Color3} from "@babylonjs/core/Maths/math";
import {arrayShuffler} from '../utilities/shuffler.js';

let sound_machines_colors_base = [
  new Color3(0.18, 0, 0.31),
  new Color3(0.04, 0.12, 0.53),
  new Color3(0.09, 0.35, 0.1),
  new Color3(0.43, 0.04, 0.04),
  new Color3(0.98, 0.88, 0),
  new Color3(0.03, 0.46, 0.35)
];

let sound_machines_colors = [];
function cloneAndShuffleSoundMachineColors() {
  sound_machines_colors = cloneDeep(sound_machines_colors_base);
  sound_machines_colors = arrayShuffler(sound_machines_colors);
}

export {sound_machines_colors, cloneAndShuffleSoundMachineColors};
