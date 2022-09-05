import {playSound} from "../assets/playSound.js";

function playerLanded(colMesh, scene, player) {
  if (colMesh.name === "landableSurface" && player.landed === false) {
    player.landed = true;
    playSound("grunt2", 1500, scene);
  }
  if (colMesh.name === "landableSoftSurface" && player.softLanded === false) {
    player.softLanded = true;
    playSound("grunt2", 1500, scene);
  }
}

export {playerLanded};
