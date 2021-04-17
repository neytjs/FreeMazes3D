function GUI_Warn(message) {
  document.getElementById("warn").style.left = "25%";
  document.getElementById("warn_message").innerHTML = message;
}

export {GUI_Warn};
