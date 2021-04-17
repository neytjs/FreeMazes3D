import { map, length, width } from './globals.js';

function findAllPaths() {
  let possible_paths_starts = [];
  let full_paths = [];
// logic to find possible paths
  for (let x = 0; x < length; x++) {
    for (let y = 0; y < width; y++) {
      if (map[x][y].entries.right === true) {
        possible_paths_starts.push({ x: x, y: y, possible_path_start: "right"});
      }
      if (map[x][y].entries.bottom === true) {
        possible_paths_starts.push({ x: x, y: y, possible_path_start: "bottom"});
      }
    }
  }
// logic to find the full paths by iterating through the discovered path starts
  for (let i = 0; i < possible_paths_starts.length; i++) {
  // now, test each path to find the end
    if (possible_paths_starts[i].possible_path_start === "right") {
      let y_start = possible_paths_starts[i].y;
      let members = [];
      for (let y = y_start; y < width; y++) {
        let x = possible_paths_starts[i].x;
        members.push({x: x, y: y});
        if (map[x][y].entries.right === false) {
          full_paths.push({ start: {x: x, y: y_start}, end: {x: x, y: y}, members: members, direction: "right", discovered: false });
          break;
        }
      }
    }
    if (possible_paths_starts[i].possible_path_start === "bottom") {
      let x_start = possible_paths_starts[i].x;
      let members = [];
      for (let x = x_start; x < length; x++) {
        let y = possible_paths_starts[i].y;
        members.push({x: x, y: y});
        if (map[x][y].entries.bottom === false) {
          full_paths.push({ start: {x: x_start, y: y}, end: {x: x, y: y}, members: members, direction: "bottom", discovered: false });
          break;
        }
      }
    }
  }

  return full_paths;
}

export {findAllPaths};
