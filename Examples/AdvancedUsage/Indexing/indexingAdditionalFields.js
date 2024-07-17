const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function indexingAdditionalFields(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/indexingAdditionalFields';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Defining subjects of documents
  const documents = ['Lorem ipsum.pdf', 'English.docx', 'Lorem ipsum.docx', 'English.txt', 'Lorem ipsum.txt'];
  const subjects = ['Latin', 'English', 'Latin', 'English', 'Latin'];

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the event
  index.getEvents().FileIndexing.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        const fileName = path.basename(args.getDocumentFullPath());
        let subject = null;
        for (let i = 0; i < documents.length; i++) {
          if (documents[i] == fileName) {
            subject = subjects[i]; // Getting a subject for the current document
          }
        }
        if (subject != null) {
          // Setting additional fields for the current document
          args.setAdditionalFields(
            java.newArray('com.groupdocs.search.common.DocumentField', [
              new groupdocs.search.DocumentField('Subject', subject),
            ]),
          );
        }
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);

  const query = 'Subject: Latin';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = indexingAdditionalFields;
