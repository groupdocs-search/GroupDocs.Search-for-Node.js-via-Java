const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function useOfStandardFileLogger(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/logging/useOfStandardFileLogger';
  const documentsFolder = Utils.DocumentsPath;
  const query = 'Lorem';
  const logPath = Utils.OutputPath + 'AdvancedUsage/Indexing/logging/Log.txt';

  Utils.printHeaderFromPath(indexFolder);

  const settings = new groupdocs.search.IndexSettings();
  settings.setLogger(new groupdocs.search.FileLogger(logPath, 4.0)); // Specifying the path to the log file and a maximum length of 4 MB

  const index = new groupdocs.search.Index(indexFolder, settings); // Creating or loading an index from the specified folder

  index.add(documentsFolder); // Indexing documents from the specified folder

  const result = index.search(query); // Search in index

  Utils.traceResult(query, result);
}

async function implementingCustomLogger(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/logging/implementingCustomLogger';
  const documentsFolder = Utils.DocumentsPath;
  const query = 'Lorem';

  Utils.printHeaderFromPath(indexFolder);

  const settings = new groupdocs.search.IndexSettings();

  // Implementing a custom console logger
  const consoleLogger = java.newProxy('com.groupdocs.search.common.ILogger', {
    error: function (message) {
      console.log('Error: ' + message);
    },
    trace: function (message) {
      console.log(message);
    },
  });

  settings.setLogger(consoleLogger); // Setting the custom logger

  const index = new groupdocs.search.Index(indexFolder, settings); // Creating or loading an index from the specified folder

  index.add(documentsFolder); // Indexing documents from the specified folder

  const result = index.search(query); // Search in index

  Utils.traceResult(query, result);
}

module.exports = { useOfStandardFileLogger, implementingCustomLogger };
