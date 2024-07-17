const path = require('path');
const java = require('java');
const Utils = require('../../../utils');

async function ocrSupport(groupdocs) {
  const indexFolder = Utils.OutputPath + 'AdvancedUsage/Indexing/ocrSupport';
  const documentsFolder = Utils.DocumentsPNG;
  const query = 'water';

  Utils.printHeaderFromPath(indexFolder);

  // Creating an index
  const index = new groupdocs.search.Index(indexFolder, true);

  // Subscribing to the ErrorOccurred event
  index.getEvents().ErrorOccurred.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log(args.getMessage());
      },
    }),
  );

  // Setting the OCR indexing options
  const options = new groupdocs.search.IndexingOptions();
  options.getOcrIndexingOptions().setEnabledForSeparateImages(true);
  options.getOcrIndexingOptions().setEnabledForEmbeddedImages(true);
  const ocrConnector = java.newProxy('com.groupdocs.search.options.IOcrConnector', {
    recognize: function (context) {
      switch (String(context.getImageLocation())) {
        case 'Separate':
        case 'Embedded':
        case 'ContainerItem':
          const image = java.callStaticMethodSync('javax.imageio.ImageIO', 'read', context.getImageStream());
          const asposeOcr = java.newInstanceSync('com.aspose.ocr.AsposeOCR');
          const result = asposeOcr.RecognizePage(image);
          return result;
        default:
          throw new Error('The image type is not supported: ' + context.getImageLocation());
      }
    },
  });
  options.getOcrIndexingOptions().setOcrConnector(ocrConnector);

  // Indexing documents in a document folder
  index.add(documentsFolder, options);

  // Searching in the index
  const result = index.search(query);

  Utils.traceResult(query, result);
}

module.exports = ocrSupport;
