const java = require('java');
const Utils = require('../../../utils');

async function homophoneSearch(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/homophoneSearch';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options object
  const options = new groupdocs.search.SearchOptions();
  options.setUseHomophoneSearch(true); // Enabling homophone search

  // Search for the word 'call'
  // In addition to the word 'call', the word 'caul' will also be found
  const query = 'call';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = homophoneSearch;
