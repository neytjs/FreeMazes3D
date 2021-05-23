import {generateLadder} from "./objects/clutter/generateLadder.js";
import {generateBoxes} from "./objects/clutter/generateBoxes.js";
import {generatePottedTree} from "./objects/clutter/generatePottedTree.js";
import {generateDesk} from "./objects/clutter/generateDesk.js";
import {generateMachine} from "./objects/clutter/generateMachine.js";

function generateClutter(clutter_type, x, z, scene) {
  switch (clutter_type) {
    case "ladder":
      generateLadder(x, z, scene);
    break;
    case "boxes":
      generateBoxes(x, z, scene);
    break;
    case "potted_tree":
      generatePottedTree(x, z, scene);
    break;
    case "desk":
      generateDesk(x, z, scene);
    break;
    case "machine":
      generateMachine(x, z, scene);
    break;
  }
}

export {generateClutter};
