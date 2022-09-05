function pressWheelOb22(hit, solved, scene, ob22) {
  if (solved.solvedP22 === false && ob22.rotating === false && ob22.adjusting_liquid_level === false) {
    if (hit.pickedMesh.name === "base_Ob22_wheel1") {
      ob22.wheel_name = hit.pickedMesh.name.substring(5);
      ob22.rotating = true;
    }
  }
}

export {pressWheelOb22};
