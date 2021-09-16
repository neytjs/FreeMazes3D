function shrinkPlantOb8(scene, ob8) {
  if (ob8.shrinking) {
    ob8["shrinking_" + ob8.shrinking_name] = true;
    function shrinkingPlant(shrinking_name) {
      const max_shrink = 1;
      let selected = scene.getMeshByName(shrinking_name);
      if (selected.scaling.y > max_shrink) {
        selected.scaling.x = selected.scaling.x - 0.001;
        selected.scaling.y = selected.scaling.y - 0.002;
        selected.scaling.z = selected.scaling.z - 0.001;
      } else {
        ob8["shrinking_" + shrinking_name] = false;
      }
    }

    if (ob8.shrinking_fruitTree && ob8.fruitTree === false) {
      shrinkingPlant("fruitTree");
    }
    if (ob8.shrinking_pineTree && ob8.pineTree === false) {
      shrinkingPlant("pineTree");
    }
    if (ob8.shrinking_cactus && ob8.cactus === false) {
      shrinkingPlant("cactus");
    }
    if (ob8.shrinking_flower && ob8.flower === false) {
      shrinkingPlant("flower");
    }

    if (ob8.shrinking_fruitTree === false && ob8.shrinking_pineTree === false && ob8.shrinking_cactus === false && ob8.shrinking_flower === false) {
      ob8.shrinking = false;
      ob8.shrinking_name = "";
    }
  }
}

export {shrinkPlantOb8};
