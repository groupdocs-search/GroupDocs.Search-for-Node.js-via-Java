const java = require('java');
const Utils = require('../../../utils');

async function gettingDocuments(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/gettingIndexedDocuments/gettingDocuments';
  const documentsFolder = Utils.ArchivesPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Getting list of indexed documents
  const documents = index.getIndexedDocuments();
  for (const document of documents) {
    console.log(document.getFilePath());
    const items = index.getIndexedDocumentItems(document); // Getting list of document items
    for (const item of items) {
      console.log('\t' + item.getInnerPath());
    }
  }
}

async function gettingTextOfIndexedDocuments(groupdocs) {
  const indexFolder =
    Utils.OutputPath + 'AdvancedUsage/Searching/gettingIndexedDocuments/gettingTextOfIndexedDocuments';
  const documentsFolder = Utils.ArchivesPath;

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
    const outputAdapter = new groupdocs.search.FileOutputAdapter(
      groupdocs.search.OutputFormat.Html,
      Utils.OutputPath + 'AdvancedUsage/Searching/gettingIndexedDocuments/Text.html',
    );
    index.getDocumentText(documents[0], outputAdapter);

    // Getting list of files in the archive
    const items = index.getIndexedDocumentItems(documents[0]);
    if (items.length > 0) {
      const outputAdapter2 = new groupdocs.search.FileOutputAdapter(
        groupdocs.search.OutputFormat.Html,
        Utils.OutputPath + 'AdvancedUsage/Searching/gettingIndexedDocuments/ItemText.html',
      );
      index.getDocumentText(items[0], outputAdapter2);
    }
  }
}

module.exports = { gettingDocuments, gettingTextOfIndexedDocuments };
