const java = require('java');
const Utils = require('../../../utils');

async function creatingDateRangeSearchQueries(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/dateRangeSearch/creatingDateRangeSearchQueries';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Search for dates using query in text form
  const query1 = 'daterange(2017-01-01 ~~ 2019-12-31)';

  const result1 = index.search(query1);
  // Search for dates using query in text form
  const query2 = groupdocs.search.SearchQuery.createDateRangeQuery(
    Utils.createDate(2017, 1, 1),
    Utils.createDate(2019, 12, 31),
  );
  const result2 = index.search(query2);

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2.toString(), result2);
}

async function specifyingDateRangeSearchFormats(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/dateRangeSearch/specifyingDateRangeSearchFormats';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Setting date formats
  const options = new groupdocs.search.SearchOptions();
  options.getDateFormats().clear(); // Removing default date formats
  const elements = java.newArray('com.groupdocs.search.options.DateFormatElement', [
    java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getMonthTwoDigits'),
    java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getDateSeparator'),
    java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getDayOfMonthTwoDigits'),
    java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getDateSeparator'),
    java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getYearFourDigits'),
  ]);
  // Creating a date format pattern 'MM/dd/yyyy'
  const dateFormat = new groupdocs.search.DateFormat(elements, '/');
  options.getDateFormats().addItem(dateFormat);

  // Searching in the index.
  // For the given query, for example, the date 09/27/2019 will be found,
  // but the date 2019-09-27 will not be found, because it is presented in a format that is not specified in the search options.
  const query = 'daterange(2017-01-01 ~~ 2019-12-31)';
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = { creatingDateRangeSearchQueries, specifyingDateRangeSearchFormats };
