const java = require('java');
const Utils = require('../../../utils');

async function operationFinishedEvent(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingEvents/operationFinishedEvent';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the event
  index.getEvents().OperationFinished.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log('Operation finished: ' + args.getOperationType());
        console.log('Message: ' + args.getMessage());
        console.log('Index folder: ' + args.getIndexFolder());
        const df = new SimpleDateFormat('MM/dd/yyyy HH:mm:ss');
        console.log('Time: ' + df.format(args.getTime()));
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);
}

async function errorOccurredEvent(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingEvents/errorOccurredEvent';
  const documentsFolder = Utils.DocumentsPath;
  const query = 'Lorem';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the event
  index.getEvents().ErrorOccurred.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log(args.getMessage());
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Searching in the index
  const result = index.search(query);
}

async function operationProgressChangedEvent(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingEvents/operationProgressChangedEvent';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the event
  index.getEvents().OperationProgressChanged.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log('Last processed: ' + args.getLastDocumentPath());
        console.log('Result: ' + args.getLastDocumentStatus());
        console.log('Processed documents: ' + args.getProcessedDocuments());
        console.log('Progress percentage: ' + args.getProgressPercentage());
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);
}

async function optimizationProgressChangedEvent(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingEvents/optimizationProgressChangedEvent';
  const documents = [
    Utils.DocumentsPath + 'English.docx',
    Utils.DocumentsPath + 'English.txt',
    Utils.DocumentsPath + 'Lorem ipsum.docx',
    Utils.DocumentsPath + 'Lorem ipsum.pdf',
    Utils.DocumentsPath + 'Lorem ipsum.txt',
  ];

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Indexing documents
  index.add(documents[0]);
  index.add(documents[1]);
  index.add(documents[2]);
  index.add(documents[3]);
  index.add(documents[4]);

  // Subscribing to the event
  index.getEvents().OptimizationProgressChanged.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log();
        console.log('Processed segments: ' + args.getProcessedSegments());
        console.log('Total segments: ' + args.getTotalSegments());
        console.log('Progress percentage: ' + args.getProgressPercentage());
      },
    }),
  );

  index.optimize();
}

async function passwordRequiredEvent(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingEvents/passwordRequiredEvent';
  const documentsFolder = Utils.PasswordProtectedDocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the event
  index.getEvents().PasswordRequired.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        if (args.getDocumentFullPath().endsWith('English.docx')) {
          args.setPassword('123456');
        } else if (args.getDocumentFullPath().endsWith('Lorem ipsum.docx')) {
          args.setPassword('123456');
        }
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Searching in the index
  const query = 'Lorem OR sportsman';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

async function fileIndexingEvent(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingEvents/fileIndexingEvent';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the event
  const additionalFields = java.newArray('com.groupdocs.search.common.DocumentField', [
    new groupdocs.search.DocumentField('Tags', 'Lorem'),
  ]);
  index.getEvents().FileIndexing.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        if (args.getDocumentFullPath().endsWith('Lorem ipsum.docx')) {
          args.setAdditionalFields(additionalFields);
          console.log('Added field to: ' + args.getDocumentFullPath());
        }
        if (!args.getDocumentFullPath().toLowerCase().includes('lorem')) {
          args.setSkipIndexing(true);
          console.log('Skipped: ' + args.getDocumentFullPath());
        }
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Searching in the index
  const query = 'Tags:lorem';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

async function statusChangedEvent(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingEvents/statusChangedEvent';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the event
  index.getEvents().StatusChanged.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        if (
          String(args.getStatus()) == String(groupdocs.search.IndexStatus.Ready) ||
          String(args.getStatus()) == String(groupdocs.search.IndexStatus.Failed)
        ) {
          // A notification of the operation completion should be here
          // Comment out the line 'process.exit(0)' in runExamples.js to see this message
          console.log('Operation finished!');
        }
      },
    }),
  );

  // Setting the flag for asynchronous indexing
  const options = new groupdocs.search.IndexingOptions();
  options.setAsync(true);

  // Asynchronous indexing documents from the specified folder
  // The method terminates before the operation completes
  index.add(documentsFolder, options);
}

async function searchPhaseCompletedEvent(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingEvents/searchPhaseCompletedEvent';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Subscribing to the event
  index.getEvents().SearchPhaseCompleted.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log('Search phase: ' + args.getSearchPhase());
        console.log('Words: ' + args.getWords().length);
        const words = args.getWords();
        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          console.log('\t' + word);
        }
        console.log();
      },
    }),
  );

  const options = new groupdocs.search.SearchOptions();
  options.setUseSynonymSearch(true);
  options.setUseWordFormsSearch(true);
  options.getFuzzySearch().setEnabled(true);
  options.setUseHomophoneSearch(true);
  const result = index.search('buy', options);
}

async function imagePreparingEvent(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingEvents/imagePreparingEvent';
  const documentsFolder = Utils.DocumentsPNG;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the event
  index.getEvents().ImagePreparing.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log('Document: ' + args.getDocumentKey());
        console.log('Image index: ' + args.getImageIndex());
        console.log('Image frames: ' + args.getImageFrames().length);
      },
    }),
  );

  // Indexing files
  index.add(documentsFolder);
}

module.exports = {
  operationFinishedEvent,
  errorOccurredEvent,
  operationProgressChangedEvent,
  optimizationProgressChangedEvent,
  passwordRequiredEvent,
  fileIndexingEvent,
  statusChangedEvent,
  searchPhaseCompletedEvent,
  imagePreparingEvent,
};
