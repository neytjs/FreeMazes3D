import {GUI_Warning} from "../gui/gui_warning.js";

function pressWheelOb24(hit, solved, scene, ob24, inventory, inventory_tracker, global_language) {
  if (solved.solvedP24 === false && ob24.rotating === false) { 
    if ((hit.pickedMesh.name === "base_Ob24_wheel1" && ob24.Ob24_wheel1 === false) || (hit.pickedMesh.name === "base_Ob24_wheel2" && ob24.Ob24_wheel2 === false) || (hit.pickedMesh.name === "base_Ob24_wheel3" && ob24.Ob24_wheel3 === false) || (hit.pickedMesh.name === "base_Ob24_wheel4" && ob24.Ob24_wheel4 === false) || (hit.pickedMesh.name === "base_Ob24_bigwheel" && ob24.Ob24_bigwheel === false)) {
      if (hit.pickedMesh.name === "base_Ob24_bigwheel" && ob24.big_wheel_hot === true) {
        if (inventory[inventory_tracker.current_item].name !== "water_pail") {
          GUI_Warning(global_language.text.puzzles.ob24.warn, 2500, scene);
        }
      } else {
        ob24.wheel_name = hit.pickedMesh.name.substring(5);
        ob24[ob24.wheel_name] = true;
        ob24.rotating = true;
      }
    }
  }
}

export {pressWheelOb24};
