import { pieces } from './pieces.js';
import { map, length, width, globals } from './globals.js';
import { findAllPaths } from './find_all_paths.js';

var sections = 1;

function eligiblePieces(x, y, size) {
  let eligible_pieces = [];
  var max_length = length - 1;
  var max_width = width - 1;

  for (let i = 0, length = pieces.length; i < length; i++) {
  // FOR TOP PIECES
    if (x === 0) {
    // if this is the first piece, i.e. upper left hand corner
      if (y === 0) {
        if (pieces[i].entries.top === false && pieces[i].entries.left === false) {
          eligible_pieces.push(pieces[i]);
        }
      }
    // for top pieces in between
      if (y > 0 && y < max_width) {
        if (pieces[i].entries.top === false) {
        // additional test for the previous piece to the left
          if (map[x][y-1].entries.right === pieces[i].entries.left) {
            eligible_pieces.push(pieces[i]);
          }
        }
      }
    // for the upper right hand corner
      if (y === max_width) {
        if (pieces[i].entries.top === false && pieces[i].entries.right === false) {
          if (map[x][y-1].entries.right === pieces[i].entries.left) {
            eligible_pieces.push(pieces[i]);
          }
        }
      }
    }

  // FOR CENTER PIECES
    if (x > 0 && x < max_length) {
    // for left side piece
      if (y === 0) {
        if (pieces[i].entries.left === false) {
          if (map[x-1][y].entries.bottom === pieces[i].entries.top) {
            eligible_pieces.push(pieces[i]);
          }
        }
      }
    // for pieces in between
      if (y > 0 && y < max_width) {
        if (map[x-1][y].entries.bottom === pieces[i].entries.top && map[x][y-1].entries.right === pieces[i].entries.left) {
          eligible_pieces.push(pieces[i]);
        }
      }
    // for right side piece
      if (y === max_width) {
        if (pieces[i].entries.right === false) {
          if (map[x-1][y].entries.bottom === pieces[i].entries.top && map[x][y-1].entries.right === pieces[i].entries.left) {
            eligible_pieces.push(pieces[i]);
          }
        }
      }
    }

  // FOR BOTTOM PIECES
    if (x === max_length) {
    // for left side piece
      if (y === 0) {
        if (pieces[i].entries.bottom === false && pieces[i].entries.left === false) {
          if (map[x-1][y].entries.bottom === pieces[i].entries.top) {
            eligible_pieces.push(pieces[i]);
          }
        }
      }
    // for pieces in between
      if (y > 0 && y < max_width) {
        if (pieces[i].entries.bottom === false) {
          if (map[x-1][y].entries.bottom === pieces[i].entries.top && map[x][y-1].entries.right === pieces[i].entries.left) {
            eligible_pieces.push(pieces[i]);
          }
        }
      }
    // for right side piece
      if (y === max_width) {
        if (pieces[i].entries.bottom === false && pieces[i].entries.right === false) {
          if (map[x-1][y].entries.bottom === pieces[i].entries.top && map[x][y-1].entries.right === pieces[i].entries.left) {
            eligible_pieces.push(pieces[i]);
          }
        }
      }
    }
  }

  return eligible_pieces;
}

function filterPieces(eligible_pieces) {
// first, get the percentages of each type
  let empty = [];
  let room = [];
  let hallway = [];
// and counters to track amount of each
  let empty_counter = 0;
  let room_counter = 0;
  let hallway_counter = 0;

  for (let i = 0, length = eligible_pieces.length; i < length; i++) {
    if (eligible_pieces[i].type === "empty") {
      empty.push(eligible_pieces[i]);
      empty_counter = empty_counter + 1;
    }
    if (eligible_pieces[i].type === "room") {
      room.push(eligible_pieces[i]);
      room_counter = room_counter + 1;
    }
    if (eligible_pieces[i].type === "hallway") {
      hallway.push(eligible_pieces[i]);
      hallway_counter = hallway_counter + 1;
    }
  }

  let rand = Math.floor(Math.random() * 100);
// if there are all three types
  if (empty_counter > 0 && room_counter > 0 && hallway_counter > 0) {
    if (rand < globals.empty) {
      let num = Math.floor(Math.random() * empty.length);
      return empty[num];
    }
    if (rand >= globals.empty && rand < (globals.empty + globals.room)) {
      let num = Math.floor(Math.random() * room.length);
      return room[num];
    }
    if (rand >= (globals.empty + globals.room) && rand <= (globals.empty + globals.room + globals.hallway)) {
      let num = Math.floor(Math.random() * hallway.length);
      return hallway[num];
    }
  }
// if there are only two types
  if (empty_counter > 0 && room_counter === 0 && hallway_counter > 0) {
    let empty_percent = Math.round(globals.empty / (globals.empty + globals.hallway) * 100);
    let hallway_percent = Math.round(globals.hallway / (globals.empty + globals.hallway) * 100);
    if (rand < empty_percent) {
      let num = Math.floor(Math.random() * empty.length);
      return empty[num];
    }
    if (rand >= empty_percent && rand < (empty_percent + hallway_percent)) {
      let num = Math.floor(Math.random() * hallway.length);
      return hallway[num];
    }
  }
  if (empty_counter > 0 && room_counter > 0 && hallway_counter === 0) {
    let empty_percent = Math.round(globals.empty / (globals.empty + globals.room) * 100);
    let room_percent = Math.round(globals.room / (globals.empty + globals.room) * 100);
    if (rand < empty_percent) {
      let num = Math.floor(Math.random() * empty.length);
      return empty[num];
    }
    if (rand >= empty_percent && rand < (empty_percent + room_percent)) {
      let num = Math.floor(Math.random() * room.length);
      return room[num];
    }
  }
  if (empty_counter === 0 && room_counter > 0 && hallway_counter > 0) {
    let room_percent = Math.round(globals.room / (globals.hallway + globals.room) * 100);
    let hallway_percent = Math.round(globals.hallway / (globals.room + globals.hallway) * 100);
    if (rand < room_percent) {
      let num = Math.floor(Math.random() * room.length);
      return room[num];
    }
    if (rand >= room_percent && rand < (hallway_percent + room_percent)) {
      let num = Math.floor(Math.random() * hallway.length);
      return hallway[num];
    }
  }
// if only one type...
  if (empty_counter > 0 && room_counter === 0 && hallway_counter === 0) {
    let num = Math.floor(Math.random() * empty.length);
    return empty[num];
  }
  if (empty_counter === 0 && room_counter > 0 && hallway_counter === 0) {
    let num = Math.floor(Math.random() * room.length);
    return room[num];
  }
  if (empty_counter === 0 && room_counter === 0 && hallway_counter > 0) {
    let num = Math.floor(Math.random() * hallway.length);
    return hallway[num];
  }
}

function selectPiece(x, y) {
  let eligible_pieces = eligiblePieces(x, y);
  return filterPieces(eligible_pieces);
}

// to merge the sections if greater than one
function mergeSections(total_pieces_array) {
  let rec_counter = 0;

  function getCorrectPiece(x, y, direction) {
    let current_piece = map[x][y];
    let correct_piece = [];

    for (let i = 0, length = pieces.length; i < length; i++) {
      if (direction === "left") {
        if (current_piece.entries.right === pieces[i].entries.right && current_piece.entries.top === pieces[i].entries.top && current_piece.entries.bottom === pieces[i].entries.bottom && pieces[i].entries.left === true) {
          correct_piece.push(pieces[i]);
        }
      }
      if (direction === "right") {
        if (current_piece.entries.left === pieces[i].entries.left && current_piece.entries.top === pieces[i].entries.top && current_piece.entries.bottom === pieces[i].entries.bottom && pieces[i].entries.right === true) {
          correct_piece.push(pieces[i]);
        }
      }
      if (direction === "top") {
        if (current_piece.entries.left === pieces[i].entries.left && current_piece.entries.right === pieces[i].entries.right && current_piece.entries.bottom === pieces[i].entries.bottom && pieces[i].entries.top === true) {
          correct_piece.push(pieces[i]);
        }
      }
      if (direction === "bottom") {
        if (current_piece.entries.left === pieces[i].entries.left && current_piece.entries.right === pieces[i].entries.right && current_piece.entries.top === pieces[i].entries.top && pieces[i].entries.bottom === true) {
          correct_piece.push(pieces[i]);
        }
      }
    }

    return filterPieces(correct_piece);
  }

  function mergingEachSection() {
    rec_counter = rec_counter + 1;
    let next_section = 0;
    let distances = [];

  // logic to find the closest point between first and another section
    for (let i = 0; i < total_pieces_array.length; i++) {
      for (let j = 0; j < total_pieces_array.length; j++) {
        let sect1 = total_pieces_array[i].section;
        let sect2 = total_pieces_array[j].section;
        if (sect1 === 1 && sect2 !== 1) {
          let p1 = total_pieces_array[i].x;
          let q1 = total_pieces_array[j].x;
          let p2 = total_pieces_array[i].y;
          let q2 = total_pieces_array[j].y;
          let sum = Math.pow((q1 - p1), 2) + Math.pow((q2 - p2), 2);
          let distance = Math.sqrt(sum); // using the distance formula
        // make sure the lesser of x/y of the two pieces is the start piece and not the end piece
        // this is important, so it always works during the next part where we pick the pieces, so that they always connect as intended
        // because we go through the data structure left to right and top to bottom, so left to right pieces should connect at the
        // right to left faces and top to bottom should connect at the bottom to top faces. the lesser of x should always then be the
        // start piece and same with the lesser of y.
          if (p1 === q1) {
            if (p2 < q2) {
              distances.push({ start: {x: p1, y: p2, section: sect1}, end: {x: q1, y: q2, section: sect2}, distance: distance });
            } else { // otherwise, swap the two pieces for start end
              distances.push({ start: {x: q1, y: q2, section: sect2}, end: {x: p1, y: p2, section: sect1}, distance: distance });
            }
          } else if (p2 === q2) {
            if (p1 < q1) {
              distances.push({ start: {x: p1, y: p2, section: sect1}, end: {x: q1, y: q2, section: sect2}, distance: distance });
            } else { // otherwise, swap the two pieces for start end
              distances.push({ start: {x: q1, y: q2, section: sect2}, end: {x: p1, y: p2, section: sect1}, distance: distance });
            }
          }
        }
      }
    }
  // sort them to find the closest...
    distances.sort(function(a, b) {
    // sorting by distance
      if (a.distance < b.distance) {
        return -1;
      }
      if (b.distance < a.distance) {
        return 1;
      }
    });

  // get the value for next_section (i.e. whichever start/end is greater in value, take that greater value)
    next_section = (distances[0].end.section > distances[0].start.section) ? distances[0].end.section : distances[0].start.section;
  // now we merge the two closest pieces together
    let p1 = distances[0].start.x;
    let p2 = distances[0].start.y;
    let q1 = distances[0].end.x;
    let q2 = distances[0].end.y;
  // get the distance
    let distance = distances[0].distance;
  // determine in what direction the two pieces are facing each other
    if (distances[0].start.x === distances[0].end.x) {
    // select a piece to connect them due to them both having the same x value
      map[p1][p2] = getCorrectPiece(p1, p2, "right");
      map[q1][q2] = getCorrectPiece(q1, q2, "left");
    // for distances greater than 1
      if (distance > 1) {
        for (var i = 1; i < distance; i++) {
        // first set the empty space to a new temp piece that has the correct left/right = true, to get the right type of piece
          map[p1][p2+i] = { entries: {top: false, right: true, bottom: false, left: true} };
        // now get an appropriat random piece
          map[p1][p2+i] = getCorrectPiece(p1, p2+i, "right");
        }
      }
    }
    if (distances[0].start.y === distances[0].end.y) {
    // select a piece to connect them due to them both having the same y value
      map[p1][p2] = getCorrectPiece(p1, p2, "bottom");
      map[q1][q2] = getCorrectPiece(q1, q2, "top");
    // for distances greater than 1
      if (distance > 1) {
        for (let i = 1; i < distance; i++) {
        // first set the empty space to a new temp piece that has the correct top/bottom = true, to get the right type of piece
          map[p1+i][p2] = { entries: {top: true, right: false, bottom: true, left: false} };
        // now get an appropriate random piece
          map[p1+i][p2] = getCorrectPiece(p1+i, p2, "bottom");
        }
      }
    }
  // once first section and the next_section are merged, by placing an appropriate piece, iterate through total_pieces_array
  // and set next_section pieces's section to 1
    for (let i = 0; i < total_pieces_array.length; i++) {
      if (total_pieces_array[i].section === next_section) {
        total_pieces_array[i].section = 1;
      }
    }
  // finally, reduce the sections by one
    sections = sections - 1;

    if (sections > 1) {
      mergingEachSection();
    }
  }
  mergingEachSection();
}

// to count sections to see if greater than one
function sectionCounter() {
  let full_paths = findAllPaths();
  let pieces = {};
// logic to get the amount of map sections from the full paths
  let total_pieces_array = [];
  let rec_counter = 0;
  let first_undiscovered = 0;
// logic for finding all sections
  function findAllSections() {
    rec_counter = rec_counter + 1;
    for (let i = 0; i < full_paths.length; i++) {
      for (let j = 0; j < full_paths[i].members.length; j++) {
        if (i === first_undiscovered) {
          full_paths[i].discovered = true;
          pieces["x" + full_paths[i].members[j].x + "y" + full_paths[i].members[j].y] = {x: full_paths[i].members[j].x, y: full_paths[i].members[j].y};
        } else {
          for (let piece in pieces) {
            if (pieces[piece].x === full_paths[i].members[j].x && pieces[piece].y === full_paths[i].members[j].y) {
              full_paths[i].discovered = true;
              for (let k = 0; k < full_paths[i].members.length; k++) {
                pieces["x" + full_paths[i].members[k].x + "y" + full_paths[i].members[k].y] = {x: full_paths[i].members[k].x, y: full_paths[i].members[k].y};
              }
            }
          }
        }
      }
    }
  // if they have gone through all the paths for a section, but not yet gone through all the paths
    if (rec_counter < full_paths.length) {
      findAllSections();
    } else if (rec_counter === full_paths.length) { // if they have recursively iterated through all the paths
    // get the current total pieces
      for (let piece in pieces) {
        total_pieces_array.push({x: pieces[piece].x, y: pieces[piece].y, section: sections});
      }
    // get the amount of paths discovered
      let amount_discovered = 0;
      for (let i = 0; i < full_paths.length; i++) {
        if (full_paths[i].discovered === true) {
          amount_discovered = amount_discovered + 1;
        }
      }
    // if they amount of paths discovered is still less than the full_paths' length
      if (amount_discovered < full_paths.length) {
      // first check to find the first_undiscovered, zero by default.
        for (let i = 0; i < full_paths.length; i++) {
          if (full_paths[i].discovered === false) {
            first_undiscovered = i;
            break;
          }
        }
      // reset values and call findAllSections() again
        pieces = {};
        rec_counter = 0;
        sections = sections + 1;
        findAllSections();
      }
    }
  }
  findAllSections();

  if (sections > 1) {
    mergeSections(total_pieces_array);
  }
}

// calls necessary functions to create a map, when invoked.
function createMap() {
// iterate through the map and set the pieces
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
      map[x][y] = selectPiece(x, y);
    }
  }

// now, test to make sure that all map pieces are connected together
  sectionCounter();
}

export {createMap};
