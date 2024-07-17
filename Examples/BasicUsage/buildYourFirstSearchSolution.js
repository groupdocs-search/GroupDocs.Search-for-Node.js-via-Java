const path = require('path');
const java = require('java');
const Utils = require('../../utils');

async function runSynchronousIndexing(groupdocs) {
  const indexFolder = Utils.OutputPath + 'BasicUsage/BuildYourFirstSearchSolution/SynchronousIndexing'; // Specify the path to the index folder
  const documentsFolder = Utils.DocumentsPath; // Specify the path to a folder containing documents to search

  Utils.printHeaderFromPath(indexFolder);

  // Create a new index or
  // Open an existing one
  const index = new groupdocs.search.Index(indexFolder);

  // Subscribe to index events
  const eventHandler = java.newProxy('com.groupdocs.search.events.EventHandler', {
    invoke: function (sender, args) {
      console.log(args.getMessage()); // Writing error messages to the console
    },
  });
  index.getEvents().ErrorOccurred.add(eventHandler);

  // Add files synchronously
  index.add(documentsFolder); // Synchronous indexing documents from the specified folder

  // Perform search
  const query = 'tincidunt'; // Specify a search query
  const result = index.search(query); // Searching in the index

  // Use search results
  // Printing the result
  console.log('Documents found: ' + result.getDocumentCount());
  console.log('Total occurrences found: ' + result.getOccurrenceCount());
  for (let i = 0; i < result.getDocumentCount(); i++) {
    const document = result.getFoundDocument(i);
    console.log('\tDocument: ' + document.getDocumentInfo().getFilePath());
    console.log('\tOccurrences: ' + document.getOccurrenceCount());
  }

  // Highlight occurrences in text
  if (result.getDocumentCount() > 0) {
    const document = result.getFoundDocument(0); // Getting the first found document
    const filePath = Utils.OutputPath + 'BasicUsage/Highlighted.html';
    const outputAdapter = new groupdocs.search.FileOutputAdapter(groupdocs.search.OutputFormat.Html, filePath); // Creating the output adapter to a file
    const highlighter = new groupdocs.search.DocumentHighlighter(outputAdapter); // Creating the highlighter object
    index.highlight(document, highlighter); // Generating output HTML formatted document with highlighted search results

    console.log();
    console.log('Generated HTML file can be opened with Internet browser.');
    console.log('The file can be found by the following path:');
    console.log(path.resolve(filePath));
  }
}

async function runAsynchronousIndexing(groupdocs) {
  const indexFolder = Utils.OutputPath + 'BasicUsage/BuildYourFirstSearchSolution/AsynchronousIndexing'; // Specify the path to the index folder
  const documentsFolder = Utils.DocumentsPath; // Specify the path to a folder containing documents to search

  Utils.printHeaderFromPath(indexFolder);

  // Create a new index or
  // Open an existing one
  const index = new groupdocs.search.Index(indexFolder);

  // Subscribe to ErrorOccurred events
  const errorOccurredHandler = java.newProxy('com.groupdocs.search.events.EventHandler', {
    invoke: function (sender, args) {
      console.log(args.getMessage()); // Writing error messages to the console
    },
  });
  index.getEvents().ErrorOccurred.add(errorOccurredHandler);

  // Subscribe to StatusChanged event
  const statusChangedHandler = java.newProxy('com.groupdocs.search.events.EventHandler', {
    invoke: function (sender, args) {
      console.log('Status changed: ' + args.getStatus());
      if (
        String(args.getStatus()) == String(groupdocs.search.IndexStatus.Ready) ||
        String(args.getStatus()) == String(groupdocs.search.IndexStatus.Failed)
      ) {
        // There should be a code indicating the completion of the operation
        // Comment out the line 'process.exit(0)' in runExamples.js to see this message
        console.log('Indexing completed.');
      }
    },
  });
  index.getEvents().StatusChanged.add(statusChangedHandler);

  // Add files asynchronously
  // Setting the asynchronous indexing flag
  const options = new groupdocs.search.IndexingOptions();
  options.setAsync(true);

  // Asynchronous indexing documents from the specified folder
  // The current method terminates before the operation completes
  index.add(documentsFolder, options);
}

module.exports = { runSynchronousIndexing, runAsynchronousIndexing };
