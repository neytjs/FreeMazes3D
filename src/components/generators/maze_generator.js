import { map, length, width, total_areas, globals, storeExitPos, storeStartPos, setMapSize, exit_pos, start_pos } from './maze_generator/globals.js';
import { pieces } from './maze_generator/pieces.js';
import { createEmptyMap } from './maze_generator/create_empty_map.js';
import { createMap } from './maze_generator/create_map.js';
import { createMapAreas } from './maze_generator/create_map_areas.js';
import { setStartPosition } from './maze_generator/set_start_position.js';
import { setExitPosition } from './maze_generator/set_exit_position.js';
import { generateKeys } from './maze_generator/generate_keys.js';
import { generateGem } from './maze_generator/generate_gem.js';
import { declareObstacles } from './maze_generator/declare_obstacles.js';
import { declareDoors } from './maze_generator/declare_doors.js';
import { generateSecrets } from './maze_generator/generate_secrets.js';
import { generateTreasure } from './maze_generator/generate_treasure.js';
import { generateClutterLocations } from './maze_generator/generate_clutter_locations.js';

export {map, length, width, pieces, total_areas, storeExitPos, storeStartPos, setMapSize, exit_pos, start_pos, createEmptyMap, createMap, createMapAreas, setStartPosition,
  setExitPosition, generateKeys, generateGem, generateTreasure, generateSecrets, declareObstacles, declareDoors, generateClutterLocations};
