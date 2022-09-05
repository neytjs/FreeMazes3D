import {selectPuzzle} from "./select_puzzle.js";
const total = selectPuzzle("easy").length + selectPuzzle("hard").length;

const defaultAppData = {
  exclusions: {
    easy: [],
    hard: []
  },
  high_scores: [],
  achievements: [
    {
      id: 1,
      date_accomplished: 0,
      completed: false
    },
    {
      id: 2,
      date_accomplished: 0,
      completed: false
    },
    {
      id: 3,
      date_accomplished: 0,
      completed: false
    },
    {
      id: 4,
      date_accomplished: 0,
      completed: false
    },
    {
      id: 5,
      date_accomplished: 0,
      completed: false
    },
    {
      id: 6,
      date_accomplished: 0,
      completed: false
    },
    {
      id: 7,
      date_accomplished: 0,
      completed: false
    },
    {
      id: 8,
      date_accomplished: 0,
      completed: false
    },
    {
      id: 9,
      date_accomplished: 0,
      completed: false
    },
    {
      id: 10,
      date_accomplished: 0,
      status: { completed: {}, total: total },
      completed: false
    },
    {
      id: 11,
      date_accomplished: 0,
      status: { completed: {}, total: total },
      completed: false
    },
    {
      id: 12,
      date_accomplished: 0,
      status: { completed: {}, total: total },
      completed: false
    },
    {
      id: 13,
      date_accomplished: 0,
      status: { completed: 0, total: 0 },
      completed: false
    }
  ]
};

export {defaultAppData};
