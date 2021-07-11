import {Vector3} from "@babylonjs/core/Maths/math";
import {rotateMobOb12} from "./rotateMobOb12.js";
import {getAgentPosition} from "../assets/mob_crowd.js";

function movementTestOb12(solved, ob12, camera, scene, score, forcefield_objects, obstacle_objects) {
  if (ob12.firing === false) {
    let mob = scene.getMeshByName("agentMob");
    if (mob) {
      let mob_pos = getAgentPosition();
      if (mob_pos && Vector3.Distance(camera.position, mob_pos) < 50) {
        let newx = camera.position.x - mob_pos.x;
        let newz = camera.position.z - mob_pos.z;
        let atan2 = Math.atan2(newx, newz);
        rotateMobOb12(solved, scene, atan2, ob12, camera, score, forcefield_objects, obstacle_objects);
      }
    }
  }
}

export {movementTestOb12};
