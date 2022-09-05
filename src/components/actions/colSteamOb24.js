function colSteamOb24(colMesh, scene, camera, ob24, player) {
  if (colMesh.name === "steamOb24" && ob24.floating === false) {
    camera.speed = 0;
    camera.applyGravity = false;
    ob24.floating = true;
    player.landed = false;
    player.health = 0;
  }
}

export {colSteamOb24};
