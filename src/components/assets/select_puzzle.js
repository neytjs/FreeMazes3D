import {arrayShuffler} from '../utilities/shuffler.js';

function selectPuzzle(difficulty) {
  if (difficulty === "easy") {
    let possible_puzzle_easy = ["coin_match", "move_bridges", "ghost_button", "enter_hut", "down_pipes", "tight_rope", "haunted_crypt", "bulls_eye", "potion_cauldron", "crystal_shards"];
    possible_puzzle_easy = arrayShuffler(possible_puzzle_easy);
    return possible_puzzle_easy;
  }
  if (difficulty === "hard") {
    let possible_puzzle_hard = ["bulb_match", "sphere_agents", "carry_crystals", "grow_garden", "dodge_turret", "mob_shoots", "powder_pyramid", "timed_buttons", "crystal_temple", "rolling_pipes"];
    possible_puzzle_hard = arrayShuffler(possible_puzzle_hard);
    return possible_puzzle_hard;
  }
}

export {selectPuzzle};
