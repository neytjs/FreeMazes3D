function setExitPosition(map_areas) {
  let exit_pos = map_areas[map_areas.length - 2].spawn;

  return exit_pos;
}

export {setExitPosition};
