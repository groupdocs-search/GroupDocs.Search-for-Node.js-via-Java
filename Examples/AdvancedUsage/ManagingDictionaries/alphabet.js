const java = require('java');
const Utils = require('../../../utils');

async function alphabet(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/alphabet/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating or opening an index from the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Export the alphabet to a file
  const fileName = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/alphabet/Alphabet.dat';
  index.getDictionaries().getAlphabet().exportDictionary(fileName);

  if (index.getDictionaries().getAlphabet().getCount() > 0) {
    // Setting a type of all characters to Separator
    index.getDictionaries().getAlphabet().clear();
  }

  // Import the alphabet from a file
  index.getDictionaries().getAlphabet().importDictionary(fileName);

  if (
    String(index.getDictionaries().getAlphabet().getCharacterType(java.newChar('-'))) !=
    String(groupdocs.search.CharacterType.Blended)
  ) {
    // Setting a type of hyphen character to Blended
    index
      .getDictionaries()
      .getAlphabet()
      .setRange(java.newArray('char', ['-']), groupdocs.search.CharacterType.Blended);
  }

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search in the index
  const query = 'Elliot-Murray-Kynynmound';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = alphabet;
