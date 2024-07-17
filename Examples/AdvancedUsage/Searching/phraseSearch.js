const java = require('java');
const Utils = require('../../../utils');

async function simplePhraseSearch(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/phraseSearch/simplePhraseSearch';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search for the phrase 'sollicitudin at ligula' in text form
  const query1 = '"sollicitudin at ligula"';
  const result1 = index.search(query1);

  // Search for the phrase 'sollicitudin at ligula' in object form
  const word1 = groupdocs.search.SearchQuery.createWordQuery('sollicitudin');
  const word2 = groupdocs.search.SearchQuery.createWordQuery('at');
  const word3 = groupdocs.search.SearchQuery.createWordQuery('ligula');
  const query2 = groupdocs.search.SearchQuery.createPhraseSearchQuery(word1, word2, word3);
  const result2 = index.search(query2);

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2.toString(), result2);
}

async function phraseSearchWithWildcards(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/phraseSearch/phraseSearchWithWildcards';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search for the phrase in text form
  const query1 = '"sollicitudin *0~~3 ligula"';
  const result1 = index.search(query1);

  // Search for the phrase in object form
  const word1 = groupdocs.search.SearchQuery.createWordQuery('sollicitudin');
  const wildcard2 = groupdocs.search.SearchQuery.createWildcardQuery(0, 3);
  const word3 = groupdocs.search.SearchQuery.createWordQuery('ligula');
  const query2 = groupdocs.search.SearchQuery.createPhraseSearchQuery(word1, wildcard2, word3);
  const result2 = index.search(query2);

  // The search can find the following phrases:
  // "sollicitudin of ligula"
  // "sollicitudin ligula"

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2.toString(), result2);
}

async function phraseSearchWithWildcards2(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/phraseSearch/phraseSearchWithWildcards2';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search for the phrase in text form
  const query1 = '"sollicitudin  *0~~3  ?(0~4)la"';
  const result1 = index.search(query1);

  // Search for the phrase in object form
  const word1 = groupdocs.search.SearchQuery.createWordQuery('sollicitudin');
  const wildcard2 = groupdocs.search.SearchQuery.createWildcardQuery(0, 3);
  const pattern = new groupdocs.search.WordPattern();
  pattern.appendWildcard(0, 4);
  pattern.appendString('la');
  const wordPattern3 = groupdocs.search.SearchQuery.createWordPatternQuery(pattern);
  const query2 = groupdocs.search.SearchQuery.createPhraseSearchQuery(word1, wildcard2, wordPattern3);
  const result2 = index.search(query2);

  // The search can find the following phrases:
  // "sollicitudin of ligula"
  // "sollicitudin ligula"
  // "sollicitudin, nulla"

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2.toString(), result2);
}

module.exports = { simplePhraseSearch, phraseSearchWithWildcards, phraseSearchWithWildcards2 };
