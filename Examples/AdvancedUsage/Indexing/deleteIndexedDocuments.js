const fs = require('fs');
const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function deleteIndexedDocuments(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/deleteIndexedDocuments'; // Specify path to the index folder
  const filePath = Utils.DocumentsPath + 'English.docx';
  const query = 'moment';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, true);

  // Indexing the document from stream
  const documentKey = path.basename(filePath);
  const documentLoader = java.newProxy('com.groupdocs.search.common.IDocumentLoader', {
    closeDocument: function () {},
    loadDocument: function () {
      const millis = java.callStaticMethodSync('java.lang.System', 'currentTimeMillis');
      const time = java.newInstanceSync('java.util.Date', millis);
      const extension = path.extname(filePath);
      const buffer = Utils.readBinaryFile(filePath);
      const array = Array.prototype.slice.call(buffer, 0);
      const buf = java.newArray('byte', array);
      const stream = java.newInstanceSync('java.io.ByteArrayInputStream', buf);
      const document = java.callStaticMethodSync(
        'com.groupdocs.search.Document',
        'createFromStream',
        documentKey,
        time,
        extension,
        stream,
      );
      return document;
    },
  });

  const document = java.callStaticMethodSync(
    'com.groupdocs.search.Document',
    'createLazy',
    groupdocs.search.DocumentSourceKind.Stream,
    documentKey,
    documentLoader,
  );
  const documents = java.newArray('com.groupdocs.search.Document', [document]);

  // Subscribe to index events
  const eventHandler = java.newProxy('com.groupdocs.search.events.EventHandler', {
    invoke: function (sender, args) {
      console.log(args.getMessage()); // Writing error messages to the console
    },
  });
  index.getEvents().ErrorOccurred.add(eventHandler);

  index.add(documents, new groupdocs.search.IndexingOptions());

  // Getting indexed documents from the index
  const indexedDocuments1 = index.getIndexedDocuments();

  // Writing indexed documents to the console
  console.log('Indexed documents (' + indexedDocuments1.length + '):');
  for (let i = 0; i < indexedDocuments1.length; i++) {
    const info = indexedDocuments1[i];
    console.log('\t' + info);
  }

  // Searching in the index
  const searchResult1 = index.search(query);
  Utils.traceResult(query, searchResult1);

  // Deleting indexed document from the index
  const documentKeys = java.newArray('java.lang.String', [documentKey]);
  const deleteResult = index.delete(new groupdocs.search.UpdateOptions(), documentKeys);
  console.log('\nDeleted documents: ' + deleteResult.getSuccessCount());

  // Getting indexed paths after deletion
  const indexedDocuments2 = index.getIndexedDocuments();

  console.log('\nIndexed documents (' + indexedDocuments2.length + '):');
  for (let i = 0; i < indexedDocuments2.length; i++) {
    const info = indexedDocuments2[i];
    console.log('\t' + info);
  }

  // Searching in the index
  const searchResult2 = index.search(query);
  Utils.traceResult(query, searchResult2);
}

module.exports = deleteIndexedDocuments;
