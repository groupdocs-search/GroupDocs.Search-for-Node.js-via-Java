const java = require('java');
const Utils = require('../../../utils');

async function outputAdapters(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/outputAdapters/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index settings instance
  const settings = new groupdocs.search.IndexSettings();
  settings.setTextStorageSettings(new groupdocs.search.TextStorageSettings(groupdocs.search.Compression.High)); // Enabling the storage of extracted text in the index

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Getting list of indexed documents
  const documents = index.getIndexedDocuments();

  // Getting a document text
  if (documents.length > 0) {
    const document = documents[0];

    // Output to a file
    const fileOutputAdapter = new groupdocs.search.FileOutputAdapter(
      groupdocs.search.OutputFormat.Html,
      Utils.OutputPath + 'AdvancedUsage/Searching/outputAdapters/Text.html',
    );
    index.getDocumentText(document, fileOutputAdapter);

    // Output to a stream
    const stream = java.newInstanceSync('java.io.ByteArrayOutputStream');
    const streamOutputAdapter = new groupdocs.search.StreamOutputAdapter(groupdocs.search.OutputFormat.Html, stream);
    index.getDocumentText(document, streamOutputAdapter);

    // Output to a string
    const stringOutputAdapter = new groupdocs.search.StringOutputAdapter(groupdocs.search.OutputFormat.Html);
    index.getDocumentText(document, stringOutputAdapter);
    const result = stringOutputAdapter.getResult();
    //console.log(result);

    // Output to a structure
    const structureOutputAdapter = new groupdocs.search.StructureOutputAdapter(groupdocs.search.OutputFormat.PlainText);
    index.getDocumentText(document, structureOutputAdapter);
    const fields = structureOutputAdapter.getResult();
    console.log(document.toString());
    for (const field of fields) {
      console.log('\t' + field.getName());
    }
  }
}

module.exports = outputAdapters;
