const fs = require('fs');
const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function indexingUsingThePasswordDictionary(groupdocs) {
  const indexFolder =
    Utils.OutputPath + 'AdvancedUsage/Indexing/IndexingPasswordProtectedDocuments/indexingUsingThePasswordDictionary';
  const documentsFolder = Utils.PasswordProtectedDocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Adding document passwords to the dictionary
  const path1 = path.resolve(Utils.PasswordProtectedDocumentsPath + 'English.docx');
  index.getDictionaries().getDocumentPasswords().add(path1, '123456');
  const path2 = path.resolve(Utils.PasswordProtectedDocumentsPath + 'Lorem ipsum.docx');
  index.getDictionaries().getDocumentPasswords().add(path2, '123456');

  // Indexing documents from the specified folder
  // Passwords will be automatically retrieved from the dictionary when necessary
  index.add(documentsFolder);

  // Searching in the index
  const query = 'ipsum OR increasing';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

async function indexingUsingThePasswordRequiredEvent(groupdocs) {
  const indexFolder =
    Utils.OutputPath +
    'AdvancedUsage/Indexing/IndexingPasswordProtectedDocuments/indexingUsingThePasswordRequiredEvent';
  const documentsFolder = Utils.PasswordProtectedDocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Subscribing to the event
  index.getEvents().PasswordRequired.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        if (args.getDocumentFullPath().endsWith('.docx')) {
          args.setPassword('123456'); // Providing password for DOCX files
        }
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Searching in the index
  const query = 'ipsum OR increasing';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = { indexingUsingThePasswordDictionary, indexingUsingThePasswordRequiredEvent };
