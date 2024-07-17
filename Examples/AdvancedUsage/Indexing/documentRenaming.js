const fs = require('fs');
const java = require('java');
const Utils = require('../../../utils');

async function documentRenaming(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentRenaming/Index';
  const documentFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentRenaming/Documents/';

  Utils.printHeaderFromPath(indexFolder);

  // Prepare data
  Utils.cleanDirectory(documentFolder);
  Utils.copyFiles(Utils.DocumentsPath, documentFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents in a document folder
  index.add(documentFolder);

  console.log('\nBefore renaming:');
  Utils.traceIndexedDocuments(index);

  // Renaming a document
  const oldDocumentPath = documentFolder + 'Lorem ipsum.txt';
  const newDocumentPath = documentFolder + 'Lorem ipsum renamed.txt';
  fs.renameSync(oldDocumentPath, newDocumentPath);

  // Notifying the index about renaming
  const notification = java.callStaticMethodSync(
    'com.groupdocs.search.Notification',
    'createRenameNotification',
    oldDocumentPath,
    newDocumentPath,
  );
  const result = index.notifyIndex(notification);
  console.log('\nSuccessful rename: ' + result);

  // Updating the index
  // The renamed document will not be reindexed
  index.update();

  console.log('\nAfter renaming:');
  Utils.traceIndexedDocuments(index);
}

module.exports = documentRenaming;
