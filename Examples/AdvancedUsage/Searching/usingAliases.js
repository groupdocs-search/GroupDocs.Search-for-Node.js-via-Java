const java = require('java');
const Utils = require('../../../utils');

async function usingAliases(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/usingAliases';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Adding aliases to the alias dictionary
  index.getDictionaries().getAliasDictionary().add('t', '(gravida OR promotion)');
  index.getDictionaries().getAliasDictionary().add('e', '(viverra OR farther)');

  // Search in the index
  const query = '@t OR @e';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = usingAliases;
