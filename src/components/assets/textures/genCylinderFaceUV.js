import {Vector4} from "@babylonjs/core/Maths/math";

function genCylinderFaceUV(vects) {
  let faceUV = [];
  faceUV[0] =	new Vector4(vects[0], 0, 0, vects[1]);
  faceUV[1] =	new Vector4(vects[2], 0, 0, vects[3]);
  faceUV[2] = new Vector4(vects[4], 0, 0, vects[5]);

  return faceUV;
}

export {genCylinderFaceUV};
