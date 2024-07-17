const java = require('java');
const Utils = require('../../../utils');

async function changeAttributes(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/DocumentAttributes/changeAttributes';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents in a document folder
  index.add(documentFolder);

  const documents = index.getIndexedDocuments();

  // Creating an attribute change container object
  const batch = new groupdocs.search.AttributeChangeBatch();
  // Adding one attribute to all indexed documents
  batch.addToAll('public');
  // Removing one attribute from one indexed document
  batch.remove(documents[0].getFilePath(), 'public');
  // Adding two attributes to one indexed document
  batch.add(documents[0].getFilePath(), 'main', 'key');

  // Applying attribute changes in the index
  index.changeAttributes(batch);

  // Searching in the index
  const options = new groupdocs.search.SearchOptions();
  // Creating a document filter by attribute
  options.setSearchDocumentFilter(groupdocs.search.SearchDocumentFilter.createAttribute('main'));
  const query = 'length';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

async function addAttributesDuringIndexing(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/DocumentAttributes/addAttributesDuringIndexing';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Subscribing to the FileIndexing event to add attributes
  index.getEvents().FileIndexing.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        if (args.getDocumentFullPath().endsWith('Lorem ipsum.pdf')) {
          // Adding two attributes
          args.setAttributes(['main', 'key']);
        }
      },
    }),
  );

  // Indexing documents in a document folder
  index.add(documentFolder);

  // Searching in the index
  const options = new groupdocs.search.SearchOptions();
  // Creating a document filter by attribute
  options.setSearchDocumentFilter(groupdocs.search.SearchDocumentFilter.createAttribute('main'));
  const query = 'ipsum';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = { changeAttributes, addAttributesDuringIndexing };
