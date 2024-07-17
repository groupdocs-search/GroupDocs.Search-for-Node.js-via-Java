const java = require('java');
const Utils = require('../../../utils');

async function settingASearchFilter(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/documentFilteringInSearchResult/settingASearchFilter';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options object
  const options = new groupdocs.search.SearchOptions();
  options.setSearchDocumentFilter(groupdocs.search.SearchDocumentFilter.createFileExtension('.txt')); // Setting a document filter

  // Search in the index
  // Only text documents will be returned as the result of the search
  const query = 'education';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

async function filePathSearchFilters(groupdocs) {
  const indexFolder =
    Utils.OutputPath + 'AdvancedUsage/Searching/documentFilteringInSearchResult/filePathSearchFilters';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options object
  const options = new groupdocs.search.SearchOptions();

  // The filter returns only files that contain the word 'Lorem' in their paths, not case sensitive
  const filter = groupdocs.search.SearchDocumentFilter.createFilePathRegularExpression(
    'Lorem',
    java.getStaticFieldValue('java.util.regex.Pattern', 'CASE_INSENSITIVE'),
  );

  // Setting a document filter
  options.setSearchDocumentFilter(filter);

  // Search in the index
  const query = 'Advantages';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

async function fileExtensionSearchFilter(groupdocs) {
  const indexFolder =
    Utils.OutputPath + 'AdvancedUsage/Searching/documentFilteringInSearchResult/fileExtensionSearchFilter';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options object
  const options = new groupdocs.search.SearchOptions();

  // This filter returns only PDF and DOCX documents
  const filter = groupdocs.search.SearchDocumentFilter.createFileExtension('.pdf', '.docx');

  // Setting a document filter
  options.setSearchDocumentFilter(filter);

  // Search in the index
  const query = 'ipsum';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

async function attributeSearchFilter(groupdocs) {
  const indexFolder =
    Utils.OutputPath + 'AdvancedUsage/Searching/documentFilteringInSearchResult/attributeSearchFilter';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  index.getEvents().FileIndexing.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        if (args.getDocumentFullPath().endsWith('.txt')) {
          const mainAttribute = java.newArray('java.lang.String', ['main']);
          args.setAttributes(mainAttribute);
        }
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options object
  const options = new groupdocs.search.SearchOptions();

  // This filter returns only documents that have attribute "main"
  const filter = groupdocs.search.SearchDocumentFilter.createAttribute('main');

  // Setting a document filter
  options.setSearchDocumentFilter(filter);

  // Search in the index
  const query = 'ipsum OR length';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

async function combiningSearchFilters(groupdocs) {
  const indexFolder =
    Utils.OutputPath + 'AdvancedUsage/Searching/documentFilteringInSearchResult/combiningSearchFilters';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an AND composite filter that returns all FB2 and EPUB documents that have the word 'Einstein' in their full paths
  const filter1 = groupdocs.search.SearchDocumentFilter.createFilePathRegularExpression(
    'Einstein',
    java.getStaticFieldValue('java.util.regex.Pattern', 'CASE_INSENSITIVE'),
  );
  const filter2 = groupdocs.search.SearchDocumentFilter.createFileExtension('.fb2', '.epub');
  const andFilter = groupdocs.search.SearchDocumentFilter.createAnd(filter1, filter2);

  // Creating an OR composite filter that returns all DOC, DOCX, PDF and all documents that have the word Einstein in their full paths
  const filter3 = groupdocs.search.SearchDocumentFilter.createFilePathRegularExpression(
    'Einstein',
    java.getStaticFieldValue('java.util.regex.Pattern', 'CASE_INSENSITIVE'),
  );
  const filter4 = groupdocs.search.SearchDocumentFilter.createFileExtension('.doc', '.docx', '.pdf');
  const orFilter = groupdocs.search.SearchDocumentFilter.createOr(filter3, filter4);

  // Creating a filter that returns all found documents except of TXT documents
  const filter5 = groupdocs.search.SearchDocumentFilter.createFileExtension('.txt');
  const notFilter = groupdocs.search.SearchDocumentFilter.createNot(filter5);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Creating a search options object
  const options = new groupdocs.search.SearchOptions();

  // Setting a document filter
  options.setSearchDocumentFilter(notFilter);

  // Search in the index
  const query = 'ipsum';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = {
  settingASearchFilter,
  filePathSearchFilters,
  fileExtensionSearchFilter,
  attributeSearchFilter,
  combiningSearchFilters,
};
