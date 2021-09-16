import {playSound} from "../assets/playSound.js";

function removeGhostOb5(hit_name, ob5, scene, player) {
  let ghost = scene.getMeshByName(hit_name.substring(0, 6));
  ghost.dispose();
  ob5.ghost_part_counter = ob5.ghost_part_counter + 1;
  if (ob5.ghost_part_counter < 5) {
    removeGhostOb5(hit_name, ob5, scene, player);
  } else {
    ob5.ghost_part_counter = 0;
    ob5.ghost_counter = ob5.ghost_counter + 1;
    playSound("ghost", 4500, scene);
    if (ob5.ghost_counter >= 3) {
      let ghostBarrier = scene.getMeshByName("ghostBarrier");
      let spear = scene.getMeshByName("ghostSpear");
      if (ghostBarrier) {
        let gBSound = scene.getSoundByName("ghostBarrierSound");
        gBSound.detachFromMesh(ghostBarrier);
        gBSound.dispose(true, true);
        gBSound = null;
        ghostBarrier.dispose();
        spear.dispose();
        player.holding = "";
      }
    }
  }
}

export {removeGhostOb5};
