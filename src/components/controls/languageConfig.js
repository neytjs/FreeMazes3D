const fs = require('fs');

const default_data = {
  english: true
}

function writeConfig(filepath) {
  let json_data = JSON.stringify(default_data);
  fs.writeFile(filepath + "/language.json", json_data, function(err) {});
}

function readLanguageConfig(filepath) {
  return new Promise(resolve => {
    fs.readFile(filepath + "/language.json", 'utf8', function(err, data) {
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

function handleLanguageData(language_data, global_language) {
  if (language_data) {
    let counter = 0;
    let langs = JSON.parse(language_data);
    let language = "";
    for (let lang in langs) {
      if (langs[lang]) {
        counter = counter + 1;
        language = lang;
      }
    }
    if (counter === 1) {
      global_language.language = language;
    }
  }
}

export {readLanguageConfig, handleLanguageData};
