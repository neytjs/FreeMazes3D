import { map, length, width } from './globals.js';

function createMapAreas(areas) {
  let map_areas = [];
// get total non-empty pieces
  let total_pieces = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      if (map[x][y].type !== "empty") {
        total_pieces = total_pieces + 1;
      }
    }
  }
// now get the max (unmerged) section size
  let max_area_size = 0;
  switch (areas) {
    case 2:
      max_area_size = 5;
    break;
    case 3:
      max_area_size = 6;
    break;
    case 4:
      max_area_size = 10;
    break;
  }
// now we use the area_sizes to break up the map into adjacent areas
// simplest approach, find all pieces with a value of 1
  let total_one_values = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      if (map[x][y].value === 1) {
        total_one_values.push({ start: {x: x, y: y}, piece: map[x][y]});
      }
    }
  }
// now test using the first total_value_ones to navigate through the pieces until it finds a piece value greater than 2
  for (let i = 0; i < total_one_values.length; i++) {
    let counter = 0;
    let area_pieces = [];
    var x = total_one_values[i].start.x;
    var y = total_one_values[i].start.y;
    area_pieces.push({x: x, y: y});
  // get the "direction" of the first piece, this is needed so when you have pieces with two openings, it knows which way to keep going.
  // or, more precisely, which way NOT to go, i.e. do NOT go backwards, go forwards until you reach a piece with a value greater than 2.
    var direction = "";
    if (map[x][y].entries.top === true) {
      direction = "bottom";
    } else if (map[x][y].entries.right === true) {
      direction = "left";
    } else if (map[x][y].entries.bottom === true) {
      direction = "top";
    } else if (map[x][y].entries.left === true) {
      direction = "right";
    }
    function findMapAreas() {
      let new_direction = "";
    // here we have the logic to "move" through the maze from the area starting point piece
      function moveForwardOnePiece() {
        if (map[x][y].entries.top === true && direction !== "top") {
          x = x - 1;
          new_direction = "bottom";
        } else if (map[x][y].entries.right === true && direction !== "right") {
          y = y + 1;
          new_direction = "left";
        } else if (map[x][y].entries.bottom === true && direction !== "bottom") {
          x = x + 1;
          new_direction = "top";
        } else if (map[x][y].entries.left === true && direction !== "left") {
          y = y - 1;
          new_direction = "right";
        }
      }
      moveForwardOnePiece();
    // if value is > than 2, the findMapAreas() finishes running
      if (map[x][y].value > 2) {
        counter = max_area_size;
      } else { // otherwise, continue running
          counter = counter + 1;
        if (counter < max_area_size) {
          area_pieces.push({x: x, y: y});
          direction = new_direction;
        }
      }

      if (counter < max_area_size) {
        findMapAreas();
      } else { // finally, once this function is done calling itself, for each for loop iteration, add the results to map_areas
        map_areas.push({ area_id: i, area_pieces: area_pieces, entrance: { pos: {x: x, y: y}, direction: new_direction } })
      }
    }
    findMapAreas();
  }

// now see if we can merge map areas that only have one piece with other areas to create bigger areas and then see
// how many areas we typically have after this is done.
  let set = new Set();
  let splice_areas = new Set();
  let new_areas = [];
  let new_id_counter = 0;
  for (let i = 0, length = map_areas.length; i < length; i++) {
    for (let j = 0, jlength = map_areas.length; j < jlength; j++) {
      if (i !== j && map_areas[i].entrance.pos.x === map_areas[j].entrance.pos.x && map_areas[i].entrance.pos.y === map_areas[j].entrance.pos.y) {
      // if the common entrance piece value is three
        if (map[map_areas[i].entrance.pos.x][map_areas[i].entrance.pos.y].value === 3) {
        // if either has a pieces length of one... and their combined length is not too big
          let combined = map_areas[i].area_pieces.length + map_areas[j].area_pieces.length;
          if ((map_areas[i].area_pieces.length === 1 || map_areas[j].area_pieces.length === 1) && (combined <= max_area_size)) {
          // add their pieces together + their entrance piece.
            let new_pieces = map_areas[i].area_pieces.concat(map_areas[j].area_pieces);
            new_pieces.push(map_areas[i].entrance.pos);
          // determine the new entrance piece
            let old_entrance = {
              top: (map[map_areas[i].entrance.pos.x][map_areas[i].entrance.pos.y].entries.top === true ? true : false),
              right: (map[map_areas[i].entrance.pos.x][map_areas[i].entrance.pos.y].entries.right === true ? true : false),
              bottom: (map[map_areas[i].entrance.pos.x][map_areas[i].entrance.pos.y].entries.bottom === true ? true : false),
              left: (map[map_areas[i].entrance.pos.x][map_areas[i].entrance.pos.y].entries.left === true ? true : false)
            };
          // eliminate the two entrance directions to the two areas
            for (let entry in old_entrance) {
              if (entry === map_areas[i].entrance.direction || entry === map_areas[j].entrance.direction) {
                old_entrance[entry] = false;
              }
            }
          // now get the one remaining entrance direction that still equals true and store that as direction
            let direction = "";
            for (let entry in old_entrance) {
              if (old_entrance[entry] === true) {
                direction = entry;
              }
            }
          // now get the new entrance pos
            let x = map_areas[i].entrance.pos.x;
            let y = map_areas[i].entrance.pos.y;
            if (direction === "top") {
              x = x - 1;
            } else if (direction === "right") {
              y = y + 1;
            } else if (direction === "bottom") {
              x = x + 1;
            } else if (direction === "left") {
              y = y - 1;
            }
            let new_entrance_pos = {x: x, y: y};
          // get the new direction (which is simply the opposite of the current direction value)
            let new_direction = "";
            if (direction === "top") {
              new_direction = "bottom";
            } else if (direction === "right") {
              new_direction = "left";
            } else if (direction === "bottom") {
              new_direction = "top";
            } else if (direction === "left") {
              new_direction = "right";
            }
          // track the two areas that need to be spliced
            splice_areas.add(map_areas[i].area_id);
            splice_areas.add(map_areas[j].area_id);
          // test to see if this new_area has already been added, if no, then add it
            let piece_string = "x"+x+"y"+y;
            if (set.has(piece_string) === false) {
              new_id_counter = new_id_counter + 1;
              let new_area = {
                area_id: (100000 + new_id_counter),
                area_pieces: new_pieces,
                entrance: { pos: new_entrance_pos, direction: new_direction },
                merged: true,
                old_areas: { old_area1: map_areas[i].area_pieces, old_area2: map_areas[j].area_pieces }
              }
              new_areas.push(new_area);
              set.add(piece_string);
            }
          }
        }
      }
    }
  }
// now go through and splice out what needs to be spliced.
  for (let splice_item of splice_areas) {
    for (let i = 0; i < map_areas.length; i++) {
      if (splice_item === map_areas[i].area_id) {
        map_areas.splice(i, 1);
      }
    }
  }
// finally concat map_areas and new_areas
  map_areas = map_areas.concat(new_areas);

// now we need to select the map_areas from map_areas, we do this by organizing them by pieces length, and take the biggest
// and therefor most "interesting" map areas. Also, if the map_areas.length is less than the value of areas, we just return
// the former.
// sort them to find the closest...
  map_areas.sort(function(a, b) {
  // sorting by distance
    if (a.area_pieces.length < b.area_pieces.length) {
      return 1;
    }
    if (b.area_pieces.length < a.area_pieces.length) {
      return -1;
    }
  });
// then return the correct amount of map areas
  if (areas < map_areas.length) {
    map_areas.splice(areas, (map_areas.length - areas));
  } else {
    map_areas;
  }
// finally, go through and give the area_ids 1, 2, 3, etc...
  let id = 0;
  for (let i = 0, length = map_areas.length; i < length; i++) {
    id = id + 1;
    map_areas[i].area_id = id;
  }

  return map_areas;
}

export {createMapAreas};
