const java = require('java');
const Utils = require('../../../utils');

async function searchResults(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/searchResults';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentFolder);

  // Creating search options
  const options = new groupdocs.search.SearchOptions();
  options.getFuzzySearch().setEnabled(true); // Enabling the fuzzy search
  options.getFuzzySearch().setFuzzyAlgorithm(new groupdocs.search.TableDiscreteFunction(3)); // Setting the maximum number of differences to 3

  // Search for documents containing the word 'water' or the phrase 'Lorem ipsum'
  const query = 'water OR "Lorem ipsum"';
  const result = index.search(query, options);

  // Printing the result
  console.log('Documents: ' + result.getDocumentCount());
  console.log('Total occurrences: ' + result.getOccurrenceCount());
  for (let i = 0; i < result.getDocumentCount(); i++) {
    const document = result.getFoundDocument(i);
    console.log('\tDocument: ' + document.getDocumentInfo().getFilePath());
    console.log('\tOccurrences: ' + document.getOccurrenceCount());
    for (const field of document.getFoundFields()) {
      console.log('\t\tField: ' + field.getFieldName());
      console.log('\t\tOccurrences: ' + document.getOccurrenceCount());
      // Printing found terms
      if (field.getTerms() != null) {
        for (let k = 0; k < field.getTerms().length; k++) {
          console.log('\t\t\t' + field.getTerms()[k] + ' - ' + field.getTermsOccurrences()[k]);
        }
      }
      // Printing found phrases
      if (field.getTermSequences() != null) {
        for (let k = 0; k < field.getTermSequences().length; k++) {
          const terms = field.getTermSequences()[k];
          let sequence = '';
          for (const term of terms) {
            sequence += term + ' ';
          }
          console.log('\t\t\t' + sequence + ' - ' + field.getTermSequencesOccurrences()[k]);
        }
      }
    }
  }
}

module.exports = searchResults;
