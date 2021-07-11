import {arrayShuffler} from '../utilities/shuffler.js';

function selectEnvironment() {
  let environment = ["alpine", "winter", "wasteland"];
  environment = arrayShuffler(environment);
  return environment;
}

export {selectEnvironment};
