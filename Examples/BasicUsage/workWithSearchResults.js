const path = require('path');
const Utils = require('../../utils');

async function obtainSearchResultInformation(groupdocs) {
  const indexFolder = Utils.OutputPath + 'BasicUsage/workWithSearchResults/obtainSearchResultInformation';
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

  // Search for documents containing the word 'favourable' or the phrase 'ipsum dolor'
  const result = index.search('favourable OR "ipsum dolor"', options);

  // Printing the result
  console.log();
  console.log('Documents: ' + result.getDocumentCount());
  console.log('Total occurrences: ' + result.getOccurrenceCount());
  for (let i = 0; i < result.getDocumentCount(); i++) {
    const document = result.getFoundDocument(i);
    console.log('\tDocument: ' + document.getDocumentInfo().getFilePath());
    console.log('\tOccurrences: ' + document.getOccurrenceCount());
    const fields = document.getFoundFields();
    for (let j = 0; j < fields.length; j++) {
      const field = fields[j];
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
          for (let m = 0; m < terms.length; m++) {
            const term = terms[m];
            sequence += term + ' ';
          }
          console.log('\t\t\t' + sequence + ' - ' + field.getTermSequencesOccurrences()[k]);
        }
      }
    }
  }
}

async function highlightSearchResults(groupdocs) {
  const indexFolder = Utils.OutputPath + 'BasicUsage/workWithSearchResults/highlightSearchResults';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index settings instance
  const settings = new groupdocs.search.IndexSettings();
  settings.setTextStorageSettings(new groupdocs.search.TextStorageSettings(groupdocs.search.Compression.High)); // Enabling the storage of extracted text in the index

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents from the specified folder
  index.add(documentFolder);

  // Search for the word 'solicitude'
  const result = index.search('solicitude');

  // Highlighting occurrences in text
  if (result.getDocumentCount() > 0) {
    const document = result.getFoundDocument(0); // Getting the first found document
    const localPath = Utils.OutputPath + 'BasicUsage/WorkWithSearchResults/Highlighted.html';
    const outputAdapter = new groupdocs.search.FileOutputAdapter(groupdocs.search.OutputFormat.Html, localPath); // Creating an output adapter to the file
    const highlighter = new groupdocs.search.DocumentHighlighter(outputAdapter); // Creating the highlighter object
    index.highlight(document, highlighter); // Generating HTML formatted text with highlighted occurrences

    console.log();
    console.log('Generated HTML file can be opened with Internet browser.');
    console.log('The file can be found by the following path:');
    console.log(path.resolve(localPath).toString());
  }
}

module.exports = { obtainSearchResultInformation, highlightSearchResults };
