import { map, length, width, total_areas } from './globals.js';

function generateClutterLocations(start_pos, exit_pos, keys, gem, doors, map_areas) {
  let exclusions = [];
  let available = [];
  let clutter = [];
// determine the amount of clutter based upon map size, determined by the total_areas
  let clutter_amount = 0;
  switch(total_areas) {
    case 2:
      clutter_amount = 1;
    break;
    case 3:
      clutter_amount = 3;
    break;
    case 4:
      clutter_amount = 5;
    break;
  }
// exclude start_pos
  exclusions.push(start_pos);
// exclude exit_pos
  exclusions.push(exit_pos);
// exclude gem
  exclusions.push(gem.pos);
// exclude the first key loc, because we add that in manually
  exclusions.push({x: keys[0].pos.x, y: keys[0].pos.y});
// exclude doors
  for (let i = 0, ilength = doors.length; i < ilength; i++) {
    exclusions.push(doors[i].pos);
  }
// exlude all the map_area tiles too. we only want clutter in the big 'main' part of the maze
  for (let i = 0, length = map_areas.length; i < length; i++) {
    for (let j = 0, jlength = map_areas[i].area_pieces.length; j < jlength; j++) {
      exclusions.push(map_areas[i].area_pieces[j]);
    }
  }
// check for the (length, width) piece and exclude if type = empty, otherwise player would never be able to get that piece
  let max_len = length - 1;
  let max_wid = width - 1;
  if (map[max_len][max_wid].type === "empty") {
    exclusions.push({x: max_len, y: max_wid});
  }

// now pick clutter slots from remaining pieces...
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      let counter = 0;
      for (let z = 0, zlength = exclusions.length; z < zlength; z++) {
        if (x === exclusions[z].x && y === exclusions[z].y) {
          counter = counter + 1;
        }
      }
      if (counter === 0) {
        available.push({x: x, y: y});
      }
    }
  }

// first insert the clutter for the first key
  clutter.push({pos: {x: keys[0].pos.x, y: keys[0].pos.y}});

// get a set of random tile pos
  let set = new Set();
  let size = clutter_amount - 1; // minus one, because the first clutter is always for underneath the first key.
  if (size > 0) {
    function fillSet() {
      let rand = Math.floor(Math.random() * available.length);
      set.add(available[rand]);

      if (set.size < size) {
        fillSet();
      }
    }
    fillSet();

    function insertClutterLocations(value) {
      clutter.push({ pos: value });
    }
  // insert the random set of pos into the clutter array
    set.forEach(insertClutterLocations);
  }

  return clutter;
}

export {generateClutterLocations};
