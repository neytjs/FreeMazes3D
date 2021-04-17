function GUI_Warning(text, time) {
  document.getElementById("warning").style.left = 0;
  document.getElementById("warning").innerHTML = text;
  setTimeout(function() {
    document.getElementById("warning").style.left = -10000;
  }, time);
}

export {GUI_Warning};
