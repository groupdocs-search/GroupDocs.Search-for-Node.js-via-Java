const java = require('java');
const Utils = require('../../../utils');

async function characterReplacements(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/characterReplacements/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Enabling character replacements in the index settings
  const settings = new groupdocs.search.IndexSettings();
  settings.setUseCharacterReplacements(true);

  // Creating an index from in specified folder
  const index = new groupdocs.search.Index(indexFolder, settings, true);

  if (index.getDictionaries().getCharacterReplacements().getCount() > 0) {
    // Deleting all character replacements from the dictionary
    index.getDictionaries().getCharacterReplacements().clear();
  }

  // Adding character replacement
  const range = java.newArray('com.groupdocs.search.dictionaries.CharacterReplacementPair', [
    new groupdocs.search.CharacterReplacementPair(java.newChar('-'), java.newChar('~')),
  ]);
  index.getDictionaries().getCharacterReplacements().addRange(range);

  if (index.getDictionaries().getCharacterReplacements().contains(java.newChar('-'))) {
    const replacement = index.getDictionaries().getCharacterReplacements().getReplacement(java.newChar('-'));
    console.log('The replacement for hyphen is ' + replacement);

    // Deleting the hyphen character replacement from the dictionary
    index
      .getDictionaries()
      .getCharacterReplacements()
      .removeRange(java.newArray('char', ['-']));
  }

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

  // Export character replacements to a file
  const fileName =
    Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/characterReplacements/CharacterReplacements.dat';
  index.getDictionaries().getCharacterReplacements().exportDictionary(fileName);

  // Import character replacements from a file
  index.getDictionaries().getCharacterReplacements().importDictionary(fileName);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search in the index
  const query = 'Elliot';
  const options = new groupdocs.search.SearchOptions();
  options.setUseCaseSensitiveSearch(true);
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = characterReplacements;
