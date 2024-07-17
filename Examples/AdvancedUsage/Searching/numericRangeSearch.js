const java = require('java');
const Utils = require('../../../utils');

async function numericRangeSearch(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/numericRangeSearch';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search with text query
  const query1 = '400 ~~ 4000';
  const result1 = index.search(query1);

  // Search with object query
  const query2 = groupdocs.search.SearchQuery.createNumericRangeQuery(400, 4000);
  const result2 = index.search(query2);

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2.toString(), result2);
}

module.exports = numericRangeSearch;
