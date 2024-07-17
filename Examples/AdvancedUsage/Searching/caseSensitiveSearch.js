const java = require('java');
const Utils = require('../../../utils');

async function queryInTextForm(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/caseSensitiveSearch/queryInTextForm';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  const index = new groupdocs.search.Index(indexFolder); // Creating index in the specified folder
  index.add(documentsFolder); // Indexing documents from the specified folder

  const options = new groupdocs.search.SearchOptions();
  options.setUseCaseSensitiveSearch(true); // Enabling case sensitive search

  const query = 'Advantages';
  const result = index.search(query, options); // Searching

  Utils.traceResult(query, result);
}

async function queryInObjectForm(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/caseSensitiveSearch/queryInObjectForm';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  const index = new groupdocs.search.Index(indexFolder); // Creating index in the specified folder
  index.add(documentsFolder); // Indexing documents from the specified folder

  const options = new groupdocs.search.SearchOptions();
  options.setUseCaseSensitiveSearch(true); // Enabling case sensitive search

  const query = groupdocs.search.SearchQuery.createWordQuery('Advantages'); // Creating search query in object form

  const result = index.search(query, options); // Searching

  Utils.traceResult(query.toString(), result);
}

module.exports = { queryInTextForm, queryInObjectForm };
