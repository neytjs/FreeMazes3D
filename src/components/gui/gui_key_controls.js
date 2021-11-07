function showKeyControls(global_keys) {
  document.getElementById("keys_movement").innerHTML = global_keys.move_up.new_key.toUpperCase() + "/" + global_keys.move_left.new_key.toUpperCase() + "/" + global_keys.move_down.new_key.toUpperCase() + "/" + global_keys.move_right.new_key.toUpperCase();
  document.getElementById("keys_activate").innerHTML = global_keys.action_key.new_key.toUpperCase();
  document.getElementById("keys_toggleleft").innerHTML = global_keys.toggle_left.new_key.toUpperCase();
  document.getElementById("keys_toggleright").innerHTML = global_keys.toggle_right.new_key.toUpperCase();
  document.getElementById("keys_fps").innerHTML = global_keys.show_fps.new_key.toUpperCase();
}

export {showKeyControls};
