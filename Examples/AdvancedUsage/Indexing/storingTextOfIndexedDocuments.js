const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function storingTextOfIndexedDocuments(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/storingTextOfIndexedDocuments';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index settings instance
  const settings = new groupdocs.search.IndexSettings();
  settings.setTextStorageSettings(new groupdocs.search.TextStorageSettings(groupdocs.search.Compression.High)); // Setting high compression ratio for the index text storage

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings, true);

  // Indexing documents
  index.add(documentsFolder);

  // Now the index contains the text of all indexed documents,
  // so the operations of getting the text of documents and highlighting occurrences are faster.

  // Searching
  const query = 'Lorem';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = storingTextOfIndexedDocuments;
