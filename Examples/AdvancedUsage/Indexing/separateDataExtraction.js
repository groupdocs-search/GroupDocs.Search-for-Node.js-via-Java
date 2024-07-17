const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function separateDataExtraction(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/separateDataExtraction';
  const documentPath = Utils.DocumentsPath + 'Lorem ipsum.pdf';

  Utils.printHeaderFromPath(indexFolder);

  // Extracting data from a document
  const extractor = new groupdocs.search.Extractor();
  const document = groupdocs.search.Document.createFromFile(documentPath);
  const extractionOptions = new groupdocs.search.ExtractionOptions();
  extractionOptions.setUseRawTextExtraction(false);
  const extractedData = extractor.extract(document, extractionOptions);

  // Serializing the data
  const array1 = extractedData.serialize();
  const array2 = [];
  for (let i = 0; i < array1.length; i++) {
    array2[i] = array1[i];
  }

  // Deserializing the data
  const buffer = java.newArray('byte', array2);
  const deserializedData = groupdocs.search.ExtractedData.deserialize(buffer);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing the data
  const data = java.newArray('com.groupdocs.search.ExtractedData', [deserializedData]);
  index.add(data, new groupdocs.search.IndexingOptions());

  // Searching in the index
  const query = 'ipsum';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = separateDataExtraction;
