import { map } from './globals.js';

function declareDoors(map_areas, obstacles, keys, exit_pos, total_areas) {
  let doors = [];
  let final_area = total_areas - 1;

// get the three gates and the first force field
  for (let i = 0, length = map_areas.length; i < length ; i++) {
    if (i === final_area) {
      doors.push({ pos: map_areas[i].entrance.pos, direction: map_areas[i].entrance.direction, id: map_areas[i].area_id, type: "forcefield" });
    } else {
      doors.push({ pos: map_areas[i].entrance.pos, direction: map_areas[i].entrance.direction, id: map_areas[i].area_id, type: "door" });
    }
  }
// now declare the two force fields inside of the gated map areas
  for (let i = 0, length = obstacles.length; i < length ; i++) {
    function determineDirection(i, j, exit_pos) {
      let direction = "";
      let x1 = obstacles[i].pos.x;
      let y1 = obstacles[i].pos.y;
      let x2 = exit_pos ? exit_pos.x : keys[j].pos.x;
      let y2 = exit_pos ? exit_pos.y : keys[j].pos.y;

      if (map[x1][y1].entries.top === true && map[x2][y2].entries.bottom === true) {
        direction = "top";
      } else if (map[x1][y1].entries.right === true && map[x2][y2].entries.left === true) {
        direction = "right";
      } else if (map[x1][y1].entries.bottom === true && map[x2][y2].entries.top === true) {
        direction = "bottom";
      } else if (map[x1][y1].entries.left === true && map[x2][y2].entries.right === true) {
        direction = "left";
      }

      return direction;
    }
    for (let j = 0, jlength = keys.length; j < jlength ; j++) {
    // for the first two...
      if (obstacles[i].obstacle_id === 1 && keys[j].key_id === 2) {
        doors.push({ pos: obstacles[i].pos, direction: determineDirection(i, j), id: obstacles[i].obstacle_id, type: "forcefield" });
      }
      if (obstacles[i].obstacle_id === 2 && keys[j].key_id === 3) {
        doors.push({ pos: obstacles[i].pos, direction: determineDirection(i, j), id: obstacles[i].obstacle_id, type: "forcefield" });
      }
    }
  // the final force field comes before the exit pos
    if (obstacles[i].obstacle_id === final_area) {
      doors.push({ pos: obstacles[i].pos, direction: determineDirection(i, 0, exit_pos), id: obstacles[i].obstacle_id, type: "forcefield" });
    }
  }

  return doors;
}

export {declareDoors};
