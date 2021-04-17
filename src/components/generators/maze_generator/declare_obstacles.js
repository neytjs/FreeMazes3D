import { pieces } from './pieces.js';
import { map } from './globals.js';

function declareObstacles(map_areas, total_areas) {
  let obstacles = [];
  let final_area = total_areas - 1;
// for map_areas 1-3, i.e. the keys, pick a random piece BEFORE the end piece
  for (let i = 0, length = map_areas.length; i < length ; i++) {
    if (i < final_area) {
    // get the amount of area_pieces to make sure there are at least 2
      let amount = map_areas[i].area_pieces.length;
    // now, add an obstacle IF the amount is greater than 0 -- we do not want the obstacles spawning on top of the keys, exit, etc.
      if (amount > 1) {
        if (map_areas[i].merged) {
        // now make sure that the larger is at least two pieces.
          if (map_areas[i].old_areas.old_area1.length > map_areas[i].old_areas.old_area2.length) {
            obstacles.push({pos: map_areas[i].old_areas.old_area1[1], obstacle_id: map_areas[i].area_id });
            map_areas[i].spawn = map_areas[i].old_areas.old_area1[0];
          } else if (map_areas[i].old_areas.old_area2.length > map_areas[i].old_areas.old_area1.length) {
            obstacles.push({pos: map_areas[i].old_areas.old_area2[1], obstacle_id: map_areas[i].area_id });
            map_areas[i].spawn = map_areas[i].old_areas.old_area2[0];
          } else if (map_areas[i].old_areas.old_area1.length === map_areas[i].old_areas.old_area2.length && map_areas[i].old_areas.old_area1.length > 1) {
            obstacles.push({pos: map_areas[i].old_areas.old_area1[1], obstacle_id: map_areas[i].area_id });
            map_areas[i].spawn = map_areas[i].old_areas.old_area1[0];
          } else if (map_areas[i].old_areas.old_area1.length === map_areas[i].old_areas.old_area2.length && map_areas[i].old_areas.old_area1.length === 1) {
            obstacles.push({pos: map_areas[i].area_pieces[(amount - 1)], obstacle_id: map_areas[i].area_id });
            map_areas[i].spawn = map_areas[i].old_areas.old_area1[0];
          }
        } else {
          obstacles.push({pos: map_areas[i].area_pieces[1], obstacle_id: map_areas[i].area_id });
          map_areas[i].spawn = map_areas[i].area_pieces[0];
        }
      }
    } else if (i === final_area) {
    // for map_area 4, i.e. the gem, pick the entranc piece as the obstacle
      obstacles.push({pos: map_areas[i].entrance.pos, obstacle_id: map_areas[i].area_id });
      map_areas[i].spawn = map_areas[i].area_pieces[0];
    }
  }

// now, make sure that ALL obstacle pieces are rooms, not hallway, we need a little space for the puzzles...
  for (let i = 0, length = obstacles.length; i < length ; i++) {
    let x = obstacles[i].pos.x;
    let y = obstacles[i].pos.y;
  // if hallway, get the correct corresponding room instead
    if (map[x][y].type === "hallway") {
      for (let j = 0, length = pieces.length; j < length ; j++) {
        if (pieces[j].entries.top === map[x][y].entries.top && pieces[j].entries.right === map[x][y].entries.right && pieces[j].entries.bottom === map[x][y].entries.bottom && pieces[j].entries.left === map[x][y].entries.left && pieces[j].type === "room") {
          map[x][y] = pieces[j];
        }
      }
    }
  }

  return {obstacles: obstacles, map_areas: map_areas};
}

export {declareObstacles};
