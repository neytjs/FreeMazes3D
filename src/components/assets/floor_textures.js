import {arrayShuffler} from '../utilities/shuffler.js';

function floorTextures() {
  let floor_textures = [
    "stone_slabs_black",
    "stone_slabs_blue",
    "stone_slabs_bluepurple",
    "stone_slabs_bloodred",
    "stone_slabs_brown",
    "stone_slabs_green",
    "stone_slabs_grey",
    "stone_slabs_peagreen",
    "stone_slabs_purple",
    "stone_slabs_red"
  ];

  floor_textures = arrayShuffler(floor_textures);

  return floor_textures;
}

export {floorTextures};
