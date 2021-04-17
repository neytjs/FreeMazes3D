function selectTreasure() {
  let rand_treasure = Math.floor(Math.random() * 2);
  let possible_treasure = ["silver_ring", "gold_ring"];

  return possible_treasure[rand_treasure];
}

export {selectTreasure};
