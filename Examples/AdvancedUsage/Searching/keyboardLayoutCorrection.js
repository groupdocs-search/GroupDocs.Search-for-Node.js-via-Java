const java = require('java');
const Utils = require('../../../utils');

async function keyboardLayoutCorrection(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/keyboardLayoutCorrection';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options object
  const options = new groupdocs.search.SearchOptions();
  options.getKeyboardLayoutCorrector().setEnabled(true); // Enabling keyboard layout correction

  // Search for word 'ызщкеыьфт' gives documents containing word 'sportsman'
  const query = 'ызщкеыьфт';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = keyboardLayoutCorrection;
