import {Vector4} from "@babylonjs/core/Maths/math";

function genCubeFaceUV(vects) {
  let faceUV = [];
  faceUV[0] =	new Vector4(vects[0], 0, 0, vects[1]);
  faceUV[1] =	new Vector4(vects[2], 0, 0, vects[3]);
  faceUV[2] = new Vector4(vects[4], 0, 0, vects[5]);
  faceUV[3] = new Vector4(vects[6], 0, 0, vects[7]);
  faceUV[4] = new Vector4(vects[8], 0, 0, vects[9]); // top
  faceUV[5] = new Vector4(vects[10], 0, 0, vects[11]); // bottom

  return faceUV;
}

export {genCubeFaceUV};
