const examples = require('./searchExamples');

(async () => {
  try {
    console.log('Open runExamples.js. \nUncomment the example that you want to run.');

    await Promise.all([
      /* NOTE: Please uncomment the example you want to try out */

      /* Getting Started ---------------------------------------------------------------------------------------------------- */

      examples.setLicenseFromFile(),
      //examples.setLicenseFromStream(),
      //examples.setMeteredLicense(),

      examples.helloWorld(),

      /* Basic usage ---------------------------------------------------------------------------------------------------- */

      //examples.runSynchronousIndexing(),
      //examples.runAsynchronousIndexing(),

      //examples.buildSearchQuery(),

      //examples.obtainSearchResultInformation(),
      //examples.highlightSearchResults(),

      //examples.getSupportedFileFormats(),

      /* Advanced usage ---------------------------------------------------------------------------------------------------- */

      /* Creating an Index ---------------------------------------------------------------------------------------------------- */

      //examples.operationFinishedEvent(),
      //examples.errorOccurredEvent(),
      //examples.operationProgressChangedEvent(),
      //examples.optimizationProgressChangedEvent(),
      //examples.passwordRequiredEvent(),
      //examples.fileIndexingEvent(),
      //examples.statusChangedEvent(),
      //examples.searchPhaseCompletedEvent(),
      //examples.imagePreparingEvent(),

      //examples.usingIndexRepository(),

      /* Indexing ---------------------------------------------------------------------------------------------------- */

      //examples.characterReplacementDuringIndexing(),

      //examples.regularCharacters(),
      //examples.blendedCharacters(),

      //examples.customTextExtractors(),

      //examples.deleteIndexedDocuments(),

      //examples.deleteIndexedPaths(),

      //examples.changeAttributes(),
      //examples.addAttributesDuringIndexing(),

      //examples.settingAnIndexingFilter(),
      //examples.creationTimeFilters(),
      //examples.modificationTimeFilters(),
      //examples.filePathFilters(),
      //examples.fileLengthFilters(),
      //examples.fileExtensionFilter(),
      //examples.logicalNotFilter(),
      //examples.logicalAndFilter(),
      //examples.logicalOrFilter(),

      //examples.documentRenaming(),

      //examples.indexingAdditionalFields(),

      //examples.indexingFromFile(),
      //examples.indexingFromStream(),
      //examples.indexingFromStructure(),
      //examples.indexingFromUrl(),
      //examples.indexingFromFtp(),

      //examples.indexingMetadataOfDocuments(),

      //examples.cancellationProperty(),
      //examples.isAsyncProperty(),
      //examples.threadsProperty(),
      //examples.metadataIndexingOptionsProperty(),

      //examples.indexingUsingThePasswordDictionary(),
      //examples.indexingUsingThePasswordRequiredEvent(),

      //examples.indexingReports(),

      //examples.indexingWithStopWords(),

      //examples.useOfStandardFileLogger(),
      //examples.implementingCustomLogger(),

      //examples.mergeIndexes(),

      //examples.ocrSupport(),

      //examples.optimizeIndex(),

      //examples.separateDataExtraction(),

      //examples.storingTextOfIndexedDocuments(),

      //examples.textFileEncodingDetection(),

      //examples.updateIndexedDocuments(),
      //examples.updateIndexVersion(),

      /* Searching ---------------------------------------------------------------------------------------------------- */

      //examples.operatorAnd(),
      //examples.operatorOr(),
      //examples.operatorNot(),
      //examples.complexQueries(),

      //examples.queryInTextForm(),
      //examples.queryInObjectForm(),

      //examples.creatingDateRangeSearchQueries(),
      //examples.specifyingDateRangeSearchFormats(),

      //examples.settingASearchFilter(),
      //examples.filePathSearchFilters(),
      //examples.fileExtensionSearchFilter(),
      //examples.attributeSearchFilter(),
      //examples.combiningSearchFilters(),

      //examples.simpleFacetedSearch(),
      //examples.complexQuery(),
      //examples.standardFieldNames(),

      //examples.settingFuzzySearchAlgorithm(),
      //examples.settingStepFunction(),

      //examples.gettingDocuments(),
      //examples.gettingTextOfIndexedDocuments(),

      //examples.highlightingInEntireDocument(),
      //examples.highlightingInFragments(),

      //examples.homophoneSearch(),

      //examples.keyboardLayoutCorrection(),

      //examples.numericRangeSearch(),

      //examples.outputAdapters(),

      //examples.simplePhraseSearch(),
      //examples.phraseSearchWithWildcards(),
      //examples.phraseSearchWithWildcards2(),

      //examples.queriesInTextAndObjectForm(),

      //examples.regularExpressionSearch(),

      //examples.reverseImageSearch(),

      //examples.searchByChunks(),

      //examples.searchForDifferentWordForms(),

      //examples.searchForSpecialCharacters(),

      //examples.searchReports(),

      //examples.searchResults(),

      //examples.spellChecking(),

      //examples.synonymSearch(),

      //examples.usingAliases(),

      //examples.wildcardSearchText(),
      //examples.wildcardSearchObject(),

      /* Managing Dictionaries ---------------------------------------------------------------------------------------------------- */

      //examples.aliasDictionary(),

      //examples.alphabet(),

      //examples.characterReplacements(),

      //examples.documentPasswords(),

      //examples.homophoneDictionary(),

      //examples.spellingCorrector(),

      //examples.stopWordDictionary(),

      //examples.synonymDictionary(),

      //examples.wordFormsProvider(),

      /* Scaling ---------------------------------------------------------------------------------------------------- */

      /* Highlight Search Results in HTML ---------------------------------------------------------------------------------------------------- */
    ]);
    console.log();
    console.log('All done.');
    console.log('Press Ctrl + C to exit.');
    //process.exit(0)
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
