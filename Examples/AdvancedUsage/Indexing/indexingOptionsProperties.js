const java = require('java');
const Utils = require('../../../utils');

async function cancellationProperty(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingOptionsProperties/cancellationProperty';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Creating an instance of indexing options
  const options = new groupdocs.search.IndexingOptions();
  options.setCancellation(new groupdocs.search.Cancellation()); // Setting a cancellation object
  options.getCancellation().cancelAfter(3000); // Setting a time period of 3 seconds after which the indexing operation will be cancelled

  // Indexing documents from the specified folder
  index.add(documentFolder, options);

  Utils.traceIndexedDocuments(index);
}

async function isAsyncProperty(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingOptionsProperties/isAsyncProperty';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Subscribing to the event
  index.getEvents().StatusChanged.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        if (
          String(args.getStatus()) == String(groupdocs.search.IndexStatus.Ready) ||
          String(args.getStatus()) == String(groupdocs.search.IndexStatus.Failed)
        ) {
          // A notification of the operation completion should be here
          console.log('Status: ' + args.getStatus());
        }
      },
    }),
  );

  // Creating an instance of indexing options
  const options = new groupdocs.search.IndexingOptions();
  options.setAsync(true); // Specifying the asynchronous performing of the operation

  // Indexing documents from the specified folder
  // The method will return control before the indexing operation is completed
  index.add(documentFolder, options);
}

async function threadsProperty(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingOptionsProperties/threadsProperty';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Creating an instance of indexing options
  const options = new groupdocs.search.IndexingOptions();
  options.setThreads(2); // Setting the number of indexing threads

  // Indexing documents from the specified folder
  index.add(documentFolder, options);

  Utils.traceIndexedDocuments(index);
}

async function metadataIndexingOptionsProperty(groupdocs) {
  const indexFolder =
    Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingOptionsProperties/metadataIndexingOptionsProperty';
  const documentFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Setting the metadata indexing options
  const options = new groupdocs.search.IndexingOptions();
  options.getMetadataIndexingOptions().setDefaultFieldName('default');
  options.getMetadataIndexingOptions().setSeparatorInCompoundName('\\');
  options.getMetadataIndexingOptions().setMaxBytesToIndexField(10);
  options.getMetadataIndexingOptions().setMaxIntsToIndexField(10);
  options.getMetadataIndexingOptions().setMaxLongsToIndexField(10);
  options.getMetadataIndexingOptions().setMaxDoublesToIndexField(10);

  // Starting indexing operation
  index.add(documentFolder, options);

  Utils.traceIndexedDocuments(index);
}

module.exports = { cancellationProperty, isAsyncProperty, threadsProperty, metadataIndexingOptionsProperty };
