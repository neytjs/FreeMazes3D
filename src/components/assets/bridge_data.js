import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';

let global_x = 0;
let global_z = 0;
let masterBridges = [];

function setBridgeGlobals(x, z) {
  global_x = x;
  global_z = z;
  masterBridges = [
    {
      portal1_x: (global_x + 20),
      portal1_z: (global_z + 20),
      portal2_x: (global_x + 20),
      portal2_z: (global_z - 20),
      conditional1: {
        final: false,
        bridge: "bridge7_Ob4"
      },
      conditional2: {
        final: false,
        bridge: "bridge3_Ob4"
      },
      conditional3: {
        final: false,
        bridge: "bridge1_Ob4"
      },
      conditional4: {
        final: false,
        bridge: "bridge5_Ob4"
      },
      conditional5: {
        final: false,
        bridge: "bridge12_Ob4"
      },
      conditional6: {
        final: false,
        bridge: "bridge4_Ob4"
      },
      conditional7: {
        final: false,
        bridge: "bridge2_Ob4"
      },
      conditional8: {
        final: true,
        bridge: ""
      },
      conditional9: {
        final: false,
        bridge: "bridge11_Ob4"
      },
      conditional10: {
        final: false,
        bridge: "bridge6_Ob4"
      },
      conditional11: {
        final: false,
        bridge: "bridge10_Ob4"
      },
      conditional12: {
        final: false,
        bridge: "bridge8_Ob4"
      }
    },
    {
      portal1_x: (global_x + 20),
      portal1_z: (global_z + 20),
      portal2_x: (global_x - 20),
      portal2_z: (global_z + 20),
      conditional1: {
        final: false,
        bridge: "bridge11_Ob4"
      },
      conditional2: {
        final: false,
        bridge: "bridge2_Ob4"
      },
      conditional3: {
        final: false,
        bridge: "bridge10_Ob4"
      },
      conditional4: {
        final: true,
        bridge: ""
      },
      conditional5: {
        final: false,
        bridge: "bridge5_Ob4"
      },
      conditional6: {
        final: false,
        bridge: "bridge1_Ob4"
      },
      conditional7: {
        final: false,
        bridge: "bridge7_Ob4"
      },
      conditional8: {
        final: false,
        bridge: "bridge12_Ob4"
      },
      conditional9: {
        final: false,
        bridge: "bridge3_Ob4"
      },
      conditional10: {
        final: false,
        bridge: "bridge8_Ob4"
      },
      conditional11: {
        final: false,
        bridge: "bridge6_Ob4"
      },
      conditional12: {
        final: false,
        bridge: "bridge9_Ob4"
      }
    },
    {
      portal1_x: (global_x - 20),
      portal1_z: (global_z + 20),
      portal2_x: (global_x - 20),
      portal2_z: (global_z - 20),
      conditional1: {
        final: true,
        bridge: ""
      },
      conditional2: {
        final: false,
        bridge: "bridge7_Ob4"
      },
      conditional3: {
        final: false,
        bridge: "bridge11_Ob4"
      },
      conditional4: {
        final: false,
        bridge: "bridge9_Ob4"
      },
      conditional5: {
        final: false,
        bridge: "bridge4_Ob4"
      },
      conditional6: {
        final: false,
        bridge: "bridge8_Ob4"
      },
      conditional7: {
        final: false,
        bridge: "bridge6_Ob4"
      },
      conditional8: {
        final: false,
        bridge: "bridge2_Ob4"
      },
      conditional9: {
        final: false,
        bridge: "bridge10_Ob4"
      },
      conditional10: {
        final: false,
        bridge: "bridge12_Ob4"
      },
      conditional11: {
        final: false,
        bridge: "bridge3_Ob4"
      },
      conditional12: {
        final: false,
        bridge: "bridge5_Ob4"
      }
    },
    {
      portal1_x: (global_x - 20),
      portal1_z: (global_z - 20),
      portal2_x: (global_x + 20),
      portal2_z: (global_z - 20),
      conditional1: {
        final: false,
        bridge: "bridge5_Ob4"
      },
      conditional2: {
        final: false,
        bridge: "bridge9_Ob4"
      },
      conditional3: {
        final: false,
        bridge: "bridge8_Ob4"
      },
      conditional4: {
        final: false,
        bridge: "bridge4_Ob4"
      },
      conditional5: {
        final: false,
        bridge: "bridge1_Ob4"
      },
      conditional6: {
        final: true,
        bridge: ""
      },
      conditional7: {
        final: false,
        bridge: "bridge7_Ob4"
      },
      conditional8: {
        final: false,
        bridge: "bridge11_Ob4"
      },
      conditional9: {
        final: false,
        bridge: "bridge3_Ob4"
      },
      conditional10: {
        final: false,
        bridge: "bridge12_Ob4"
      },
      conditional11: {
        final: false,
        bridge: "bridge2_Ob4"
      },
      conditional12: {
        final: false,
        bridge: "bridge10_Ob4"
      }
    }
  ];
}

function shuffleMasterBridges() {
  masterBridges = cloneDeep(masterBridges);
  masterBridges = arrayShuffler(masterBridges);
  masterBridges = masterBridges[0];
}

export {setBridgeGlobals, shuffleMasterBridges, masterBridges};
