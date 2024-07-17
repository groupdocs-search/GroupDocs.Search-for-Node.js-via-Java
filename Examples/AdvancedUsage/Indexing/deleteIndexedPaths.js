const Utils = require('../../../utils');

async function deleteIndexedPaths(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/deleteIndexedPaths'; // Specify path to the index folder
  const documentsFolder1 = Utils.DocumentsPath;
  const documentsFolder2 = Utils.DocumentsPath2;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folders
  index.add(documentsFolder1);
  index.add(documentsFolder2);

  // Getting indexed paths from the index
  const indexedPaths1 = index.getIndexedPaths();

  // Writing indexed paths to the console
  console.log('Indexed paths:');
  for (let i = 0; i < indexedPaths1.length; i++) {
    const indexedPath = indexedPaths1[i];
    console.log('\t' + indexedPath);
  }

  // Deleting index path from the index
  const deleteResult = index.delete([documentsFolder1], new groupdocs.search.UpdateOptions());

  // Getting indexed paths after deletion
  const indexedPaths2 = index.getIndexedPaths();
  console.log('\nDeleted paths: ' + deleteResult.getSuccessCount());

  console.log('\nIndexed paths:');
  for (let i = 0; i < indexedPaths2.length; i++) {
    const indexedPath = indexedPaths2[i];
    console.log('\t' + indexedPath);
  }
}

module.exports = deleteIndexedPaths;
