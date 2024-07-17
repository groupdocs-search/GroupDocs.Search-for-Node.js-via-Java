const java = require('java');
const Utils = require('../../../utils');

async function reverseImageSearch(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Searching/reverseImageSearch';
  const documentsFolder = Utils.ImagesPath;

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder);

  // Setting the image indexing options
  const indexingOptions = new groupdocs.search.IndexingOptions();
  indexingOptions.getImageIndexingOptions().setEnabledForContainerItemImages(true);
  indexingOptions.getImageIndexingOptions().setEnabledForEmbeddedImages(true);
  indexingOptions.getImageIndexingOptions().setEnabledForSeparateImages(true);

  // Indexing documents in a document folder
  index.add(documentsFolder, indexingOptions);

  // Setting the image search options
  const imageSearchOptions = new groupdocs.search.ImageSearchOptions();
  imageSearchOptions.setHashDifferences(10);
  imageSearchOptions.setMaxResultCount(10000);
  imageSearchOptions.setSearchDocumentFilter(
    groupdocs.search.SearchDocumentFilter.createFileExtension('.zip', '.png', '.jpg'),
  );

  // Creating a reference image for search
  const searchImage = groupdocs.search.SearchImage.create(Utils.ImagesPath + 'ic_arrow_downward_black_18dp.png');

  // Searching in the index
  const result = index.search(searchImage, imageSearchOptions);

  console.log('Images found: ' + result.getImageCount());
  for (let i = 0; i < result.getImageCount(); i++) {
    const image = result.getFoundImage(i);
    console.log(image.getDocumentInfo().toString());
  }
}

module.exports = reverseImageSearch;
