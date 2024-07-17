const java = require('java');
const Utils = require('../../../utils');

async function updateIndexedDocuments(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/updateIndex/updateIndexedDocuments/Index';
  const documentFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/updateIndex/updateIndexedDocuments/Documents';
  const query = 'son';

  Utils.printHeaderFromPath(indexFolder);

  // Prepare data
  Utils.cleanDirectory(documentFolder);
  Utils.copyFiles(Utils.DocumentsPath, documentFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentFolder);

  const searchResult = index.search(query);
  Utils.traceResult(query, searchResult);

  // Change, delete, add documents in the document folder
  // ...
  // Adding documents to indexed folder
  Utils.copyFiles(Utils.DocumentsPath4, documentFolder);

  const options = new groupdocs.search.UpdateOptions();
  options.setThreads(2); // Setting the number of indexing threads
  index.update(options); // Updating the index

  const searchResult2 = index.search(query);
  Utils.traceResult(query, searchResult2);
}

async function updateIndexVersion(groupdocs) {
  const oldIndexFolder = Utils.OldIndexPath;
  const sourceIndexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/updateIndex/updateIndexVersion/SourceIndex';
  const targetIndexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/updateIndex/updateIndexVersion/TargetIndex';

  Utils.printHeaderFromPath(sourceIndexFolder);

  // Prepare data
  Utils.cleanDirectory(sourceIndexFolder);
  Utils.cleanDirectory(targetIndexFolder);
  Utils.copyFiles(oldIndexFolder, sourceIndexFolder);

  // Creating updater
  const updater = new groupdocs.search.IndexUpdater();

  if (updater.canUpdateVersion(sourceIndexFolder)) {
    // The index of old version does not change
    const result = updater.updateVersion(sourceIndexFolder, targetIndexFolder);
  }

  // Loading index from target folder
  const index = new groupdocs.search.Index(targetIndexFolder);

  // Searching in index
  const query = 'eagerness';
  const searchResult = index.search(query);

  Utils.traceResult(query, searchResult);
}

module.exports = { updateIndexedDocuments, updateIndexVersion };
