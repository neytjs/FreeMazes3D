import {arrayShuffler} from '../utilities/shuffler.js';
import {filterPuzzles} from "../controls/puzzleExclusions.js";

function selectPuzzle(difficulty, exclusions) {
  if (difficulty === "easy") {
    let possible_puzzle_easy = ["coin_match", "sphere_agents", "move_bridges", "ghost_button", "enter_hut", "down_pipes", "tight_rope", "haunted_crypt", "bulls_eye", "potion_cauldron", "crystal_shards", "purify_garden"];

    if (exclusions) {
      possible_puzzle_easy = filterPuzzles(possible_puzzle_easy, exclusions.easy);
    }
    possible_puzzle_easy = arrayShuffler(possible_puzzle_easy);
    return possible_puzzle_easy;
  }
  if (difficulty === "hard") {
    let possible_puzzle_hard = ["bulb_match", "carry_crystals", "grow_garden", "dodge_turret", "mob_shoots", "powder_pyramid", "timed_buttons", "crystal_temple", "rolling_pipes", "run_machine", "purify_maze", "lava_room"];

    if (exclusions) {
      possible_puzzle_hard = filterPuzzles(possible_puzzle_hard, exclusions.hard);
    }
    possible_puzzle_hard = arrayShuffler(possible_puzzle_hard);
    return possible_puzzle_hard;
  }
}

export {selectPuzzle};
