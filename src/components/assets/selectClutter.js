import {arrayShuffler} from '../utilities/shuffler.js';

function selectClutter() {
  let clutter = ["ladder", "boxes", "potted_tree", "desk", "machine"];
  clutter = arrayShuffler(clutter);
  return clutter;
}

export {selectClutter};
