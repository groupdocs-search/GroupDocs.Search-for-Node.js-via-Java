const java = require('java');
const Utils = require('../../../utils');

async function synonymDictionary(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/synonymDictionary/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index from in specified folder
  const index = new groupdocs.search.Index(indexFolder, true);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Getting synonyms for word 'make'
  const synonyms = index.getDictionaries().getSynonymDictionary().getSynonyms('make');
  console.log("Synonyms for 'make':");
  for (const synonym of synonyms) {
    console.log(synonym);
  }

  // Getting groups of synonyms to which word 'make' belongs to
  const groups = index.getDictionaries().getSynonymDictionary().getSynonymGroups('make');
  console.log("Synonym groups for 'make':");
  for (const group of groups) {
    for (const group1 of group) {
      console.log(group1 + ' ');
    }
    console.log();
  }

  if (index.getDictionaries().getSynonymDictionary().getCount() > 0) {
    // Removing all synonyms from the dictionary
    index.getDictionaries().getSynonymDictionary().clear();
  }

  // Adding synonyms to the dictionary
  const synonymGroups = java.newInstanceSync('java.util.ArrayList');
  synonymGroups.add(java.newArray('java.lang.String', ['achieve', 'accomplish', 'attain', 'reach']));
  synonymGroups.add(java.newArray('java.lang.String', ['achieve', 'accept', 'take', 'have']));
  synonymGroups.add(java.newArray('java.lang.String', ['improve', 'better']));
  index.getDictionaries().getSynonymDictionary().addRange(synonymGroups);

  // Export synonyms to a file
  const fileName = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/synonymDictionary/Synonyms.dat';
  index.getDictionaries().getSynonymDictionary().exportDictionary(fileName);

  // Import synonyms from a file
  index.getDictionaries().getSynonymDictionary().importDictionary(fileName);

  // Search in the index
  const query = 'achieve';
  const options = new groupdocs.search.SearchOptions();
  options.setUseSynonymSearch(true); // Enabling synonym search
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = synonymDictionary;
