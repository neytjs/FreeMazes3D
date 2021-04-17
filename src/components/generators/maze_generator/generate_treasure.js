import { map, length, width } from './globals.js';

function generateTreasure(start_pos, exit_pos, keys, gem, doors, updated_map) {
  let exclusions = [];
  let available = [];
  let treasure = [];
// exclude start_pos
  exclusions.push(start_pos);
// exclude exit_pos
  exclusions.push(exit_pos);
// exclude keys
  for (let i = 0, ilength = keys.length; i < ilength; i++) {
    exclusions.push({x: keys[i].pos.x, y: keys[i].pos.y,});
  }
// exclude gem
  exclusions.push(gem.pos);
// exclude doors
  for (let i = 0, ilength = doors.length; i < ilength; i++) {
    exclusions.push(doors[i].pos);
  }
// check for the (length, width) piece and exclude if type = empty, otherwise player would never be able to get that piece
  let max_len = length - 1;
  let max_wid = width - 1;
  if (map[max_len][max_wid].type === "empty") {
    exclusions.push({x: max_len, y: max_wid});
  }

// now pick treasure slots from remaining pieces...
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

// get a set of random tile pos
  let set = new Set();
  function fillSet() {
    let size = Math.floor((length * width) / 5);
    for (let i = 0; i < size; i++) {
      if (set.size < size) {
        let rand = Math.floor(Math.random() * available.length);
        set.add(available[rand]);
      } else {
        break;
      }
    }

    if (set.size < size) {
      fillSet();
    }
  }
  fillSet();

  function insertTreasureLocations(value) {
    treasure.push({ pos: value, secret: false });
  }
// insert the random set of pos into the treasures array
  set.forEach(insertTreasureLocations);
// add secret pos
  let secret_set = new Set();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      if (updated_map[x][y].secret) {
        secret_set.add(updated_map[x][y].secret.tile_pos);
      }
    }
  }
  function insertSecretTreasureLocations(value) {
    treasure.push({ pos: value, secret: true });
  }
  secret_set.forEach(insertSecretTreasureLocations);

  return treasure;
}

export {generateTreasure};
