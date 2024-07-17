const fs = require('fs');
const java = require('java');
const Utils = require('../../../utils');

async function highlightingInEntireDocument(groupdocs) {
  const indexFolder =
    Utils.OutputPath + 'AdvancedUsage/Searching/highlightingSearchResults/highlightingInEntireDocument';
  const documentFolder = Utils.ArchivesPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index settings instance
  const settings = new groupdocs.search.IndexSettings();
  settings.setTextStorageSettings(new groupdocs.search.TextStorageSettings(groupdocs.search.Compression.High)); // Enabling the storage of extracted text in the index

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents from the specified folder
  index.add(documentFolder);

  // Search for the word 'ipsum'
  const result = index.search('ipsum');

  // Highlighting occurrences in the text
  if (result.getDocumentCount() > 0) {
    {
      const document = result.getFoundDocument(0); // Getting the first found document
      const outputAdapter = new groupdocs.search.FileOutputAdapter(
        groupdocs.search.OutputFormat.Html,
        Utils.OutputPath + 'AdvancedUsage/Searching/highlightingSearchResults/Highlighted.html',
      ); // Creating an output adapter to a file
      const highlighter = new groupdocs.search.DocumentHighlighter(outputAdapter); // Creating the highlighter object
      const options = new groupdocs.search.HighlightOptions(); // Creating the highlight options
      options.setHighlightColor(new groupdocs.search.Color(150, 255, 150)); // Setting highlight color
      options.setUseInlineStyles(false); // Using CSS styles to highlight occurrences
      options.setGenerateHead(true); // Generating Head tag in output HTML
      index.highlight(document, highlighter, options); // Generating HTML formatted text with highlighted occurrences
    }
    {
      const document = result.getFoundDocument(0); // Getting the first found document
      const outputAdapter = new groupdocs.search.StructureOutputAdapter(groupdocs.search.OutputFormat.PlainText); // Creating the output adapter
      const highlighter = new groupdocs.search.DocumentHighlighter(outputAdapter); // Creating the highlighter instance
      const options = new groupdocs.search.HighlightOptions(); // Creating the highlight options
      options.setTermHighlightStartTag('<Term>'); // Setting the start tag for the found word
      options.setTermHighlightEndTag('</Term>'); // Setting the end tag for the found word
      index.highlight(document, highlighter, options); // Generating plain text with highlighted occurrences

      const fields = outputAdapter.getResult();
      console.log(document.toString());
      for (const field of fields) {
        // Printing field names of the found document
        console.log('\t' + field.getName());
      }
    }
  }
}

async function highlightingInFragments(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/highlightingSearchResults/highlightingInFragments';
  const documentFolder = Utils.ArchivesPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index settings instance
  const settings = new groupdocs.search.IndexSettings();
  settings.setTextStorageSettings(new groupdocs.search.TextStorageSettings(groupdocs.search.Compression.High)); // Enabling the storage of extracted text in the index

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents from the specified folder
  index.add(documentFolder);

  // Search for the word 'ipsum'
  const result = index.search('ipsum');

  // Assigning highlight options
  const options = new groupdocs.search.HighlightOptions();
  options.setTermsBefore(5);
  options.setTermsAfter(5);
  options.setTermsTotal(15);
  options.setHighlightColor(new groupdocs.search.Color(127, 200, 255));
  options.setUseInlineStyles(true);

  // Highlighting found words in separate text fragments of a document
  const document = result.getFoundDocument(0);
  const highlighter = new groupdocs.search.FragmentHighlighter(groupdocs.search.OutputFormat.Html);
  index.highlight(document, highlighter, options);

  // Getting the result
  let text = '';
  const fragmentContainers = highlighter.getResult();
  for (const container of fragmentContainers) {
    const fragments = container.getFragments();
    if (fragments.length > 0) {
      text += '\n<br>';
      text += container.getFieldName();
      text += '<br>\n';
      for (const fragment of fragments) {
        // Printing HTML markup to console
        text += fragment;
        text += '\n';
      }
    }
  }
  console.log(text);

  const fileName = Utils.OutputPath + 'AdvancedUsage/Searching/highlightingSearchResults/Fragments.html';
  fs.writeFileSync(fileName, text);
}

module.exports = { highlightingInEntireDocument, highlightingInFragments };
