var map = [];
var length = 7;
var width = 7;
var total_areas = 4;
// they must add up to 100.
// Only rooms can safely have a value of 100. Empty will crash at 100. Best to keep empty at 70 or below to avoid crashing.
var globals = {
  empty: 0,
  room: 0,
  hallway: 100
}
var exit_pos = {x: 0, y: 0};
var start_pos = {x: 0, y: 0};

function storeExitPos(new_exit_pos) {
  exit_pos = new_exit_pos;
}
function storeStartPos(new_start_pos) {
  start_pos = new_start_pos;
}

function setMapSize(size) {
  if (map.length > 0) {
    map = null;
    map = [];
  }
  switch (size) {
    case "small":
    length = 4;
    width = 4;
    total_areas = 2;
    break;
    case "medium":
      length = 5;
      width = 5;
      total_areas = 3;
    break;
    case "large":
      length = 7;
      width = 7;
      total_areas = 4;
    break;
  }
}

export {map, length, width, total_areas, globals, storeExitPos, storeStartPos, setMapSize, exit_pos, start_pos};
