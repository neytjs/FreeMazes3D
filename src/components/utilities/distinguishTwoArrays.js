/*
Utility function that clones/shuffles two arrays from one original array of data.
It also makes sure that the items in both arrays are in totally different orders,
i.e. "distinguished" from each other.
*/
import cloneDeep from 'lodash.clonedeep';
import {arrayShuffler} from "./shuffler.js";

function distinguishTwoArrays(original_array, common_property) {
	let first_clone_and_shuffle = cloneDeep(original_array);
	first_clone_and_shuffle = arrayShuffler(original_array);
	let second_clone_and_shuffle = cloneDeep(original_array);
	second_clone_and_shuffle = arrayShuffler(original_array);

	let new_final_array = [];

	for (let i = 0, length = first_clone_and_shuffle.length; i < length; i++) {
	  for (let j = 0, jlength = second_clone_and_shuffle.length; j < jlength; j++) {
	    if (first_clone_and_shuffle[i][common_property] !== second_clone_and_shuffle[j][common_property]) {
	      new_final_array.push(second_clone_and_shuffle[j]);
	      second_clone_and_shuffle.splice(j, 1);
	      break;
	    } else if ((i === (length - 1)) && first_clone_and_shuffle[i][common_property] === second_clone_and_shuffle[j][common_property]) {
	      new_final_array.push(new_final_array[i - 1]);
	      new_final_array[i - 1] = second_clone_and_shuffle[j];
	      second_clone_and_shuffle.splice(j, 1);
	      break;
	    }
	  }
	}

	return {first_clone_and_shuffle: first_clone_and_shuffle, new_final_array: new_final_array};
}

export {distinguishTwoArrays};
