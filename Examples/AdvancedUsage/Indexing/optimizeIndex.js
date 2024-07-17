const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function optimizeIndex(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/optimizeIndex';
  const documentsFolder1 = Utils.DocumentsPath;
  const documentsFolder2 = Utils.DocumentsPath2;
  const documentsFolder3 = Utils.DocumentsPath3;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, true);

  index.add(documentsFolder1); // Indexing documents from the specified folder
  index.add(documentsFolder2); // Each call to Add creates at least one new segment in the index
  index.add(documentsFolder3);

  const options = new groupdocs.search.MergeOptions();
  options.setCancellation(new groupdocs.search.Cancellation()); // Creating cancellation object to be able to cancel the operation
  options.getCancellation().cancelAfter(30000); // Setting maximum duration of the operation to 30 seconds

  console.log('There are 3 segments in the index now.');

  // Merging segments of the index
  index.optimize(options);

  console.log('Index has been optimized. And now in the index there is only 1 segment.');
}

module.exports = optimizeIndex;
