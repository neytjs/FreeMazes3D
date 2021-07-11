import {fireTurretOb11} from "./fireTurretOb11.js";

function rotateTurretOb11(solved, scene, atan2, ob11, score, forcefield_objects, obstacle_objects) {
  if (solved.solvedP11 === false) {
    const pi = Math.PI;
    const speed = 0.01;
    let turret = scene.getMeshByName("turretOb11");
    if (turret.rotation.y <= (atan2 - speed) || turret.rotation.y >= (atan2 + speed)) {
      let current_point = turret.rotation.y;
      let end_point = atan2;
      let larger_num = Math.max(current_point, end_point);
      let smaller_num = Math.min(current_point, end_point);
      if (ob11.turret_moving === false) {
        ob11.turret_moving = true
        ob11.clockwise = false;
      // if both are positive numbers OR if both are negative numbers
        if ((Math.sign(larger_num) >= 0 && Math.sign(smaller_num) >= 0) || (Math.sign(larger_num) < 0 && Math.sign(smaller_num) < 0)) {
          if (end_point > current_point) {
            ob11.clockwise = true;
          }
        }
      // if there are both positive and negative numbers
        if (Math.sign(larger_num) >= 0 && Math.sign(smaller_num) < 0) {
          let possible_distance_a = larger_num - smaller_num;
          let possible_distance_b = 0;
          if (smaller_num < -(pi / 2) && larger_num > (pi / 2)) {
            if (Math.sign(end_point) === -1) {
              ob11.clockwise = true;
            }
          }
          if (smaller_num > -(pi / 2) && larger_num > (pi / 2)) {
            possible_distance_b = (pi - larger_num) + ((-pi - smaller_num) * -1);
            if (possible_distance_b < possible_distance_a) {
              ob11.clockwise = true;
            }
          }
          if (smaller_num < -(pi / 2) && larger_num < (pi / 2)) {
            possible_distance_b = (pi - larger_num) + (smaller_num - -pi);
            if (possible_distance_b < possible_distance_a) {
              ob11.clockwise = true;
            }
          }
          if (smaller_num > -(pi / 2) && larger_num < (pi / 2)) {
            if (Math.sign(end_point) >= 0) {
              ob11.clockwise = true;
            }
          }
        }
      }

      if (ob11.clockwise === false) {
        if (turret.rotation.y > -pi) {
          turret.rotation.y = turret.rotation.y - speed;
        }
        if (turret.rotation.y <= -pi) {
          turret.rotation.y = pi;
        }
      }

      if (ob11.clockwise) {
        if (turret.rotation.y < pi) {
          turret.rotation.y = turret.rotation.y + speed;
        }
        if (turret.rotation.y >= pi) {
          turret.rotation.y = -pi;
        }
      }
    } else {
      ob11.turret_moving = false;
      ob11.rotation = turret.rotation.y;
      fireTurretOb11(ob11, scene, solved, score, forcefield_objects, obstacle_objects);
    }
  }
}

export {rotateTurretOb11};
