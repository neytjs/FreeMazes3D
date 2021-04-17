function generateGem(map_areas) {
  let gem = {};
  gem.pos = map_areas[map_areas.length - 1].spawn;

  return gem;
}

export {generateGem};
