import { map, length, width } from './globals.js';

function setStartPosition(map_areas, first_or_rand) {
  let possible_start_positions = [];
// iterate through map pieces, find all that are either rooms or hallways
// also iterate through the map_areas to make sure that the area pieces are not selected
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      if (map[x][y].type === "room" || map[x][y].type === "hallway") {
        let matches = 0;
        for (let i = 0, ilength = map_areas.length; i < ilength; i++) {
          for (let j = 0, jlength = map_areas[i].area_pieces.length; j < jlength; j++) {
            if (x === map_areas[i].area_pieces[j].x && y === map_areas[i].area_pieces[j].y) {
              matches = matches + 1;
            }
          // do not select the entrances to map areas either, for obstacle 4
            if (x === map_areas[i].entrance.pos.x && y === map_areas[i].entrance.pos.y) {
              matches = matches + 1;
            }
          }
        }
        if (matches === 0) {
          possible_start_positions.push({x: x, y: y});
        }
      }
    }
  }

// now select a piece at random for the start position
  let rand = Math.floor(Math.random() * possible_start_positions.length);
  let start_pos = (first_or_rand === "first") ? possible_start_positions[0] : possible_start_positions[rand];

  return start_pos;
}

export {setStartPosition};
