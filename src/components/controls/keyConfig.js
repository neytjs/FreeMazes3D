import {assignKeyCode} from "./assignKeyCode.js";
const fs = require('fs');

const default_data = {
  move_up: "w",
  move_left: "a",
  move_down: "s",
  move_right: "d",
  action_key: "e",
  show_fps: "f",
  toggle_left: "[",
  toggle_right: "]"
}

function writeConfig(filepath) {
  let json_data = JSON.stringify(default_data);
  fs.writeFile(filepath + "/config.json", json_data, function(err) {});
}

function readConfig(filepath) {
  return new Promise(resolve => {
    fs.readFile(filepath + "/config.json", 'utf8', function(err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          writeConfig(filepath);
        }
      }
    // make sure they provided valid JSON
      try {
        JSON.parse(data);
      } catch (e) {
        data = null;
      } finally {
  		  resolve(data);
      }
    });
  });
}

function handleKeyData(key_data, global_keys) {
  if (key_data) {
    let keys = JSON.parse(key_data);
    for (let key in keys) {
      let new_key = keys[key];
      keys[key] = assignKeyCode(keys[key].toLowerCase());
      for (let glob_key in global_keys) {
        if (key === glob_key) {
          global_keys[glob_key].new_key = new_key;
          global_keys[glob_key].code = keys[key];
        }
      }
    }
  }
}

export {readConfig, handleKeyData};
