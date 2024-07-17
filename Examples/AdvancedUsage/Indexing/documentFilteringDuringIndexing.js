const java = require('java');
const Utils = require('../../../utils');

async function settingAnIndexingFilter(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentFilteringDuringIndexing/settingAFilter';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating a filter that skips documents with extensions '.doc', '.docx', '.rtf'
  const settings = new groupdocs.search.IndexSettings();
  const fileExtensionFilter = groupdocs.search.DocumentFilter.createFileExtension('.doc', '.docx', '.rtf'); // Creating file extension filter that allows only specified extensions
  const invertedFilter = groupdocs.search.DocumentFilter.createNot(fileExtensionFilter); // Inverting file extension filter to allow all extensions except specified ones
  settings.setDocumentFilter(invertedFilter);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);
}

async function creationTimeFilters(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentFilteringDuringIndexing/creationTimeFilters';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // The first filter skips files created earlier than January 1, 2017, 00:00:00 a.m.
  const filter1 = groupdocs.search.DocumentFilter.createCreationTimeLowerBound(Utils.createDate(2017, 1, 1));

  // The second filter skips files created later than June 15, 2018, 00:00:00 a.m.
  const filter2 = groupdocs.search.DocumentFilter.createCreationTimeUpperBound(Utils.createDate(2018, 6, 15));

  // The third filter skips files created outside the range from January 1, 2017, 00:00:00 a.m. to June 15, 2018, 00:00:00 a.m.
  const filter3 = groupdocs.search.DocumentFilter.createCreationTimeRange(
    Utils.createDate(2017, 1, 1),
    Utils.createDate(2018, 6, 15),
  );

  const settings = new groupdocs.search.IndexSettings();
  settings.setDocumentFilter(filter3); // Setting the filter

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);
}

async function modificationTimeFilters(groupdocs) {
  const indexFolder =
    Utils.OutputPath + 'AdvancedUsage/Indexing/documentFilteringDuringIndexing/modificationTimeFilters';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // The first filter skips files modified earlier than January 1, 2017, 00:00:00 a.m.
  const filter1 = groupdocs.search.DocumentFilter.createModificationTimeLowerBound(Utils.createDate(2017, 1, 1));

  // The second filter skips files modified later than June 15, 2018, 00:00:00 a.m.
  const filter2 = groupdocs.search.DocumentFilter.createModificationTimeUpperBound(Utils.createDate(2018, 6, 15));

  // The third filter skips files modified outside the range from January 1, 2017, 00:00:00 a.m. to June 15, 2018, 00:00:00 a.m.
  const filter3 = groupdocs.search.DocumentFilter.createModificationTimeRange(
    Utils.createDate(2017, 1, 1),
    Utils.createDate(2018, 6, 15),
  );

  const settings = new groupdocs.search.IndexSettings();
  settings.setDocumentFilter(filter2); // Setting the filter

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);
}

async function filePathFilters(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentFilteringDuringIndexing/filePathFilters';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  const settings = new groupdocs.search.IndexSettings();
  // Creating a filter that skips files that do not contain the word 'Ipsum' in their paths
  const filter = groupdocs.search.DocumentFilter.createFilePathRegularExpression('Ipsum', java.getStaticFieldValue('java.util.regex.Pattern', 'CASE_INSENSITIVE'));
  settings.setDocumentFilter(filter);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);
}

async function fileLengthFilters(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentFilteringDuringIndexing/fileLengthFilters';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // The first filter skips documents less than 50 KB in length
  const filter1 = groupdocs.search.DocumentFilter.createFileLengthLowerBound(50 * 1024);

  // The second filter skips documents more than 10 MB in length
  const filter2 = groupdocs.search.DocumentFilter.createFileLengthUpperBound(10 * 1024 * 1024);

  // The third filter skips documents less than 50 KB and more than 100 KB in length
  const filter3 = groupdocs.search.DocumentFilter.createFileLengthRange(50 * 1024, 100 * 1024);

  const settings = new groupdocs.search.IndexSettings();
  settings.setDocumentFilter(filter3); // Setting the filter

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);
}

async function fileExtensionFilter(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentFilteringDuringIndexing/fileExtensionFilter';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  const settings = new groupdocs.search.IndexSettings();
  // This filter allows indexing only FB2, EPUB, and TXT files
  const filter = groupdocs.search.DocumentFilter.createFileExtension('.fb2', '.epub', '.txt');
  settings.setDocumentFilter(filter); // Setting the filter

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);
}

async function logicalNotFilter(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentFilteringDuringIndexing/logicalNotFilter';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  const settings = new groupdocs.search.IndexSettings();
  const filter = groupdocs.search.DocumentFilter.createFileExtension('.htm', '.html', '.pdf');
  const invertedFilter = groupdocs.search.DocumentFilter.createNot(filter); // Inverting file extension filter to allow all extensions except of HTM, HTML, and PDF
  settings.setDocumentFilter(invertedFilter);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);
}

async function logicalAndFilter(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentFilteringDuringIndexing/logicalAndFilter';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  const settings = new groupdocs.search.IndexSettings();
  const filter1 = groupdocs.search.DocumentFilter.createCreationTimeRange(
    Utils.createDate(2015, 1, 1),
    Utils.createDate(2016, 1, 1),
  );
  const filter2 = groupdocs.search.DocumentFilter.createFileExtension('.txt');
  const filter3 = groupdocs.search.DocumentFilter.createFileLengthUpperBound(8 * 1024 * 1024);
  const finalFilter = groupdocs.search.DocumentFilter.createAnd(filter1, filter2, filter3);
  settings.setDocumentFilter(finalFilter); // Setting the filter

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);
}

async function logicalOrFilter(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/documentFilteringDuringIndexing/logicalOrFilter';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  const settings = new groupdocs.search.IndexSettings();
  const txtFilter = groupdocs.search.DocumentFilter.createFileExtension('.txt');
  const notTxtFilter = groupdocs.search.DocumentFilter.createNot(txtFilter);
  const bound5Filter = groupdocs.search.DocumentFilter.createFileLengthUpperBound(5 * 1024 * 1024);
  const bound10Filter = groupdocs.search.DocumentFilter.createFileLengthUpperBound(10 * 1024 * 1024);
  const txtSizeFilter = groupdocs.search.DocumentFilter.createAnd(txtFilter, bound5Filter);
  const notTxtSizeFilter = groupdocs.search.DocumentFilter.createAnd(notTxtFilter, bound10Filter);
  const finalFilter = groupdocs.search.DocumentFilter.createOr(txtSizeFilter, notTxtSizeFilter);
  settings.setDocumentFilter(finalFilter); // Setting the filter

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, settings);

  // Indexing documents
  index.add(documentsFolder);

  Utils.traceIndexedDocuments(index);
}

module.exports = {
  settingAnIndexingFilter,
  creationTimeFilters,
  modificationTimeFilters,
  filePathFilters,
  fileLengthFilters,
  fileExtensionFilter,
  logicalNotFilter,
  logicalAndFilter,
  logicalOrFilter,
};
