const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function documentPasswords(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/documentPasswords/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index from in specified folder
  const index = new groupdocs.search.Index(indexFolder);

  if (index.getDictionaries().getDocumentPasswords().getCount() > 0) {
    // Removing all passwords from the dictionary
    index.getDictionaries().getDocumentPasswords().clear();
  }

  const absolutePath = path.resolve(Utils.PasswordProtectedDocumentsPath + 'English.docx');
  index.getDictionaries().getDocumentPasswords().add(absolutePath, '123456');

  if (index.getDictionaries().getDocumentPasswords().contains(absolutePath)) {
    // Getting a password for a document
    const password = index.getDictionaries().getDocumentPasswords().getPassword(absolutePath);
    console.log(absolutePath);
    console.log('\tPassword: ' + password);

    // Deleting the password from the dictionary
    index.getDictionaries().getDocumentPasswords().remove(absolutePath);
  }

  // Adding document passwords to the dictionary
  index
    .getDictionaries()
    .getDocumentPasswords()
    .add(Utils.PasswordProtectedDocumentsPath + 'English.docx', '123456');
  index
    .getDictionaries()
    .getDocumentPasswords()
    .add(Utils.PasswordProtectedDocumentsPath + 'Lorem ipsum.docx', '123456');

  // Indexing documents from the specified folder
  // Passwords will be automatically retrieved from the dictionary when necessary
  index.add(documentsFolder);

  // Searching in the index
  const query = 'ipsum OR increasing';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = documentPasswords;
