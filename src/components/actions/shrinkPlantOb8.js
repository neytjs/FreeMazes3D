//import {playSound} from "../assets/playSound.js";

function shrinkPlantOb8(scene, ob8) {
  if (ob8.shrinking) {
    let selected = scene.getMeshByName(ob8.shrinking_name);
    const max_shrink = 1;
    if (selected.scaling.y > max_shrink) {
      selected.scaling.x = selected.scaling.x - 0.001;
      selected.scaling.y = selected.scaling.y - 0.002;
      selected.scaling.z = selected.scaling.z - 0.001;
    } else {
      ob8.shrinking = false;
      ob8.shrinking_name = "";
    }
  }
}

export {shrinkPlantOb8};
