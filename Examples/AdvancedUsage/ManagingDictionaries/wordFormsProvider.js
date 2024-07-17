const java = require('java');
const Utils = require('../../../utils');

async function wordFormsProvider(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/wordFormsProvider/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index in the specified folder
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the event
  index.getEvents().ErrorOccurred.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log(args.getMessage());
      },
    }),
  );

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  String.prototype.endsWith = function (str) {
    var lastIndex = this.lastIndexOf(str);
    return lastIndex !== -1 && lastIndex + str.length === this.length;
  };

  // Setting the custom word forms provider instance
  const wordFormsProvider = java.newProxy('com.groupdocs.search.dictionaries.IWordFormsProvider', {
    getWordForms: function (word) {
      const result = [];

      // Assume that the input word is in the plural, then we add the singular
      if (word.length > 2 && word.toLowerCase().endsWith('es')) {
        result.push(word.substr(0, word.length - 2));
      }
      if (word.length > 1 && word.toLowerCase().endsWith('s')) {
        result.push(word.substr(0, word.length - 1));
      }

      // Then assume that the input word is in the singular, we add the plural
      if (word.length > 1 && word.toLowerCase().endsWith('y')) {
        result.push(word.substr(0, word.length - 1) + 'is');
      }
      result.push(word + 's');
      result.push(word + 'es');
      // All rules are implemented in the EnglishWordFormsProvider class

      return java.newArray('java.lang.String', result);
    },
  });
  index.getDictionaries().setWordFormsProvider(wordFormsProvider);

  // Creating a search options instance
  const options = new groupdocs.search.SearchOptions();
  options.setUseWordFormsSearch(true); // Enabling search for word forms

  // Searching in the index
  const query = 'mrs';
  const result = index.search(query, options);

  // The following words can be found:
  // mrs
  // mr

  Utils.traceResult(query, result);
}

module.exports = wordFormsProvider;
