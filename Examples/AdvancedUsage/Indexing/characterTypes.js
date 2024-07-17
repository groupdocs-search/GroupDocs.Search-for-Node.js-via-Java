const java = require('java');
const Utils = require('../../../utils');

async function regularCharacters(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/CharacterTypes/regularCharacters';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Configuring the alphabet
  // Setting the separator type for all characters in the alphabet
  index.getDictionaries().getAlphabet().clear();
  // Creating a list of letter characters
  let sb = '';
  for (let i = 0x0030; i <= 0x0039; i++) {
    sb += String.fromCharCode(i); // Digits
  }
  for (let i = 0x0041; i <= 0x005a; i++) {
    sb += String.fromCharCode(i); // Latin capital letters
  }
  sb += String.fromCharCode(0x005f); // Low line
  for (let i = 0x0061; i <= 0x007a; i++) {
    sb += String.fromCharCode(i); // Latin small letters
  }
  // Setting the type of characters in the alphabet
  const characters = java.newArray('char', sb.split(''));
  index.getDictionaries().getAlphabet().setRange(characters, groupdocs.search.CharacterType.Letter);

  // Indexing documents from the specified folder
  index.add(documentFolder);

  // Searching in the index
  const query = 'travelling';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

async function blendedCharacters(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/CharacterTypes/blendedCharacters';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Setting hyphen character type to blended
  const characters = java.newArray('char', '-'.split(''));
  index.getDictionaries().getAlphabet().setRange(characters, groupdocs.search.CharacterType.Blended);

  // Indexing documents from the specified folder
  index.add(documentFolder);

  // Searching in the index
  const query1 = 'Elliot-Murray-Kynynmound';
  const result1 = index.search(query1);
  const query2 = 'Elliot';
  const result2 = index.search(query2);
  const query3 = 'Murray';
  const result3 = index.search(query3);
  const query4 = 'Kynynmound';
  const result4 = index.search(query4);

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2, result2);
  Utils.traceResult(query3, result3);
  Utils.traceResult(query4, result4);
}

module.exports = { regularCharacters, blendedCharacters };
