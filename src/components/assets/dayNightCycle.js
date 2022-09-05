import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let times = {
  trans_ltod_1: 184000,
  trans_ltod_2: 188000,
  trans_ltod_3: 192000,
  trans_ltod_4: 196000,
  trans_ltod_5: 200000,
  trans_ltod_6: 204000,
  trans_ltod_7: 208000,
  trans_ltod_8: 212000,
  trans_ltod_9: 216000,
  trans_ltod_10: 220000,
  trans_ltod_11: 224000,
  trans_ltod_12: 228000,
  trans_ltod_13: 232000,
  trans_ltod_14: 236000,
  dark: 240000,
  trans_dtol_1: 484000,
  trans_dtol_2: 488000,
  trans_dtol_3: 492000,
  trans_dtol_4: 496000,
  trans_dtol_5: 500000,
  trans_dtol_6: 504000,
  trans_dtol_7: 508000,
  trans_dtol_8: 512000,
  trans_dtol_9: 516000,
  trans_dtol_10: 520000,
  trans_dtol_11: 524000,
  trans_dtol_12: 528000,
  trans_dtol_13: 532000,
  trans_dtol_14: 536000,
  light: 540000,
  restart: 720000
};
let sky_colors = [
  {
    brightest: new Color3(0.28, 0.81, 0.97),
    darkest: new Color3(0, 0, 0),
    transition1: new Color3(0.26, 0.77, 0.92),
    transition2: new Color3(0.24, 0.72, 0.87),
    transition3: new Color3(0.22, 0.68, 0.82),
    transition4: new Color3(0.2, 0.63, 0.76),
    transition5: new Color3(0.19, 0.59, 0.71),
    transition6: new Color3(0.17, 0.54, 0.65),
    transition7: new Color3(0.15, 0.49, 0.59),
    transition8: new Color3(0.13, 0.44, 0.52),
    transition9: new Color3(0.11, 0.37, 0.44),
    transition10: new Color3(0.09, 0.31, 0.37),
    transition11: new Color3(0.07, 0.24, 0.29),
    transition12: new Color3(0.06, 0.19, 0.23),
    transition13: new Color3(0.04, 0.13, 0.16),
    transition14: new Color3(0.03, 0.09, 0.11)
  },
  {
    brightest: new Color3(0.82, 0.85, 0.86),
    darkest: new Color3(0, 0, 0),
    transition1: new Color3(0.78, 0.8, 0.81),
    transition2: new Color3(0.72, 0.74, 0.75),
    transition3: new Color3(0.67, 0.69, 0.69),
    transition4: new Color3(0.61, 0.63, 0.63),
    transition5: new Color3(0.56, 0.57, 0.57),
    transition6: new Color3(0.49, 0.51, 0.51),
    transition7: new Color3(0.44, 0.45, 0.45),
    transition8: new Color3(0.39, 0.4, 0.4),
    transition9: new Color3(0.33, 0.34, 0.34),
    transition10: new Color3(0.27, 0.28, 0.28),
    transition11: new Color3(0.22, 0.22, 0.22),
    transition12: new Color3(0.17, 0.16, 0.16),
    transition13: new Color3(0.12, 0.11, 0.11),
    transition14: new Color3(0.07, 0.06, 0.06)
  },
  {
    brightest: new Color3(0.76, 0.24, 0.85),
    darkest: new Color3(0, 0, 0),
    transition1: new Color3(0.71, 0.22, 0.8),
    transition2: new Color3(0.66, 0.2, 0.74),
    transition3: new Color3(0.6, 0.18, 0.68),
    transition4: new Color3(0.55, 0.16, 0.62),
    transition5: new Color3(0.5, 0.14, 0.56),
    transition6: new Color3(0.45, 0.13, 0.51),
    transition7: new Color3(0.4, 0.11, 0.45),
    transition8: new Color3(0.34, 0.09, 0.38),
    transition9: new Color3(0.29, 0.08, 0.33),
    transition10: new Color3(0.24, 0.06, 0.27),
    transition11: new Color3(0.19, 0.05, 0.21),
    transition12: new Color3(0.14, 0.04, 0.16),
    transition13: new Color3(0.09, 0.03, 0.1),
    transition14: new Color3(0.05, 0.02, 0.05)
  },
  {
    brightest: new Color3(0.97, 0.36, 0.01),
    darkest: new Color3(0, 0, 0),
    transition1: new Color3(0.91, 0.34, 0.01),
    transition2: new Color3(0.85, 0.31, 0.01),
    transition3: new Color3(0.79, 0.28, 0.01),
    transition4: new Color3(0.71, 0.25, 0.01),
    transition5: new Color3(0.64, 0.24, 0.02),
    transition6: new Color3(0.57, 0.2, 0.01),
    transition7: new Color3(0.51, 0.18, 0.01),
    transition8: new Color3(0.41, 0.14, 0.01),
    transition9: new Color3(0.35, 0.11, 0.01),
    transition10: new Color3(0.28, 0.08, 0),
    transition11: new Color3(0.2, 0.06, 0),
    transition12: new Color3(0.14, 0.04, 0),
    transition13: new Color3(0.08, 0.02, 0),
    transition14: new Color3(0.04, 0.02, 0)
  }
];

function dayNightCycle(scene) {
  sky_colors = arrayShuffler(sky_colors);
  scene.clearColor = sky_colors[0].brightest;
  function runCycle() {
  // first darkening...
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition1;
    }, times.trans_ltod_1);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition2;
    }, times.trans_ltod_2);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition3;
    }, times.trans_ltod_3);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition4;
    }, times.trans_ltod_4);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition5;
    }, times.trans_ltod_5);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition6;
    }, times.trans_ltod_6);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition7;
    }, times.trans_ltod_7);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition8;
    }, times.trans_ltod_8);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition9;
    }, times.trans_ltod_9);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition10;
    }, times.trans_ltod_10);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition11;
    }, times.trans_ltod_11);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition12;
    }, times.trans_ltod_12);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition13;
    }, times.trans_ltod_13);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition14;
    }, times.trans_ltod_14);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].darkest;
    }, times.dark);
  // the brightening
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition14;
    }, times.trans_dtol_1);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition13;
    }, times.trans_dtol_2);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition12;
    }, times.trans_dtol_3);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition11;
    }, times.trans_dtol_4);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition10;
    }, times.trans_dtol_5);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition9;
    }, times.trans_dtol_6);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition8;
    }, times.trans_dtol_7);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition7;
    }, times.trans_dtol_8);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition6;
    }, times.trans_dtol_9);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition5;
    }, times.trans_dtol_10);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition4;
    }, times.trans_dtol_11);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition3;
    }, times.trans_dtol_12);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition2;
    }, times.trans_dtol_13);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].transition1;
    }, times.trans_dtol_14);
    setTimeout(() => {
      scene.clearColor = sky_colors[0].brightest;
    }, times.light);
  // final, finished bright phase 2
    setTimeout(() => {
      runCycle();
    }, times.restart);
  }
  runCycle();
}

export {dayNightCycle};
