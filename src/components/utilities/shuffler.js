function arrayShuffler(the_array) {
	Array.prototype.shuffle = function (old_index, new_index) {
		this.splice(new_index, 0, this.splice(old_index, 1)[0]);
		return this[new_index];
	};

  let shuffled_array = [];
  let array_length = the_array.length;
  let numbers = [];
  for (var i = 0; i < array_length; i++) {
    numbers.push(i);
  }
  let array_counter = array_length;
  let counter = 0;

  function randomize() {
    array_counter = array_counter - 1;
    counter = counter + 1;
    let random = Math.round(array_counter * Math.random());
    let num = numbers.shuffle(random, array_counter);
    shuffled_array.push(the_array[num]);
    if (counter < array_length) {
      randomize();
    }
  }
  randomize();

  return shuffled_array;
}

export {arrayShuffler};
