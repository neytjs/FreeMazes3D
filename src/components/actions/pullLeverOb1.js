import {playSound} from "../assets/playSound.js";

function pullLeverOb1(hit, scene, ob1) {
  if (hit.pickedMesh.name === "machineOb1" && ob1.machine_status === "pull") {
    playSound("mouseclick", 2000, scene);
    ob1.machine_status = "pulling";
  }
}

export {pullLeverOb1};
