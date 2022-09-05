import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';

const masterCoinsBase = [
  ["gold_coin", "gold_coin", "silver_coin"],
  ["silver_coin", "gold_coin", "gold_coin"],
  ["gold_coin", "silver_coin", "gold_coin"],
  ["gold_coin", "gold_coin", "copper_coin"],
  ["copper_coin", "gold_coin", "gold_coin"],
  ["gold_coin", "copper_coin", "gold_coin"],
  ["silver_coin", "silver_coin", "gold_coin"],
  ["gold_coin", "silver_coin", "silver_coin"],
  ["silver_coin", "gold_coin", "silver_coin"],
  ["silver_coin", "silver_coin", "copper_coin"],
  ["copper_coin", "silver_coin", "silver_coin"],
  ["silver_coin", "copper_coin", "silver_coin"],
  ["copper_coin", "copper_coin", "gold_coin"],
  ["gold_coin", "copper_coin", "copper_coin"],
  ["copper_coin", "gold_coin", "copper_coin"],
  ["copper_coin", "copper_coin", "silver_coin"],
  ["silver_coin", "copper_coin", "copper_coin"],
  ["silver_coin", "copper_coin", "silver_coin"]
];

let masterCoins = [];

function shuffleMasterCoins() {
  masterCoins = cloneDeep(masterCoinsBase);
  masterCoins = arrayShuffler(masterCoins);
  masterCoins = masterCoins[0];
}

export {shuffleMasterCoins, masterCoins};
