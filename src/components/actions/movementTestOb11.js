import {Vector3} from "@babylonjs/core/Maths/math";
import {rotateTurretOb11} from "./rotateTurretOb11.js";

function movementTestOb11(solved, ob11, camera, scene, score, forcefield_objects, obstacle_objects, global_language) {
  if (solved.solvedP11 === false && ob11.firing === false) {
    let turret = scene.getMeshByName("turretOb11");
    if (turret && Vector3.Distance(camera.position, turret.position) < 50) {
      let newx = camera.position.x - turret.position.x;
      let newz = camera.position.z - turret.position.z;
      let atan2 = Math.atan2(newx, newz);
      rotateTurretOb11(solved, scene, atan2, ob11, score, forcefield_objects, obstacle_objects, global_language);
    }
  }
}

export {movementTestOb11};
