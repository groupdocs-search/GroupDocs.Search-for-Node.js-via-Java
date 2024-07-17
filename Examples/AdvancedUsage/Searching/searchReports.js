const java = require('java');
const Utils = require('../../../utils');

async function searchReports(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/searchReports';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Searching in index
  const query1 = 'water';
  const result1 = index.search(query1);
  const query2 = '"Lorem ipsum"';
  const result2 = index.search(query2);

  // Getting search reports
  const reports = index.getSearchReports();

  // Printing reports to the console
  for (const report of reports) {
    console.log('Query: ' + report.getTextQuery());
    console.log('Time: ' + report.getStartTime());
    console.log('Duration: ' + report.getSearchDuration());
    console.log('Documents: ' + report.getDocumentCount());
    console.log('Occurrences: ' + report.getOccurrenceCount());
    console.log();
  }
}

module.exports = searchReports;
