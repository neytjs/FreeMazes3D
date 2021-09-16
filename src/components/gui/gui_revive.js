function revivingPlayer() {
  document.getElementById("reviving").style.left = 0;
}

function playerRevived() {
  document.getElementById("reviving").style.left = -10000;
}

export {revivingPlayer, playerRevived};
