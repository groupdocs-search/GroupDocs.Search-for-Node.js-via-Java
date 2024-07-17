const java = require('java');
const Utils = require('../../../utils');

async function synonymSearch(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/synonymSearch';
  const documentsFolder = Utils.DocumentsPath2;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options object
  const options = new groupdocs.search.SearchOptions();
  options.setUseSynonymSearch(true); // Enabling synonym search

  // Search for the word 'improve'
  // In addition to the word 'improve', the words 'better' will also be found
  const query = 'improve';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = synonymSearch;
