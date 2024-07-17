const fs = require('fs');
const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function customTextExtractors(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/customTextExtractors'; // Specify path to the index folder
  const documentsFolder = Utils.LogPath; // Specify path to a folder containing documents to search

  Utils.printHeaderFromPath(indexFolder);

  const settings = new groupdocs.search.IndexSettings();
  const logExtractor = java.newProxy('com.groupdocs.search.common.IFieldExtractor', {
    getExtensions: function () {
      const array = java.newArray('java.lang.String', ['.log']);
      return array;
    },
    getFields: function (filePath) {
      const fileName = path.resolve(filePath);
      const contents = fs.readFileSync(filePath, 'utf8');
      const fields = java.newArray('com.groupdocs.search.common.DocumentField', [
        new groupdocs.search.DocumentField('FileName', fileName),
        new groupdocs.search.DocumentField('Content', contents),
      ]);
      return fields;
    },
  });
  settings.getCustomExtractors().addItem(logExtractor); // Adding custom text extractor to the index settings

  const index = new groupdocs.search.Index(indexFolder, settings, true); // Creating or loading an index

  index.add(documentsFolder); // Indexing documents from the specified folder

  const query1 = 'objection';
  const result1 = index.search(query1); // Searching

  const query2 = 'log';
  const result2 = index.search(query2); // Searching

  Utils.traceResult(query1, result1);
  Utils.traceResult(query2, result2);
}

module.exports = customTextExtractors;
