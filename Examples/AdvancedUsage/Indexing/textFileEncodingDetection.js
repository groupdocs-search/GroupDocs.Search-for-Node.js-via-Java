const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function textFileEncodingDetection(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/textFileEncodingDetection';
  const documentsFolder = Utils.DocumentsUtf32Path;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Subscribing to the event
  index.getEvents().FileIndexing.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        if (args.getDocumentFullPath().endsWith('.txt')) {
          args.setEncoding(groupdocs.search.Encodings.utf_32); // Setting encoding for each text file
        }
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Searching in index
  const query = 'eagerness';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = textFileEncodingDetection;
