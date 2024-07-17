const java = require('java');
const Utils = require('../../../utils');

async function characterReplacementDuringIndexing(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/characterReplacementDuringIndexing';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Enabling character replacements in the index settings
  const settings = new groupdocs.search.IndexSettings();
  settings.setUseCharacterReplacements(true);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Configuring character replacements
  // Deleting all existing character replacements from the dictionary
  index.getDictionaries().getCharacterReplacements().clear();
  // Creating new character replacements
  const count = 65536;
  const array = new Array(count);
  for (let i = 0; i < count; i++) {
    const text = String.fromCharCode(i);
    const character = java.newChar(text);
    const replacement = java.newChar(text.toLowerCase()[0]);
    array[i] = new groupdocs.search.CharacterReplacementPair(character, replacement);
  }
  const characterReplacements = java.newArray('com.groupdocs.search.dictionaries.CharacterReplacementPair', array);
  // Adding character replacements to the dictionary
  index.getDictionaries().getCharacterReplacements().addRange(characterReplacements);

  // Indexing documents from the specified folder
  index.add(documentFolder);

  // Searching in the index
  // Case-sensitive search is no longer possible for this index, since all characters are lowercase
  // By default, case-insensitive search is performed
  const query = 'Promotion';
  const options = new groupdocs.search.SearchOptions();
  options.setUseCaseSensitiveSearch(true);
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = characterReplacementDuringIndexing;
