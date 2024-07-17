const java = require('java');
const Utils = require('../../../utils');

async function homophoneDictionary(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/homophoneDictionary/Index';
  const documentsFolder = Utils.DocumentsPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index from in specified folder
  const index = new groupdocs.search.Index(indexFolder);

  // Indexing documents from the specified folder
  index.add(documentsFolder);

  // Getting homophones for word 'braid'
  const homophones = index.getDictionaries().getHomophoneDictionary().getHomophones('braid');
  console.log("Homophones for 'braid':");
  for (const homophone of homophones) {
    console.log(homophone);
  }

  // Getting groups of homophones to which word 'braid' belongs to
  const groups = index.getDictionaries().getHomophoneDictionary().getHomophoneGroups('braid');
  console.log("Homophone groups for 'braid':");
  for (const group of groups) {
    for (const group1 of group) {
      console.log(group1 + ' ');
    }
    console.log();
  }

  if (index.getDictionaries().getHomophoneDictionary().getCount() > 0) {
    // Removing all homophones from the dictionary
    index.getDictionaries().getHomophoneDictionary().clear();
  }

  // Adding homophones to the dictionary
  const homophoneGroups = java.newInstanceSync('java.util.ArrayList');
  homophoneGroups.add(java.newArray('java.lang.String', ['awe', 'oar', 'or', 'ore']));
  homophoneGroups.add(java.newArray('java.lang.String', ['aye', 'eye', 'i']));
  homophoneGroups.add(java.newArray('java.lang.String', ['call', 'caul']));
  index.getDictionaries().getHomophoneDictionary().addRange(homophoneGroups);

  // Export homophones to a file
  const fileName = Utils.OutputPath + 'AdvancedUsage/ManagingDictionaries/homophoneDictionary/Homophones.dat';
  index.getDictionaries().getHomophoneDictionary().exportDictionary(fileName);

  // Import homophones from a file
  index.getDictionaries().getHomophoneDictionary().importDictionary(fileName);

  // Search in the index
  const query = 'caul';
  const options = new groupdocs.search.SearchOptions();
  options.setUseHomophoneSearch(true);
  const result = index.search(query, options);

  Utils.traceResult(query, result);
}

module.exports = homophoneDictionary;
