const fs = require('fs');

const gameJSONFile = '../titles.json';

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

  fs.writeFile('test.json', JSON.stringify(updatedJSON, null, 2), (errException) => {
    if (errException !== null) {
      console.log(`${errException}`);
    }
  });
}

writeToJSON('../titles.json');
