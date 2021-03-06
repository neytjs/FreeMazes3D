let pieces = [
  { piece: "empty_space", type: "empty", value: 0, entries: {top: false, right: false, bottom: false, left: false} },
  { piece: "crossroads", type: "hallway",  value: 4, entries: {top: true, right: true, bottom: true, left: true} },
  { piece: "room_single_entry_top", type: "room", value: 1, entries: {top: true, right: false, bottom: false, left: false} },
  { piece: "room_single_entry_right", type: "room", value: 1, entries: {top: false, right: true, bottom: false, left: false} },
  { piece: "room_single_entry_bottom", type: "room", value: 1, entries: {top: false, right: false, bottom: true, left: false} },
  { piece: "room_single_entry_left", type: "room", value: 1, entries: {top: false, right: false, bottom: false, left: true} },
  { piece: "room_double_entry_top_bottom", type: "room", value: 2, entries: {top: true, right: false, bottom: true, left: false} },
  { piece: "room_double_entry_left_right", type: "room", value: 2, entries: {top: false, right: true, bottom: false, left: true} },
  { piece: "room_double_entry_top_right", type: "room", value: 2, entries: {top: true, right: true, bottom: false, left: false} },
  { piece: "room_double_entry_top_left", type: "room", value: 2, entries: {top: true, right: false, bottom: false, left: true} },
  { piece: "room_double_entry_bottom_right", type: "room", value: 2, entries: {top: false, right: true, bottom: true, left: false} },
  { piece: "room_double_entry_bottom_left", type: "room", value: 2, entries: {top: false, right: false, bottom: true, left: true} },
  { piece: "room_triple_entry_top_right_bottom", type: "room", value: 3, entries: {top: true, right: true, bottom: true, left: false} },
  { piece: "room_triple_entry_top_left_bottom", type: "room", value: 3, entries: {top: true, right: false, bottom: true, left: true} },
  { piece: "room_triple_entry_left_top_right", type: "room", value: 3, entries: {top: true, right: true, bottom: false, left: true} },
  { piece: "room_triple_entry_left_bottom_right", type: "room", value: 3, entries: {top: false, right: true, bottom: true, left: true} },
  { piece: "room_quad_entry", type: "room", value: 4, entries: {top: true, right: true, bottom: true, left: true} },
  { piece: "t_vertical_right", type: "hallway", value: 3, entries: {top: true, right: true, bottom: true, left: false} },
  { piece: "t_vertical_left", type: "hallway", value: 3, entries: {top: true, right: false, bottom: true, left: true} },
  { piece: "t_horizontal_top", type: "hallway", value: 3, entries: {top: true, right: true, bottom: false, left: true} },
  { piece: "t_horizontal_bottom", type: "hallway", value: 3, entries: {top: false, right: true, bottom: true, left: true} },
  { piece: "coridor_end_top", type: "hallway", value: 1, entries: {top: true, right: false, bottom: false, left: false} },
  { piece: "coridor_end_right", type: "hallway", value: 1, entries: {top: false, right: true, bottom: false, left: false} },
  { piece: "coridor_end_bottom", type: "hallway", value: 1, entries: {top: false, right: false, bottom: true, left: false} },
  { piece: "coridor_end_left", type: "hallway", value: 1, entries: {top: false, right: false, bottom: false, left: true} },
  { piece: "coridor_vertical", type: "hallway", value: 2, entries: {top: true, right: false, bottom: true, left: false} },
  { piece: "coridor_horizontal", type: "hallway", value: 2, entries: {top: false, right: true, bottom: false, left: true} },
  { piece: "angle_top_right", type: "hallway", value: 2, entries: {top: true, right: true, bottom: false, left: false} },
  { piece: "angle_top_left", type: "hallway", value: 2, entries: {top: true, right: false, bottom: false, left: true} },
  { piece: "angle_bottom_right", type: "hallway", value: 2, entries: {top: false, right: true, bottom: true, left: false} },
  { piece: "angle_bottom_left", type: "hallway", value: 2, entries: {top: false, right: false, bottom: true, left: true} },
];

export {pieces};
