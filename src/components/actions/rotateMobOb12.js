import {fireMobOb12} from "./fireMobOb12.js";

function rotateMobOb12(solved, scene, atan2, ob12, camera, score, forcefield_objects, obstacle_objects, global_language) {
  const pi = Math.PI;
  const speed = 0.03;
  let mob = scene.getMeshByName("agentMob");
  if (mob.rotation.y <= (atan2 - speed) || mob.rotation.y >= (atan2 + speed)) {
    let current_point = mob.rotation.y;
    let end_point = atan2;
    let larger_num = Math.max(current_point, end_point);
    let smaller_num = Math.min(current_point, end_point);
    if (ob12.mob_moving === false) {
      ob12.mob_moving = true
      ob12.clockwise = false;
    // if both are positive numbers OR if both are negative numbers
      if ((Math.sign(larger_num) >= 0 && Math.sign(smaller_num) >= 0) || (Math.sign(larger_num) < 0 && Math.sign(smaller_num) < 0)) {
        if (end_point > current_point) {
          ob12.clockwise = true;
        }
      }
    // if there are both positive and negative numbers
      if (Math.sign(larger_num) >= 0 && Math.sign(smaller_num) < 0) {
        let possible_distance_a = larger_num - smaller_num;
        let possible_distance_b = 0;
        if (smaller_num < -(pi / 2) && larger_num > (pi / 2)) {
          if (Math.sign(end_point) === -1) {
            ob12.clockwise = true;
          }
        }
        if (smaller_num > -(pi / 2) && larger_num > (pi / 2)) {
          possible_distance_b = (pi - larger_num) + ((-pi - smaller_num) * -1);
          if (possible_distance_b < possible_distance_a) {
            ob12.clockwise = true;
          }
        }
        if (smaller_num < -(pi / 2) && larger_num < (pi / 2)) {
          possible_distance_b = (pi - larger_num) + (smaller_num - -pi);
          if (possible_distance_b < possible_distance_a) {
            ob12.clockwise = true;
          }
        }
        if (smaller_num > -(pi / 2) && larger_num < (pi / 2)) {
          if (Math.sign(end_point) >= 0) {
            ob12.clockwise = true;
          }
        }
      }
    }

    if (ob12.clockwise === false) {
      if (mob.rotation.y > -pi) {
        mob.rotation.y = mob.rotation.y - speed;
      }
      if (mob.rotation.y <= -pi) {
        mob.rotation.y = pi;
      }
    }

    if (ob12.clockwise) {
      if (mob.rotation.y < pi) {
        mob.rotation.y = mob.rotation.y + speed;
      }
      if (mob.rotation.y >= pi) {
        mob.rotation.y = -pi;
      }
    }
  } else {
    ob12.mob_moving = false;
    ob12.rotation = mob.rotation.y;
    if (solved.solvedP12 === false) {
      fireMobOb12(ob12, scene, solved, camera, score, forcefield_objects, obstacle_objects, global_language);
    }
  }
}

export {rotateMobOb12};
