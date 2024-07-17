const Utils = require('../../utils');

async function helloWorld(groupdocs) {
  const indexFolder = Utils.OutputPath + 'GettingStarted/HelloWorld';
  const documentsFolder = Utils.DocumentsPath;
  const query = "Lorem";

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Searching in the index
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = helloWorld;
