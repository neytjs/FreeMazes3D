import {playSound} from "../assets/playSound.js";
import {GUI_InventoryDisplay} from "../gui/gui_inventory_display.js";
import {GUI_InventoryDec} from "../gui/gui_inventory_dec.js";

function insertCoinOb1(hit, solved, scene, ob1, inventory, inventory_tracker) {
  if (solved.solvedP1 === false && hit.pickedMesh.name === "machineOb1" && ob1.machine_status === "insert" && ob1.numbers.length < 3 && inventory[inventory_tracker.current_item].type === "Ob1_coin") {
    playSound("sell_buy_item", 5000, scene);
    ob1.machine_status = "inserting";
    ob1.coin_name = inventory[inventory_tracker.current_item].name;
    inventory.splice(inventory_tracker.current_item, 1);
    GUI_InventoryDec(inventory, inventory_tracker);
    GUI_InventoryDisplay(inventory, inventory_tracker);
    setTimeout(() => {
      ob1.machine_status = "pull";
    }, 500);
  }
}

export {insertCoinOb1};
