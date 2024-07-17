const java = require('java');
const Utils = require('../../../utils');

async function queriesInTextAndObjectForm(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/queriesInTextAndObjectForm';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating index
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing
  index.add(documentsFolder);

  // Creating subquery 1 - simple word query
  const subquery1 = groupdocs.search.SearchQuery.createWordQuery('future');
  subquery1.setSearchOptions(new groupdocs.search.SearchOptions()); // Setting search options only for subquery 1
  subquery1.getSearchOptions().getFuzzySearch().setEnabled(true);
  subquery1.getSearchOptions().getFuzzySearch().setFuzzyAlgorithm(new groupdocs.search.TableDiscreteFunction(3)); // The maximum number of differences is 3

  // Creating subquery 2 - wildcard query
  const subquery2 = groupdocs.search.SearchQuery.createWildcardQuery(1);

  // Creating subquery 3 - regular expression query
  const subquery3 = groupdocs.search.SearchQuery.createRegexQuery('(.)\\1');

  // Combining subqueries into one query - phrase search query
  const query = groupdocs.search.SearchQuery.createPhraseSearchQuery(subquery1, subquery2, subquery3);

  // Creating overall search options with increased capacity of occurrences
  const options = new groupdocs.search.SearchOptions();
  options.setMaxOccurrenceCountPerTerm(1000000);
  options.setMaxTotalOccurrenceCount(10000000);

  // Searching
  const result = index.search(query, options);

  // The result may contain the following word sequences:
  // futile * blessed
  // father * excellent
  // tyre * assyria
  // return * 229

  Utils.traceResult(query.toString(), result);
}

module.exports = queriesInTextAndObjectForm;
