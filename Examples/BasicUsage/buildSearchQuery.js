const java = require('java');
const Utils = require('../../utils');

async function buildSearchQuery(groupdocs) {
  const indexFolder = Utils.OutputPath + 'BasicUsage/buildSearchQuery';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Subscribe to the event
  const eventHandler = java.newProxy('com.groupdocs.search.events.EventHandler', {
    invoke: function (sender, args) {
      console.log(args.getMessage()); // Writing error messages to the console
    },
  });
  index.getEvents().ErrorOccurred.add(eventHandler);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Simple search query
  {
    const query = 'volutpat';
    const result = index.search(query);
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }

  // Wildcard search query
  {
    const query = '?ffect';
    const result = index.search(query); // Search for words 'affect', 'effect', ets.
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }
  {
    const query = 'princip?(2~4)';
    const result = index.search(query); // Search for words 'principal', 'principle', 'principles', 'principally', ets.
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }

  // Faceted search query
  {
    const query = 'Content: magna';
    const result = index.search(query); // Search for word 'magna' only in 'Content' field
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }

  // Numeric range search query
  {
    const query = '2000 ~~ 3000';
    const result = index.search(query); // Search for numbers from 2000 to 3000
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }

  // Date range search query
  {
    const options = new groupdocs.search.SearchOptions(); // Creating a search options object
    options.getDateFormats().clear(); // Removing default date formats

    // Creating a date format pattern 'MM/dd/yyyy'
    const elements = java.newArray('com.groupdocs.search.options.DateFormatElement', [
      java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getMonthTwoDigits'),
      java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getDateSeparator'),
      java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getDayOfMonthTwoDigits'),
      java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getDateSeparator'),
      java.callStaticMethodSync('com.groupdocs.search.options.DateFormatElement', 'getYearFourDigits'),
    ]);
    const dateFormat = new groupdocs.search.DateFormat(elements, '/');
    options.getDateFormats().addItem(dateFormat); // Adding the date format pattern to the date format collection

    const query = 'daterange(2000-01-01 ~~ 2001-06-15)'; // Dates in the search query are always specified in the format 'yyyy-MM-dd'
    const result = index.search(query, options); // Search in index
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }

  // Regular expression search query
  {
    const query = '^(.)\\1{2,}'; // The caret character at the beginning indicates that this is a regular expression search query
    const result = index.search(query); // Search for three or more identical characters in a row
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }

  // Boolean search query
  {
    const query = 'justo AND NOT 3456';
    const result = index.search(query);
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }
  {
    const query = 'FileName: Engl?(1~3) OR Content: (3456 AND consequat)';
    // Search for documents whose paths contain 'English', 'England', ets., or documents containing both '3456' and 'consequat' in the content
    const result = index.search(query);
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }

  // Phrase search query
  {
    const query = '"ipsum dolor sit amet"';
    const result = index.search(query); // Search for the phrase 'ipsum dolor sit amet'
    console.log('Query: ' + query);
    console.log('Documents: ' + result.getDocumentCount());
    console.log('Occurrences: ' + result.getOccurrenceCount());
    console.log();
  }
}

module.exports = buildSearchQuery;
