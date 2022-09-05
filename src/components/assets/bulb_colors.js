import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from '../utilities/shuffler.js';
import {Color3} from "@babylonjs/core/Maths/math";

let bulb_colors = [
  new Color3(0.02, 0.45, 0),
  new Color3(0, 0.07, 1),
  new Color3(0.66, 0.01, 0.01),
  new Color3(0.39, 0, 0.55),
  new Color3(0.5, 0.5, 0)
];
let bulb1colors = [];
bulb1colors = cloneDeep(bulb_colors);
let bulb2colors = [];
bulb2colors = cloneDeep(bulb_colors);
let bulb3colors = [];
bulb3colors = cloneDeep(bulb_colors);
let bulb4colors = [];
bulb4colors = cloneDeep(bulb_colors);
let bulb_master_color = [];
bulb_master_color = cloneDeep(bulb_colors);

// now test to make sure that element 0 does not = bulb_master_color
function masterColorTest(colors, master_color, num) {
  let test_colors = JSON.stringify(colors[0]);
  let test_master_color = JSON.stringify(master_color[num]);
  if (test_colors === test_master_color) {
    let element_zero = colors[0];
    let element_one = colors[1];
    colors[0] = element_one;
    colors[1] = element_zero;
    return colors;
  } else {
    return colors;
  }
}

function colorRowTest() {
	for (let i = 0, length = bulb1colors.length; i < length; i++) {
		for (let j = 0, jlength = bulb2colors.length; j < jlength; j++) {
			for (let k = 0, klength = bulb3colors.length; k < klength; k++) {
				for (let l = 0, llength = bulb4colors.length; l < llength; l++) {
					if ((i === j && j === k && k === l )) {
						if (JSON.stringify(bulb_master_color[0]) === JSON.stringify(bulb1colors[i]) && JSON.stringify(bulb_master_color[1]) === JSON.stringify(bulb2colors[j]) && JSON.stringify(bulb_master_color[2]) === JSON.stringify(bulb3colors[k]) && JSON.stringify(bulb_master_color[3]) === JSON.stringify(bulb4colors[l])) {
							function colorSwap(new_elm) {
								function b1Swap(new_elm) {
									let bulb1Oldcs = bulb1colors[new_elm];
									let bulb1Newcs = bulb1colors[i];
									bulb1colors[new_elm] = bulb1Newcs;
									bulb1colors[i] = bulb1Oldcs;
								}
								function b2Swap(new_elm) {
									let bulb2Oldcs = bulb2colors[new_elm];
									let bulb2Newcs = bulb2colors[i];
									bulb2colors[new_elm] = bulb2Newcs;
									bulb2colors[i] = bulb2Oldcs;
								}
								function b3Swap(new_elm) {
									let bulb3Oldcs = bulb3colors[new_elm];
									let bulb3Newcs = bulb3colors[i];
									bulb3colors[new_elm] = bulb3Newcs;
									bulb3colors[i] = bulb3Oldcs;
								}
								function b4Swap(new_elm) {
									let bulb4Oldcs = bulb4colors[new_elm];
									let bulb4Newcs = bulb4colors[i];
									bulb4colors[new_elm] = bulb4Newcs;
									bulb4colors[i] = bulb4Oldcs;
								}
								let rand = Math.ceil(Math.random() * 6);
								switch (rand) {
									case 1:
										b1Swap(new_elm);
										b3Swap(new_elm);
									break;
									case 2:
										b2Swap(new_elm);
										b4Swap(new_elm);
									break;
									case 3:
										b1Swap(new_elm);
										b4Swap(new_elm);
									break;
									case 4:
										b2Swap(new_elm);
										b3Swap(new_elm);
									break;
									case 5:
										b1Swap(new_elm);
										b2Swap(new_elm);
									break;
									case 6:
										b3Swap(new_elm);
										b4Swap(new_elm);
									break;
								}
							}
						// for the final row
							if (i === (length - 1)) {
								let new_elm = length - 2;
								colorSwap(new_elm);
							} else {
								let new_elm = i + 1;
								colorSwap(new_elm);
							}
						}
					}
				}
			}
		}
	}
}

function cloneAndShuffleMasterColor() {
  bulb_master_color = arrayShuffler(bulb_master_color);
  bulb1colors = arrayShuffler(bulb1colors);
  bulb2colors = arrayShuffler(bulb2colors);
  bulb3colors = arrayShuffler(bulb3colors);
  bulb4colors = arrayShuffler(bulb4colors);
  bulb1colors = masterColorTest(bulb1colors, bulb_master_color, 0);
  bulb2colors = masterColorTest(bulb2colors, bulb_master_color, 1);
  bulb3colors = masterColorTest(bulb3colors, bulb_master_color, 2);
  bulb4colors = masterColorTest(bulb4colors, bulb_master_color, 3);
	colorRowTest();
}

function getBulbMasterColor() {
  return bulb_master_color;
}

function getBulb1colors(elm) {
  return bulb1colors[elm];
}

function getBulb2colors(elm) {
  return bulb2colors[elm];
}

function getBulb3colors(elm) {
  return bulb3colors[elm];
}

function getBulb4colors(elm) {
  return bulb4colors[elm];
}

export {bulb_colors, getBulbMasterColor, getBulb1colors, getBulb2colors, getBulb3colors, getBulb4colors, cloneAndShuffleMasterColor};
