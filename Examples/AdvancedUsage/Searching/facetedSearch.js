const java = require('java');
const Utils = require('../../../utils');

async function simpleFacetedSearch(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/facetedSearch/simpleFacetedSearch';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search in the content field with text query
  const query1 = 'content: Pellentesque';
  const result1 = index.search(query1);

  // Search in the content field with object query
  const wordQuery = groupdocs.search.SearchQuery.createWordQuery('Pellentesque');
  const fieldQuery = groupdocs.search.SearchQuery.createFieldQuery(
    groupdocs.search.CommonFieldNames.Content,
    wordQuery,
  );

  const result2 = index.search(fieldQuery);
  Utils.traceResult(query1, result1);
  Utils.traceResult(fieldQuery.toString(), result2);
}

async function complexQuery(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/facetedSearch/complexQuery';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search with text query
  const query1 = '(filename: (lorem AND ipsum)) OR (content: ("lectus eu aliquam" OR "dignissim turpis"))';
  const result1 = index.search(query1);

  // Search with object query
  const word6Query = groupdocs.search.SearchQuery.createWordQuery('lorem');
  const word7Query = groupdocs.search.SearchQuery.createWordQuery('ipsum');
  const andQuery = groupdocs.search.SearchQuery.createAndQuery(word6Query, word7Query);
  const filenameQuery = groupdocs.search.SearchQuery.createFieldQuery(
    groupdocs.search.CommonFieldNames.FileName,
    andQuery,
  );

  const word1Query = groupdocs.search.SearchQuery.createWordQuery('lectus');
  const word2Query = groupdocs.search.SearchQuery.createWordQuery('eu');
  const word3Query = groupdocs.search.SearchQuery.createWordQuery('aliquam');
  const word4Query = groupdocs.search.SearchQuery.createWordQuery('dignissim');
  const word5Query = groupdocs.search.SearchQuery.createWordQuery('turpis');

  const phrase1Query = groupdocs.search.SearchQuery.createPhraseSearchQuery(word1Query, word2Query, word3Query);
  const phrase2Query = groupdocs.search.SearchQuery.createPhraseSearchQuery(word4Query, word5Query);
  const orQuery = groupdocs.search.SearchQuery.createOrQuery(phrase1Query, phrase2Query);
  const contentQuery = groupdocs.search.SearchQuery.createFieldQuery(
    groupdocs.search.CommonFieldNames.Content,
    orQuery,
  );

  const rootQuery = groupdocs.search.SearchQuery.createOrQuery(filenameQuery, contentQuery);
  const result2 = index.search(rootQuery);

  Utils.traceResult(query1, result1);
  Utils.traceResult(rootQuery.toString(), result2);
}

async function standardFieldNames(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/facetedSearch/standardFieldNames';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search in the content field with text query
  const query1 = groupdocs.search.WordsFieldNames.Company + ": Dycum";
  const result1 = index.search(query1);

  // Search in the content field with object query
  const wordQuery = groupdocs.search.SearchQuery.createWordQuery("Dycum");
  const fieldQuery = groupdocs.search.SearchQuery.createFieldQuery(groupdocs.search.WordsFieldNames.Company, wordQuery);
  const result2 = index.search(fieldQuery);

  Utils.traceResult(query1, result1);
  Utils.traceResult(fieldQuery.toString(), result2);
}

module.exports = { simpleFacetedSearch, complexQuery, standardFieldNames };
