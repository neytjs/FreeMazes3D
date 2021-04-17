import { map, length, width } from './globals.js';

function generateSecrets(obstacles) {
  var updated_map = JSON.parse(JSON.stringify(map)); // MUST create a deep copy of map for this to work, otherwise serious glitches
  let secrets_length = 0;
  var max_length = length - 1;
  var max_width = width - 1;
// add as secret if x === 0, x === max_width, y === 0, or y === max_length
  for (let i = 0, ilength = obstacles.length; i < ilength; i++) {
    let map_x = obstacles[i].pos.x;
    let map_y = obstacles[i].pos.y;
    if (map_x === 0) {
      updated_map[map_x][map_y].secret = {direction: "up", hv: "horizontal", tile_pos: {x: map_x, z: map_y}, entry_pos: {x: 3, z: 0}};
      secrets_length = secrets_length + 1;
    }
    if (map_x === max_width) {
      updated_map[map_x][map_y].secret = {direction: "down", hv: "horizontal", tile_pos: {x: map_x, z: map_y}, entry_pos: {x: 3, z: 6}};
      secrets_length = secrets_length + 1;
    }
    if (map_x > 0 && map_x < max_width && map_y === 0) {
      updated_map[map_x][map_y].secret = {direction: "left", hv: "vertical", tile_pos: {x: map_x, z: map_y}, entry_pos: {x: 0, z: 3}};
      secrets_length = secrets_length + 1;
    }
    if (map_x > 0 && map_x < max_width && map_y === max_length) {
      updated_map[map_x][map_y].secret = {direction: "right", hv: "vertical", tile_pos: {x: map_x, z: map_y}, entry_pos: {x: 6, z: 3}};
      secrets_length = secrets_length + 1;
    }
  }

  return {secrets_length: secrets_length, updated_map: updated_map};
}

export {generateSecrets};
