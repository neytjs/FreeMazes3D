function setGUIBackground(game) {
  if (game) {
    document.getElementById("loading").style.left = -10000;
    document.getElementById("menu_button").style.left = 0;
    document.getElementById("score").style.left = 100;
    document.getElementById("timer").style.left = 300;
    document.getElementById("inventory").style.left = 0;
  } else {
    document.getElementById("loading").style.left = -10000;
    document.getElementById("menu_button").style.left = -10000;
    document.getElementById("score").style.left = -10000;
    document.getElementById("timer").style.left = -10000;
    document.getElementById("inventory").style.left = -10000;
  }
}

export {setGUIBackground};
