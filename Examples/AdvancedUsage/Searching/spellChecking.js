const java = require('java');
const Utils = require('../../../utils');

async function spellChecking(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/spellChecking';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options instance
  const options = new groupdocs.search.SearchOptions();
  options.getSpellingCorrector().setEnabled(true); // Enabling the spelling correction
  options.getSpellingCorrector().setMaxMistakeCount(1); // Setting the maximum number of mistakes
  options.getSpellingCorrector().setOnlyBestResults(true); // Enabling the option for only the best results of the spelling correction

  // Search for the word "houseohld" containing a spelling error
  // The word "household" will be found that differs from the search query in two transposed letters
  const query = 'houseohld';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = spellChecking;
