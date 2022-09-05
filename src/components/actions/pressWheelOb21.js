import {GUI_Warning} from "../gui/gui_warning.js";

function pressWheelOb21(hit, solved, scene, ob21, global_language) {
  if (solved.solvedP21 === false && ob21.rotating === false) {
    const max = 100;
    if ((hit.pickedMesh.name === "base_Ob21_wheel1" && ob21.liquid1.level < max && ob21.liquid1.filling === false) || (hit.pickedMesh.name === "base_Ob21_wheel2" && ob21.liquid2.level < max && ob21.liquid2.filling === false) || (hit.pickedMesh.name === "base_Ob21_wheel3" && ob21.liquid3.level < max && ob21.liquid3.filling === false) || (hit.pickedMesh.name === "base_Ob21_wheel4" && ob21.liquid4.level < max && ob21.liquid4.filling === false) || (hit.pickedMesh.name === "base_Ob21_wheel5" && ob21.liquid5.level < max && ob21.liquid5.filling === false) || (hit.pickedMesh.name === "base_Ob21_wheel6" && ob21.liquid6.level < max && ob21.liquid6.filling === false)) {
      ob21.wheel_name = hit.pickedMesh.name.substring(5);
      ob21.rotating = true;
    } else if (hit.pickedMesh.name === "base_Ob21_machine_wheel" && ob21.running === false) {
      if (ob21.liquid1.level >= 100 && ob21.liquid2.level >= 100 && ob21.liquid3.level >= 100 && ob21.liquid4.level >= 100 && ob21.liquid5.level >= 100 && ob21.liquid6.level >= 100) {
        ob21.wheel_name = hit.pickedMesh.name.substring(5);
        ob21.rotating = true;
      } else {
        GUI_Warning(global_language.text.puzzles.ob21.warn, 2000, scene);
      }
    }
  }
}

export {pressWheelOb21};
