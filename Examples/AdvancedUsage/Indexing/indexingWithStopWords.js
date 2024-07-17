const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function indexingWithStopWords(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/indexingWithStopWords';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index settings with disabled using of stop words
  const settings = new groupdocs.search.IndexSettings();
  settings.setUseStopWords(false);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings, true);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Searching in the index
  // Now in the index it is possible to search for the stop word 'on'
  const query = 'on';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = indexingWithStopWords;
