function GUI_InventoryDisplay(inventory, inventory_tracker) {
  document.getElementById("inventory_item_label").innerHTML = inventory[inventory_tracker.current_item].inventory;
  document.getElementById("inventory_img").innerHTML = (inventory[inventory_tracker.current_item].img) ? '<img src="./imgs/' + inventory[inventory_tracker.current_item].img + '.png"></img>' : "";
}

export {GUI_InventoryDisplay};
