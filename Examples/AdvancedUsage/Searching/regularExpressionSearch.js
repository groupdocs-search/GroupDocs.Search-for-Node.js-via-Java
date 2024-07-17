const java = require('java');
const Utils = require('../../../utils');

async function regularExpressionSearch(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/regularExpressionSearch';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search for the phrase in text form
  const query1 = '^^(.)\\1{1,}'; // The first caret character at the beginning indicates that this is a regular expression search query
  const result1 = index.search(query1); // Search for two or more identical characters at the beginning of a word

  // Search for the phrase in object form
  const query2 = groupdocs.search.SearchQuery.createRegexQuery('^(.)\\1{1,}'); // Search for two or more identical characters at the beginning of a word
  const result2 = index.search(query2);

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2.toString(), result2);
}

module.exports = regularExpressionSearch;
