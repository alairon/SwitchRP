/* eslint no-unused-vars: 0 */

const fs = require('fs');

const gameJSONFile = 'app/titles.json';

const fsErrMsg = document.getElementById('fsErrMsg');

function removeSymbols(longName) {
  // Unicode Regex -- https://stackoverflow.com/a/25575009
  const unicodeSymbolsRegex = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]/g;
  let truncateName = longName;
  truncateName = truncateName.replace(unicodeSymbolsRegex, '').replace(/\s/g, '');
  return (truncateName);
}

/* newGameObj contains the name, client ID, and large image key to be inserted into the JSON file */
function writeToJSON(newGameObj) {
  const gameJSON = fs.readFileSync(gameJSONFile);
  const updatedJSON = JSON.parse(gameJSON);

  updatedJSON[removeSymbols(newGameObj.longName)] = newGameObj;

  fs.writeFile(gameJSONFile, JSON.stringify(updatedJSON, null, 2), (errException) => {
    if (errException !== null) {
      fsErrMsg.innerHTML = (`${errException}`);
    } else {
      document.getElementById('newGameName').value = '';
      document.getElementById('newGameID').value = '';
      document.getElementById('newLargeImageKey').value = '';
      fsErrMsg.classList.remove('text-danger');
      fsErrMsg.classList.add('text-success');
      fsErrMsg.innerHTML = (`Successfully added "${newGameObj.longName}"`);
    }
  });
}

function insertToJSON() {
  const newGameObj = {
    longName: document.getElementById('newGameName').value,
    clientAppID: document.getElementById('newGameID').value,
    largeImageKey: document.getElementById('newLargeImageKey').value,
  };

  writeToJSON(newGameObj);
}

function submitJSON() {
  fsErrMsg.classList.remove('text-success');
  fsErrMsg.classList.add('text-danger');

  if (document.getElementById('newGameName').value === '') {
    document.getElementById('fsErrMsg').innerHTML = ('The "Game Name" field cannot be empty');
  } else if (document.getElementById('newGameID').value === '') {
    document.getElementById('fsErrMsg').innerHTML = ('The "Game ID" field cannot be empty');
  } else if (document.getElementById('newLargeImageKey').value === '') {
    document.getElementById('fsErrMsg').innerHTML = ('The "Large Image Key" field cannot be empty');
  } else {
    insertToJSON();
  }
}
