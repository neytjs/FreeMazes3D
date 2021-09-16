import {selectPuzzle} from "./select_puzzle.js";
const total = selectPuzzle("easy").length + selectPuzzle("hard").length;

const defaultAppData = {
  high_scores: [],
  achievements: [
    {
      id: 1,
      name: "We Did It",
      description: "Complete one maze of any difficulty.",
      date_accomplished: 0,
      completed: false
    },
    {
      id: 2,
      name: "Over 9000",
      description: "Complete any maze with a score of over 9000.",
      date_accomplished: 0,
      completed: false
    },
    {
      id: 3,
      name: "Fast and Somewhat Furious",
      description: "Complete any maze in less than three minutes.",
      date_accomplished: 0,
      completed: false
    },
    {
      id: 4,
      name: "That Was Easy",
      description: "Complete one regular 'Easy' difficulty maze. And find all of its treasure and secrets.",
      date_accomplished: 0,
      completed: false
    },
    {
      id: 5,
      name: "Medium, It's Not Easy",
      description: "Complete one regular 'Medium' difficulty maze. And find all of its treasure and secrets.",
      date_accomplished: 0,
      completed: false
    },
    {
      id: 6,
      name: "Life is Hard",
      description: "Complete one regular 'Hard' difficulty maze. And find all of its treasure and secrets.",
      date_accomplished: 0,
      completed: false
    },
    {
      id: 7,
      name: "That Was Easy, NOT",
      description: "Complete an 'Easy (Time Limit)' difficulty maze. And find all of its treasure and secrets.",
      date_accomplished: 0,
      completed: false
    },
    {
      id: 8,
      name: "In The Middle",
      description: "Complete a 'Medium (Time Limit)' difficulty maze. And find all of its treasure and secrets.",
      date_accomplished: 0,
      completed: false
    },
    {
      id: 9,
      name: "Hard as Hell",
      description: "Complete a 'Hard (Time Limit)' difficulty maze. And find all of its treasure and secrets.",
      date_accomplished: 0,
      completed: false
    },
    {
      id: 10,
      name: "WHY",
      description: "Solve all puzzles on 'Easy (Time Limit)' difficulty mazes.",
      date_accomplished: 0,
      status: { completed: {}, total: total },
      completed: false
    },
    {
      id: 11,
      name: "Medium Rare",
      description: "Solve all puzzles on 'Medium (Time Limit)' difficulty mazes.",
      date_accomplished: 0,
      status: { completed: {}, total: total },
      completed: false
    },
    {
      id: 12,
      name: "You Really Just Did That",
      description: "Solve all puzzles on 'Hard (Time Limit)' difficulty mazes.",
      date_accomplished: 0,
      status: { completed: {}, total: total },
      completed: false
    },
    {
      id: 13,
      name: "The Completionist",
      description: "Complete all other achievements.",
      date_accomplished: 0,
      status: { completed: 0, total: 0 },
      completed: false
    }
  ]
};

export {defaultAppData};
