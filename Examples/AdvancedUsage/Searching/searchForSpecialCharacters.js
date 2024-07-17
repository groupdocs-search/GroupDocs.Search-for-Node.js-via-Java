const java = require('java');
const Utils = require('../../../utils');

async function searchForSpecialCharacters(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/searchForSpecialCharacters';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Setting character types
  const characters1 = java.newArray('char', ['&']);
  const characters2 = java.newArray('char', ['-']);
  index.getDictionaries().getAlphabet().setRange(characters1, groupdocs.search.CharacterType.Letter);
  index.getDictionaries().getAlphabet().setRange(characters2, groupdocs.search.CharacterType.Separator);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Defining a search query
  const word = 'rock&roll-music';

  // Replacing separators with the space characters
  let result = '';
  for (let i = 0; i < word.length; i++) {
    const character = word.charAt(i);
    const ch = java.newChar(character);
    const characterType = index.getDictionaries().getAlphabet().getCharacterType(ch);
    if (String(characterType) == String(groupdocs.search.CharacterType.Separator)) {
      result += ' ';
    } else {
      result += character;
    }
  }

  // Escaping special characters
  const specialCharacters = '():"&|!^~*?\\';
  for (let i = result.length - 1; i >= 0; i--) {
    const c = result.charAt(i);
    if (specialCharacters.indexOf(c) != -1) {
      result = result.slice(0, i) + '\\' + result.slice(i);
    }
  }

  let query = result.toString();
  if (query.includes(' ')) {
    query = '"' + query + '"';
  }

  // Searching
  const searchResult = index.search(query);

  Utils.traceResult(query, searchResult);
}

module.exports = searchForSpecialCharacters;
