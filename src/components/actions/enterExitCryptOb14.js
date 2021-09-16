import {playSound} from "../assets/playSound.js";

function enterExitCryptOb14(obstacle_objects, colMesh, scene, camera) {
  if (colMesh.name === "cryptEntrance") {
    playSound("swish_2", 1000, scene);
    camera.position.x = obstacle_objects.exit_pos.x;
    camera.position.z = obstacle_objects.exit_pos.z;
    camera.position.y = obstacle_objects.exit_pos.y;
  }
  if (colMesh.name === "cryptExit") {
    playSound("swish_2", 1000, scene);
    camera.position.x = obstacle_objects.exit_pos.x;
    camera.position.z = obstacle_objects.exit_pos.z;
    camera.position.y = obstacle_objects.exit_pos.y;
  }
}

export {enterExitCryptOb14};
