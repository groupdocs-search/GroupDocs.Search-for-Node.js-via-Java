const java = require('java');
const Utils = require('../../../utils');

async function settingFuzzySearchAlgorithm(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/fuzzySearch/settingFuzzySearchAlgorithm';
  const documentsFolder = Utils.DocumentsPath;
  const query = 'nulla';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  const options = new groupdocs.search.SearchOptions();
  options.getFuzzySearch().setEnabled(true); // Enabling the fuzzy search
  options.getFuzzySearch().setFuzzyAlgorithm(new groupdocs.search.SimilarityLevel(0.8)); // Creating the fuzzy search algorithm
  // This function specifies 0 as the maximum number of mistakes for words from 1 to 4 characters.
  // It specifies 1 as the maximum number of mistakes for words from 5 to 9 characters.
  // It specifies 2 as the maximum number of mistakes for words from 10 to 14 characters. And so on.

  // Search in index
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

async function settingStepFunction(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/fuzzySearch/settingStepFunction';
  const documentsFolder = Utils.DocumentsPath;
  const query = 'nulla';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  const options = new groupdocs.search.SearchOptions();
  options.getFuzzySearch().setEnabled(true); // Enabling the fuzzy search
  options
    .getFuzzySearch()
    .setFuzzyAlgorithm(
      new groupdocs.search.TableDiscreteFunction(1, new groupdocs.search.Step(5, 2), new groupdocs.search.Step(8, 3)),
    ); // Creating the fuzzy search algorithm
  // This function specifies 1 as the maximum number of mistakes for words from 1 to 4 characters.
  // It specifies 2 as the maximum number of mistakes for words from 5 to 7 characters.
  // It specifies 3 as the maximum number of mistakes for words from 8 and more characters.

  // Search in index
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = { settingFuzzySearchAlgorithm, settingStepFunction };
