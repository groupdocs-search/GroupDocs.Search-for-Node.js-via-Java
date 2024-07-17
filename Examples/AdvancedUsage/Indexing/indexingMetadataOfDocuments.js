const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function indexingMetadataOfDocuments(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/indexingMetadataOfDocuments';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an instance of index settings
  const settings = new groupdocs.search.IndexSettings();
  settings.setIndexType(groupdocs.search.IndexType.MetadataIndex); // Setting the index type

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Searching in the index
  const query = 'English';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = indexingMetadataOfDocuments;
