const java = require('java');
const Utils = require('../../../utils');

async function searchByChunks(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/searchByChunks';
  const documentsFolder1 = Utils.DocumentsPath;
  const documentsFolder2 = Utils.DocumentsPath2;
  const documentsFolder3 = Utils.DocumentsPath3;
  const query = 'invitation';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder1);
  index.add(documentsFolder2);
  index.add(documentsFolder3);

  // Creating a search options instance
  const options = new groupdocs.search.SearchOptions();
  options.setChunkSearch(true); // Enabling the search by chunks

  // Starting the search by chunks
  let result = index.search(query, options);
  console.log('Document count: ' + result.getDocumentCount());
  console.log('Occurrence count: ' + result.getOccurrenceCount());

  // Continuing the search by chunks
  while (result.getNextChunkSearchToken() != null) {
    result = index.searchNext(result.getNextChunkSearchToken());
    console.log();
    console.log('Document count: ' + result.getDocumentCount());
    console.log('Occurrence count: ' + result.getOccurrenceCount());
  }
}

module.exports = searchByChunks;
