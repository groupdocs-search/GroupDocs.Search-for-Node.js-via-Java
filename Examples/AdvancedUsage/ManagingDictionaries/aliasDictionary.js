const java = require('java');
const Utils = require('../../../utils');

async function aliasDictionary(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/aliasDictionary/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating or opening an index from the specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  if (index.getDictionaries().getAliasDictionary().getCount() > 0) {
    // Deleting all existing aliases
    index.getDictionaries().getAliasDictionary().clear();
  }

  // Adding aliases to the alias dictionary
  index.getDictionaries().getAliasDictionary().add('t', '(gravida OR promotion)');
  index.getDictionaries().getAliasDictionary().add('e', '(viverra OR farther)');
  const pairs = java.newArray('com.groupdocs.search.dictionaries.AliasReplacementPair', [
    new groupdocs.search.AliasReplacementPair('d', 'daterange(2017-01-01 ~~ 2019-12-31)'),
    new groupdocs.search.AliasReplacementPair('n', '(400 ~~ 4000)'),
  ]);
  index.getDictionaries().getAliasDictionary().addRange(pairs);

  if (index.getDictionaries().getAliasDictionary().contains('e')) {
    // Getting an alias replacement
    const replacement = index.getDictionaries().getAliasDictionary().getText('e');
    console.log('e - ' + replacement);
  }

  // Export aliases to a file
  const fileName = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/aliasDictionary/Aliases.dat';
  index.getDictionaries().getAliasDictionary().exportDictionary(fileName);

  // Import aliases from a file
  index.getDictionaries().getAliasDictionary().importDictionary(fileName);

  // Search in the index
  const query = '@t OR @e';
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = aliasDictionary;
