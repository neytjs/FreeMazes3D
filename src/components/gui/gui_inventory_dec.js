function GUI_InventoryDec(inventory, inventory_tracker) {
  inventory_tracker.current_item = (inventory_tracker.current_item - 1) > 0 ? inventory_tracker.current_item - 1 : (inventory.length - 1);
}

export {GUI_InventoryDec};
