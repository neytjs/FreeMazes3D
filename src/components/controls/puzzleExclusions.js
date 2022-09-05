function filterPuzzles(puzzles, exclusions) {
  if (puzzles.length > 2) {
    let filtering = puzzles.filter(function (value, index, array) {
        for (let i = 0; i < exclusions.length; i++) {
          if (puzzles[index] === exclusions[i]) {
            return false;
          }
        }
        return true;
    });
    return filtering;
  } else {
    return puzzles;
  }
}

function updateExclusions(easy_puzzles, hard_puzzles, exclusions) {
  if (easy_puzzles.length > 0 && hard_puzzles.length > 0) {
    exclusions.easy = [];
    exclusions.hard = [];
    exclusions.easy.push(easy_puzzles[0]);
    exclusions.easy.push(easy_puzzles[1]);
    exclusions.hard.push(hard_puzzles[0]);
    exclusions.hard.push(hard_puzzles[1]);
  }
}

export {filterPuzzles, updateExclusions};
