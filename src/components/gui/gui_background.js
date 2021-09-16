function setMenuBackgroundColors(rgba_string) {
  document.getElementById("menu").style.backgroundColor = rgba_string;
  document.getElementById("difficulty").style.backgroundColor = rgba_string;
  document.getElementById("key_controls").style.backgroundColor = rgba_string;
  document.getElementById("scores").style.backgroundColor = rgba_string;
  document.getElementById("achieves").style.backgroundColor = rgba_string;
  document.getElementById("credits_list").style.backgroundColor = rgba_string;  
}

export {setMenuBackgroundColors};
