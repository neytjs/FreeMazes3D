import {GUI_Warning} from "../gui/gui_warning.js";

function pedestalWarningOb1(obstacle_objects, inventory, ob1, solved, colMesh) {
  if ((colMesh.name === "copper_pedestal" || colMesh.name === "silver_pedestal" || colMesh.name === "gold_pedestal") && obstacle_objects.solved === false && ob1.warned === false) {
    let matches = 0;
    for (let j = 0, jlength = inventory.length; j < jlength; j++) {
      if (inventory[j].name === "copper_coin" && obstacle_objects.name === "copper_pedestal") {
        matches = matches + 1;
      }
      if (inventory[j].name === "silver_coin" && obstacle_objects.name === "silver_pedestal") {
        matches = matches + 1;
      }
      if (inventory[j].name === "gold_coin" && obstacle_objects.name === "gold_pedestal") {
        matches = matches + 1;
      }
    }
    if (matches === 0 && solved.solvedP1 === 0) {
      GUI_Warning("You need to place something here.", 2000);
      ob1.warned = true;
    }
  }
}

export {pedestalWarningOb1};
