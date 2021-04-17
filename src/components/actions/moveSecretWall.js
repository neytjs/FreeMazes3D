function moveSecretWall(secret_moving, current_secret, scene) {
  if (secret_moving.motion === true) {
    if (current_secret.secret.type === "horizontal_up") {
      let secWall = scene.getMeshByName(current_secret.secret.name);
      if (secWall.position.z < (current_secret.secret.pos.z + 20)) {
        secWall.position.z += 0.25;
      } else {
        secret_moving.motion = false;
        current_secret.secret = {};
      }
    }
    if (current_secret.secret.type === "horizontal_down") {
      let secWall = scene.getMeshByName(current_secret.secret.name);
      if (secWall.position.z > (current_secret.secret.pos.z - 20)) {
        secWall.position.z -= 0.25;
      } else {
        secret_moving.motion = false;
        current_secret.secret = {};
      }
    }
    if (current_secret.secret.type === "vertical_left") {
      let secWall = scene.getMeshByName(current_secret.secret.name);
      if (secWall.position.x > (current_secret.secret.pos.x - 20)) {
        secWall.position.x -= 0.25;
      } else {
        secret_moving.motion = false;
        current_secret.secret = {};
      }
    }
    if (current_secret.secret.type === "vertical_right") {
      let secWall = scene.getMeshByName(current_secret.secret.name);
      if (secWall.position.x < (current_secret.secret.pos.x + 20)) {
        secWall.position.x += 0.25;
      } else {
        secret_moving.motion = false;
        current_secret.secret = {};
      }
    }
  }
}

export {moveSecretWall};
