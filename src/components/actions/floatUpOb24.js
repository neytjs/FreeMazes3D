function floatUpOb24(scene, camera, ob24, player) {
  if (ob24.floating === true && camera.position.y < 2029) {
    camera.position.y += 0.4;

    if (camera.position.y >= 2029) {
      ob24.floating = false;
      camera.applyGravity = true;
      camera.speed = 0.7;
      player.health = 100;
    }
  }
}

export {floatUpOb24};
