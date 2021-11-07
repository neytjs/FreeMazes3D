import {arrayShuffler} from '../utilities/shuffler.js';

function wallTextures() {
  let wall_textures = [
    "stone_blocks_blue",
    "stone_blocks_brown",
    "stone_blocks_green",
    "stone_blocks_grey",
    "stone_blocks_orange",
    "stone_blocks_pink",
    "stone_blocks_purple",
    "stone_blocks_red",
    "stone_blocks_teal",
    "stone_blocks_yellow"
  ];

  wall_textures = arrayShuffler(wall_textures);

  return wall_textures;
}

export {wallTextures};
