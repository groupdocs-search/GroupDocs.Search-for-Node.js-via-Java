const java = require('java');

async function getSupportedFileFormats(groupdocs) {
  const supportedFileTypes = java.callStaticMethodSync(
    'com.groupdocs.search.results.FileType',
    'getSupportedFileTypes',
  );
  const iterator = supportedFileTypes.iterator();
  while (iterator.hasNext()) {
    const fileType = iterator.next();
    console.log(fileType.getExtension() + ' - ' + fileType.getDescription());
  }
}

module.exports = getSupportedFileFormats;
