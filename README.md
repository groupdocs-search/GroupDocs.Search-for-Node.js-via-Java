# Document Indexing & Search API

[GroupDocs.Search for Node.js via Java](https://products.groupdocs.com/search/nodejs-java) helps build reliable, smart and feature-rich search application for your end-users, supporting all popular document formats. It extracts text and metadata from different files and performs search over all documents. In order to make search process fast and accurate, index is created and documents are added to it. Hence all the search queries or advanced searches are performed over the index.

## Document Indexing Features

- [80+ supported file formats](https://docs.groupdocs.com/search/nodejs-java/supported-document-formats/).
- Create index in memory or on disk.
- Update index to take into account changed, deleted and added documents.
- Merge several indexes into one.
- Optimize index to improve search performance.
- Indexing password protected documents.
- Indexing with stop words.
- Support for indexing additional fields.
- Support for blended characters.
- Support for characters indexed as a whole word.
- Support for character replacement during indexing.
- Support for custom text extractors.
- Option for compact and metadata index.
- Ability to save extracted text in index with different level of compression.
- Document filtering during indexing.
- Deleting indexed paths from index.
- Ability to separately extract data from documents and index them.
- Support for optical text recognition on images.
- Calculation and indexing of image hashes for reverse image search.
- The ability to create a distributed search network that automatically balances the load across nodes.

## Document Search Features

- Simple word search.
- Boolean search.
- Regular expression search.
- Faceted search.
- Case sensitive search.
- Flexible fuzzy search.
- Synonym search.
- Homophone search.
- Wildcard search.
- Phrase search with wildcards.
- Search for different word forms.
- Date range search.
- Numeric range search.
- Search by chunks (pages).
- Document filtering in search result.
- Search for different object types: text, numbers, dates, file names, document types, metadata fields, document creation/modification dates.
- Combine different types of search into one search query.
- Alias substitution in search queries.
- Perform spell check during search.
- Perform keyboard layout correction during search.
- Search queries in text or flexible object form.
- Highlight search results in the text of the entire document or in text segments.
- Multiple simultaneous thread safe search.
- Thread safe search during indexing, updating or merging operation.
- Search over several indexes simultaneously.
- Built-in support for reverse image search.

## Getting Started with GroupDocs.Search for Node.js via Java

### Installation

From the command line:

	npm i @groupdocs/groupdocs.search

## Perform Regular Expression Search

```javascript
const indexFolder = 'c:/MyIndex/';
const documentsFolder = 'c:/MyDocuments/';

// Creating an index in the specified folder
const index = new groupdocs.search.Index(indexFolder);

// Indexing documents from the specified folder
index.add(documentsFolder);

// Search for the phrase in text form
const query1 = '^^(.)\\1{1,}'; // The first caret character at the beginning indicates that this is a regular expression search query
const result1 = index.search(query1); // Search for two or more identical characters at the beginning of a word

// Search for the phrase in object form
const query2 = groupdocs.search.SearchQuery.createRegexQuery('^(.)\\1{1,}'); // Search for two or more identical characters at the beginning of a word
const result2 = index.search(query2);
```

## Spell Check with Smart Search

```javascript
const indexFolder = 'c:/MyIndex/';
const documentsFolder = 'c:/MyDocuments/';

// Creating an index in the specified folder
const index = new groupdocs.search.Index(indexFolder);

// Indexing documents from the specified folder
index.add(documentsFolder);

// Creating a search options instance
const options = new groupdocs.search.SearchOptions();
options.getSpellingCorrector().setEnabled(true); // Enabling the spelling correction
options.getSpellingCorrector().setMaxMistakeCount(1); // Setting the maximum number of mistakes
options.getSpellingCorrector().setOnlyBestResults(true); // Enabling the option for only the best results of the spelling correction

// Search for the word "houseohld" containing a spelling error
// The word "household" will be found that differs from the search query in two transposed letters
const query = 'houseohld';
const result = index.search(query, options);
```

[Home](https://www.groupdocs.com/) | [Product Page](https://products.groupdocs.com/search/nodejs-java) | [Documentation](https://docs.groupdocs.com/search/nodejs-java/) | [Blog](https://blog.groupdocs.com/category/search/) | [API Reference](https://apireference.groupdocs.com/search/nodejs-java) | [Code Samples](https://github.com/groupdocs-search/GroupDocs.Search-for-Node.js-via-Java) | [Free Support](forum.groupdocs.com/c/search) | [Temporary License](https://purchase.groupdocs.com/temporary-license)
