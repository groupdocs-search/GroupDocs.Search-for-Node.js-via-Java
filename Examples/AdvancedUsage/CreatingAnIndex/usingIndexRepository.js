const java = require('java');
const Utils = require('../../../utils');

async function usingIndexRepository(groupdocs) {
  const indexFolder1 = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingIndexRepository/Index1';
  const indexFolder2 = Utils.OutputPath + 'AdvancedUsage/CreatingAnIndex/UsingIndexRepository/Index2';
  const documentFolder1 = Utils.DocumentsPath;
  const documentFolder2 = Utils.DocumentsPath2;

  Utils.printHeaderFromPath(indexFolder1);

  // Creating an index repository instance
  const indexRepository = new groupdocs.search.IndexRepository();

  // Subscribing to an event
  indexRepository.getEvents().OperationProgressChanged.add(
    java.newProxy('com.groupdocs.search.events.EventHandler', {
      invoke: function (sender, args) {
        console.log('Indexed document:\n\t' + args.getLastDocumentPath());
      },
    }),
  );

  // Creating or loading an index and adding to the index repository
  const index1 = new groupdocs.search.Index(indexFolder1);
  indexRepository.addToRepository(index1);

  // Creating or loading an index and adding to the index repository
  const index2 = new groupdocs.search.Index(indexFolder2);
  indexRepository.addToRepository(index2);

  // Adding documents to the index 1
  index1.add(documentFolder1);

  // Adding documents to the index 2
  index2.add(documentFolder2);

  // Changing, deleting, adding documents to document folders
  // ...

  // Updating all indexes in the repository
  indexRepository.update();

  // Searching in the repository
  const query = 'decisively';
  const result = indexRepository.search(query);

  Utils.traceResult(query, result);
}

module.exports = usingIndexRepository;
