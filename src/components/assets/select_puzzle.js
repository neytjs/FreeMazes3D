import {arrayShuffler} from '../utilities/shuffler.js';

function selectPuzzle(difficulty) {
  if (difficulty === "easy") {
    let possible_puzzle_easy = ["coin_match", "move_bridges"];
    possible_puzzle_easy = arrayShuffler(possible_puzzle_easy);
    return possible_puzzle_easy;
  }
  if (difficulty === "hard") {
    let possible_puzzle_hard = ["bulb_match", "sphere_agents"];
    possible_puzzle_hard = arrayShuffler(possible_puzzle_hard);
    return possible_puzzle_hard;
  }
}

export {selectPuzzle};
