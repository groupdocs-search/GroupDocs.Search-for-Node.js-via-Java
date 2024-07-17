const fs = require('fs');
const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function indexingFromFile(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingFromDifferentSources/indexingFromFile';
  const documentFilePath = Utils.DocumentsPath + 'Lorem ipsum.pdf';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const settings = new groupdocs.search.IndexSettings();
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Creating a document object
  const document = groupdocs.search.Document.createFromFile(documentFilePath);
  const documents = java.newArray('com.groupdocs.search.Document', [document]);

  // Indexing document from the file
  const options = new groupdocs.search.IndexingOptions();
  options.setUseRawTextExtraction(false);
  index.add(documents, options);

  // Searching in the index
  const query = 'lorem';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

async function indexingFromStream(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingFromDifferentSources/indexingFromStream';
  const documentFilePath = Utils.DocumentsPath + 'Lorem ipsum.pdf';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Creating a document object
  const stream = java.newInstanceSync('java.io.FileInputStream', documentFilePath); // Opening a stream
  const document = groupdocs.search.Document.createFromStream(documentFilePath, new Date(), '.pdf', stream);
  const documents = java.newArray('com.groupdocs.search.Document', [document]);

  // Indexing document from the stream
  const options = new groupdocs.search.IndexingOptions();
  index.add(documents, options);

  // Closing the document stream after indexing is complete
  stream.close();

  // Searching in the index
  const query = 'lorem';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

async function indexingFromStructure(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingFromDifferentSources/indexingFromStructure';
  const documentFilePath = Utils.DocumentsPath + 'Lorem ipsum.txt';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Creating a document object
  const text = fs.readFileSync(documentFilePath, 'utf8').toString();
  const fields = java.newArray('com.groupdocs.search.common.DocumentField', [
    new groupdocs.search.DocumentField(groupdocs.search.CommonFieldNames.Content, text),
  ]);
  const document = groupdocs.search.Document.createFromStructure(
    'ExampleDocument',
    java.newInstanceSync('java.util.Date'),
    fields,
  );
  const documents = java.newArray('com.groupdocs.search.Document', [document]);

  // Indexing document from the structure
  const options = new groupdocs.search.IndexingOptions();
  index.add(documents, options);

  // Searching in the index
  const query = 'lorem';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

async function indexingFromUrl(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingFromDifferentSources/indexingFromUrl';
  const url = 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const settings = new groupdocs.search.IndexSettings();
  settings.setTextStorageSettings(new groupdocs.search.TextStorageSettings(groupdocs.search.Compression.High));
  const index = new groupdocs.search.Index(indexFolder, settings, true);

  index.getEvents().ErrorOccurred.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log(args.getMessage());
      },
    }),
  );

  // Creating a document object
  const documentKey = url;
  const extension = path.extname(url);
  const documentLoader = java.newProxy('com.groupdocs.search.common.IDocumentLoader', {
    loadDocument: function () {
      const urlInstance = java.newInstanceSync('java.net.URL', url);
      const stream = urlInstance.openStream();
      const document = groupdocs.search.Document.createFromStream(
        documentKey,
        java.newInstanceSync('java.util.Date'),
        extension,
        stream,
      );
      return document;
    },
    closeDocument: function () {},
  });
  const document = groupdocs.search.Document.createLazy(
    groupdocs.search.DocumentSourceKind.Stream,
    documentKey,
    documentLoader,
  );
  const documents = java.newArray('com.groupdocs.search.Document', [document]);

  // Indexing the lazy-loaded document
  const options = new groupdocs.search.IndexingOptions();
  options.setUseRawTextExtraction(false);
  index.add(documents, options);

  // Searching in the index
  const query = 'files';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

async function indexingFromFtp(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingFromDifferentSources/indexingFromFtp';
  const url = 'ftp://example.com/ExampleDocument.pdf';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const settings = new groupdocs.search.IndexSettings();
  settings.setTextStorageSettings(new groupdocs.search.TextStorageSettings(groupdocs.search.Compression.High));
  const index = new groupdocs.search.Index(indexFolder, settings, true);

  index.getEvents().ErrorOccurred.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log(args.getMessage());
      },
    }),
  );

  // Creating a document object
  const documentKey = url;
  const extension = path.extname(url);
  const documentLoader = java.newProxy('com.groupdocs.search.common.IDocumentLoader', {
    loadDocument: function () {
      const urlInstance = java.newInstanceSync('java.net.URL', url);
      const stream = urlInstance.openStream();
      const document = groupdocs.search.Document.createFromStream(
        documentKey,
        java.newInstanceSync('java.util.Date'),
        extension,
        stream,
      );
      return document;
    },
    closeDocument: function () {},
  });

  const document = groupdocs.search.Document.createLazy(
    groupdocs.search.DocumentSourceKind.Stream,
    documentKey,
    documentLoader,
  );
  const documents = java.newArray('com.groupdocs.search.Document', [document]);

  // Indexing the lazy-loaded document
  const options = new groupdocs.search.IndexingOptions();
  options.setUseRawTextExtraction(false);
  index.add(documents, options);

  // Searching in the index
  const query = 'some';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = { indexingFromFile, indexingFromStream, indexingFromStructure, indexingFromUrl, indexingFromFtp };
