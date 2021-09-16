function movePlayer(camera, x, z, y) {
  camera.position.x = x;
  camera.position.z = z;
  camera.position.y = y;
}

export {movePlayer};
