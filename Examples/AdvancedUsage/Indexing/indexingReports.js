const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function indexingReports(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/indexingReports';
  const documentsFolder1 = Utils.DocumentsPath;
  const documentsFolder2 = Utils.DocumentsPath2;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents
  index.add(documentsFolder1);
  index.add(documentsFolder2);

  // Getting indexing reports
  const reports = index.getIndexingReports();

  // Printing information from reports to the console
  for (const report of reports) {
    console.log('Time: ' + report.getStartTime());
    console.log('Duration: ' + report.getIndexingTime());
    console.log('Documents total: ' + report.getTotalDocumentsInIndex());
    console.log('Terms total: ' + report.getTotalTermCount());
    console.log('Indexed documents size (MB): ' + report.getIndexedDocumentsSize());
    console.log('Index size (MB): ' + report.getTotalIndexSize() / 1024.0 / 1024.0);
    console.log();
  }
}

module.exports = indexingReports;
