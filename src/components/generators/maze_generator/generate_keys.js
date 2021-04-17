import { map, length, width } from './globals.js';

function generateKeys(map_areas, start_pos, obstacles) {
  let keys = [];
  let possible_first_key_positions = [];
  let key_counter = 1;
// also iterate through the map_areas to make sure the start pos and map_area pieces is NOT selected as a key drop
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      if (map[x][y].type === "room" || map[x][y].type === "hallway") {
        let matches = 0;
        for (let i = 0, ilength = map_areas.length; i < ilength; i++) {
          for (let j = 0, jlength = map_areas[i].area_pieces.length; j < jlength; j++) {
            if (x === map_areas[i].area_pieces[j].x && y === map_areas[i].area_pieces[j].y) {
              matches = matches + 1;
            }
          }
        }
        if (start_pos.x === x && start_pos.y === y) {
          matches = matches + 1;
        }
      // also test to make sure that the obstacle pieces are not used as key spawn points
        for (let i = 0, ilength = obstacles.length; i < ilength; i++) {
          if (x === obstacles[i].pos.x && y === obstacles[i].pos.y) {
            matches = matches + 1;
          }
        }
        if (matches === 0) {
          possible_first_key_positions.push({x: x, y: y});
        }
      }
    }
  }
// now find the distance between the start pos and all of the possible_first_key_positions
  for (let i = 0, length = possible_first_key_positions.length; i < length; i++) {
    let p1 = possible_first_key_positions[i].x;
    let q1 = start_pos.x;
    let p2 = possible_first_key_positions[i].y;
    let q2 = start_pos.y;
    let sum = Math.pow((q1 - p1), 2) + Math.pow((q2 - p2), 2);
    let distance = Math.sqrt(sum); // using the distance formula
    possible_first_key_positions[i].distance = distance;
  }
// now sort the results by distance to take the most distant piece
  possible_first_key_positions.sort(function(a, b) {
  // sorting by distance
    if (a.distance < b.distance) {
      return 1;
    }
    if (b.distance < a.distance) {
      return -1;
    }
  });
  keys.push({key_id: 1, pos: possible_first_key_positions[0]});
// now generate additional keys as needed
  for (let i = 0, length = (map_areas.length - 2); i < length; i++) {
    key_counter = key_counter + 1;
    keys.push({key_id: key_counter, pos: map_areas[i].spawn});
  }

  return keys;
}

export {generateKeys};
