const java = require('java');
const Utils = require('../../../utils');

async function searchForDifferentWordForms(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/searchForDifferentWordForms';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options instance
  const options = new groupdocs.search.SearchOptions();
  options.setUseWordFormsSearch(true); // Enabling search for word forms

  // Searching in the index
  const query = 'wished';
  const result = index.search(query, options);

  // The following words can be found:
  // wished
  // wish

  Utils.traceResult(query, result);
}

module.exports = searchForDifferentWordForms;
