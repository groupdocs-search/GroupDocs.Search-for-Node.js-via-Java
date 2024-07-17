const java = require('java');
const Utils = require('../../../utils');

async function operatorAnd(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/booleanSearch/operatorAnd';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search with text query
  const query1 = 'comfort AND promotion';
  const result1 = index.search(query1);

  // Search with object query
  const wordQuery1 = groupdocs.search.SearchQuery.createWordQuery('comfort');
  const wordQuery2 = groupdocs.search.SearchQuery.createWordQuery('promotion');
  const andQuery = groupdocs.search.SearchQuery.createAndQuery(wordQuery1, wordQuery2);
  const result2 = index.search(andQuery);

  Utils.traceResult(query1, result1);
  Utils.traceResult(andQuery.toString(), result2);
}

async function operatorOr(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/booleanSearch/operatorOr';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search with text query
  const query1 = 'comfort OR neque';
  const result1 = index.search(query1);

  // Search with object query
  const wordQuery1 = groupdocs.search.SearchQuery.createWordQuery('comfort');
  const wordQuery2 = groupdocs.search.SearchQuery.createWordQuery('neque');
  const orQuery = groupdocs.search.SearchQuery.createOrQuery(wordQuery1, wordQuery2);
  const result2 = index.search(orQuery);

  Utils.traceResult(query1, result1);
  Utils.traceResult(orQuery.toString(), result2);
}

async function operatorNot(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/booleanSearch/operatorNot';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search with text query
  const query1 = 'sportsman AND NOT Kynynmound';
  const result1 = index.search(query1);

  // Search with object query
  const wordQuery1 = groupdocs.search.SearchQuery.createWordQuery('sportsman');
  const wordQuery2 = groupdocs.search.SearchQuery.createWordQuery('Kynynmound');
  const notQuery = groupdocs.search.SearchQuery.createNotQuery(wordQuery2);
  const andQuery = groupdocs.search.SearchQuery.createAndQuery(wordQuery1, notQuery);
  const result2 = index.search(andQuery);

  Utils.traceResult(query1, result1);
  Utils.traceResult(andQuery.toString(), result2);
}

async function complexQueries(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/booleanSearch/complexQueries';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search with text query
  const query1 = '(sportsman AND favourable) AND NOT (Kynynmound OR Murray)';
  const result1 = index.search(query1);

  // Search with object query
  const word1Query = groupdocs.search.SearchQuery.createWordQuery('sportsman');
  const word2Query = groupdocs.search.SearchQuery.createWordQuery('favourable');
  const andQuery = groupdocs.search.SearchQuery.createAndQuery(word1Query, word2Query);

  const word3Query = groupdocs.search.SearchQuery.createWordQuery('Kynynmound');
  const word4Query = groupdocs.search.SearchQuery.createWordQuery('Murray');
  const orQuery = groupdocs.search.SearchQuery.createOrQuery(word3Query, word4Query);
  const notQuery = groupdocs.search.SearchQuery.createNotQuery(orQuery);

  const rootQuery = groupdocs.search.SearchQuery.createAndQuery(andQuery, notQuery);
  const result2 = index.search(rootQuery);

  Utils.traceResult(query1, result1);
  Utils.traceResult(rootQuery.toString(), result2);
}

module.exports = { operatorAnd, operatorOr, operatorNot, complexQueries };
