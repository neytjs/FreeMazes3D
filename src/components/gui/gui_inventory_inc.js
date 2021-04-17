function GUI_InventoryInc(inventory, inventory_tracker) {
  inventory_tracker.current_item = (inventory_tracker.current_item + 1) < inventory.length ? inventory_tracker.current_item + 1 : 1;
}

export {GUI_InventoryInc};
