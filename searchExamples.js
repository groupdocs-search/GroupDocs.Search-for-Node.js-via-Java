const java = require('java');

java.classpath.push('./lib/aspose-ocr-21.9.jar');
java.classpath.push('./lib/onnxruntime-1.8.1.jar');

const search = require('@groupdocs/groupdocs.search');

const utils = require('./utils');

// Getting Started ----------------------------------------------------------------------------------------------------
const setLicenseFromFile = require('./Examples/GettingStarted/setLicenseFromFile');
const setLicenseFromStream = require('./Examples/GettingStarted/setLicenseFromStream');
const setMeteredLicense = require('./Examples/GettingStarted/setMeteredLicense');
const helloWorld = require('./Examples/GettingStarted/helloWorld');

// Basic usage ----------------------------------------------------------------------------------------------------
const {
  runSynchronousIndexing,
  runAsynchronousIndexing,
} = require('./Examples/BasicUsage/buildYourFirstSearchSolution');
const buildSearchQuery = require('./Examples/BasicUsage/buildSearchQuery');
const {
  obtainSearchResultInformation,
  highlightSearchResults,
} = require('./Examples/BasicUsage/workWithSearchResults');
const getSupportedFileFormats = require('./Examples/BasicUsage/getSupportedFileFormats');
const {
  operationFinishedEvent,
  errorOccurredEvent,
  operationProgressChangedEvent,
  optimizationProgressChangedEvent,
  passwordRequiredEvent,
  fileIndexingEvent,
  statusChangedEvent,
  searchPhaseCompletedEvent,
  imagePreparingEvent,
} = require('./Examples/AdvancedUsage/CreatingAnIndex/usingEvents');
const usingIndexRepository = require('./Examples/AdvancedUsage/CreatingAnIndex/usingIndexRepository');

const characterReplacementDuringIndexing = require('./Examples/AdvancedUsage/Indexing/characterReplacementDuringIndexing');
const { regularCharacters, blendedCharacters } = require('./Examples/AdvancedUsage/Indexing/characterTypes');
const customTextExtractors = require('./Examples/AdvancedUsage/Indexing/customTextExtractors');
const deleteIndexedDocuments = require('./Examples/AdvancedUsage/Indexing/deleteIndexedDocuments');
const deleteIndexedPaths = require('./Examples/AdvancedUsage/Indexing/deleteIndexedPaths');
const {
  changeAttributes,
  addAttributesDuringIndexing,
} = require('./Examples/AdvancedUsage/Indexing/documentAttributes');
const {
  settingAnIndexingFilter,
  creationTimeFilters,
  modificationTimeFilters,
  filePathFilters,
  fileLengthFilters,
  fileExtensionFilter,
  logicalNotFilter,
  logicalAndFilter,
  logicalOrFilter,
} = require('./Examples/AdvancedUsage/Indexing/documentFilteringDuringIndexing');
const documentRenaming = require('./Examples/AdvancedUsage/Indexing/documentRenaming');
const indexingAdditionalFields = require('./Examples/AdvancedUsage/Indexing/indexingAdditionalFields');
const {
  indexingFromFile,
  indexingFromStream,
  indexingFromStructure,
  indexingFromUrl,
  indexingFromFtp,
} = require('./Examples/AdvancedUsage/Indexing/indexingFromDifferentSources');
indexingMetadataOfDocuments = require('./Examples/AdvancedUsage/Indexing/indexingMetadataOfDocuments');
const {
  cancellationProperty,
  isAsyncProperty,
  threadsProperty,
  metadataIndexingOptionsProperty,
} = require('./Examples/AdvancedUsage/Indexing/indexingOptionsProperties');
const {
  indexingUsingThePasswordDictionary,
  indexingUsingThePasswordRequiredEvent,
} = require('./Examples/AdvancedUsage/Indexing/indexingPasswordProtectedDocuments');
const indexingReports = require('./Examples/AdvancedUsage/Indexing/indexingReports');
const indexingWithStopWords = require('./Examples/AdvancedUsage/Indexing/indexingWithStopWords');
const { useOfStandardFileLogger, implementingCustomLogger } = require('./Examples/AdvancedUsage/Indexing/logging');
const mergeIndexes = require('./Examples/AdvancedUsage/Indexing/mergeIndexes');
const ocrSupport = require('./Examples/AdvancedUsage/Indexing/ocrSupport');
const optimizeIndex = require('./Examples/AdvancedUsage/Indexing/optimizeIndex');
const separateDataExtraction = require('./Examples/AdvancedUsage/Indexing/separateDataExtraction');
const storingTextOfIndexedDocuments = require('./Examples/AdvancedUsage/Indexing/storingTextOfIndexedDocuments');
const textFileEncodingDetection = require('./Examples/AdvancedUsage/Indexing/textFileEncodingDetection');
const { updateIndexedDocuments, updateIndexVersion } = require('./Examples/AdvancedUsage/Indexing/updateIndex');

const {
  operatorAnd,
  operatorOr,
  operatorNot,
  complexQueries,
} = require('./Examples/AdvancedUsage/Searching/booleanSearch');
const { queryInTextForm, queryInObjectForm } = require('./Examples/AdvancedUsage/Searching/caseSensitiveSearch');
const {
  creatingDateRangeSearchQueries,
  specifyingDateRangeSearchFormats,
} = require('./Examples/AdvancedUsage/Searching/dateRangeSearch');
const {
  settingASearchFilter,
  filePathSearchFilters,
  fileExtensionSearchFilter,
  attributeSearchFilter,
  combiningSearchFilters,
} = require('./Examples/AdvancedUsage/Searching/documentFilteringInSearchResult');
const {
  simpleFacetedSearch,
  complexQuery,
  standardFieldNames,
} = require('./Examples/AdvancedUsage/Searching/facetedSearch');
const { settingFuzzySearchAlgorithm, settingStepFunction } = require('./Examples/AdvancedUsage/Searching/fuzzySearch');
const {
  gettingDocuments,
  gettingTextOfIndexedDocuments,
} = require('./Examples/AdvancedUsage/Searching/gettingIndexedDocuments');
const {
  highlightingInEntireDocument,
  highlightingInFragments,
} = require('./Examples/AdvancedUsage/Searching/highlightingSearchResults');
const homophoneSearch = require('./Examples/AdvancedUsage/Searching/homophoneSearch');
const keyboardLayoutCorrection = require('./Examples/AdvancedUsage/Searching/keyboardLayoutCorrection');
const numericRangeSearch = require('./Examples/AdvancedUsage/Searching/numericRangeSearch');
const outputAdapters = require('./Examples/AdvancedUsage/Searching/outputAdapters');
const {
  simplePhraseSearch,
  phraseSearchWithWildcards,
  phraseSearchWithWildcards2,
} = require('./Examples/AdvancedUsage/Searching/phraseSearch');
const queriesInTextAndObjectForm = require('./Examples/AdvancedUsage/Searching/queriesInTextAndObjectForm');
const regularExpressionSearch = require('./Examples/AdvancedUsage/Searching/regularExpressionSearch');
const reverseImageSearch = require('./Examples/AdvancedUsage/Searching/reverseImageSearch');
const searchByChunks = require('./Examples/AdvancedUsage/Searching/searchByChunks');
const searchForDifferentWordForms = require('./Examples/AdvancedUsage/Searching/searchForDifferentWordForms');
const searchForSpecialCharacters = require('./Examples/AdvancedUsage/Searching/searchForSpecialCharacters');
const searchReports = require('./Examples/AdvancedUsage/Searching/searchReports');
const searchResults = require('./Examples/AdvancedUsage/Searching/searchResults');
const spellChecking = require('./Examples/AdvancedUsage/Searching/spellChecking');
const synonymSearch = require('./Examples/AdvancedUsage/Searching/synonymSearch');
const usingAliases = require('./Examples/AdvancedUsage/Searching/usingAliases');
const { wildcardSearchText, wildcardSearchObject } = require('./Examples/AdvancedUsage/Searching/wildcardSearch');

const aliasDictionary = require('./Examples/AdvancedUsage/ManagingDictionaries/aliasDictionary');
const alphabet = require('./Examples/AdvancedUsage/ManagingDictionaries/alphabet');
const characterReplacements = require('./Examples/AdvancedUsage/ManagingDictionaries/characterReplacements');
const documentPasswords = require('./Examples/AdvancedUsage/ManagingDictionaries/documentPasswords');
const homophoneDictionary = require('./Examples/AdvancedUsage/ManagingDictionaries/homophoneDictionary');
const spellingCorrector = require('./Examples/AdvancedUsage/ManagingDictionaries/spellingCorrector');
const stopWordDictionary = require('./Examples/AdvancedUsage/ManagingDictionaries/stopWordDictionary');
const synonymDictionary = require('./Examples/AdvancedUsage/ManagingDictionaries/synonymDictionary');
const wordFormsProvider = require('./Examples/AdvancedUsage/ManagingDictionaries/wordFormsProvider');

class SearchExamples {
  constructor() {
    // Initialize the model
    this.search = search;
  }

  async setLicenseFromFile() {
    return setLicenseFromFile(this);
  }

  async setLicenseFromStream() {
    return setLicenseFromStream(this);
  }

  async setMeteredLicense() {
    return setMeteredLicense(this);
  }

  async helloWorld() {
    return helloWorld(this);
  }

  async runSynchronousIndexing() {
    return runSynchronousIndexing(this);
  }

  async runAsynchronousIndexing() {
    return runAsynchronousIndexing(this);
  }

  async buildSearchQuery() {
    return buildSearchQuery(this);
  }

  async obtainSearchResultInformation() {
    return obtainSearchResultInformation(this);
  }

  async highlightSearchResults() {
    return highlightSearchResults(this);
  }

  async getSupportedFileFormats() {
    return getSupportedFileFormats(this);
  }

  async operationFinishedEvent() {
    return operationFinishedEvent(this);
  }

  async errorOccurredEvent() {
    return errorOccurredEvent(this);
  }

  async operationProgressChangedEvent() {
    return operationProgressChangedEvent(this);
  }

  async optimizationProgressChangedEvent() {
    return optimizationProgressChangedEvent(this);
  }

  async passwordRequiredEvent() {
    return passwordRequiredEvent(this);
  }

  async fileIndexingEvent() {
    return fileIndexingEvent(this);
  }

  async statusChangedEvent() {
    return statusChangedEvent(this);
  }

  async searchPhaseCompletedEvent() {
    return searchPhaseCompletedEvent(this);
  }

  async imagePreparingEvent() {
    return imagePreparingEvent(this);
  }

  async usingIndexRepository() {
    return usingIndexRepository(this);
  }

  async characterReplacementDuringIndexing() {
    return characterReplacementDuringIndexing(this);
  }

  async regularCharacters() {
    return regularCharacters(this);
  }

  async blendedCharacters() {
    return blendedCharacters(this);
  }

  async customTextExtractors() {
    return customTextExtractors(this);
  }

  async deleteIndexedDocuments() {
    return deleteIndexedDocuments(this);
  }

  async deleteIndexedPaths() {
    return deleteIndexedPaths(this);
  }

  async changeAttributes() {
    return changeAttributes(this);
  }

  async addAttributesDuringIndexing() {
    return addAttributesDuringIndexing(this);
  }

  async settingAnIndexingFilter() {
    return settingAnIndexingFilter(this);
  }

  async creationTimeFilters() {
    return creationTimeFilters(this);
  }

  async modificationTimeFilters() {
    return modificationTimeFilters(this);
  }

  async filePathFilters() {
    return filePathFilters(this);
  }

  async fileLengthFilters() {
    return fileLengthFilters(this);
  }

  async fileExtensionFilter() {
    return fileExtensionFilter(this);
  }

  async logicalNotFilter() {
    return logicalNotFilter(this);
  }

  async logicalAndFilter() {
    return logicalAndFilter(this);
  }

  async logicalOrFilter() {
    return logicalOrFilter(this);
  }

  async documentRenaming() {
    return documentRenaming(this);
  }

  async indexingAdditionalFields() {
    return indexingAdditionalFields(this);
  }

  async indexingFromFile() {
    return indexingFromFile(this);
  }

  async indexingFromStream() {
    return indexingFromStream(this);
  }

  async indexingFromStructure() {
    return indexingFromStructure(this);
  }

  async indexingFromUrl() {
    return indexingFromUrl(this);
  }

  async indexingFromFtp() {
    return indexingFromFtp(this);
  }

  async indexingMetadataOfDocuments() {
    return indexingMetadataOfDocuments(this);
  }

  async cancellationProperty() {
    return cancellationProperty(this);
  }

  async isAsyncProperty() {
    return isAsyncProperty(this);
  }

  async threadsProperty() {
    return threadsProperty(this);
  }

  async metadataIndexingOptionsProperty() {
    return metadataIndexingOptionsProperty(this);
  }

  async indexingUsingThePasswordDictionary() {
    return indexingUsingThePasswordDictionary(this);
  }

  async indexingUsingThePasswordRequiredEvent() {
    return indexingUsingThePasswordRequiredEvent(this);
  }

  async indexingReports() {
    return indexingReports(this);
  }

  async indexingWithStopWords() {
    return indexingWithStopWords(this);
  }

  async useOfStandardFileLogger() {
    return useOfStandardFileLogger(this);
  }

  async implementingCustomLogger() {
    return implementingCustomLogger(this);
  }

  async mergeIndexes() {
    return mergeIndexes(this);
  }

  async ocrSupport() {
    return ocrSupport(this);
  }

  async optimizeIndex() {
    return optimizeIndex(this);
  }

  async separateDataExtraction() {
    return separateDataExtraction(this);
  }

  async storingTextOfIndexedDocuments() {
    return storingTextOfIndexedDocuments(this);
  }

  async textFileEncodingDetection() {
    return textFileEncodingDetection(this);
  }

  async updateIndexedDocuments() {
    return updateIndexedDocuments(this);
  }

  async updateIndexVersion() {
    return updateIndexVersion(this);
  }

  async operatorAnd() {
    return operatorAnd(this);
  }

  async operatorOr() {
    return operatorOr(this);
  }

  async operatorNot() {
    return operatorNot(this);
  }

  async complexQueries() {
    return complexQueries(this);
  }

  async queryInTextForm() {
    return queryInTextForm(this);
  }

  async queryInObjectForm() {
    return queryInObjectForm(this);
  }

  async creatingDateRangeSearchQueries() {
    return creatingDateRangeSearchQueries(this);
  }

  async specifyingDateRangeSearchFormats() {
    return specifyingDateRangeSearchFormats(this);
  }

  async settingASearchFilter() {
    return settingASearchFilter(this);
  }

  async filePathSearchFilters() {
    return filePathSearchFilters(this);
  }

  async fileExtensionSearchFilter() {
    return fileExtensionSearchFilter(this);
  }

  async attributeSearchFilter() {
    return attributeSearchFilter(this);
  }

  async combiningSearchFilters() {
    return combiningSearchFilters(this);
  }

  async simpleFacetedSearch() {
    return simpleFacetedSearch(this);
  }

  async complexQuery() {
    return complexQuery(this);
  }

  async standardFieldNames() {
    return standardFieldNames(this);
  }

  async settingFuzzySearchAlgorithm() {
    return settingFuzzySearchAlgorithm(this);
  }

  async settingStepFunction() {
    return settingStepFunction(this);
  }

  async gettingDocuments() {
    return gettingDocuments(this);
  }

  async gettingTextOfIndexedDocuments() {
    return gettingTextOfIndexedDocuments(this);
  }

  async highlightingInEntireDocument() {
    return highlightingInEntireDocument(this);
  }

  async highlightingInFragments() {
    return highlightingInFragments(this);
  }

  async homophoneSearch() {
    return homophoneSearch(this);
  }

  async keyboardLayoutCorrection() {
    return keyboardLayoutCorrection(this);
  }

  async numericRangeSearch() {
    return numericRangeSearch(this);
  }

  async outputAdapters() {
    return outputAdapters(this);
  }

  async simplePhraseSearch() {
    return simplePhraseSearch(this);
  }

  async phraseSearchWithWildcards() {
    return phraseSearchWithWildcards(this);
  }

  async phraseSearchWithWildcards2() {
    return phraseSearchWithWildcards2(this);
  }

  async queriesInTextAndObjectForm() {
    return queriesInTextAndObjectForm(this);
  }

  async regularExpressionSearch() {
    return regularExpressionSearch(this);
  }

  async reverseImageSearch() {
    return reverseImageSearch(this);
  }

  async searchByChunks() {
    return searchByChunks(this);
  }

  async searchForDifferentWordForms() {
    return searchForDifferentWordForms(this);
  }

  async searchForSpecialCharacters() {
    return searchForSpecialCharacters(this);
  }

  async searchReports() {
    return searchReports(this);
  }

  async searchResults() {
    return searchResults(this);
  }

  async spellChecking() {
    return spellChecking(this);
  }

  async synonymSearch() {
    return synonymSearch(this);
  }

  async usingAliases() {
    return usingAliases(this);
  }

  async wildcardSearchText() {
    return wildcardSearchText(this);
  }

  async wildcardSearchObject() {
    return wildcardSearchObject(this);
  }

  async aliasDictionary() {
    return aliasDictionary(this);
  }

  async alphabet() {
    return alphabet(this);
  }

  async characterReplacements() {
    return characterReplacements(this);
  }

  async documentPasswords() {
    return documentPasswords(this);
  }

  async homophoneDictionary() {
    return homophoneDictionary(this);
  }

  async spellingCorrector() {
    return spellingCorrector(this);
  }

  async stopWordDictionary() {
    return stopWordDictionary(this);
  }

  async synonymDictionary() {
    return synonymDictionary(this);
  }

  async wordFormsProvider() {
    return wordFormsProvider(this);
  }
}

module.exports = new SearchExamples();
