import { map } from './globals.js';

function createEmptyMap(length, width) {
  for (let x = 0; x < width; x++) {
    map.push([]);
    for (let y = 0; y < length; y++) {
      map[x].push(0);
    }
  }
}

export {createEmptyMap};
