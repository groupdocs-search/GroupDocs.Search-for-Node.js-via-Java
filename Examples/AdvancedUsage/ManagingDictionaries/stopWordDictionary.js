const java = require('java');
const Utils = require('../../../utils');

async function stopWordDictionary(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/stopWordDictionary/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index from in specified folder
  const index = new groupdocs.search.Index(indexFolder);

  if (index.getDictionaries().getStopWordDictionary().getCount() > 0) {
    // Removing all words from the dictionary
    index.getDictionaries().getStopWordDictionary().clear();
  }

  // Adding stop words to the dictionary
  const words = java.newArray('java.lang.String', ['a', 'an', 'the', 'but', 'by']);
  index.getDictionaries().getStopWordDictionary().addRange(words);

  if (
    index.getDictionaries().getStopWordDictionary().contains('but') &&
    index.getDictionaries().getStopWordDictionary().contains('by')
  ) {
    // Removing words from the dictionary
    index
      .getDictionaries()
      .getStopWordDictionary()
      .removeRange(java.newArray('java.lang.String', ['but', 'by']));
  }

  // Export words to a file
  const fileName = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/stopWordDictionary/Words.txt';
  index.getDictionaries().getStopWordDictionary().exportDictionary(fileName);

  // Import words from a file
  index.getDictionaries().getStopWordDictionary().importDictionary(fileName);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search in the index
  const query = 'but';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = stopWordDictionary;
