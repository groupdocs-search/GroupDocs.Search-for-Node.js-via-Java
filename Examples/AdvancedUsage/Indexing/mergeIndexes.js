const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function mergeIndexes(groupdocs) {
  const indexFolder1 = Utils.OutputPath + 'AdvancedUsage/Indexing/mergeIndexes/index1';
  const indexFolder2 = Utils.OutputPath + 'AdvancedUsage/Indexing/mergeIndexes/index2';
  const documentsFolder1 = Utils.DocumentsPath;
  const documentsFolder2 = Utils.DocumentsPath2;

  Utils.printHeaderFromPath(indexFolder1);

  const index1 = new groupdocs.search.Index(indexFolder1); // Creating index1
  index1.add(documentsFolder1); // Indexing documents

  const index2 = new groupdocs.search.Index(indexFolder2); // Creating index2
  index2.add(documentsFolder2); // Indexing documents

  const options = new groupdocs.search.MergeOptions();
  options.setCancellation(new groupdocs.search.Cancellation()); // Creating cancellation object to be able to cancel the oparation
  options.getCancellation().cancelAfter(5000); // Setting a time limit for the operation of 5 seconds

  console.log('\nBefore merge index1:');
  Utils.traceIndexedDocuments(index1);
  console.log('\nBefore merge index2:');
  Utils.traceIndexedDocuments(index2);

  // Merging index2 into index1
  // Files of index2 will not be changed
  index1.merge(index2, options);

  console.log('\n\nAfter merge index1:');
  Utils.traceIndexedDocuments(index1);
  console.log('\nAfter merge index2:');
  Utils.traceIndexedDocuments(index2);
}

module.exports = mergeIndexes;
