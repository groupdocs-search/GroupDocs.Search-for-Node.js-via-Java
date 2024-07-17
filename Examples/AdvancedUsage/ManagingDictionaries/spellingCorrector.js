const java = require('java');
const Utils = require('../../../utils');

async function spellingCorrector(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/spellingCorrector/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index from in specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  if (index.getDictionaries().getSpellingCorrector().getCount() > 0) {
    // Removing all words from the dictionary
    index.getDictionaries().getSpellingCorrector().clear();
  }

  // Adding words to the dictionary
  const words = java.newArray('java.lang.String', ['achieve', 'accomplish', 'attain', 'expression', 'reach']);
  index.getDictionaries().getSpellingCorrector().addRange(words);

  // Export words to a file
  const fileName = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/spellingCorrector/Words.txt';
  index.getDictionaries().getSpellingCorrector().exportDictionary(fileName);

  // Import words from a file
  index.getDictionaries().getSpellingCorrector().importDictionary(fileName);

  // Search in the index
  const query = 'experssino';
  const options = new groupdocs.search.SearchOptions();
  options.getSpellingCorrector().setEnabled(true);
  options.getSpellingCorrector().setMaxMistakeCount(2);
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = spellingCorrector;
