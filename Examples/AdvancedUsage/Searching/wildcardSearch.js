const java = require('java');
const Utils = require('../../../utils');

async function wildcardSearchText(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/wildcardSearchText';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search in the index
  const query1 = 'm???is';
  const result1 = index.search(query1); // Search for 'mauris', 'mollis', 'mattis', 'magnis', etc.
  const query2 = 'pri?(1~7)';
  const result2 = index.search(query2); // Search for 'private', 'principles', 'principle', etc.

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2, result2);
}

async function wildcardSearchObject(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/wildcardSearchObject';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search with pattern "m???is"
  // Search for 'mauris', 'mollis', 'mattis', 'magnis', etc.
  const pattern1 = new groupdocs.search.WordPattern();
  pattern1.appendString('m');
  pattern1.appendOneCharacterWildcard();
  pattern1.appendOneCharacterWildcard();
  pattern1.appendOneCharacterWildcard();
  pattern1.appendString('is');
  const query1 = groupdocs.search.SearchQuery.createWordPatternQuery(pattern1);
  const result1 = index.search(query1);

  // Search with pattern "pri?(1~7)"
  // Search for 'private', 'principles', 'principle', etc.
  const pattern2 = new groupdocs.search.WordPattern();
  pattern2.appendString('pri');
  pattern2.appendWildcard(1, 7);
  const query2 = groupdocs.search.SearchQuery.createWordPatternQuery(pattern2);
  const result2 = index.search(query2);

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2, result2);
}

module.exports = { wildcardSearchText, wildcardSearchObject };
